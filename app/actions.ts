"use server";

import { revalidateTag } from "next/cache";

export async function revalidateProductPrice(productId: string) {
	console.log(`[Server Action] 💰 Revalidating price for product ${productId}`);
	revalidateTag(`product-price-${productId}`, "max");
	return { success: true, message: "Precio revalidado exitosamente" };
}

export async function revalidateProductText(productId: string) {
	console.log(`[Server Action] 📝 Revalidating text for product ${productId}`);
	revalidateTag(`product-text-${productId}`, "max");
	return { success: true, message: "Texto revalidado exitosamente" };
}

export async function revalidateProduct(productId: string) {
	console.log(
		`[Server Action] 🔄 Revalidating all fields for product ${productId}`,
	);
	revalidateTag(`product-price-${productId}`, "max");
	revalidateTag(`product-text-${productId}`, "max");
	return { success: true, message: "Producto completo revalidado" };
}
