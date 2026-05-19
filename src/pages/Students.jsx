import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { students } from '../data/students';

const riskColors = {
    yaxshi: { bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-400", dot: "bg-green-500" },
    "o'rta": { bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-400", dot: "bg-yellow-500" },
    xavfli: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400", dot: "bg-red-500" },
};

const riskLabels = { yaxshi: "Yaxshi", "o'rta": "O'rta", xavfli: "Xavfli" };

export default function Students() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    const isDesktop = navigator.userAgent.includes('TaLimNigoh-Desktop-App');

    const handleNav = (e, target, state = null) => {
        if (isDesktop) {
            e.preventDefault();
            navigate(target, { state });
        }
    };

    const filtered = students.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.group.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'all' || s.risk === filter;
        return matchSearch && matchFilter;
    });

    const stats = {
        total: students.length,
        yaxshi: students.filter(s => s.risk === 'yaxshi').length,
        orta: students.filter(s => s.risk === "o'rta").length,
        xavfli: students.filter(s => s.risk === 'xavfli').length,
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="font-headline-lg text-headline-lg text-on-surface">Talabalar Boshqaruvi</h1>
                    <p className="text-on-surface-variant font-body-md">Barcha talabalarning holati va faolligini real vaqtda kuzating</p>
                </div>
                <Link
                    to="/analytics"
                    onClick={(e) => handleNav(e, '/analytics')}
                    className="px-6 py-3 bg-secondary-container text-on-secondary rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,241,254,0.3)] transition-all"
                >
                    <span className="material-symbols-outlined">add</span>
                    Yangi Tahlil
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Jami Talabalar", value: stats.total, icon: "group", color: "text-primary" },
                    { label: "Yaxshi Holat", value: stats.yaxshi, icon: "check_circle", color: "text-green-400" },
                    { label: "O'rta Holat", value: stats.orta, icon: "warning", color: "text-yellow-400" },
                    { label: "Xavfli Holat", value: stats.xavfli, icon: "error", color: "text-red-400" },
                ].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="glass-panel p-5 rounded-2xl flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${s.color}`}>
                            <span className="material-symbols-outlined">{s.icon}</span>
                        </div>
                        <div>
                            <p className="font-headline-lg-mobile text-2xl font-bold">{s.value}</p>
                            <p className="font-label-sm text-on-surface-variant text-xs">{s.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-secondary-container transition-all text-on-surface"
                        placeholder="Talaba ismi yoki guruh raqami..."
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {['all', 'yaxshi', "o'rta", 'xavfli'].map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2 rounded-xl font-label-sm transition-all border ${filter === f ? 'bg-secondary-container/20 border-secondary-container text-secondary-container' : 'border-white/10 text-on-surface-variant hover:border-white/20'}`}>
                            {f === 'all' ? 'Barchasi' : riskLabels[f]}
                        </button>
                    ))}
                </div>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5 text-on-surface-variant font-label-sm text-xs uppercase tracking-widest bg-white/[0.02]">
                                <th className="text-left p-5">Talaba</th>
                                <th className="text-left p-5 hidden md:table-cell">Guruh</th>
                                <th className="text-left p-5 hidden lg:table-cell">Davomat</th>
                                <th className="text-left p-5 hidden lg:table-cell">Test</th>
                                <th className="text-left p-5 hidden xl:table-cell">Topshiriq</th>
                                <th className="text-left p-5">Holat</th>
                                <th className="text-left p-5">Amal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode="popLayout">
                                {filtered.map((s, i) => {
                                    const c = riskColors[s.risk];
                                    return (
                                        <motion.tr
                                            key={s.id}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ delay: (i % 10) * 0.04 }}
                                            className="border-b border-white/5 hover:bg-white/[0.03] transition-all"
                                        >
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary-container/40 to-tertiary/30 flex items-center justify-center font-bold text-sm text-secondary-container flex-shrink-0">
                                                        {s.avatar}
                                                    </div>
                                                    <span className="font-medium whitespace-nowrap">{s.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-5 hidden md:table-cell text-on-surface-variant">{s.group}</td>
                                            <td className="p-5 hidden lg:table-cell">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full ${s.attendance >= 80 ? 'bg-green-500' : s.attendance >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${s.attendance}%` }}></div>
                                                    </div>
                                                    <span className="text-sm">{s.attendance}%</span>
                                                </div>
                                            </td>
                                            <td className="p-5 hidden lg:table-cell text-sm">{s.test}/100</td>
                                            <td className="p-5 hidden xl:table-cell text-sm">{s.assignment}%</td>
                                            <td className="p-5">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${c.bg} ${c.border} ${c.text} flex items-center gap-1.5 w-fit whitespace-nowrap`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>
                                                    {riskLabels[s.risk]}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <Link
                                                    to="/analytics"
                                                    state={{ student: s }}
                                                    onClick={(e) => handleNav(e, '/analytics', { student: s })}
                                                    className="w-8 h-8 rounded-lg bg-secondary-container/10 border border-secondary-container/20 flex items-center justify-center text-secondary-container hover:bg-secondary-container/20 transition-all"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">psychology</span>
                                                </Link>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </AnimatePresence>
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-on-surface-variant">
                                        <span className="material-symbols-outlined text-[48px] block mb-2 opacity-30">search_off</span>
                                        Talaba topilmadi
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
