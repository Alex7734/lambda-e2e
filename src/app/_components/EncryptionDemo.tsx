"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { useIsMobile } from "@/hooks/useIsMobile";
import { track } from '@vercel/analytics';

const VOTE_TYPES = [
    { id: 1, label: "Yes", color: "#10B981", value: 1, emoji: "✅" },
    { id: 2, label: "No", color: "#EF4444", value: 0, emoji: "❌" }
];

export function EncryptionDemo() {
    const [votes, setVotes] = useState<number[]>([]);
    const [encryptedVotes, setEncryptedVotes] = useState<string[]>([]);
    const [voteResults, setVoteResults] = useState<string>("");
    const [decryptedVoteCount, setDecryptedVoteCount] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [draggedVote, setDraggedVote] = useState<number | null>(null);

    const isMobile = useIsMobile();

    const voteMutation = api.encryption.secureVote.useMutation();
    const voteResultsMutation = api.encryption.calculateVoteResults.useMutation();
    const decryptMutation = api.encryption.decryptValue.useMutation();

    const handleVoteCast = async (voteValue: number) => {
        try {
            const result = await voteMutation.mutateAsync({ vote: voteValue });
            setVotes(prev => [...prev, voteValue]);
            setEncryptedVotes(prev => [...prev, result.encryptedVote]);
            setShowExplanation(true);
            setVoteResults("");
            setDecryptedVoteCount(null);
            track('vote_cast', { vote_value: voteValue });
        } catch (error) {
            console.error("Vote failed:", error);
        }
    };

    const handleCalculateResults = async () => {
        if (encryptedVotes.length === 0) return;

        try {
            const result = await voteResultsMutation.mutateAsync({ encryptedVotes });
            setVoteResults(result.encryptedTotalVotes || "");
            setDecryptedVoteCount(null);
            track('results_calculated');
        } catch (error) {
            console.error("Vote calculation failed:", error);
        }
    };

    const handleDecryptResults = async () => {
        if (!voteResults) return;

        try {
            const result = await decryptMutation.mutateAsync({ encryptedValue: voteResults });
            setDecryptedVoteCount(result.decryptedValue);
            track('results_decrypted');
        } catch (error) {
            console.error("Vote decryption failed:", error);
        }
    };

    const handleDragStart = (e: React.DragEvent, voteType: typeof VOTE_TYPES[0]) => {
        setDraggedVote(voteType.value);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', voteType.value.toString());
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedVote !== null) {
            handleVoteCast(draggedVote);
            setDraggedVote(null);
        }
    };

    const handleVoteClick = (voteType: typeof VOTE_TYPES[0]) => {
        handleVoteCast(voteType.value);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Homomorphic Voting System</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Drag and drop votes (or tap on mobile) to see homomorphic encryption in action. Each vote is encrypted individually,
                    but they can be combined mathematically without revealing individual choices.
                </p>

                {/* Voting Area */}
                <div className="space-y-8">
                    {/* Vote Ballots */}
                    <div className="flex justify-center">
                        <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-sm sm:max-w-md w-full">
                            {VOTE_TYPES.map((voteType) => (
                                <div
                                    key={voteType.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, voteType)}
                                    onClick={() => isMobile && handleVoteClick(voteType)}
                                    className={`
                                        relative p-6 sm:p-8 rounded-2xl shadow-xl cursor-pointer
                                        transition-all duration-200 hover:scale-105 hover:shadow-2xl
                                        active:scale-90 transform-gpu touch-manipulation
                                        ${draggedVote === voteType.value ? 'opacity-50 scale-95' : ''}
                                        ${voteType.value === 1
                                            ? 'bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 active:from-green-600 active:to-green-800'
                                            : 'bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 active:from-red-600 active:to-red-800'
                                        }
                                    `}
                                >
                                    <div className="text-center">
                                        <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 drop-shadow-lg">{voteType.emoji}</div>
                                        <div className="text-white font-bold text-lg sm:text-2xl mb-1 sm:mb-2 drop-shadow-md">{voteType.label}</div>
                                        <div className="text-white/90 text-sm sm:text-lg font-medium">Value: {voteType.value}</div>
                                    </div>
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {!isMobile && (
                        <div
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className={`
                            border-4 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300
                            ${draggedVote !== null
                                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 scale-105 shadow-lg'
                                    : 'border-gray-300 bg-gradient-to-r from-gray-50 to-blue-50 hover:border-gray-400'
                                }
                        `}
                        >
                            <div className="text-6xl sm:text-8xl mb-4 sm:mb-6 drop-shadow-lg">🗳️</div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2 sm:mb-3">
                                Drop Your Vote Here
                            </h3>
                            <p className="text-gray-600 text-base sm:text-lg">
                                Drag a vote ballot above and drop it here to cast your encrypted vote
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                                Or simply tap/click the vote cards above
                            </p>
                        </div>
                    )}

                    {/* Encrypted Votes Display */}
                    {encryptedVotes.length > 0 && (
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 sm:p-8">
                            <h3 className="text-lg sm:text-xl font-bold text-purple-900 mb-4 sm:mb-6 text-center">
                                🔒 Encrypted Votes ({encryptedVotes.length} total)
                            </h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                                {encryptedVotes.map((_, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-3 sm:p-4 rounded-xl text-center shadow-lg hover:scale-105 transition-transform duration-200"
                                    >
                                        <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🔒</div>
                                        <div className="text-xs sm:text-sm font-bold">
                                            Vote {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Results Area */}
                    {voteResults && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8">
                            <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-4 sm:mb-6 text-center">
                                🔐 Vote Results (Encrypted)
                            </h3>
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 sm:p-6 rounded-xl text-center shadow-lg">
                                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔐</div>
                                <div className="text-xs sm:text-sm font-mono break-all bg-white/10 p-2 sm:p-3 rounded-lg">
                                    {voteResults.substring(0, 100)}...
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Control Panel */}
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 sm:p-8">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">📊 Voting Controls</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-6 mb-6 sm:mb-8">
                            <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-md">
                                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🔒</div>
                                <div className="font-bold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Encrypted Votes</div>
                                <div className="text-2xl sm:text-3xl font-bold text-purple-600">{encryptedVotes.length}</div>
                            </div>
                            <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-md">
                                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎯</div>
                                <div className="font-bold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Total "Yes" Votes</div>
                                <div className="text-2xl sm:text-3xl font-bold text-green-600">
                                    {decryptedVoteCount !== null ? decryptedVoteCount : '?'}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleCalculateResults}
                                disabled={voteResultsMutation.isPending || encryptedVotes.length === 0}
                                className="flex-1 px-6 sm:px-8 py-4 sm:py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 touch-manipulation"
                            >
                                {voteResultsMutation.isPending ? "Calculating..." : "Calculate Results"}
                            </button>

                            <button
                                onClick={handleDecryptResults}
                                disabled={decryptMutation.isPending || !voteResults}
                                className="flex-1 px-6 sm:px-8 py-4 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 transition-all duration-200 font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 touch-manipulation"
                            >
                                {decryptMutation.isPending ? "Decrypting..." : "Decrypt Results"}
                            </button>
                        </div>
                    </div>

                    {/* Explanation Panel */}
                    {showExplanation && (
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 sm:p-8">
                            <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-4 sm:mb-6 text-center">🤔 What's Happening?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/50 rounded-xl">
                                        <div className="text-2xl sm:text-3xl">1️⃣</div>
                                        <div>
                                            <div className="font-bold text-blue-800 text-base sm:text-lg">Drag or Tap a vote</div>
                                            <div className="text-blue-700 text-sm sm:text-base">Select your voting preference</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/50 rounded-xl">
                                        <div className="text-2xl sm:text-3xl">2️⃣</div>
                                        <div>
                                            <div className="font-bold text-blue-800 text-base sm:text-lg">Drop to encrypt</div>
                                            <div className="text-blue-700 text-sm sm:text-base">Your vote gets encrypted instantly</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/50 rounded-xl">
                                        <div className="text-2xl sm:text-3xl">3️⃣</div>
                                        <div>
                                            <div className="font-bold text-blue-800 text-base sm:text-lg">Calculate results</div>
                                            <div className="text-blue-700 text-sm sm:text-base">Add encrypted votes together</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/50 rounded-xl">
                                        <div className="text-2xl sm:text-3xl">4️⃣</div>
                                        <div>
                                            <div className="font-bold text-blue-800 text-base sm:text-lg">Decrypt final result</div>
                                            <div className="text-blue-700 text-sm sm:text-base">Only authorized parties can decrypt</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/50 rounded-xl">
                                        <div className="text-2xl sm:text-3xl">🔒</div>
                                        <div>
                                            <div className="font-bold text-blue-800 text-base sm:text-lg">Privacy guaranteed</div>
                                            <div className="text-blue-700 text-sm sm:text-base">Individual votes remain secret</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/50 rounded-xl">
                                        <div className="text-2xl sm:text-3xl">✅</div>
                                        <div>
                                            <div className="font-bold text-blue-800 text-base sm:text-lg">Mathematically proven</div>
                                            <div className="text-blue-700 text-sm sm:text-base">Using homomorphic encryption</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-4">How It Works</h2>
                <div className="space-y-3 text-blue-800">
                    <p className="text-sm sm:text-base">
                        <strong>Homomorphic Encryption</strong> allows you to perform mathematical operations
                        on encrypted data without decrypting it first.
                    </p>

                    <div className="bg-white rounded-md p-4 space-y-3">
                        <h3 className="font-semibold text-blue-900">The Mathematics</h3>

                        <div className="space-y-2">
                            <p className="text-xs sm:text-sm">
                                <strong>Encryption:</strong> <InlineMath math="E(m) = g^m \cdot r^n \bmod n^2" />
                            </p>
                            <p className="text-xs sm:text-sm">
                                Where <InlineMath math="m" /> is the message, <InlineMath math="g" /> is a generator,
                                <InlineMath math="r" /> is random, and <InlineMath math="n" /> is the product of two primes.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-xs sm:text-sm">
                                <strong>Homomorphic Addition:</strong> <InlineMath math="E(m_1) \cdot E(m_2) = E(m_1 + m_2)" />
                            </p>
                            <p className="text-xs sm:text-sm">
                                Multiplying two encrypted values gives you the encryption of their sum!
                            </p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-xs sm:text-sm">
                                <strong>Example:</strong> If <InlineMath math="E(5)" /> and <InlineMath math="E(3)" /> are encrypted values, then:
                            </p>
                            <p className="text-xs sm:text-sm font-mono bg-gray-100 p-2 rounded">
                                <InlineMath math="E(5) \cdot E(3) = E(5 + 3) = E(8)" />
                            </p>
                            <p className="text-xs sm:text-sm">
                                When decrypted, you get 8, which is 5 + 3!
                            </p>
                        </div>
                    </div>

                    <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                        <li>Encrypt individual values (salaries, votes, scores)</li>
                        <li>Add encrypted values together</li>
                        <li>Multiply encrypted values by plain numbers</li>
                        <li>Calculate averages and statistics</li>
                        <li>All while keeping the original data completely private</li>
                    </ul>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                        <p className="text-xs sm:text-sm text-yellow-800">
                            <strong>Security:</strong> This uses the Paillier cryptosystem, which is semantically secure
                            and allows for homomorphic addition. The private key is needed only for decryption,
                            while anyone with the public key can encrypt and perform calculations.
                        </p>
                    </div>

                    <p className="text-xs sm:text-sm">
                        This is perfect for privacy-preserving analytics, secure voting systems,
                        and confidential financial calculations.
                    </p>
                </div>
            </div>
        </div>
    );
} 