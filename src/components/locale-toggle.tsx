"use client";

import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";

export function LocaleToggle() {
	const locale = useLocale();

	const router = useRouter();
	const pathname = usePathname();
	const currentLocale = useLocale();

	const handleLocaleChange = (newLocale: string) => {
		if (newLocale !== currentLocale) {
			router.replace(pathname, {
				locale: newLocale,
			});
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<span className="rounded-full bg-gray-200 dark:bg-gray-800 p-1">
						{locale.toUpperCase()}
					</span>

					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{locales.map((loc) => (
					<DropdownMenuItem key={loc} onClick={() => handleLocaleChange(loc)}>
						{loc.toUpperCase()}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
