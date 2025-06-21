"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";

// Import your Neon icons
import {
	InvestorIcon,
	CorporateIcon,
	GovernmentIcon,
	FounderIcon,
} from "@/components/NeonIcons";
import { Button } from "@/components/ui/button";

export default function HomePage() {
	const t = useTranslations("Home");

	return (
		<main className="min-h-screen">
			{/* ──────────────────────────────────────────────────────────────── */}
			{/* NAVBAR */}
			{/* ──────────────────────────────────────────────────────────────── */}
			<Navbar />

			{/* ──────────────────────────────────────────────────────────────── */}
			{/* HERO SECTION */}
			{/* ──────────────────────────────────────────────────────────────── */}
			<section
				className="relative flex flex-col-reverse items-center justify-between px-6 py-20 lg:flex-row lg:py-32"
				style={{
					background: "linear-gradient(135deg, #5E17EB 0%, #8C52FF 100%)",
				}}
			>
				{/* Text Column */}
				<div className="z-10 mt-12 max-w-lg lg:mt-0">
					<h1 className="text-4xl font-bold leading-snug lg:text-5xl">
						{t("heroTitle")}
					</h1>
					<p className="mt-4 text-lg">{t("heroSubtitle")}</p>
				</div>

				{/* Mascot / Illustration Column */}
				<div className="relative h-80 w-80 lg:h-[28rem] lg:w-[28rem]">
					<Image
						src="/Mascot.png"
						alt="Tardigrade Scientist"
						fill
						className="object-contain"
					/>
				</div>

				{/* Scroll‐down indicator */}
				<div className="absolute bottom-6 flex w-full justify-center">
					<svg
						className="h-8 w-8 animate-bounce text-white"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<title>{t("hero.scrollDown")}</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</section>

			{/* ──────────────────────────────────────────────────────────────── */}
			{/* PROGRAM PREVIEWS */}
			{/* ──────────────────────────────────────────────────────────────── */}
			<section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
				<div className="grid gap-8 lg:grid-cols-2">
					{/* Pre-Incubation Card */}
					<Link
						href="/preincubation"
						className="group block rounded-xl border border-gray-700 bg-[#1F092F] p-8 transition hover:shadow-lg hover:border-[#5E17EB]"
					>
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-2xl font-semibold text-white">
									{t("preview.preIncubation.title")}
								</h3>
								<p className="mt-2 text-gray-300">
									{t("preview.preIncubation.subtitle")}
								</p>
							</div>
							<div className="ml-4">
								<Image
									src="/placeholder/icon-incubation.svg"
									alt="Incubation Icon"
									width={48}
									height={48}
									className="opacity-70 transition group-hover:opacity-100"
								/>
							</div>
						</div>
						<div className="mt-6">
							<span className="inline-block text-sm font-medium text-[#5E17EB] transition group-hover:text-[#8C52FF]">
								{t("preview.preIncubation.cta")} →
							</span>
						</div>
					</Link>

					{/* Deeptech Summit Card */}
					<a
						href="https://joinnus.com/deeptech-summit-2025"
						target="_blank"
						rel="noopener noreferrer"
						className="group block rounded-xl border border-gray-700 bg-[#1F092F] p-8 transition hover:shadow-lg hover:border-[#8C52FF]"
					>
						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-2xl font-semibold text-white">
									{t("preview.deeptechSummit.title")}
								</h3>
								<p className="mt-2 text-gray-300">
									{t("preview.deeptechSummit.subtitle")}
								</p>
							</div>
							<div className="ml-4">
								<Image
									src="/placeholder/icon-summit.svg"
									alt="Summit Icon"
									width={48}
									height={48}
									className="opacity-70 transition group-hover:opacity-100"
								/>
							</div>
						</div>
						<div className="mt-6">
							<span className="inline-block text-sm font-medium text-[#FF66C4] transition group-hover:text-[#FF4DFF]">
								{t("preview.deeptechSummit.cta")} →
							</span>
						</div>
					</a>
				</div>
			</section>

			{/* ──────────────────────────────────────────────────────────────── */}
			{/* ABOUT EXCERPT */}
			{/* ──────────────────────────────────────────────────────────────── */}
			<section className="bg-[#120322] py-16">
				<div className="mx-auto max-w-4xl px-6 text-center">
					<h2 className="text-3xl font-bold text-white">
						{t("about.heading")}
					</h2>
					<p className="mt-4 text-lg text-gray-300">{t("about.text")}</p>
					<Link href="/about">
						<Button className="mt-8 rounded-full bg-[#5E17EB] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#8C52FF]">
							{t("about.learnMore")}
						</Button>
					</Link>
				</div>
				<div className="text-center mx-auto mt-12 max-w-6xl text-4xl px-6">
					AQUI INFO DE LAS 3 HOUSES
				</div>
			</section>

			{/* ──────────────────────────────────────────────────────────────── */}
			{/* MULTIMEDIA SHOWCASE */}
			{/* ──────────────────────────────────────────────────────────────── */}
			<section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
				<h2 className="text-3xl font-bold text-white">
					{t("multimedia.heading")}
				</h2>
				<p className="mt-2 text-gray-300">{t("multimedia.subheading")}</p>

				{/* Carousel / Grid of placeholder images/videos */}
				<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{/* Placeholder Image 1 */}
					<div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-800">
						<Image
							src="/placeholder/event1.jpg"
							alt="Deeptech Meetup Photo"
							fill
							className="object-cover"
						/>
						<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
							<span className="text-sm font-medium text-white">
								Deeptech Meetup #01 (2025)
							</span>
						</div>
					</div>
					{/* Placeholder Image 2 */}
					<div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-800">
						<Image
							src="/placeholder/event2.jpg"
							alt="Summit Teaser"
							fill
							className="object-cover"
						/>
						<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
							<span className="text-sm font-medium text-white">
								Deeptech Summit Trailer
							</span>
						</div>
					</div>
					{/* Placeholder Video Embed */}
					<div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-900">
						<video
							poster="/placeholder/video-poster.jpg"
							controls
							className="h-full w-full object-cover"
						>
							<source src="/placeholder/teaser.mp4" type="video/mp4" />
							{t("multimedia.videoFallback")}
						</video>
					</div>
				</div>
			</section>

			{/* ──────────────────────────────────────────────────────────────── */}
			{/* INTERACTIVE PERSONA-DRIVEN FORM */}
			{/* ──────────────────────────────────────────────────────────────── */}
			<section className="bg-[#120322] py-16">
				<div className="mx-auto max-w-4xl px-6 text-center">
					<h2 className="text-3xl font-bold text-white">{t("form.heading")}</h2>
					<p className="mt-2 text-gray-300">{t("form.subheading")}</p>

					<div className="mt-8 flex flex-wrap justify-center gap-6">
						{/* Investor */}
						<Button className="flex flex-col items-center gap-2 rounded-lg border border-gray-700 bg-[#1F092F] p-6 transition hover:border-[#8C52FF]">
							<InvestorIcon width={64} height={64} color="#8C52FF" />
							<span className="text-sm">{t("investors")}</span>
						</Button>

						{/* Corporate Partner */}
						<Button className="flex flex-col items-center gap-2 rounded-lg border border-gray-700 bg-[#1F092F] p-6 transition hover:border-[#FFB400]">
							<CorporateIcon width={64} height={64} color="#FFB400" />
							<span className="text-sm">{t("corporatePartners")}</span>
						</Button>

						{/* Government / Agencies */}
						<Button className="flex flex-col items-center gap-2 rounded-lg border border-gray-700 bg-[#1F092F] p-6 transition hover:border-[#00BF63]">
							<GovernmentIcon width={64} height={64} color="#00BF63" />
							<span className="text-sm">{t("governmentAgencies")}</span>
						</Button>

						{/* Founder / Researcher */}
						<Button className="flex flex-col items-center gap-2 rounded-lg border border-gray-700 bg-[#1F092F] p-6 transition hover:border-[#FF66C4]">
							<FounderIcon width={64} height={64} color="#FF66C4" />
							<span className="text-sm">{t("foundersResearchers")}</span>
						</Button>

						{/* Media / Public */}
						{/* If you have a MediaIcon component, import and use it here.
                Otherwise, use a placeholder or another default icon. */}
						<Button className="flex flex-col items-center gap-2 rounded-lg border border-gray-700 bg-[#1F092F] p-6 transition hover:border-[#8C52FF]">
							{/* Example placeholder circle for now */}
							<svg
								width={64}
								height={64}
								viewBox="0 0 64 64"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="filter drop-shadow-lg"
							>
								<title>{t("mediaPublic")}</title>
								<circle
									cx="32"
									cy="32"
									r="28"
									stroke="#8C52FF"
									strokeWidth="4"
									fill="none"
								/>
								<polygon
									points="28,20 36,20 36,28 44,28 44,36 36,36 36,44 28,44 28,36 20,36 20,28 28,28"
									fill="#8C52FF"
								/>
							</svg>
							<span className="text-sm">{t("mediaPublic")}</span>
						</Button>
					</div>
				</div>
			</section>

			{/* ──────────────────────────────────────────────────────────────── */}
			{/* NEWSLETTER & WHATSAPP (FOOTER) */}
			{/* ──────────────────────────────────────────────────────────────── */}
			<footer className="bg-[#1A0527] py-12">
				<div className="mx-auto max-w-4xl px-6 text-center">
					<h2 className="text-2xl font-bold text-white">
						{t("newsletter.heading")}
					</h2>
					<p className="mt-2 text-gray-300">{t("newsletter.subheading")}</p>

					<div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
						<input
							type="email"
							placeholder={t("newsletter.placeholder")}
							className="w-full max-w-xs rounded-lg border border-gray-600 bg-[#0A0011] px-4 py-3 text-white placeholder-gray-500 focus:border-[#5E17EB] focus:outline-none"
						/>
						<Button className="rounded-lg bg-[#5E17EB] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#8C52FF]">
							{t("newsletter.subscribe")}
						</Button>
					</div>

					<div className="mt-8">
						<a
							href="https://chat.whatsapp.com/your-group-link"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block rounded-full bg-[#FFB400] px-6 py-3 text-sm font-medium text-black transition hover:bg-[#FFD860]"
						>
							{t("newsletter.whatsappCTA")}
						</a>
					</div>

					<p className="mt-12 text-xs text-gray-500">
						© {new Date().getFullYear()} 404 Tech Found. {t("footer.rights")}
					</p>
				</div>
			</footer>
		</main>
	);
}
