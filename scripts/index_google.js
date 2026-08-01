/**
 * Google Indexing API Batch Submitter for cantreeservice.com
 * 
 * Usage:
 * 1. Place your Google Cloud Service Account JSON key as 'service_account.json' in this folder.
 * 2. Run: node scripts/index_google.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const KEY_FILE = path.join(__dirname, 'service_account.json');

if (!fs.existsSync(KEY_FILE)) {
  console.log('⚠️  Service Account key missing! Please place service_account.json in the scripts/ directory to enable automated Google Indexing API submissions.');
  process.exit(0);
}

const key = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));

console.log('✅ Found Google Service Account Key for:', key.client_email);
console.log('🚀 Ready to submit URLs directly to Google Indexing Queue.');
