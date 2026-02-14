import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StockSkeleton } from "./stock-skeleton";

// ============================================
// SKELETON para toda la página mientras carga params
// ============================================
export function ProductPageSkeleton() {
	return (
		<div className="space-y-6">
			{/* Text skeleton */}
			<Card className="border-green-200 dark:border-green-800">
				<CardHeader>
					<div className="flex items-start justify-between">
						<div className="flex-1 space-y-2">
							<Skeleton className="h-8 w-3/4" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-5/6" />
						</div>
						<Badge variant="secondary" className="bg-green-100 text-green-800">
							📦 Cacheado 1 semana
						</Badge>
					</div>
				</CardHeader>
			</Card>

			{/* Price skeleton */}
			<Card className="border-blue-200 dark:border-blue-800">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="space-y-2">
							<Skeleton className="h-4 w-16" />
							<Skeleton className="h-10 w-32" />
						</div>
						<Badge variant="secondary" className="bg-blue-100 text-blue-800">
							⏱️ Cacheado 1 hora
						</Badge>
					</div>
				</CardHeader>
			</Card>

			{/* Stock skeleton */}
			<StockSkeleton />

			{/* Buttons skeleton */}
			<Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950">
				<CardHeader>
					<Skeleton className="mb-2 h-6 w-48" />
					<Skeleton className="h-4 w-full" />
				</CardHeader>
				<CardContent>
					<div className="flex gap-3">
						<Skeleton className="h-10 w-32" />
						<Skeleton className="h-10 w-32" />
						<Skeleton className="h-10 w-32" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
