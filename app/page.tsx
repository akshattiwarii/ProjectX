import { prisma } from '@/lib/prisma'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'

export default async function Home() {
  const projects = await prisma.project.findMany({
    include: { creator: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="glass hero-badge animate-fade-in-up">
          WELCOME TO THE FUTURE OF FUNDING
        </div>

        <h1 className="hero-title animate-fade-in-up">
          Fueling the Next Generation of Open Source
        </h1>

        <p className="hero-subtitle animate-fade-in-up">
          Support developers, fund innovative projects, and earn reputation points.
          Join the community that gamifies generosity.
        </p>

        <div className="hero-actions animate-fade-in-up">
          <Link href="/projects/create" className="btn btn-premium-glow" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}>
            Start Funding
          </Link>
          <Link href="/leaderboard" className="btn btn-outline-glow" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}>
            View Leaderboard
          </Link>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container px-6" style={{ paddingBottom: '5rem' }}>
        <div className="section-header">
          <h2 className="section-title">Trending Projects</h2>
          <div className="flex gap-2">
            <button className="btn glass text-xs">Top Funded</button>
            <button className="btn glass text-xs">Newest</button>
          </div>
        </div>

        <div className="grid-3">
          {projects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
