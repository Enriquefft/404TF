import { defineRouting } from "next-intl/routing";
import { z } from "zod";

export const locales = ["en", "es"] as const;
export const localesSchema = z.enum(locales);

export const routing = defineRouting({
	// Supported locales:
	locales,
	// Default locale if none matched:
	defaultLocale: "en",
});
