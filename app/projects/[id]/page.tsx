import { prisma } from '@/lib/prisma'
import DonateButton from '@/components/DonateButton'
import { notFound } from 'next/navigation'

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    // Await params if accessing properties in Next 15+ (just to be safe although next 14 didn't require it, 15 does)
    // Assuming params is a promise in future ver, but currently in Next 14 it's props. 
    // Next 15 changes it. Assuming standard access for now, but will cast if needed or await if Promise.
    // Actually Next 15 params IS a promise.
    const { id } = await params;

    const project = await prisma.project.findUnique({
        where: { id },
        include: { creator: true }
    })

    if (!project) notFound()

    const progress = Math.min((project.raised / project.goal) * 100, 100)

    return (
        <div className="container py-20 px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-8 animate-fade-in-left">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-lg font-bold">
                                {project.creator?.name?.[0].toUpperCase() || 'A'}
                            </div>
                            <p className="text-lg text-gray-300">Created by <span className="text-white font-semibold">{project.creator?.name || 'Anonymous'}</span></p>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-2xl min-h-[300px]">
                        <h2 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">About Project</h2>
                        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6 animate-fade-in-right">
                    <div className="glass p-6 rounded-xl">
                        <div className="mb-2">
                            <span className="text-4xl font-bold text-[hsl(var(--primary))]">₹{project.raised.toLocaleString('en-IN')}</span>
                            <span className="text-gray-400 ml-2">raised of ₹{project.goal.toLocaleString('en-IN')}</span>
                        </div>

                        <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden mb-2">
                            <div
                                className="h-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <p className="text-right text-sm text-[hsl(var(--accent))] font-medium">{progress.toFixed(0)}% Funded</p>
                    </div>

                    <DonateButton projectId={project.id} />
                </div>
            </div>
        </div>
    )
}
