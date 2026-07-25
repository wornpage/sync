import { describe, test, expect } from 'bun:test';
import { generateSyncCode, hashSyncCode, shareUrl } from '../src/index';

describe('generateSyncCode', () => {
	test('returns string of requested length', () => {
		expect(generateSyncCode(8).length).toBe(8);
		expect(generateSyncCode(24).length).toBe(24);
	});

	test('generates unique values', () => {
		const a = generateSyncCode(16);
		const b = generateSyncCode(16);
		expect(a).not.toBe(b);
	});
});

describe('hashSyncCode', () => {
	test('returns sync- prefixed string', async () => {
		const hash = await hashSyncCode('test-code');
		expect(hash).toStartWith('sync-');
	});

	test('deterministic for same input', async () => {
		const a = await hashSyncCode('hello');
		const b = await hashSyncCode('hello');
		expect(a).toBe(b);
	});
});

describe('shareUrl', () => {
	test('builds URL with sync param', () => {
		const url = shareUrl('abc123', 'https://demo.example.com');
		expect(url).toContain('sync=abc123');
	});
});
