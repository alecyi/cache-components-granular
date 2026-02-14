import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ProductsGrid } from "./_components/products-grid";
import { ProductsGridSkeleton } from "./_components/products-grid-skeleton";

export default function HomePage() {
	return (
		<div className="container mx-auto max-w-6xl px-4 py-8">
			{/* Header - estático */}
			<div className="mb-12 border-b pb-8 text-center">
				<h1 className="mb-2 font-bold text-4xl">🛍️ Demo Cache Components</h1>
				<p className="text-lg text-muted-foreground">
					Ejemplo de cacheo granular por campo en Next.js 16
				</p>
			</div>

			{/* Explanation - estático */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>¿Qué demuestra esta app?</CardTitle>
					<CardDescription>
						Cacheo independiente de campos dentro del mismo registro
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2">
						<li className="flex items-start gap-2">
							<Badge className="mt-0.5" variant="secondary">
								📝 Texto
							</Badge>
							<span>Cacheado por 1 semana (rara vez cambia)</span>
						</li>
						<li className="flex items-start gap-2">
							<Badge className="mt-0.5" variant="secondary">
								💰 Precio
							</Badge>
							<span>Cacheado por 1 hora (cambia ocasionalmente)</span>
						</li>
						<li className="flex items-start gap-2">
							<Badge className="mt-0.5" variant="secondary">
								📦 Stock
							</Badge>
							<span>Sin cache (siempre actualizado, streaming)</span>
						</li>
					</ul>
				</CardContent>
			</Card>

			{/* Products - con Suspense porque es async */}
			<Suspense fallback={<ProductsGridSkeleton />}>
				<ProductsGrid />
			</Suspense>

			{/* How it works - estático */}
			<Card className="mt-8 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
				<CardHeader>
					<CardTitle className="text-blue-900 dark:text-blue-100">
						💡 Cómo funciona
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2 text-sm">
					<p>
						Cada campo del producto es un{" "}
						<strong>componente async separado</strong> con su propia estrategia
						de cache.
					</p>
					<p>
						El stock se envuelve en{" "}
						<code className="rounded bg-blue-100 px-1.5 py-0.5 dark:bg-blue-900">
							&lt;Suspense&gt;
						</code>{" "}
						para streaming en request time.
					</p>
					<p className="text-muted-foreground">
						Abre la consola del servidor para ver qué queries se ejecutan y
						cuándo.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
