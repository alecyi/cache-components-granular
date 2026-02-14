import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";

// Componente async separado para los productos
export async function ProductsGrid() {
	const products = await db.listProducts();

	return (
		<div className="mb-8">
			<h2 className="mb-4 font-semibold text-2xl">Productos disponibles:</h2>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{products.map((product) => (
					<Link key={product.id} href={`/product/${product.id}`}>
						<Card className="h-full cursor-pointer transition-all hover:scale-105 hover:shadow-lg">
							<CardHeader>
								<CardTitle className="flex items-center justify-between">
									{product.name}
									<span className="text-blue-500">→</span>
								</CardTitle>
							</CardHeader>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
