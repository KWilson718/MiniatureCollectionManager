// Function to generate a random byte array
async function getRandomBytes(length: number): Promise<Uint8Array> {
    return new Promise((resolve) => {
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        resolve(array);
    });
}

// Function to generate an ID similar to MongoDB's ObjectId
export async function generateID(): Promise<string> {
    // Timestamp (4 bytes)
    const timestamp = Math.floor(Date.now() / 1000);
    const timestampBytes = new Uint8Array(4);
    new DataView(timestampBytes.buffer).setUint32(0, timestamp, false);

    // Adds 8 randomized bytes
    const counterBytes = await getRandomBytes(8);

    // Combine all parts
    const objectIdBytes = new Uint8Array([...timestampBytes, ...counterBytes]);

    // Convert to hexadecimal string
    return Array.from(objectIdBytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
}
