import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import {
    encryptNumber,
    decryptNumber,
    addEncryptedNumbers,
    multiplyEncryptedByPlain,
    calculateEncryptedAverage
} from "@/lib/encryption";

export const encryptionRouter = createTRPCRouter({
    testAuth: protectedProcedure
        .query(async ({ ctx }) => {
            return {
                success: true,
                message: "Authentication successful",
                user: ctx.user,
                authType: ctx.firebaseUser ? "firebase" : "nextauth",
                userId: ctx.user?.id || ctx.user?.email,
            };
        }),

    encryptValue: protectedProcedure
        .input(z.object({ value: z.number() }))
        .mutation(async ({ input }) => {
            try {
                const encrypted = await encryptNumber(input.value);
                return {
                    success: true,
                    encryptedValue: encrypted,
                    message: `Successfully encrypted ${input.value}`
                };
            } catch (error) {
                throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }),

    decryptValue: protectedProcedure
        .input(z.object({ encryptedValue: z.string() }))
        .mutation(async ({ input }) => {
            try {
                const decrypted = await decryptNumber(input.encryptedValue);
                return {
                    success: true,
                    decryptedValue: decrypted,
                    message: `Successfully decrypted value: ${decrypted}`
                };
            } catch (error) {
                throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }),

    addEncrypted: protectedProcedure
        .input(z.object({
            encryptedA: z.string(),
            encryptedB: z.string()
        }))
        .mutation(async ({ input }) => {
            try {
                const result = await addEncryptedNumbers(input.encryptedA, input.encryptedB);
                return {
                    success: true,
                    encryptedSum: result,
                    message: "Successfully added encrypted values"
                };
            } catch (error) {
                throw new Error(`Addition failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }),

    multiplyEncrypted: protectedProcedure
        .input(z.object({
            encryptedValue: z.string(),
            multiplier: z.number()
        }))
        .mutation(async ({ input }) => {
            try {
                const result = await multiplyEncryptedByPlain(input.encryptedValue, input.multiplier);
                return {
                    success: true,
                    encryptedProduct: result,
                    message: `Successfully multiplied encrypted value by ${input.multiplier}`
                };
            } catch (error) {
                throw new Error(`Multiplication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }),

    calculateAverage: protectedProcedure
        .input(z.object({
            encryptedValues: z.array(z.string())
        }))
        .mutation(async ({ input }) => {
            try {
                const result = await calculateEncryptedAverage(input.encryptedValues);
                return {
                    success: true,
                    encryptedAverage: result,
                    message: `Successfully calculated average of ${input.encryptedValues.length} encrypted values`
                };
            } catch (error) {
                throw new Error(`Average calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }),

    secureVote: protectedProcedure
        .input(z.object({
            vote: z.number().min(0).max(1)
        }))
        .mutation(async ({ input }) => {
            try {
                const encryptedVote = await encryptNumber(input.vote);
                return {
                    success: true,
                    encryptedVote,
                    message: "Vote encrypted successfully"
                };
            } catch (error) {
                throw new Error(`Vote encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }),

    calculateVoteResults: protectedProcedure
        .input(z.object({
            encryptedVotes: z.array(z.string())
        }))
        .mutation(async ({ input }) => {
            try {
                if (input.encryptedVotes.length === 0) {
                    throw new Error("No votes provided");
                }

                let totalVotes = input.encryptedVotes[0]!;
                for (let i = 1; i < input.encryptedVotes.length; i++) {
                    totalVotes = await addEncryptedNumbers(totalVotes, input.encryptedVotes[i]!);
                }

                return {
                    success: true,
                    encryptedTotalVotes: totalVotes,
                    totalVoters: input.encryptedVotes.length,
                    message: `Vote counting completed for ${input.encryptedVotes.length} voters`
                };
            } catch (error) {
                throw new Error(`Vote counting failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }),

    calculateSalaryStats: protectedProcedure
        .input(z.object({
            encryptedSalaries: z.array(z.string())
        }))
        .mutation(async ({ input }) => {
            try {
                if (input.encryptedSalaries.length === 0) {
                    throw new Error("No salaries provided");
                }

                let totalSalary = input.encryptedSalaries[0]!;
                for (let i = 1; i < input.encryptedSalaries.length; i++) {
                    totalSalary = await addEncryptedNumbers(totalSalary, input.encryptedSalaries[i]!);
                }

                const averageSalary = await calculateEncryptedAverage(input.encryptedSalaries);

                return {
                    success: true,
                    encryptedTotalSalary: totalSalary,
                    encryptedAverageSalary: averageSalary,
                    employeeCount: input.encryptedSalaries.length,
                    message: `Salary statistics calculated for ${input.encryptedSalaries.length} employees`
                };
            } catch (error) {
                throw new Error(`Salary calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }),

    encryptArray: protectedProcedure
        .input(z.object({
            values: z.array(z.number())
        }))
        .mutation(async ({ input }) => {
            try {
                const encryptedValues = await Promise.all(
                    input.values.map(value => encryptNumber(value))
                );
                return {
                    success: true,
                    encryptedValues,
                    message: `Successfully encrypted ${input.values.length} values`
                };
            } catch (error) {
                throw new Error(`Array encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }),

    decryptArray: protectedProcedure
        .input(z.object({
            encryptedValues: z.array(z.string())
        }))
        .mutation(async ({ input }) => {
            try {
                const decryptedValues = await Promise.all(
                    input.encryptedValues.map(encryptedValue => decryptNumber(encryptedValue))
                );
                return {
                    success: true,
                    decryptedValues,
                    message: `Successfully decrypted ${input.encryptedValues.length} values`
                };
            } catch (error) {
                throw new Error(`Array decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }),

    encryptFFTData: protectedProcedure
        .input(z.object({
            fftData: z.array(z.number())
        }))
        .mutation(async ({ input }) => {
            try {
                const encryptedFFT = await Promise.all(
                    input.fftData.map(magnitude => {
                        const scaledValue = Math.round(magnitude * 1000);
                        return encryptNumber(scaledValue);
                    })
                );
                return {
                    success: true,
                    encryptedFFT,
                    message: `Successfully encrypted FFT data with ${input.fftData.length} frequency components`
                };
            } catch (error) {
                throw new Error(`FFT encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }),
}); 