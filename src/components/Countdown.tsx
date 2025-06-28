"use client";

import { DateTime, Duration } from "luxon";
import { useEffect, useState } from "react";

interface CountdownProps {
	/**
	 * Event time in CST (ISO 8601 string without offset), e.g. "2025-06-28T10:00:00".
	 */
	eventTimeCST: string;
}

export function Countdown({ eventTimeCST }: CountdownProps) {
	const [duration, setDuration] = useState<Duration>(
		Duration.fromObject({ days: 0, hours: 0, minutes: 0, seconds: 0 }),
	);

	useEffect(() => {
		const target = DateTime.fromISO(eventTimeCST, {
			zone: "America/Chicago",
		}).toUTC();
		const update = () => {
			const now = DateTime.utc();
			const diff = target
				.diff(now, ["days", "hours", "minutes", "seconds"])
				.shiftTo("days", "hours", "minutes", "seconds");

			const durationSeconds = diff.toObject().seconds || 0;

			setDuration(
				durationSeconds < 0
					? Duration.fromObject({ days: 0, hours: 0, minutes: 0, seconds: 0 })
					: diff,
			);
		};

		update();
		const id = setInterval(update, 1000);
		return () => clearInterval(id);
	}, [eventTimeCST]);

	const { days, hours, minutes, seconds } = duration.toObject();

	if (
		days === undefined ||
		hours === undefined ||
		minutes === undefined ||
		seconds === undefined
	) {
		return <div className="text-2xl font-medium">Loading...</div>;
	}

	const locale =
		typeof navigator !== "undefined" ? navigator.language : "en-US";
	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "always" });

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<div className="text-2xl font-medium flex flex-col items-center space-y-2 shadow-lg p-4 rounded-lg bg-white">
				<p className="text-lg font-semibold">
					{rtf.format(Math.floor(hours), "hour")},{" "}
				</p>
				<p className="text-lg font-semibold">
					{rtf.format(Math.floor(minutes), "minutes")},{" "}
				</p>
				<p className="text-lg font-semibold">
					{rtf.format(Math.floor(seconds), "seconds")}
				</p>
			</div>
		</div>
	);
}
