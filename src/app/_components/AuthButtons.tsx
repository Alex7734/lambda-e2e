"use client";

import { useAuth } from '@/contexts/AuthContext';
import { track } from '@vercel/analytics';

interface AuthButtonsProps {
    className?: string;
}

export function AuthButtons({ className = "" }: AuthButtonsProps) {
    const { user, loading, signInWithGoogle, signInWithDiscord, signOut, isAuthenticated, provider } = useAuth();

    const handleGoogleSignIn = async () => {
        try {
            track('auth_attempt', { provider: 'google' });
            await signInWithGoogle();
            track('auth_success', { provider: 'google' });
        } catch (error) {
            track('auth_error', { provider: 'google', error: error instanceof Error ? error.message : 'Unknown error' });
            console.error('Google sign in failed:', error);
        }
    };

    const handleDiscordSignIn = async () => {
        try {
            track('auth_attempt', { provider: 'discord' });
            await signInWithDiscord();
            track('auth_success', { provider: 'discord' });
        } catch (error) {
            track('auth_error', { provider: 'discord', error: error instanceof Error ? error.message : 'Unknown error' });
            console.error('Discord sign in failed:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            track('auth_signout', { provider: provider || 'unknown' });
            await signOut();
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    if (loading) {
        return (
            <button
                disabled
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 cursor-not-allowed ${className}`}
            >
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
            </button>
        );
    }

    if (isAuthenticated && user) {
        return (
            <div className={`flex items-center space-x-3 ${className}`}>
                <div className="flex items-center space-x-2">
                    {user.image && (
                        <img
                            src={user.image}
                            alt={user.name || 'User'}
                            className="h-8 w-8 rounded-full"
                        />
                    )}
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-700 font-medium">
                            {user.name || user.email}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">
                            {provider} user
                        </span>
                    </div>
                </div>
                <button
                    onClick={handleSignOut}
                    className="inline-flex cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                    Sign Out
                </button>
            </div>
        );
    }

    return (
        <div className={`flex items-center space-x-3 ${className}`}>
            <button
                onClick={handleGoogleSignIn}
                className="inline-flex cursor-pointer items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
            </button>

            <button
                onClick={handleDiscordSignIn}
                className="inline-flex cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#5865F2] hover:bg-[#4752C4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5865F2] transition-colors"
            >
                <svg className="w-5 h-4.5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                </svg>
                Discord
            </button>
        </div>
    );
} 