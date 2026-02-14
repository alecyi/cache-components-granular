"use server";

import { revalidateTag } from "next/cache";
import { invalidateCacheCreatedAt } from "@/lib/cache-age-registry";
import { parseProductId } from "@/lib/validators/product";

function validateProductId(productId: string) {
	return parseProductId(productId);
}

export async function revalidateProductPrice(productId: string) {
	const safeProductId = validateProductId(productId);
	const priceTag = `product-price-${safeProductId}`;
	const sharedTag = `product-shared-${safeProductId}`;
	console.log(
		`[Server Action] 💰 Revalidating price for product ${safeProductId}`,
	);
	revalidateTag(priceTag, "max");
	revalidateTag(sharedTag, "max");
	invalidateCacheCreatedAt(priceTag, sharedTag);
	return { success: true, message: "Precio revalidado exitosamente" };
}

export async function revalidateProductText(productId: string) {
	const safeProductId = validateProductId(productId);
	const textTag = `product-text-${safeProductId}`;
	const sharedTag = `product-shared-${safeProductId}`;
	console.log(
		`[Server Action] 📝 Revalidating text for product ${safeProductId}`,
	);
	revalidateTag(textTag, "max");
	revalidateTag(sharedTag, "max");
	invalidateCacheCreatedAt(textTag, sharedTag);
	return { success: true, message: "Texto revalidado exitosamente" };
}

export async function revalidateProduct(productId: string) {
	const safeProductId = validateProductId(productId);
	const priceTag = `product-price-${safeProductId}`;
	const textTag = `product-text-${safeProductId}`;
	const sharedTag = `product-shared-${safeProductId}`;
	console.log(
		`[Server Action] 🔄 Revalidating all fields for product ${safeProductId}`,
	);
	revalidateTag(priceTag, "max");
	revalidateTag(textTag, "max");
	revalidateTag(sharedTag, "max");
	invalidateCacheCreatedAt(priceTag, textTag, sharedTag);
	return { success: true, message: "Producto completo revalidado" };
}
