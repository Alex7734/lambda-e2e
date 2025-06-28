"use client";

import { useState, useEffect } from 'react';
import {
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    type User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useSession, signIn, signOut as nextAuthSignOut } from 'next-auth/react';

export type AuthUser = {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    provider: 'google' | 'discord';
};

export function useHybridAuth() {
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setFirebaseUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const isAuthenticated = !!firebaseUser || !!session?.user;
    const isLoading = loading || status === 'loading';

    const user: AuthUser | null = firebaseUser
        ? {
            id: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            image: firebaseUser.photoURL,
            provider: 'google' as const
        }
        : session?.user
            ? {
                id: session.user.id || session.user.email || '',
                name: session.user.name || null,
                email: session.user.email || null,
                image: session.user.image || null,
                provider: 'discord' as const
            }
            : null;

    const signInWithGoogle = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, googleProvider);
            return result.user;
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signInWithDiscord = async () => {
        try {
            setLoading(true);
            await signIn('discord');
        } catch (error) {
            console.error('Error signing in with Discord:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            setLoading(true);
            // Sign out from both providers
            if (firebaseUser) {
                await firebaseSignOut(auth);
            }
            if (session) {
                await nextAuthSignOut();
            }
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading: isLoading,
        signInWithGoogle,
        signInWithDiscord,
        signOut,
        isAuthenticated,
        provider: user?.provider
    };
} 