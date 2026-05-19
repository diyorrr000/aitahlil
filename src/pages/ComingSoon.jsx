import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ComingSoon({ title, icon }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto space-y-6">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-24 h-24 rounded-full bg-secondary-container/10 flex items-center justify-center mb-4 neon-border"
            >
                <span className="material-symbols-outlined text-[48px] text-secondary-container">{icon}</span>
            </motion.div>
            <h1 className="font-display-xl text-headline-lg">{title}</h1>
            <p className="font-body-lg text-on-surface-variant">Ushbu modul hozirda ishlab chiqilmoqda. Tez orada ushbu modullar orqali to'liq boshqaruv imkoniyatiga ega bo'lasiz.</p>

            <Link to="/" className="mt-8 px-8 py-3 rounded-full bg-surface-container-high border border-white/10 hover:border-white/20 transition-all font-bold flex items-center gap-2 group">
                <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                Asosiy sahifaga qaytish
            </Link>
        </div>
    );
}
