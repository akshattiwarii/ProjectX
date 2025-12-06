'use client'

import Link from 'next/link'

interface ProjectProps {
    id: string
    title: string
    description: string
    goal: number
    raised: number
    creator?: { name: string | null }
}

export default function ProjectCard({ project }: { project: ProjectProps }) {
    const progress = Math.min((project.raised / project.goal) * 100, 100)

    return (
        <div className="project-card">
            <div className="card-header flex justify-between items-center">
                <div>
                    <h3 className="card-title">{project.title}</h3>
                    {project.creator && (
                        <p style={{ fontSize: '0.85rem', color: '#888' }}>by {project.creator.name || 'Anonymous'}</p>
                    )}
                </div>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem' }}>
                    {project.raised >= project.goal ? 'FUNDED' : 'ACTIVE'}
                </div>
            </div>

            <div className="card-body">
                <p className="card-desc">
                    {project.description}
                </p>

                <div style={{ marginBottom: '1rem' }}>
                    <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        <span style={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}>₹{project.raised.toLocaleString('en-IN')}</span>
                        <span style={{ color: '#666' }}>of ₹{project.goal.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <Link href={`/projects/${project.id}`} className="btn" style={{ width: '100%', textAlign: 'center', background: 'rgba(255,255,255,0.05)', marginTop: 'auto' }}>
                    View Details
                </Link>
            </div>
        </div>
    )
}
