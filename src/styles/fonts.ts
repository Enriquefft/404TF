import { Inter, Orbitron, Fira_Code } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const orbitron = Orbitron({
	subsets: ["latin"],
	variable: "--font-mono",
	weight: ["400", "700"],
	display: "swap",
});

const firacode = Fira_Code({
	subsets: ["latin"],
	variable: "--font-mono",
	weight: ["400", "500", "600", "700"],
});

export { inter, orbitron, firacode };
