import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { students } from '../data/students';
import { useLanguage } from '../context/LanguageContext';

export default function Dashboard() {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const totalStudents = students.length;
    const avgAttendance = (students.reduce((acc, s) => acc + s.attendance, 0) / totalStudents).toFixed(1);
    const aiAccuracy = 98.8;

    const isDesktop = navigator.userAgent.includes('TaLimNigoh-Desktop-App');

    const handleNav = (e, target) => {
        if (isDesktop) {
            e.preventDefault();
            navigate(target);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <section className="relative text-center mb-section-gap">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-secondary-container/10 blur-[100px] animate-pulse-slow"></div>
                <h1 className="font-display-xl text-display-xl mb-6 leading-tight">
                    {t('heroTitle').split(' ').slice(0, 3).join(' ')} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-container via-primary to-tertiary">
                        {t('heroTitle').split(' ').slice(3).join(' ')}
                    </span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
                    {t('heroDesc')}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/analytics"
                        onClick={(e) => handleNav(e, '/analytics')}
                        className="px-8 py-4 rounded-full bg-secondary-container text-on-secondary font-bold hover:shadow-[0_0_30px_rgba(0,241,254,0.4)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">psychology</span>
                        {t('startAnalysis')}
                    </Link>
                    <Link
                        to="/reports"
                        onClick={(e) => handleNav(e, '/reports')}
                        className="px-8 py-4 rounded-full glass-panel text-on-surface font-bold hover:bg-white/10 transition-all duration-300 border border-white/20 flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">analytics</span>
                        {t('viewAnalytics')}
                    </Link>
                </div>
            </section>

            {/* Bento Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-section-gap">
                <motion.div whileHover={{ y: -8 }} className="glass-panel p-6 rounded-3xl neon-border group overflow-hidden relative">
                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center mb-6 neon-glow-primary">
                                <span className="material-symbols-outlined text-secondary-container">group</span>
                            </div>
                            <h3 className="font-headline-lg-mobile text-headline-lg-mobile mb-2">{totalStudents.toLocaleString()}</h3>
                            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">{t('activeStudents')}</p>
                        </div>
                        <div className="mt-8 flex items-center gap-2 text-green-400">
                            <span className="material-symbols-outlined text-[16px]">trending_up</span>
                            <span className="font-label-sm text-label-sm">+12%</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div whileHover={{ y: -8 }} className="glass-panel p-6 rounded-3xl neon-border group overflow-hidden relative">
                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-tertiary/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(173,198,255,0.3)]">
                                <span className="material-symbols-outlined text-tertiary">calendar_today</span>
                            </div>
                            <h3 className="font-headline-lg-mobile text-headline-lg-mobile mb-2">{avgAttendance}%</h3>
                            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">{t('attendanceRate')}</p>
                        </div>
                        <div className="mt-8">
                            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${avgAttendance}%` }} transition={{ duration: 1 }} className="bg-tertiary h-full rounded-full"></motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div whileHover={{ y: -8 }} className="glass-panel p-6 rounded-3xl neon-border group overflow-hidden relative">
                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-secondary-fixed-dim/20 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-secondary-fixed-dim">auto_graph</span>
                            </div>
                            <h3 className="font-headline-lg-mobile text-headline-lg-mobile mb-2">{aiAccuracy}%</h3>
                            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">{t('aiAccuracy')}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div whileHover={{ y: -8 }} className="glass-panel p-6 rounded-3xl neon-border group overflow-hidden relative">
                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-primary">bolt</span>
                            </div>
                            <h3 className="font-headline-lg-mobile text-headline-lg-mobile mb-2">High</h3>
                            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">{t('weeklyActivity')}</p>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
