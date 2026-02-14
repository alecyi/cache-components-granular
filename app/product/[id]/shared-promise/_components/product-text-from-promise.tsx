import { Badge } from "@/components/ui/badge";
import { CacheAge } from "@/components/ui/cache-age";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { SharedProductPayload } from "./shared-product";

export async function ProductTextFromPromise({
	productPromise,
}: {
	productPromise: Promise<SharedProductPayload>;
}) {
	const { name, description, cacheCreatedAt } = await productPromise;

	return (
		<Card className="border-green-200 dark:border-green-800">
			<CardHeader>
				<div className="flex items-start justify-between gap-3">
					<CardTitle className="text-2xl">{name}</CardTitle>
					<Badge
						variant="secondary"
						className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
					>
						🧩 Promise compartida
					</Badge>
				</div>
				<CardDescription className="text-base">{description}</CardDescription>
				<CacheAge cachedAt={cacheCreatedAt} label="Tiempo en cache" />
			</CardHeader>
		</Card>
	);
}
