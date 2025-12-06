'use client'

import { login } from '@/lib/auth'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[hsl(var(--primary)/0.2)] rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[hsl(var(--accent)/0.2)] rounded-full blur-[100px]" />

            <div className="glass p-8 rounded-2xl w-full max-w-md relative z-10 animate-fade-in">
                <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
                <p className="text-center text-gray-400 mb-8">Choose a demo account to sign in</p>

                <div className="space-y-4">
                    <form action={() => login('creator@demo.com')} className="w-full">
                        <button className="btn btn-premium-glow w-full" style={{ padding: '1rem', fontSize: '1.1rem', justifyContent: 'center' }}>
                            Sign in as Creator
                        </button>
                        <p className="text-xs text-center mt-2 text-gray-500">Upload projects & receive donations</p>
                    </form>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>

                    <form action={() => login('donor@demo.com')} className="w-full">
                        <button className="btn btn-outline-glow w-full" style={{ padding: '1rem', fontSize: '1.1rem', justifyContent: 'center' }}>
                            Sign in as Donor
                        </button>
                        <p className="text-xs text-center mt-2 text-gray-500">Support devs & climb leaderboard</p>
                    </form>
                </div>
            </div>
        </div>
    )
}
