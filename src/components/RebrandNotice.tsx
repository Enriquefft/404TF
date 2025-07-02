import { Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { SVGProps } from "react";
import { Countdown } from "@/components/Countdown";
import { Button } from "@/components/ui/button";

function TiktokIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
			<title>TikTok</title>
			<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53 3.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
		</svg>
	);
}

export default function Page() {
	const t = useTranslations("Rebrand");
	return (
		<>
			{/*biohack to bg fade*/}
			<div className="min-h-screen items-center justify-center px-8 py-12 space-y-32 text-center ">
				<div className="bg-gradient-to-br from-biohack to-secondary text-center p-8 opacity-50 grid grid-cols-1 md:grid-cols-2 gap-8 rounded-lg shadow-lg">
					<Image
						src="/Mascot_bio.png"
						alt="Tardi the Mascot"
						width={320}
						height={320}
						className="mx-auto drop-shadow-xl"
						priority
					/>
					<div className="my-auto">
						<a href="https://lu.ma/iavg1gc5">
							<p className="text-2xl font-bold shadow-lg text-white rounded-lg p-4 bg-gradient-to-r from-biohack to-secondary hover:from-secondary hover:to-biohack transition-colors duration-300">
								{t("eventBanner")}
							</p>
						</a>
						<Countdown eventTimeCST="2025-06-28T10:00:00" />
					</div>
				</div>
				<div className="space-y-4 max-w-3xl mx-auto items-center ">
					<h1 className="text-3xl font-bold md:text-5xl">{t("title")}</h1>
					<p className="text-lg">{t("message")}</p>
					<p className="font-semibold">{t("tagline")}</p>
					<p>{t("soon")}</p>
					<div className="space-y-2">
						<p className="font-semibold">{t("followUs")}</p>
						<div className="flex justify-center gap-4">
							<Button asChild variant="ghost" size="icon">
								<a
									href="https://www.instagram.com/404techfound.latam/"
									aria-label="Instagram"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Instagram className="size-6" />
								</a>
							</Button>
							<Button asChild variant="ghost" size="icon">
								<a
									href="https://www.linkedin.com/company/404techfound/"
									aria-label="LinkedIn"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Linkedin className="size-6" />
								</a>
							</Button>
							<Button asChild variant="ghost" size="icon">
								<a
									href="https://www.tiktok.com/@404techfound.latam"
									aria-label="TikTok"
									target="_blank"
									rel="noopener noreferrer"
								>
									<TiktokIcon className="size-6" />
								</a>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
