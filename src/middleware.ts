import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
	matcher: [
		"/", // catch requests to the site root
		"/(en|es)/:path*", // and any paths starting with /en/ or /es/
	],
};
