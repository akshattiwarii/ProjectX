const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Create verify users exists or create them
    const creator = await prisma.user.upsert({
        where: { email: 'creator@demo.com' },
        update: {},
        create: {
            email: 'creator@demo.com',
            name: 'Demo Creator',
            role: 'CREATOR',
            points: 500
        },
    })

    const donor = await prisma.user.upsert({
        where: { email: 'donor@demo.com' },
        update: {},
        create: {
            email: 'donor@demo.com',
            name: 'Demo Donor',
            role: 'DONOR',
            points: 1200
        },
    })

    console.log({ creator, donor })

    // Create some projects
    const projects = [
        {
            title: 'Open Source UI Library',
            description: 'A comprehensive library of accessible, reusable, and composable UI components for modern web applications. Built with performance and developer experience in mind.',
            goal: 5000,
            raised: 3200,
            creatorId: creator.id,
        },
        {
            title: 'EcoFriendly Tracker',
            description: 'Mobile application helping users track their carbon footprint and providing actionable tips to reduce environmental impact through daily habits.',
            goal: 10000,
            raised: 1500,
            creatorId: creator.id,
        },
        {
            title: 'DevTools Extension',
            description: 'Browser extension that simplifies debugging complex state management in React applications. Visualizes state changes in real-time.',
            goal: 2000,
            raised: 2100, // Fully funded
            creatorId: creator.id,
        },
        {
            title: 'Community Education Platform',
            description: 'Free coding courses for underrepresented groups in technology. Creating a pathway for the next generation of diverse engineers.',
            goal: 15000,
            raised: 4500,
            creatorId: creator.id,
        }
    ]

    for (const project of projects) {
        await prisma.project.create({
            data: project
        })
    }

    console.log('Seed data inserted successfully')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
