import { defineRouting } from "next-intl/routing";
import { z } from "zod";

export const locales = ["en", "es"] as const;
export const localesSchema = z.enum(locales);

export const routing = defineRouting({
	// Supported locales:
	defaultLocale: "en",
	// Default locale if none matched:
	locales,
});
