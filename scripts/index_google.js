const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const database = require('../data/usa_database.json');
const DOMAIN = "cantreeservice.com";

function base64url(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function getAccessToken(keyData) {
  return new Promise((resolve, reject) => {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const claimSet = {
      iss: keyData.client_email,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    const encodedHeader = base64url(JSON.stringify(header));
    const encodedClaimSet = base64url(JSON.stringify(claimSet));
    const signatureInput = `${encodedHeader}.${encodedClaimSet}`;

    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signatureInput);
    const signature = base64url(signer.sign(keyData.private_key));

    const jwt = `${signatureInput}.${signature}`;
    const postData = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;

    const req = https.request(
      'https://oauth2.googleapis.com/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.access_token) {
              resolve(parsed.access_token);
            } else {
              reject(new Error(data));
            }
          } catch (e) {
            reject(e);
          }
        });
      }
    );

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function publishUrl(accessToken, url, type = 'URL_UPDATED') {
  return new Promise((resolve) => {
    const payload = JSON.stringify({ url, type });
    const req = https.request(
      'https://indexing.googleapis.com/v3/urlNotifications:publish',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          resolve({ status: res.statusCode, body: data });
        });
      }
    );

    req.on('error', (err) => resolve({ status: 500, body: err.message }));
    req.write(payload);
    req.end();
  });
}

async function main() {
  const keysDir = path.join(__dirname, 'keys');
  const keyFiles = [];
  
  if (fs.existsSync(keysDir)) {
    fs.readdirSync(keysDir).forEach(f => {
      if (f.endsWith('.json')) keyFiles.push(path.join(keysDir, f));
    });
  }
  if (fs.existsSync(path.join(__dirname, 'service_account.json'))) {
    keyFiles.push(path.join(__dirname, 'service_account.json'));
  }

  if (keyFiles.length === 0) {
    console.error('❌ No service account JSON key files found.');
    process.exit(1);
  }

  console.log(`🔑 Loaded ${keyFiles.length} Google Service Account Key(s).`);

  // Generate target URLs list
  const targetUrls = [
    `https://${DOMAIN}/`,
    `https://${DOMAIN}/about/`,
    `https://${DOMAIN}/services/`,
    `https://${DOMAIN}/areas-we-serve/`,
    `https://${DOMAIN}/articles/`,
    `https://${DOMAIN}/contact/`,
  ];

  const states = database.states || [];
  for (const st of states) {
    const slug = st.slug || (st.name || "").toLowerCase().replace(/\s+/g, "-");
    targetUrls.push(`https://${slug}.${DOMAIN}/`);
  }

  for (const st of states) {
    const stateSlug = st.slug || (st.name || "").toLowerCase().replace(/\s+/g, "-");
    for (const city of (st.cities || []).slice(0, 10)) {
      const citySlug = city.slug || (city.name || city[0] || "").toLowerCase().replace(/\s+/g, "-");
      const host = `${citySlug}-${stateSlug}.${DOMAIN}`;
      targetUrls.push(`https://${host}/`);
      targetUrls.push(`https://${host}/tree-removal/`);
    }
  }

  console.log(`🌐 Total Target URLs queued: ${targetUrls.length}`);

  let urlIndex = 0;

  for (const keyPath of keyFiles) {
    if (urlIndex >= targetUrls.length) break;
    const keyData = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    console.log(`\n🔐 Authenticating Key [${path.basename(keyPath)}] -> ${keyData.client_email}...`);

    try {
      const token = await getAccessToken(keyData);
      console.log('✅ Token acquired successfully! Submitting next 200 URLs...');

      let batchCount = 0;
      let successCount = 0;

      while (urlIndex < targetUrls.length && batchCount < 200) {
        const target = targetUrls[urlIndex];
        const res = await publishUrl(token, target);
        if (res.status === 200) {
          successCount++;
          console.log(`[Key: ${keyData.project_id}] [${urlIndex + 1}/${targetUrls.length}] ✅ ${target}`);
        } else {
          console.log(`[Key: ${keyData.project_id}] [${urlIndex + 1}/${targetUrls.length}] ⚠️ Status ${res.status}: ${target} -> ${res.body}`);
        }
        urlIndex++;
        batchCount++;
        await new Promise(r => setTimeout(r, 80));
      }

      console.log(`✨ Key ${keyData.project_id} Batch Done: ${successCount}/200 Success.`);
    } catch (e) {
      console.error(`❌ Authentication or Execution error for ${keyData.client_email}:`, e.message);
    }
  }

  console.log('\n====================================');
  console.log(`🎉 All Key Batches Completed! Total Submitted: ${urlIndex} URLs.`);
  console.log('====================================\n');
}

main().catch(err => console.error('❌ Script Fatal Error:', err));
