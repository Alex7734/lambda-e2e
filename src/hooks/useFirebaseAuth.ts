"use client";

import { useState, useEffect } from 'react';
import {
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    type User
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export function useFirebaseAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

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
            window.location.href = '/api/auth/signin?provider=discord';
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
            await firebaseSignOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        signInWithGoogle,
        signInWithDiscord,
        signOut,
        isAuthenticated: !!user
    };
} 