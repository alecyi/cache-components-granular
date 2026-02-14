"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface CacheAgeProps {
	cachedAt: string;
	className?: string;
	label?: string;
	refreshMs?: number;
}

function formatElapsedTime(elapsedMs: number) {
	if (elapsedMs < 1000) return `${elapsedMs}ms`;

	const seconds = Math.floor(elapsedMs / 1000);
	if (seconds < 60) return `${seconds}s`;

	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;

	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;
	return `${hours}h ${remainingMinutes}m`;
}

export function CacheAge({
	cachedAt,
	className,
	label = "Edad del cache",
	refreshMs = 1000,
}: CacheAgeProps) {
	const cachedAtMs = useMemo(() => Date.parse(cachedAt), [cachedAt]);
	const [now, setNow] = useState(() => Date.now());

	useEffect(() => {
		const timerId = window.setInterval(() => {
			setNow(Date.now());
		}, refreshMs);

		return () => window.clearInterval(timerId);
	}, [refreshMs]);

	if (Number.isNaN(cachedAtMs)) {
		return (
			<p className={cn("text-muted-foreground text-xs", className)}>
				{label}: N/D
			</p>
		);
	}

	const elapsedMs = Math.max(0, now - cachedAtMs);

	return (
		<p className={cn("text-muted-foreground text-xs", className)}>
			{label}: {formatElapsedTime(elapsedMs)}
		</p>
	);
}
