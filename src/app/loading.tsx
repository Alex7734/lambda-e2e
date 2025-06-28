export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
            <div className="text-center">
                <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mx-auto mb-4 animate-pulse"></div>

                    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                </div>

                <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Loading Lambda E2E</h2>
                <p className="text-gray-500">Preparing your secure environment...</p>

                <div className="w-64 h-2 bg-gray-200 rounded-full mt-6 mx-auto overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
} 