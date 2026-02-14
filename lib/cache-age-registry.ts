const cacheCreatedAtRegistry = new Map<string, string>();

export function getCacheCreatedAt(cacheKey: string) {
	const current = cacheCreatedAtRegistry.get(cacheKey);
	if (current) return current;

	const createdAt = new Date().toISOString();
	cacheCreatedAtRegistry.set(cacheKey, createdAt);
	return createdAt;
}

export function invalidateCacheCreatedAt(...cacheKeys: string[]) {
	for (const cacheKey of cacheKeys) {
		cacheCreatedAtRegistry.delete(cacheKey);
	}
}
