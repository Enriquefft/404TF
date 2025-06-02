"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";

export default function HomePage() {
	const t = useTranslations("Home");

	return (
		<main className="min-h-screen">
			{/* ──────── NAVIGATION ──────── */}
			<Navbar />

			{/* ──────── HERO SECTION ──────── */}
			<section className="flex flex-col-reverse items-center justify-between px-8 py-16 lg:flex-row lg:py-24">
				{/* Hero text */}
				<div className="mt-12 max-w-lg lg:mt-0">
					<h1 className="text-4xl font-bold leading-snug lg:text-5xl">
						{t("heroTitle")}
					</h1>
					<p className="mt-4 text-lg text-gray-200">{t("heroSubtitle")}</p>

					<div className="mt-8 flex flex-wrap gap-4">
						<Link href="/preincubation">
							<button
								type="button"
								className="rounded-lg border border-white px-6 py-3 text-sm font-medium transition-colors hover:bg-white hover:text-[#5E17EB]"
							>
								{t("hero.preIncubation")}
							</button>
						</Link>
						<Link href="/summit">
							<button
								type="button"
								className="rounded-lg bg-[#FF4DFF] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-600"
							>
								{t("hero.deeptechSummit")}
							</button>
						</Link>
					</div>
				</div>

				{/* Hero image */}
				<div className="relative h-80 w-80 lg:h-[28rem] lg:w-[28rem]">
					<Image
						src="/Mascot.png"
						alt="Tardigrade Scientist"
						fill
						className="object-contain"
					/>
				</div>
			</section>
		</main>
	);
}
