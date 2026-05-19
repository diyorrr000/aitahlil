import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { students } from '../data/students';

// Aggregate real data for charts
const getGroupNatija = () => {
    const groups = [...new Set(students.map(s => s.group))];
    return groups.map(g => {
        const groupStudents = students.filter(s => s.group === g);
        const avgScore = (groupStudents.reduce((acc, s) => acc + (s.test + s.attendance + s.assignment) / 3, 0) / groupStudents.length).toFixed(1);
        return { group: g, ball: parseFloat(avgScore) };
    });
};

const getRadarData = () => {
    const total = students.length;
    const avgAttendance = (students.reduce((acc, s) => acc + s.attendance, 0) / total).toFixed(1);
    const avgTest = (students.reduce((acc, s) => acc + s.test, 0) / total).toFixed(1);
    const avgAssignment = (students.reduce((acc, s) => acc + s.assignment, 0) / total).toFixed(1);

    return [
        { subject: "Davomat", value: parseFloat(avgAttendance) },
        { subject: "Test", value: parseFloat(avgTest) },
        { subject: "Topshiriq", value: parseFloat(avgAssignment) },
        { subject: "Aktivlik", value: 82 }, // Static benchmark
        { subject: "Ballar", value: 88 }, // Static benchmark
    ];
};

const monthlyData = [
    { month: "Yan", davomat: 88, test: 76, topshiriq: 82 },
    { month: "Fev", davomat: 90, test: 79, topshiriq: 85 },
    { month: "Mar", davomat: 84, test: 81, topshiriq: 78 },
    { month: "Apr", davomat: 92, test: 74, topshiriq: 88 },
    { month: "May", davomat: 94, test: 88, topshiriq: 91 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="glass-panel rounded-xl p-3 border border-white/10 text-sm">
            <p className="font-bold text-secondary-container mb-1">{label}</p>
            {payload.map((p, i) => (
                <p key={i} style={{ color: p.color }}>{p.name}: {p.value}%</p>
            ))}
        </div>
    );
};

export default function Reports() {
    const totalStudents = students.length;
    const avgAttendance = (students.reduce((acc, s) => acc + s.attendance, 0) / totalStudents).toFixed(1);
    const avgTest = (students.reduce((acc, s) => acc + s.test, 0) / totalStudents).toFixed(1);
    const avgAssignment = (students.reduce((acc, s) => acc + s.assignment, 0) / totalStudents).toFixed(1);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="font-headline-lg text-headline-lg">Hisobotlar va Statistika</h1>
                    <p className="text-on-surface-variant font-body-md">Faollik ko'rsatkichlari va guruh tahlili</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 rounded-xl glass-panel border border-white/10 text-sm flex items-center gap-2 hover:border-white/20 transition-all">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Yuklab olish
                    </button>
                    <Link to="/analytics" className="px-5 py-2.5 rounded-xl bg-secondary-container text-on-secondary text-sm font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,241,254,0.3)] transition-all">
                        <span className="material-symbols-outlined text-[18px]">psychology</span>
                        AI Tahlil
                    </Link>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: "trending_up", label: "O'rtacha Davomat", value: `${avgAttendance}%`, change: "+3.2%", pos: true },
                    { icon: "quiz", label: "O'rtacha Test Ball", value: `${avgTest}/100`, change: "+5.1%", pos: true },
                    { icon: "assignment_turned_in", label: "Topshiriq Foizi", value: `${avgAssignment}%`, change: "-1.3%", pos: false },
                    { icon: "group", label: "Faol Talabalar", value: totalStudents.toLocaleString(), change: "+48", pos: true },
                ].map((k, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="glass-panel p-5 rounded-2xl">
                        <div className="flex justify-between items-start mb-4">
                            <span className="material-symbols-outlined text-secondary-container">{k.icon}</span>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${k.pos ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{k.change}</span>
                        </div>
                        <p className="font-headline-lg-mobile text-2xl font-bold mb-1">{k.value}</p>
                        <p className="font-label-sm text-on-surface-variant text-xs">{k.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Line Chart */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
                    <h3 className="font-headline-lg-mobile text-lg font-bold mb-1">Oylik Dinamika</h3>
                    <p className="font-label-sm text-on-surface-variant text-xs mb-6">Davomat, test va topshiriq natijalari</p>
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" tick={{ fill: '#909096', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#909096', fontSize: 12 }} axisLine={false} tickLine={false} domain={[60, 100]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line name="Davomat" dataKey="davomat" stroke="#00f1fe" strokeWidth={2.5} dot={{ fill: '#00f1fe', r: 4 }} />
                            <Line name="Test" dataKey="test" stroke="#adc6ff" strokeWidth={2.5} dot={{ fill: '#adc6ff', r: 4 }} />
                            <Line name="Topshiriq" dataKey="topshiriq" stroke="#c3c6d7" strokeWidth={2.5} dot={{ fill: '#c3c6d7', r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Radar Chart */}
                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="font-headline-lg-mobile text-lg font-bold mb-1">Umumiy Ko'rsatkich</h3>
                    <p className="font-label-sm text-on-surface-variant text-xs mb-4">Barcha mezonlar bo'yicha o'rtacha</p>
                    <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={getRadarData()}>
                            <PolarGrid stroke="rgba(255,255,255,0.06)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#909096', fontSize: 11 }} />
                            <Radar name="Ko'rsatkich" dataKey="value" stroke="#00f1fe" fill="#00f1fe" fillOpacity={0.1} strokeWidth={2} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bar Chart — Groups */}
            <div className="glass-panel p-6 rounded-2xl">
                <h3 className="font-headline-lg-mobile text-lg font-bold mb-1">Guruhlar Bo'yicha Natija</h3>
                <p className="font-label-sm text-on-surface-variant text-xs mb-6">Har bir guruhning o'rtacha umumiy ball</p>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={getGroupNatija()} barSize={40}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="group" tick={{ fill: '#909096', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#909096', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar name="Ball" dataKey="ball" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                        <defs>
                            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#00f1fe" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#adc6ff" stopOpacity={0.3} />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
