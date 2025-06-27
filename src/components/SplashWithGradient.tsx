import { useEffect, useRef, useState } from "react";

/**
 * CONFIGURATION
 *
 * DURATION_MS:
 *   Total time (ms) to animate from 0 → TOTAL_COUNT.
 *
 * HOLD_MS:
 *   Time (ms) to stay at TOTAL_COUNT before fading out.
 *
 * FADE_MS:
 *   Duration (ms) of the opacity transition when fading out.
 *
 * TOTAL_COUNT:
 *   Final number to reach (404).
 *
 * SLOW_END_EXPONENT:
 *   Controls how slowly the final counts (near TOTAL_COUNT) progress.
 */
const DURATION_MS = 1000;
const HOLD_MS = 1000;
const FADE_MS = 500;
const TOTAL_COUNT = 404;
const SLOW_END_EXPONENT = 3;

function easeInOutQuad(t: number): number {
	return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function getCount(t: number): number {
	const clamped = t < 0 ? 0 : t > 1 ? 1 : t;
	const x = easeInOutQuad(clamped);
	const y = 1 - (1 - x) ** SLOW_END_EXPONENT;
	return Math.floor(y * TOTAL_COUNT);
}

interface SplashProps {
	onFinish: () => void;
}

export default function SplashWithGradient({ onFinish }: SplashProps) {
	const [count, setCount] = useState(0);
	const [fade, setFade] = useState(false);
	const startRef = useRef<number | null>(null);
	const endedRef = useRef(false);

	useEffect(() => {
		let rafId: number;

		function step(ts: number) {
			if (startRef.current === null) {
				startRef.current = ts;
			}
			const elapsed = ts - startRef.current;
			const t = elapsed / DURATION_MS;
			setCount(getCount(t));

			if (t < 1) {
				rafId = requestAnimationFrame(step);
			} else if (!endedRef.current) {
				endedRef.current = true;
				setCount(TOTAL_COUNT);
				setTimeout(() => {
					setFade(true);
					setTimeout(onFinish, FADE_MS);
				}, HOLD_MS);
			}
		}

		rafId = requestAnimationFrame(step);
		return () => cancelAnimationFrame(rafId);
	}, [onFinish]);

	return (
		<div
			className={
				"fixed inset-0 flex items-center justify-center " +
				"bg-gradient-to-br from-gray-900 via-indigo-900 to-black " +
				"transition-opacity duration-500 " +
				(fade ? "opacity-0" : "opacity-100")
			}
			aria-hidden="true"
		>
			<div className="text-white text-6xl font-bold">{count}</div>
		</div>
	);
}
