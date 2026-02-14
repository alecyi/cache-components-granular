import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// ============================================
// SKELETON para el Stock mientras carga
// ============================================
export function StockSkeleton() {
	return (
		<Card className="border-amber-200 dark:border-amber-800">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex-1 space-y-2">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-9 w-40" />
						<Skeleton className="h-3 w-48" />
					</div>
					<Badge
						variant="secondary"
						className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
					>
						🔄 Sin cache (streaming)
					</Badge>
				</div>
			</CardHeader>
		</Card>
	);
}
