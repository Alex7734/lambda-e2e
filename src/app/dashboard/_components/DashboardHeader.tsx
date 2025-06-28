"use client";

import Link from "next/link";
import Image from "next/image";
import { AuthButtons } from "@/app/_components/AuthButtons";
import { MobileNav } from "@/app/_components/MobileNav";
import { useIsMobile } from "@/hooks/useIsMobile";

export function DashboardHeader() {
    const isMobile = useIsMobile(768);

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 sm:py-6">
                    <div className="flex items-center space-x-4 sm:space-x-8">
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                                {isMobile ? (
                                    <span>FHE Demo</span>
                                ) : (
                                    <>
                                        <Image
                                            src="/logo.png"
                                            alt="Lambda E2E"
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 sm:w-8 sm:h-8"
                                        />
                                        <span>Lambda E2E</span>
                                    </>
                                )}
                            </Link>
                        </div>
                        <nav className="hidden md:flex space-x-6">
                            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Home
                            </Link>
                            <Link href="/dashboard" className="text-blue-600 font-medium">
                                FHE Demo
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <div className="hidden md:block">
                            <AuthButtons />
                        </div>
                        <MobileNav currentPath="/dashboard" />
                    </div>
                </div>
            </div>
        </header>
    );
} 