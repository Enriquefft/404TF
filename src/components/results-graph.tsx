"use client";

import { scaleLinear } from "d3-scale";
import { useMemo } from "react";
import { animated, useTransition } from "react-spring";

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

interface Result {
	id: number;
	content: string;
	votes: number;
	avgPos: number;
	score: number;
}

interface ChartBarHorizontalDynamicProps {
	results: Result[];
}

const chartConfig: ChartConfig = {
	avgPos: {
		color: "var(--chart-2)",
		label: "Average Position",
	},
	score: {
		color: "var(--chart-1)",
		label: "Composite Score",
	},
};

export function ResultBar({ results }: ChartBarHorizontalDynamicProps) {
	const data = useMemo(
		() =>
			results
				.sort((a, b) => b.score - a.score)
				.map((r, index) => ({
					avgPos: r.avgPos,
					id: r.id,
					index,
					name: r.content,
					score: r.score,
				})),
		[results],
	);

	const maxScore = useMemo(
		() => Math.max(...data.map((d) => d.score), 0),
		[data],
	);

	const viewBoxWidth = 600;
	const barHeight = 30;
	const gap = 10;
	const viewBoxHeight = data.length * (barHeight + gap);

	const xScale = useMemo(
		() => scaleLinear().domain([0, maxScore]).range([0, viewBoxWidth]),
		[maxScore],
	);

	const transitions = useTransition(data, {
		config: { friction: 30, tension: 200 },
		enter: (d) => ({
			opacity: 1,
			width: xScale(d.score),
			y: d.index * (barHeight + gap),
		}),
		from: { opacity: 0, width: 0, y: 0 },
		keys: (d) => d.id,
		leave: { opacity: 0, width: 0 },
		update: (d) => ({
			width: xScale(d.score),
			y: d.index * (barHeight + gap),
		}),
	});

	return (
		<ChartContainer config={chartConfig}>
			<svg
				width="100%"
				viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
				preserveAspectRatio="none"
			>
				<title>Questions by Composite Score</title>
				{transitions((style, d) => (
					<animated.g
						key={d.id}
						transform={style.y.to((y) => `translate(0,${y})`)}
					>
						{/* Score bar */}
						<animated.rect
							width={style.width}
							height={barHeight}
							fill="var(--chart-1)"
							rx={5}
						/>
						{/* Question text */}
						<animated.text
							x={style.width.to((w) => Math.max(5, w - 5))}
							y={barHeight / 2}
							dy=".35em"
							textAnchor="start"
							fill="white"
						>
							{d.name}
						</animated.text>
						{/* Composite score and avgPos label */}
						<animated.text
							x={style.width.to((w) => w + 5)}
							y={barHeight / 2}
							dy=".35em"
							textAnchor="start"
						>
							{d.score.toFixed(2)} (avg pos {d.avgPos.toFixed(1)})
						</animated.text>
					</animated.g>
				))}
			</svg>
		</ChartContainer>
	);
}
