import { PrismaClient } from '@prisma/client'

const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
})

const globalForPrisma = globalThis as unknown as {
    primsa: PrismaClient | undefined
}

export const prisma = globalForPrisma.primsa ?? client 

if (process.env.NODE_ENV !== 'production') globalForPrisma.primsa = client

