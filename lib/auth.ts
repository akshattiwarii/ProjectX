'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from './prisma'

export async function login(email: string) {
    // Find or create user for mock purposes
    let user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        // Determine role based on specific emails or default to DONOR
        // For demo: creator@demo.com -> CREATOR
        const role = email.includes('creator') ? 'CREATOR' : 'DONOR'
        user = await prisma.user.create({
            data: {
                email,
                name: email.split('@')[0],
                role,
            }
        })
    }

    // Set cookie with async standard
    (await cookies()).set('userId', user.id)
    redirect('/')
}

export async function logout() {
    (await cookies()).delete('userId')
    redirect('/login')
}

export async function getCurrentUser() {
    const userId = (await cookies()).get('userId')?.value
    if (!userId) return null

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })
        return user
    } catch (error) {
        return null
    }
}
