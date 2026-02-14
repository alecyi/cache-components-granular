"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
	revalidateProduct,
	revalidateProductPrice,
	revalidateProductText,
} from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function RevalidateButtons({ productId }: { productId: string }) {
	const [loading, setLoading] = useState<string | null>(null);
	const [status, setStatus] = useState<string>("");

	const handleRevalidate = async (action: "price" | "text" | "all") => {
		setLoading(action);
		setStatus("");

		try {
			let result: { success: boolean; message: string };
			if (action === "price") {
				result = await revalidateProductPrice(productId);
			} else if (action === "text") {
				result = await revalidateProductText(productId);
			} else {
				result = await revalidateProduct(productId);
			}

			setStatus(result.message);
			setTimeout(() => setStatus(""), 3000);
		} catch (error) {
			console.error(error);
			setStatus("Error al revalidar");
			setTimeout(() => setStatus(""), 3000);
		} finally {
			setLoading(null);
		}
	};

	return (
		<Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950">
			<CardHeader>
				<CardTitle>🔧 Controles de Cache</CardTitle>
				<CardDescription>
					Usa estos botones para forzar la revalidación de campos específicos.
					El stock siempre se actualiza automáticamente (sin cache).
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex flex-wrap gap-3">
					<Button
						onClick={() => handleRevalidate("text")}
						disabled={loading !== null}
						className="bg-green-600 hover:bg-green-700"
					>
						{loading === "text" && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						)}
						Revalidar Texto
					</Button>

					<Button
						onClick={() => handleRevalidate("price")}
						disabled={loading !== null}
						className="bg-blue-600 hover:bg-blue-700"
					>
						{loading === "price" && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						)}
						Revalidar Precio
					</Button>

					<Button
						onClick={() => handleRevalidate("all")}
						disabled={loading !== null}
						className="bg-purple-600 hover:bg-purple-700"
					>
						{loading === "all" && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						)}
						Revalidar Todo
					</Button>
				</div>

				{status && (
					<div className="rounded-lg bg-blue-100 p-3 text-center text-blue-900 text-sm dark:bg-blue-900 dark:text-blue-100">
						{status}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
