import { HydrateClient } from "@/trpc/server";
import { DashboardGuard } from "@/app/_components/DashboardGuard";
import { DashboardHeader } from "@/app/dashboard/_components/DashboardHeader";
import { EncryptionDemo } from "@/app/_components/EncryptionDemo";

export default function Dashboard() {
    return (
        <HydrateClient>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <DashboardHeader />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
                    <DashboardGuard>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-xl font-semibold mb-6 text-gray-900 text-center">Interactive Encryption Demo</h2>
                            <EncryptionDemo />
                        </div>
                    </DashboardGuard>
                </main>
            </div>
        </HydrateClient>
    );
}


