import "@/styles/globals.css";

export { metadata } from "@/metadata";

import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import ClientRoot from "@/components/ClientRoot";
import { PostHogProvider } from "@/components/PostHogProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { inter as fontSans } from "@/styles/fonts";

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

/**
 * @param layoutPros - The root layout component props
 * @param layoutPros.children - The layout children
 * @param layoutPros.params - The locale parameters
 * @returns The root layout component
 */
export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.className,
				)}
			>
				<NextIntlClientProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<PostHogProvider>
							<ClientRoot>{children}</ClientRoot>
						</PostHogProvider>
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
