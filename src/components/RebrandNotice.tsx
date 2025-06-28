import Image from "next/image";
import { useTranslations } from "next-intl";
import { Countdown } from "@/components/Countdown";
import { Link } from "@/i18n/navigation";

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
						<Link href="/bio-hack">
							<p className="text-2xl font-bold shadow-lg text-white rounded-lg p-4 bg-gradient-to-r from-biohack to-secondary hover:from-secondary hover:to-biohack transition-colors duration-300">
								{t("eventBanner")}
							</p>
						</Link>
						<Countdown eventTimeCST="2025-06-28T10:00:00" />
					</div>
				</div>
				<div className="space-y-4 max-w-3xl mx-auto items-center ">
					<h1 className="text-3xl font-bold md:text-5xl">{t("title")}</h1>
					<p className="text-lg">{t("message")}</p>
					<p className="font-semibold">{t("tagline")}</p>
					<p>{t("soon")}</p>
				</div>
			</div>
		</>
	);
}
