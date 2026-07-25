const STORAGE_KEY = 'wrn-sync-code-v1';
const SYNC_PREFIX = 'projects-web-demo-sync:';

export async function hashSyncCode(syncCode: string, prefix: string = SYNC_PREFIX): Promise<string> {
	if (!globalThis.crypto?.subtle) return '';
	const digest = await crypto.subtle.digest(
		'SHA-256',
		new TextEncoder().encode(`${prefix}${syncCode}`)
	);
	const bytes = new Uint8Array(digest);
	let binary = '';
	bytes.forEach((b) => { binary += String.fromCharCode(b); });
	const base64url = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
	return `sync-${base64url.slice(0, 64)}`;
}

export function generateSyncCode(length: number = 24): string {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	const array = new Uint8Array(length);
	crypto.getRandomValues(array);
	for (let i = 0; i < length; i++) {
		result += chars[array[i] % chars.length];
	}
	return result;
}

export function readStoredCode(key: string = STORAGE_KEY): string {
	try { return localStorage.getItem(key) || ''; } catch { return ''; }
}

export function writeStoredCode(code: string, key: string = STORAGE_KEY): void {
	try { localStorage.setItem(key, code); } catch {}
}

export function clearStoredCode(key: string = STORAGE_KEY): void {
	try { localStorage.removeItem(key); } catch {}
}

export function shareUrl(syncCode: string, base: string = window.location.origin): string {
	return `${base}?sync=${encodeURIComponent(syncCode)}`;
}
