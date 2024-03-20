import { PrismaClient } from "@prisma/client";

const options = {};

let client: PrismaClient;

// In development mode, use a global variable so that the value
// is preserved across module reloads caused by HMR (Hot Module Replacement).
if (import.meta.env.DEV) {
    if (!(globalThis as any)._prismaConnection) {
        (globalThis as any)._prismaConnection = new PrismaClient(options);
    }
    client = (globalThis as any)._prismaConnection;
} else {
    client = new PrismaClient(options);
}

export default client;