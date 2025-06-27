import Image from "next/image";
import { useTranslations } from "next-intl";

export default function RebrandNotice() {
       const t = useTranslations("Rebrand");
       return (
               <div
                       className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary to-secondary px-8 py-12 text-center text-primary-foreground"
               >
                       <div className="grid max-w-3xl items-center gap-8 md:grid-cols-[auto,1fr]">
                               <Image
                                       src="/Mascot.png"
                                       alt="Tardi the Mascot"
                                       width={320}
                                       height={320}
                                       className="mx-auto w-40 md:w-64 drop-shadow-xl"
                                       priority
                               />
                               <div className="space-y-4">
                                       <h1 className="text-3xl font-bold md:text-5xl">{t("title")}</h1>
                                       <p className="text-lg">{t("message")}</p>
                                       <p className="font-semibold">{t("tagline")}</p>
                                       <p>{t("soon")}</p>
                               </div>
                       </div>
               </div>
       );
}
