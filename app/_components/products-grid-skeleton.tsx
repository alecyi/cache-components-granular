import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton mientras carga la lista de productos
export function ProductsGridSkeleton() {
	return (
		<div className="mb-8">
			<Skeleton className="mb-4 h-8 w-64" />
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{[1, 2, 3].map((i) => (
					<Card key={i}>
						<CardHeader>
							<Skeleton className="h-6 w-full" />
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
}
