"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthButtons } from "./AuthButtons";
import Image from "next/image";

interface MobileNavProps {
    currentPath: string;
}

export function MobileNav({ currentPath }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="md:hidden">
            <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                aria-label="Toggle navigation menu"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {isOpen ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50">
                    <div
                        className="fixed inset-0  bg-opacity-50"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between p-4 border-b">
                                <Link
                                    href="/"
                                    className="flex items-center space-x-2 text-lg font-bold text-gray-900"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span>Ready <span className="text-blue-600">to ship?</span></span>
                                </Link>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <nav className="flex-1 p-4 space-y-2">
                                <Link
                                    href="/"
                                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPath === "/"
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPath === "/dashboard"
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    FHE Demo
                                </Link>
                            </nav>

                            <div className="p-4 border-t">
                                <AuthButtons />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 