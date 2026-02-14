import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";

// ============================================
// COMPONENTE 3: STOCK (SIN cache - Siempre fresh)
// ============================================
export async function ProductStock({ productId }: { productId: string }) {
	// Sin 'use cache' - siempre se ejecuta en request time

	// Query SOLO para stock
	const { stock, lastChecked } = await db.getProductStock(productId);

	return (
		<Card className="border-amber-200 dark:border-amber-800">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<CardDescription>Stock disponible</CardDescription>
						<CardTitle
							className={`text-3xl ${stock < 10 ? "text-red-600" : ""}`}
						>
							{stock} unidades
						</CardTitle>
						<p className="text-muted-foreground text-xs">
							Verificado: {new Date(lastChecked).toLocaleTimeString("es-ES")}
						</p>
					</div>
					<Badge
						variant="secondary"
						className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
					>
						🔄 Sin cache (streaming)
					</Badge>
				</div>
			</CardHeader>
		</Card>
	);
}
