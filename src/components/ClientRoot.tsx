"use client";

import { useState } from "react";
import SplashWithGradient from "@/components/SplashWithGradient";

export default function ClientRoot({
	children,
}: {
	children: React.ReactNode;
}) {
	const [showSplash, setShowSplash] = useState(true);
	return (
		<>
			{showSplash && (
				<SplashWithGradient onFinish={() => setShowSplash(false)} />
			)}
			{!showSplash && <>{children}</>}
		</>
	);
}
