"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";

import { ModeToggle } from "./mode-toggle";
import { LocaleToggle } from "./locale-toggle";

export default function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const { resolvedTheme: theme } = useTheme();

	return (
		<nav className="bg-transparent fixed w-full z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex-shrink-0">
						<Link href="/en" className="flex items-center">
							{theme === "dark" ? (
								<Image
									src="/logos/404_logo_white.png"
									alt="404 Tech Found Logo"
									width={150}
									height={40}
									priority
								/>
							) : (
								<Image
									src="/logos/404_logo_black.png"
									alt="404 Tech Found Logo"
									width={150}
									height={40}
									priority
								/>
							)}
						</Link>
					</div>

					{/* Desktop Menu */}
					<div className="hidden md:flex space-x-8 items-center">
						<Link
							href="/program"
							className="text-white font-medium hover:text-purple-300"
						>
							Program
						</Link>
						<Link
							href="/summit"
							className="text-white font-medium hover:text-purple-300"
						>
							Summit
						</Link>
						<Link
							href="/blog"
							className="text-white font-medium hover:text-purple-300"
						>
							Blog
						</Link>
						<Link
							href="/contact"
							className="text-white font-medium hover:text-purple-300"
						>
							Contact
						</Link>
						<LocaleToggle />
						<ModeToggle />
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden flex items-center">
						<button
							type="button"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300"
						>
							<span className="sr-only">Open main menu</span>
							{mobileMenuOpen ? (
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className="md:hidden bg-gradient-to-r from-purple-800 to-purple-600">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						<Link
							href="/program"
							className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700"
						>
							Program
						</Link>
						<Link
							href="/summit"
							className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700"
						>
							Summit
						</Link>
						<Link
							href="/blog"
							className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700"
						>
							Blog
						</Link>
						<Link
							href="/contact"
							className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-700"
						>
							Contact
						</Link>
						<LocaleToggle />
					</div>
				</div>
			)}
		</nav>
	);
}
