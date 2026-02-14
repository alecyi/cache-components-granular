import { Badge } from "@/components/ui/badge";
import { CacheAge } from "@/components/ui/cache-age";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { SharedProductPayload } from "./shared-product";

export async function ProductPriceFromPromise({
	productPromise,
}: {
	productPromise: Promise<SharedProductPayload>;
}) {
	const { price, cacheCreatedAt } = await productPromise;

	return (
		<Card className="border-blue-200 dark:border-blue-800">
			<CardHeader>
				<div className="flex items-center justify-between gap-3">
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
						🧩 Promise compartida
					</Badge>
				</div>
				<CacheAge cachedAt={cacheCreatedAt} label="Tiempo en cache" />
			</CardHeader>
		</Card>
	);
}
