# @wornpage/sync

Sync code generation, SHA-256 hashing, localStorage helpers, QR share URLs. Zero dependencies.

## Install

```bash
bun add @wornpage/sync
```

## API

| Export | Description |
|--------|-------------|
| `generateSyncCode()` | Returns a random 24-char sync code |
| `hashSyncCode(code)` | SHA-256 hash → deterministic client ID |
| `readStoredCode()` | Read from localStorage |
| `writeStoredCode(code)` | Write to localStorage |
| `clearStoredCode()` | Remove from localStorage |
| `shareUrl(code)` | Returns `https://{origin}/?sync=CODE` |

## Usage

```ts
import { generateSyncCode, hashSyncCode, shareUrl } from '@wornpage/sync';

const code = generateSyncCode();
const id = await hashSyncCode(code);
console.log(shareUrl(code)); // https://projectsdemo.org/?sync=abc...
```

## License

MIT
