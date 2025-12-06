import { createProject } from '@/lib/actions'

export default function CreateProjectPage() {
    return (
        <div className="container py-20 animate-fade-in">
            <div className="max-w-2xl mx-auto glass p-8 rounded-2xl">
                <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    Launch New Project
                </h1>
                <form action={createProject} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 opacity-80">Project Title</label>
                        <input
                            name="title"
                            type="text"
                            required
                            placeholder="e.g. Super Cool Framework"
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[hsl(var(--primary))] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 opacity-80">Description</label>
                        <textarea
                            name="description"
                            required
                            rows={5}
                            placeholder="Tell us about your project..."
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[hsl(var(--primary))] transition-colors resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 opacity-80">Funding Goal (₹)</label>
                        <input
                            name="goal"
                            type="number"
                            min="1"
                            step="0.01"
                            required
                            placeholder="5000"
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-[hsl(var(--primary))] transition-colors"
                        />
                    </div>

                    <button type="submit" className="w-full btn btn-primary py-4 text-lg font-bold shadow-lg shadow-purple-500/20">
                        Launch Project 🚀
                    </button>
                </form>
            </div>
        </div>
    )
}
