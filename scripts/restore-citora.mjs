import { writeFileSync, existsSync } from 'fs';

const b64 = process.env.CITORA_MJS_B64;

if (!b64) {
  if (existsSync('./citora-sync.mjs')) {
    console.log('citora-sync.mjs already present locally, skipping restore.');
  } else {
    console.warn('Warning: CITORA_MJS_B64 not set and citora-sync.mjs missing. /llms.txt will not work.');
  }
} else {
  writeFileSync('./citora-sync.mjs', Buffer.from(b64, 'base64').toString('utf8'), 'utf8');
  console.log('citora-sync.mjs restored from CITORA_MJS_B64.');
}
