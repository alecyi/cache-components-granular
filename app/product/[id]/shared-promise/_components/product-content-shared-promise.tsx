import Link from "next/link";
import { Suspense } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { parseProductId } from "@/lib/validators/product";
import { ProductPriceFromPromise } from "./product-price-from-promise";
import { ProductStockFromPromise } from "./product-stock-from-promise";
import { ProductTextFromPromise } from "./product-text-from-promise";
import {
	ProductPriceFromPromiseSkeleton,
	ProductStockFromPromiseSkeleton,
	ProductTextFromPromiseSkeleton,
} from "./promise-field-skeletons";
import { getSharedProduct } from "./shared-product";

export async function ProductContentSharedPromise({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const safeProductId = parseProductId(id);
	const productPromise = getSharedProduct(safeProductId);

	return (
		<div className="space-y-6">
			<Card className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
				<CardHeader>
					<CardTitle>
						Patron: 1 promesa compartida + 1 Suspense por campo
					</CardTitle>
					<CardDescription>
						Se crea una sola promesa con todos los datos del producto y se
						comparte a cada bloque para deconstruir el campo necesario.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2 text-sm">
					<p>
						<code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs dark:bg-slate-900">
							const productPromise = db.getProduct(id)
						</code>
					</p>
					<p>
						Cada componente hace <code>await productPromise</code> y usa solo su
						parte: <code>{"const { stock } = await productPromise"}</code>.
					</p>
					<p className="text-muted-foreground">
						Trade-off: al invalidar este enfoque, se recalcula el payload
						completo.
					</p>
					<Link
						href={`/product/${safeProductId}`}
						className="inline-flex font-medium text-blue-600 hover:text-blue-800"
					>
						Ver version granular por query (multi-query)
					</Link>
				</CardContent>
			</Card>

			<Suspense fallback={<ProductTextFromPromiseSkeleton />}>
				<ProductTextFromPromise productPromise={productPromise} />
			</Suspense>

			<Suspense fallback={<ProductPriceFromPromiseSkeleton />}>
				<ProductPriceFromPromise productPromise={productPromise} />
			</Suspense>

			<Suspense fallback={<ProductStockFromPromiseSkeleton />}>
				<ProductStockFromPromise productPromise={productPromise} />
			</Suspense>
		</div>
	);
}
