import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    const { t } = useLanguage();

    const isDesktop = navigator.userAgent.includes('TaLimNigoh-Desktop-App');

    // Prevent URL hover preview for desktop app
    const handleNav = (e, target) => {
        if (isDesktop) {
            e.preventDefault();
            navigate(target);
        }
    };

    const NavLink = ({ to, children, className }) => (
        <Link
            to={to}
            onClick={(e) => handleNav(e, to)}
            onDragStart={(e) => e.preventDefault()}
            className={className}
        >
            {children}
        </Link>
    );

    return (
        <div className="relative min-h-screen">
            <div className="neural-bg" />
            <div className="fixed inset-0 hologram-wave pointer-events-none z-[-1]" />
            <div className="parallax-stars" />

            <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-container-padding-desktop py-4 max-w-7xl mx-auto bg-surface/15 backdrop-blur-xl rounded-full mt-4 border border-white/10 shadow-[0_0_20px_rgba(0,242,255,0.15)] transition-all">
                <NavLink to="/" className="font-headline-lg text-headline-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-container to-tertiary">
                    Ta'limNigoh AI
                </NavLink>
                <nav className="hidden md:flex gap-6 items-center">
                    <NavLink to="/" className={`font-body-md text-body-md transition-colors duration-300 ${path === '/' ? 'text-secondary-container font-bold border-b-2 border-secondary-container pb-1' : 'text-on-surface-variant hover:text-secondary-fixed-dim'}`}>{t('dashboard')}</NavLink>
                    <NavLink to="/students" className={`transition-colors duration-300 font-body-md text-body-md ${path === '/students' ? 'text-secondary-container font-bold border-b-2 border-secondary-container pb-1' : 'text-on-surface-variant hover:text-secondary-fixed-dim'}`}>{t('students')}</NavLink>
                    <NavLink to="/analytics" className={`font-body-md text-body-md transition-colors duration-300 ${path === '/analytics' ? 'text-secondary-container font-bold border-b-2 border-secondary-container pb-1' : 'text-on-surface-variant hover:text-secondary-fixed-dim'}`}>{t('analytics')}</NavLink>
                    <NavLink to="/settings" className={`transition-colors duration-300 font-body-md text-body-md ${path === '/settings' ? 'text-secondary-container font-bold border-b-2 border-secondary-container pb-1' : 'text-on-surface-variant hover:text-secondary-fixed-dim'}`}>{t('settings')}</NavLink>
                </nav>
                <div className="flex gap-4 items-center invisible md:visible">
                    <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">notifications</span>
                </div>
            </header>

            <aside className="fixed left-0 top-0 h-[calc(100vh-32px)] w-64 z-40 hidden lg:flex flex-col bg-surface-container-low/20 backdrop-blur-2xl m-4 rounded-xl border-r border-white/5 shadow-2xl shadow-black/50 transition-all duration-300 ease-in-out">
                <div className="p-6">
                    <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">Ta'limNigoh</h2>
                    <p className="font-label-sm text-label-sm text-on-surface-variant/70">AI Tahlil Tizimi</p>
                </div>
                <nav className="flex-grow px-4 space-y-2">
                    <NavLink to="/" className={`flex items-center gap-3 p-3 rounded-lg transition-all ${path === '/' ? 'bg-secondary-container/10 text-secondary-container border-l-4 border-secondary-container rounded-r-lg' : 'text-on-surface-variant/70 hover:bg-white/5 hover:text-on-surface'}`}>
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="font-label-sm">{t('dashboard')}</span>
                    </NavLink>
                    <NavLink to="/students" className={`flex items-center gap-3 p-3 rounded-lg transition-all ${path === '/students' ? 'bg-secondary-container/10 text-secondary-container border-l-4 border-secondary-container rounded-r-lg' : 'text-on-surface-variant/70 hover:bg-white/5 hover:text-on-surface'}`}>
                        <span className="material-symbols-outlined">group</span>
                        <span className="font-label-sm">{t('students')}</span>
                    </NavLink>
                    <NavLink to="/analytics" className={`flex items-center gap-3 p-3 rounded-lg transition-all ${path === '/analytics' ? 'bg-secondary-container/10 text-secondary-container border-l-4 border-secondary-container rounded-r-lg' : 'text-on-surface-variant/70 hover:bg-white/5 hover:text-on-surface'}`}>
                        <span className="material-symbols-outlined">psychology</span>
                        <span className="font-label-sm">{t('analytics')}</span>
                    </NavLink>
                    <NavLink to="/reports" className={`flex items-center gap-3 p-3 rounded-lg transition-all ${path === '/reports' ? 'bg-secondary-container/10 text-secondary-container border-l-4 border-secondary-container rounded-r-lg' : 'text-on-surface-variant/70 hover:bg-white/5 hover:text-on-surface'}`}>
                        <span className="material-symbols-outlined">analytics</span>
                        <span className="font-label-sm">{t('reports')}</span>
                    </NavLink>
                </nav>
                <div className="p-6 border-t border-white/5">
                    <NavLink to="/analytics" className="w-full py-3 bg-secondary-container text-on-secondary rounded-lg font-bold font-label-sm flex items-center justify-center gap-2 glow-button transition-all">
                        <span className="material-symbols-outlined">add</span>
                        {t('newReport')}
                    </NavLink>
                </div>
            </aside>

            <motion.main
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="lg:ml-72 mt-28 p-container-padding-desktop min-h-screen pb-20"
            >
                <Outlet />
            </motion.main>
        </div>
    );
}
