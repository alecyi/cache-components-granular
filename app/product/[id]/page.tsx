import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { ProductContent } from "./_components/product-content";
import { ProductPageSkeleton } from "./_components/product-page-skeleton";

// ============================================
// COMPONENTE PRINCIPAL - Solo estructura estática
// ============================================
export default function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return (
		<div className="container mx-auto max-w-4xl px-4 py-8">
			<Link
				href="/"
				className="mb-6 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800"
			>
				<ArrowLeft className="h-4 w-4" />
				Volver al inicio
			</Link>

			{/* Todo el contenido dinámico dentro de Suspense */}
			<Suspense fallback={<ProductPageSkeleton />}>
				<ProductContent params={params} />
			</Suspense>
		</div>
	);
}
