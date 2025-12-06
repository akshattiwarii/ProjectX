const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    try {
        const projects = await prisma.project.findMany()
        console.log('Successfully connected. Projects count:', projects.length)
    } catch (e) {
        console.error('Error connecting:', e)
        process.exit(1)
    }
}

main()
