import { Badge } from "@/components/ui/badge";
import { CacheAge } from "@/components/ui/cache-age";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { SharedProductPayload } from "./shared-product";

export async function ProductStockFromPromise({
	productPromise,
}: {
	productPromise: Promise<SharedProductPayload>;
}) {
	const { stock, lastChecked, cacheCreatedAt } = await productPromise;

	return (
		<Card className="border-amber-200 dark:border-amber-800">
			<CardHeader>
				<div className="flex items-center justify-between gap-3">
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
						🧩 Promise compartida
					</Badge>
				</div>
				<CacheAge cachedAt={cacheCreatedAt} label="Tiempo en cache" />
			</CardHeader>
		</Card>
	);
}
