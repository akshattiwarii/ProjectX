import { prisma } from '@/lib/prisma'

export default async function LeaderboardPage() {
    const users = await prisma.user.findMany({
        orderBy: { points: 'desc' },
        take: 50,
        where: { role: 'DONOR' }
    })

    return (
        <div className="container py-20 px-6 max-w-4xl">
            <div className="text-center mb-12 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    Hall of Fame
                </h1>
                <p className="text-gray-400 text-lg">Recognizing the most generous contributors in our community.</p>
            </div>

            <div className="glass overflow-hidden rounded-2xl animate-fade-in">
                <table className="w-full text-left">
                    <thead className="bg-white/5 uppercase text-xs font-semibold tracking-wider text-gray-400">
                        <tr>
                            <th className="p-6 text-center">Rank</th>
                            <th className="p-6 text-center">Donor</th>
                            <th className="p-6 text-center">Points</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map((user: any, index: number) => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-6 font-mono text-gray-500 text-center">#{index + 1}</td>
                                <td className="p-6 font-medium flex items-center justify-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">
                                        {user.name?.[0].toUpperCase()}
                                    </div>
                                    {user.name}
                                </td>
                                <td className="p-6 text-center font-bold text-[hsl(var(--primary))]">
                                    {user.points.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={3} className="p-12 text-center text-gray-500">
                                    No donors yet. Be the first!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
