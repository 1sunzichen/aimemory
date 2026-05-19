/**
 * Encrypt the DeepSeek API key with AES-256-GCM + PBKDF2 salt.
 * 
 * Usage: node encrypt-key.js "sk-your-key-here"
 * Output: ENCRYPTED_KEY=... and SALT=... to put in wrangler.toml vars
 *
 * The password "patrick" is stored as a Cloudflare Worker Secret,
 * NOT in this file or anywhere in git.
 */

const crypto = require('crypto');

const key = process.argv[2];
if (!key) {
  console.error('Usage: node encrypt-key.js <deepseek-api-key>');
  process.exit(1);
}

// Derive a 256-bit key from password + random salt
const salt = crypto.randomBytes(16);
const password = 'patrick';
const derivedKey = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');

// Encrypt with AES-256-GCM
const iv = crypto.randomBytes(12);
const cipher = crypto.createCipheriv('aes-256-gcm', derivedKey, iv);
let encrypted = cipher.update(key, 'utf8', 'hex');
encrypted += cipher.final('hex');
const authTag = cipher.getAuthTag();

// Combine IV + auth tag + ciphertext
const payload = iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;

console.log('\n# Add these to wrangler.toml [vars]:');
console.log(`ENCRYPTED_KEY = "${payload}"`);
console.log(`KEY_SALT = "${salt.toString('hex')}"`);
console.log('\n# Run this once to set the password secret:');
console.log('npx wrangler secret put KEY_PASSWORD');
console.log('# Enter: patrick');
