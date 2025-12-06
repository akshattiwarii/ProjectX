'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from './prisma'
import { getCurrentUser } from './auth'

export async function createProject(formData: FormData) {
    const user = await getCurrentUser()

    if (!user || user.role !== 'CREATOR') {
        throw new Error('Unauthorized')
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const goal = parseFloat(formData.get('goal') as string)

    if (!title || !description || isNaN(goal)) {
        throw new Error('Invalid input')
    }

    await prisma.project.create({
        data: {
            title,
            description,
            goal,
            creatorId: user.id
        }
    })

    revalidatePath('/')
    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function donateToProject(projectId: string, amount: number) {
    const user = await getCurrentUser()
    if (!user) throw new Error('Must be logged in to donate')

    // 1. Record Donation
    await prisma.donation.create({
        data: {
            amount,
            donorId: user.id,
            projectId,
        }
    })

    // 2. Update Project Raised Amount
    await prisma.project.update({
        where: { id: projectId },
        data: {
            raised: { increment: amount }
        }
    })

    // 3. Update User Points (1 INR = 100 Points)
    const pointsEarned = Math.floor(amount * 100)
    await prisma.user.update({
        where: { id: user.id },
        data: {
            points: { increment: pointsEarned }
        }
    })

    revalidatePath('/')
    revalidatePath(`/projects/${projectId}`)
    revalidatePath('/leaderboard')
}
