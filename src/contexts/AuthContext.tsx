"use client";

import { createContext, useContext, type ReactNode } from 'react';
import { useHybridAuth, type AuthUser } from '@/hooks/useHybridAuth';

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    signInWithGoogle: () => Promise<any>;
    signInWithDiscord: () => Promise<void>;
    signOut: () => Promise<void>;
    isAuthenticated: boolean;
    provider?: 'google' | 'discord';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const auth = useHybridAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 