import { cacheLife, cacheTag } from "next/cache";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";

// ============================================
// COMPONENTE 2: PRECIO (Cacheado - 1 hora)
// ============================================
export async function ProductPrice({ productId }: { productId: string }) {
	"use cache";
	cacheTag(`product-price-${productId}`);
	cacheLife("hours"); // Cache medio: cambia ocasionalmente

	// Query SOLO para precio
	const { price } = await db.getProductPrice(productId);

	return (
		<Card className="border-blue-200 dark:border-blue-800">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardDescription>Precio</CardDescription>
						<CardTitle className="font-bold text-4xl">
							${price.toFixed(2)}
						</CardTitle>
					</div>
					<Badge
						variant="secondary"
						className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
					>
						⏱️ Cacheado 1 hora
					</Badge>
				</div>
			</CardHeader>
		</Card>
	);
}
