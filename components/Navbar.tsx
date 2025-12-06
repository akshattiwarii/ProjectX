import Link from 'next/link';
import { getCurrentUser, logout } from '../lib/auth';

export default async function Navbar() {
    const user = await getCurrentUser();

    return (
        <nav className="navbar glass">
            <div className="container navbar-container">
                <Link href="/" className="navbar-logo">
                    <span style={{ fontSize: '1.8rem' }}>🚀</span>
                    <span>ProjectX</span>
                </Link>

                <div className="navbar-actions">
                    <Link href="/projects" className="nav-link">
                        Explore
                    </Link>
                    <Link href="/leaderboard" className="nav-link">
                        Leaderboard
                    </Link>

                    {user ? (
                        <div className="navbar-actions">
                            <div className="flex flex-col items-end" style={{ marginRight: '0.5rem' }}>
                                <span className="user-points">{user.points} pts</span>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.name}</span>
                            </div>
                            <form action={logout}>
                                <button className="btn" style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)' }}>Sign Out</button>
                            </form>
                            {user.role === 'CREATOR' && (
                                <Link href="/dashboard" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>Dashboard</Link>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className="btn btn-primary">
                            Get Started
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
