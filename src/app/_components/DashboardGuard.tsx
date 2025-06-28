"use client";

import { useHybridAuth } from "@/hooks/useHybridAuth";
import Link from "next/link";
import { AuthButtons } from "./AuthButtons";

interface DashboardGuardProps {
    children: React.ReactNode;
}

export function DashboardGuard({ children }: DashboardGuardProps) {
    const { isAuthenticated, loading } = useHybridAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-sm sm:text-base text-gray-600">Loading research platform...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
                <div className="text-center max-w-sm sm:max-w-md px-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 sm:p-8">
                        <div className="text-4xl sm:text-6xl mb-4">🔬</div>
                        <h2 className="text-xl sm:text-2xl font-bold text-yellow-800 mb-4">
                            Research Platform Access Required
                        </h2>
                        <p className="text-sm sm:text-base text-yellow-700 mb-6">
                            Sign in to access our interactive research demos and explore advanced
                            cryptographic techniques and secure software testing methodologies.
                        </p>
                        <div className="space-y-3">
                            <Link
                                href="/"
                                className="block w-full bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
                            >
                                Back to Home
                            </Link>
                            <div className="flex justify-center">
                                <AuthButtons />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
} 