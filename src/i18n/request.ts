import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale;

	const isValidLocale = hasLocale(routing.locales, requested);

	if (!isValidLocale) {
		notFound();
	}

	return {
		locale: requested,
		messages: (await import(`../../messages/${requested}.json`)).default,
	};
});
