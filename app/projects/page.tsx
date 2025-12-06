import { prisma } from '@/lib/prisma'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        include: { creator: true },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="container py-20 px-6">
            <div className="section-header">
                <div>
                    <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '0.5rem', background: 'none', color: 'white', WebkitBackgroundClip: 'unset', textAlign: 'left' }}>Explore Projects</h1>
                    <p style={{ color: '#888', maxWidth: '600px' }}>Discover innovative open source projects seeking your support. Fund the future of technology.</p>
                </div>
            </div>

            <div className="grid-3" style={{ marginTop: '3rem' }}>
                {projects.map((project: any) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {projects.length === 0 && (
                <div className="text-center py-20 glass rounded-2xl border-dashed border-2 border-white/10 mt-10">
                    <p className="text-gray-400 mb-4">No projects found.</p>
                    <Link href="/projects/create" className="text-[hsl(var(--primary))] hover:underline">Be the first to launch a project</Link>
                </div>
            )}
        </div>
    )
}
