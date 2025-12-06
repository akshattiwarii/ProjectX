import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'

export default async function DashboardPage() {
    const user = await getCurrentUser()

    if (!user || user.role !== 'CREATOR') {
        redirect('/login')
    }

    const projects = await prisma.project.findMany({
        where: { creatorId: user.id },
        orderBy: { createdAt: 'desc' }
    })

    const totalRaised = projects.reduce((acc: number, p: any) => acc + p.raised, 0)

    return (
        <div className="container py-20 px-6">
            <div className="section-header">
                <div>
                    <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'none', color: 'white', WebkitBackgroundClip: 'unset' }}>Creator Dashboard</h1>
                    <p style={{ color: '#888' }}>Manage your projects and track donations</p>
                </div>
                <Link href="/projects/create" className="btn btn-primary" style={{ boxShadow: '0 10px 30px -10px rgba(124, 58, 237, 0.5)' }}>
                    + New Project
                </Link>
            </div>

            <div className="grid-3" style={{ marginBottom: '3rem' }}>
                <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Total Raised</h3>
                    <p style={{ fontSize: '1.875rem', fontWeight: 700, color: 'hsl(var(--primary))' }}>₹{totalRaised.toLocaleString('en-IN')}</p>
                </div>
                <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Active Projects</h3>
                    <p style={{ fontSize: '1.875rem', fontWeight: 700 }}>{projects.length}</p>
                </div>
                <div className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Total Supporters</h3>
                    <p style={{ fontSize: '1.875rem', fontWeight: 700 }}>--</p>
                </div>
            </div>

            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Your Projects</h2>
            {projects.length > 0 ? (
                <div className="grid-3">
                    {projects.map((project: any) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 glass rounded-2xl border-dashed border-2 border-white/10">
                    <p className="text-gray-400 mb-4">You haven't launched any projects yet.</p>
                    <Link href="/projects/create" className="text-[hsl(var(--primary))] hover:underline">Launch your first project</Link>
                </div>
            )}
        </div>
    )
}
