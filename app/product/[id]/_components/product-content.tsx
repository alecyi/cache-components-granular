// ============================================
// CONTENIDO DEL PRODUCTO - Accede a params

import { Suspense } from "react";
import { ProductPrice } from "./product-price";
import { ProductStock } from "./product-stock";
import { ProductText } from "./product-text";
import { RevalidateButtons } from "./revalidate-buttons";
import { StockSkeleton } from "./stock-skeleton";

// ============================================
export async function ProductContent({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<div className="space-y-6">
			{/* 
        TEXTO DEL PRODUCTO - Cacheado por 1 semana
        Se incluye en el static shell durante prerendering
      */}
			<ProductText productId={id} />

			{/* 
        PRECIO - Cacheado por 1 hora
        Se incluye en el static shell durante prerendering
      */}
			<ProductPrice productId={id} />

			{/* 
        STOCK - SIN CACHE, siempre fresh
        Requiere Suspense porque streams en request time
        El componente ProductStock ES la promesa
      */}
			<Suspense fallback={<StockSkeleton />}>
				<ProductStock productId={id} />
			</Suspense>

			{/* Botones para revalidar manualmente */}
			<RevalidateButtons productId={id} />
		</div>
	);
}
