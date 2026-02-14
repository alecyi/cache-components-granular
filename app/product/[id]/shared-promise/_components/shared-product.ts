import { cacheLife, cacheTag } from "next/cache";
import { getCacheCreatedAt } from "@/lib/cache-age-registry";
import { db, type ProductPayload } from "@/lib/db";

export interface SharedProductPayload extends ProductPayload {
	cacheCreatedAt: string;
}

export async function getSharedProduct(
	productId: string,
): Promise<SharedProductPayload> {
	"use cache";
	const sharedCacheTag = `product-shared-${productId}`;
	cacheTag(sharedCacheTag);
	cacheLife("hours");

	const product = await db.getProduct(productId);

	return {
		...product,
		cacheCreatedAt: getCacheCreatedAt(sharedCacheTag),
	};
}
