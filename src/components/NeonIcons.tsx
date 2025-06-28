import { useId } from "react";

const NeonFilter = ({ id }: { id: string }) => (
	<defs>
		<filter id={id} x="-50%" y="-50%" width="200%" height="200%">
			<feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
			<feMerge>
				<feMergeNode in="blur" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>
);

const InvestorIcon = ({ width = 64, height = 64, color = "#8C52FF" }) => {
	const filterId = useId();
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 64 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Investor Icon</title>
			<NeonFilter id={filterId} />
			{/* Circle */}
			<circle
				cx="32"
				cy="32"
				r="28"
				stroke={color}
				strokeWidth="4"
				fill="none"
				filter={`url(#${filterId})`}
			/>
			{/* Dollar Sign */}
			<path
				d="
        M 32 18
        C 28 18, 26 22, 26 26
        C 26 30, 30 32, 34 32
        C 38 32, 40 36, 40 40
        C 40 44, 36 46, 32 46
        C 28 46, 26 50, 26 54
      "
				stroke={color}
				strokeWidth="4"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				filter={`url(#${filterId})`}
			/>
			<line
				x1="26"
				y1="24"
				x2="40"
				y2="24"
				stroke={color}
				strokeWidth="4"
				strokeLinecap="round"
				filter={`url(#${filterId})`}
			/>
			<line
				x1="26"
				y1="40"
				x2="40"
				y2="40"
				stroke={color}
				strokeWidth="4"
				strokeLinecap="round"
				filter={`url(#${filterId})`}
			/>
		</svg>
	);
};

const CorporateIcon = ({ width = 64, height = 64, color = "#8C52FF" }) => {
	const filterId = useId();
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 64 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Corporate Icon</title>
			<NeonFilter id={filterId} />
			{/* Briefcase Body */}
			<rect
				x="12"
				y="20"
				width="40"
				height="28"
				rx="4"
				ry="4"
				stroke={color}
				strokeWidth="4"
				fill="none"
				filter={`url(#${filterId})`}
			/>
			{/* Briefcase Handle */}
			<path
				d="M 20 20 L 20 14 C 20 12 22 12 22 12 H 42 C 44 12 44 14 44 14 L 44 20"
				stroke={color}
				strokeWidth="4"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				filter={`url(#${filterId})`}
			/>
			{/* Briefcase Divider */}
			<line
				x1="12"
				y1="34"
				x2="52"
				y2="34"
				stroke={color}
				strokeWidth="4"
				strokeLinecap="round"
				filter={`url(#${filterId})`}
			/>
		</svg>
	);
};

const GovernmentIcon = ({ width = 64, height = 64, color = "#8C52FF" }) => {
	const filterId = useId();
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 64 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Government Icon</title>
			<NeonFilter id={filterId} />
			{/* Building Base */}
			<rect
				x="14"
				y="28"
				width="36"
				height="28"
				rx="2"
				ry="2"
				stroke={color}
				strokeWidth="4"
				fill="none"
				filter={`url(#${filterId})`}
			/>
			{/* Roof */}
			<path
				d="M 8 28 L 32 12 L 56 28"
				stroke={color}
				strokeWidth="4"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				filter={`url(#${filterId})`}
			/>
			{/* Columns */}
			<line
				x1="20"
				y1="28"
				x2="20"
				y2="48"
				stroke={color}
				strokeWidth="4"
				strokeLinecap="round"
				filter={`url(#${filterId})`}
			/>
			<line
				x1="28"
				y1="28"
				x2="28"
				y2="48"
				stroke={color}
				strokeWidth="4"
				strokeLinecap="round"
				filter={`url(#${filterId})`}
			/>
			<line
				x1="36"
				y1="28"
				x2="36"
				y2="48"
				stroke={color}
				strokeWidth="4"
				strokeLinecap="round"
				filter={`url(#${filterId})`}
			/>
			<line
				x1="44"
				y1="28"
				x2="44"
				y2="48"
				stroke={color}
				strokeWidth="4"
				strokeLinecap="round"
				filter={`url(#${filterId})`}
			/>
			{/* Door */}
			<rect
				x="28"
				y="38"
				width="8"
				height="18"
				stroke={color}
				strokeWidth="4"
				fill="none"
				rx="1"
				ry="1"
				filter={`url(#${filterId})`}
			/>
		</svg>
	);
};

const FounderIcon = ({ width = 64, height = 64, color = "#8C52FF" }) => {
	const filterId = useId();
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 64 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Founder Icon</title>
			<NeonFilter id={filterId} />
			{/* Bulb Outline */}
			<path
				d="
        M 32 12
        C 22 12, 16 20, 16 28
        C 16 34, 22 38, 22 42
        L 22 46
        C 22 48, 24 50, 26 50
        H 38
        C 40 50, 42 48, 42 46
        L 42 42
        C 42 38, 48 34, 48 28
        C 48 20, 42 12, 32 12
        Z
      "
				stroke={color}
				strokeWidth="4"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				filter={`url(#${filterId})`}
			/>
			{/* Filament / Star Shape */}
			<polygon
				points="32,20 34.5,26 41,26 35.5,30 37.5,36 32,32 26.5,36 28.5,30 23,26 29.5,26"
				fill={color}
				filter={`url(#${filterId})`}
			/>
			{/* Bulb Base Lines */}
			<line
				x1="26"
				y1="46"
				x2="26"
				y2="50"
				stroke={color}
				strokeWidth="4"
				strokeLinecap="round"
				filter={`url(#${filterId})`}
			/>
			<line
				x1="38"
				y1="46"
				x2="38"
				y2="50"
				stroke={color}
				strokeWidth="4"
				strokeLinecap="round"
				filter={`url(#${filterId})`}
			/>
		</svg>
	);
};

export { InvestorIcon, CorporateIcon, GovernmentIcon, FounderIcon };
