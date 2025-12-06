'use client'

import { donateToProject } from '@/lib/actions'
import { useState } from 'react'

export default function DonateButton({ projectId }: { projectId: string }) {
    const [amount, setAmount] = useState(10)
    const [isLoading, setIsLoading] = useState(false)

    const handleDonate = async () => {
        setIsLoading(true)
        try {
            await donateToProject(projectId, amount)
            alert(`Successfully donated ₹${amount}! You earned ${amount * 100} points.`)
        } catch (error) {
            alert('Failed to donate. please login first.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="glass p-6 rounded-xl space-y-4">
            <h3 className="text-xl font-bold">Support this Project</h3>
            <p className="text-sm text-gray-400">100 points per ₹1 donated</p>

            <div className="grid grid-cols-4 gap-2 mb-4">
                {[5, 10, 25, 50].map((val) => (
                    <button
                        key={val}
                        onClick={() => setAmount(val)}
                        className={`py-2 rounded-lg text-sm font-medium transition-colors ${amount === val
                            ? 'bg-[hsl(var(--primary))] text-white'
                            : 'bg-white/5 hover:bg-white/10'
                            }`}
                    >
                        ₹{val}
                    </button>
                ))}
            </div>

            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-8 pr-4 focus:outline-none focus:border-[hsl(var(--primary))]"
                />
            </div>

            <button
                onClick={handleDonate}
                disabled={isLoading}
                className="w-full btn btn-primary py-3 text-lg font-bold shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Processing...' : `Donate ₹${amount}`}
            </button>

            <p className="text-xs text-center text-gray-500">
                You'll earn <span className="text-[hsl(var(--primary))] font-bold">{amount * 100}</span> points
            </p>
        </div>
    )
}
