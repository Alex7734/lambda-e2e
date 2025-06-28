import SEAL from 'node-seal';
import type { BatchEncoder } from 'node-seal/implementation/batch-encoder';
import type { Context } from 'node-seal/implementation/context';
import type { Decryptor } from 'node-seal/implementation/decryptor';
import type { Encryptor } from 'node-seal/implementation/encryptor';
import type { Evaluator } from 'node-seal/implementation/evaluator';
import type { KeyGenerator } from 'node-seal/implementation/key-generator';
import type { PlainText } from 'node-seal/implementation/plain-text';
import type { SEALLibrary } from 'node-seal/implementation/seal';

let seal: SEALLibrary | null = null;
let context: Context | null = null;
let encoder: BatchEncoder | null = null;
let encryptor: Encryptor | null = null;
let evaluator: Evaluator | null = null;
let decryptor: Decryptor | null = null;
let keyGenerator: KeyGenerator | null = null;

// Initialize SEAL library
export async function initializeSeal() {
    if (seal && context && encoder && encryptor && evaluator && decryptor) {
        return { seal, context, encoder, encryptor, evaluator, decryptor };
    }

    seal = await SEAL();

    // Create encryption parameters
    const schemeType = seal.SchemeType.bfv;
    const polyModulusDegree = 4096;
    const bitSizes = [36, 36, 37];
    const bitSize = 20;

    const encParms = seal.EncryptionParameters(schemeType);
    encParms.setPolyModulusDegree(polyModulusDegree);
    encParms.setCoeffModulus(seal.CoeffModulus.Create(polyModulusDegree, new Int32Array(bitSizes)));
    encParms.setPlainModulus(seal.PlainModulus.Batching(polyModulusDegree, bitSize));

    context = seal.Context(encParms, true);

    if (!context.parametersSet()) {
        throw new Error('Invalid encryption parameters');
    }

    // Create encoder, encryptor, evaluator, and decryptor
    encoder = seal.BatchEncoder(context);
    keyGenerator = seal.KeyGenerator(context);
    const publicKey = keyGenerator.createPublicKey();
    const secretKey = keyGenerator.secretKey();

    encryptor = seal.Encryptor(context, publicKey);
    evaluator = seal.Evaluator(context);
    decryptor = seal.Decryptor(context, secretKey);

    return { seal, context, encoder, encryptor, evaluator, decryptor };
}

// Encrypt a number
export async function encryptNumber(value: number): Promise<string> {
    const { encoder, encryptor } = await initializeSeal();

    if (!encoder || !encryptor) {
        throw new Error('Encoder or encryptor not initialized');
    }

    // Encode the number
    const plainText = encoder.encode(new BigUint64Array([BigInt(value)]));
    if (!plainText) {
        throw new Error('Failed to encode value');
    }

    // Encrypt the encoded value 
    const cipherText = encryptor.encrypt(plainText);
    if (!cipherText) {
        throw new Error('Failed to encrypt value');
    }

    // Convert to base64 string for storage/transmission
    return cipherText.save();
}

// Decrypt a number
export async function decryptNumber(encryptedValue: string): Promise<number> {
    const { encoder, decryptor } = await initializeSeal();

    if (!seal || !context || !decryptor || !encoder) {
        throw new Error('SEAL components not initialized');
    }

    // Load ciphertext from base64 string
    const cipherText = seal.CipherText();
    cipherText.load(context, encryptedValue);

    // Decrypt
    const plainText = decryptor.decrypt(cipherText);

    // Decode
    const decoded = encoder.decode(plainText as unknown as PlainText);
    if (!decoded) {
        throw new Error('Failed to decode value');
    }

    const decodedArray = decoded as unknown as BigUint64Array;
    if (decodedArray.length === 0) {
        throw new Error('Decoded array is empty');
    }

    return Number(decodedArray[0]);
}

// Add two encrypted numbers
export async function addEncryptedNumbers(
    encryptedA: string,
    encryptedB: string
): Promise<string> {
    const { evaluator } = await initializeSeal();

    if (!seal || !context || !evaluator) {
        throw new Error('SEAL components not initialized');
    }

    // Load ciphertexts
    const cipherA = seal.CipherText();
    const cipherB = seal.CipherText();
    cipherA.load(context, encryptedA);
    cipherB.load(context, encryptedB);

    // Add the encrypted values
    const result = seal.CipherText();
    evaluator.add(cipherA, cipherB, result);

    return result.save();
}

// Multiply encrypted number by a plain number
export async function multiplyEncryptedByPlain(
    encryptedValue: string,
    plainMultiplier: number
): Promise<string> {
    const { evaluator, encoder } = await initializeSeal();

    if (!seal || !context || !evaluator || !encoder) {
        throw new Error('SEAL components not initialized');
    }

    // Load ciphertext
    const cipherText = seal.CipherText();
    cipherText.load(context, encryptedValue);

    // Create plaintext multiplier
    const plainText = encoder.encode(new BigUint64Array([BigInt(plainMultiplier)]));
    if (!plainText) {
        throw new Error('Failed to encode multiplier');
    }

    // Multiply
    const result = seal.CipherText();
    evaluator.multiplyPlain(cipherText, plainText, result);

    return result.save();
}

// Example: Calculate encrypted average
export async function calculateEncryptedAverage(
    encryptedValues: string[]
): Promise<string> {
    const { evaluator, encoder } = await initializeSeal();

    if (!seal || !context || !evaluator || !encoder) {
        throw new Error('SEAL components not initialized');
    }

    if (encryptedValues.length === 0) {
        throw new Error('No values to average');
    }

    // Start with the first encrypted value
    let sum = seal.CipherText();
    sum.load(context, encryptedValues[0]!);

    // Add all other encrypted values
    for (let i = 1; i < encryptedValues.length; i++) {
        const cipherText = seal.CipherText();
        cipherText.load(context, encryptedValues[i]!);
        evaluator.add(sum, cipherText, sum);
    }

    // Calculate average by dividing by count
    const count = encryptedValues.length;
    const plainCount = encoder.encode(new BigUint64Array([BigInt(count)]));
    if (!plainCount) {
        throw new Error('Failed to encode count');
    }

    const result = seal.CipherText();
    evaluator.multiplyPlain(sum, plainCount, result);

    return result.save();
}

// Utility function to check if SEAL is initialized
export function isSealInitialized(): boolean {
    return seal !== null && context !== null && encoder !== null &&
        encryptor !== null && evaluator !== null && decryptor !== null;
} 