// ============================================
// COMPONENTE 1: TEXTO (Cacheado - 1 semana)

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
export async function ProductText({ productId }: { productId: string }) {
	"use cache";
	cacheTag(`product-text-${productId}`);
	cacheLife("weeks"); // Cache largo: rara vez cambia

	// Query SOLO para texto
	const { name, description } = await db.getProductText(productId);

	return (
		<Card className="border-green-200 dark:border-green-800">
			<CardHeader>
				<div className="flex items-start justify-between">
					<CardTitle className="text-2xl">{name}</CardTitle>
					<Badge
						variant="secondary"
						className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
					>
						📦 Cacheado 1 semana
					</Badge>
				</div>
				<CardDescription className="text-base">{description}</CardDescription>
			</CardHeader>
		</Card>
	);
}
