import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Analytics() {
    const location = useLocation();
    const { lang, t, notify } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        group: '',
        attendance: '85',
        test: '78',
        assignment: '92',
        activity: 'O\'rta'
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location.state?.student) {
            const s = location.state.student;
            const newData = {
                name: s.name,
                group: s.group,
                attendance: String(s.attendance),
                test: String(s.test),
                assignment: String(s.assignment),
                activity: s.activity || 'O\'rta'
            };
            setFormData(newData);
            setTimeout(() => handleAutoSubmit(newData), 500);
        }
    }, [location.state]);

    const handleAutoSubmit = async (data) => {
        setLoading(true);
        setError(null);
        await performAnalysis(data);
    };

    const performAnalysis = async (data) => {
        const langMap = { uz: "o'zbek", ru: "русском", en: "english" };
        const targetLang = langMap[lang] || "o'zbek";
        const cleanPrompt = `Talaba: ${data.name}. Guruh: ${data.group}. Davomat: ${data.attendance}%, Test: ${data.test}%, Topshiriq: ${data.assignment}%, Aktivlik: ${data.activity}. Ushbu talabaning faolligini professional tarzda tahlil qil. Muammolarni aniqla va qisqa tavsiyalar yoz. JAVOBNI FAOQAT ${targetLang.toUpperCase()} TILIDA YOZ.`;

        try {
            const response = await fetch(`/api/analyze?message=${encodeURIComponent(cleanPrompt)}`);
            let aiText = '';

            if (response.ok) {
                const json = await response.json();
                if (json.status === 'success') aiText = json.data;
            } else {
                const target = `https://viscodev.x10.mx/GPT-5-NANO/api.php?message=${encodeURIComponent(cleanPrompt)}`;
                const fallbackResponse = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(target)}`);
                const fallbackJson = await fallbackResponse.json();
                if (fallbackJson.contents) aiText = fallbackJson.contents;
            }

            if (aiText) {
                let clean = aiText.replace(/[*_`#]/g, '').trim();
                setResult({
                    text: clean,
                    risk: parseInt(data.attendance) < 60 || parseInt(data.test) < 50 ? 'xavfli' : 'past',
                    score: Math.floor(Math.random() * 15) + (parseInt(data.test) * 0.4 + parseInt(data.attendance) * 0.4 + 20)
                });

                // NOTIFICATION
                notify(`Tahlil Yakunlandi!`, `${data.name} uchun AI tahlil natijalari tayyor.`);
            }
        } catch (e) {
            setError('Tahlil jarayonida xatolik yuz berdi.');
        }
        setLoading(false);
    };

    const downloadTxt = () => {
        if (!result) return;
        const blob = new Blob([`TALABA TAHLIL NATIJASI\n\nIsm: ${formData.name}\nGuruh: ${formData.group}\nBall: ${Math.round(result.score)}\nHolat: ${result.risk}\n\nAI Xulosasi:\n${result.text}`], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        // Logic for unique filenames
        let filename = `${formData.name}.txt`;
        const existing = JSON.parse(localStorage.getItem('downloads') || '{}');
        const count = (existing[formData.name] || 0) + 1;
        if (count > 1) filename = `${formData.name} (${count - 1}).txt`;

        existing[formData.name] = count;
        localStorage.setItem('downloads', JSON.stringify(existing));

        link.href = url;
        link.download = filename;
        link.click();
    };

    const InputWithHelp = ({ label, help, children }) => (
        <div className="space-y-1.5 relative group">
            <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">{label}</label>
                <div className="md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-[14px] text-secondary-container cursor-help" title={help}>info</span>
                </div>
            </div>
            {children}
            <p className="text-[10px] text-on-surface-variant/50 hidden md:block group-hover:text-secondary-container/70 transition-colors uppercase font-bold">{help}</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-gutter">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="font-headline-lg text-headline-lg">{t('aiPanelTitle')}</h1>
                    <p className="text-on-surface-variant font-body-md opacity-70">
                        {lang === 'uz' ? "Har bir talaba uchun individual yondashuv" : "Individual approach for every student"}
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-secondary-container/10 px-4 py-2 rounded-full border border-secondary-container/20">
                    <span className="w-2 h-2 bg-secondary-container rounded-full ai-pulse"></span>
                    <span className="font-label-sm text-secondary-container text-[10px] font-bold uppercase">PROSESSOR LIVE</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                <div className="lg:col-span-4 glass-panel p-6 rounded-3xl space-y-6 border border-white/5 shadow-xl">
                    <div className="flex items-center gap-3 text-secondary-container pb-4 border-b border-white/5">
                        <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center">
                            <span className="material-symbols-outlined">person_add</span>
                        </div>
                        <h3 className="font-bold text-lg">{t('inputData')}</h3>
                    </div>

                    <form className="space-y-5" onSubmit={e => { e.preventDefault(); setLoading(true); setResult(null); performAnalysis(formData); }}>
                        <InputWithHelp label={t('studentName')} help="To'liq ism-sharif (Lotin alifbosida)">
                            <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:border-secondary-container" type="text" placeholder="Azamat Karimov" />
                        </InputWithHelp>

                        <InputWithHelp label={t('group')} help="Akademik guruh raqami (masalan: IF-101)">
                            <input value={formData.group} onChange={e => setFormData({ ...formData, group: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:border-secondary-container" type="text" placeholder="IF-101" />
                        </InputWithHelp>

                        <div className="grid grid-cols-2 gap-4">
                            <InputWithHelp label={t('attendance')} help="0-100% oralig'ida">
                                <input value={formData.attendance} onChange={e => setFormData({ ...formData, attendance: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3" type="number" />
                            </InputWithHelp>
                            <InputWithHelp label={t('testScore')} help="Ball (0 dan 100 gacha)">
                                <input value={formData.test} onChange={e => setFormData({ ...formData, test: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3" type="number" />
                            </InputWithHelp>
                        </div>

                        <button disabled={loading} type="submit" className="w-full py-4 bg-secondary-container text-on-secondary font-bold rounded-2xl flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-secondary-container/20 hover:shadow-secondary-container/40 transition-all">
                            {loading ? <span className="material-symbols-outlined animate-spin">refresh</span> : <span className="material-symbols-outlined">rocket_launch</span>}
                            {loading ? t('analyzing') : t('analyzeNow')}
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-8 glass-panel p-8 rounded-3xl min-h-[550px] flex flex-col border-secondary-container/10 holographic-gradient relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {loading && (
                            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="m-auto flex flex-col items-center gap-6">
                                <div className="w-24 h-24 border-4 border-secondary-container/5 border-t-secondary-container rounded-full animate-spin"></div>
                                <p className="text-xl font-bold animate-pulse text-secondary-container">{t('analyzing')}</p>
                            </motion.div>
                        )}

                        {result && !loading && (
                            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col h-full">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-white/5 pb-8">
                                    <div className="flex items-center gap-8">
                                        <div className="relative w-28 h-28">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="56" cy="56" r="50" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="transparent" />
                                                <motion.circle initial={{ strokeDashoffset: 314 }} animate={{ strokeDashoffset: 314 - (314 * result.score) / 100 }} transition={{ duration: 2 }} cx="56" cy="56" r="50" stroke="#00f1fe" strokeWidth="8" fill="transparent" strokeDasharray="314" strokeLinecap="round" />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-3xl font-display-xl font-bold">{Math.round(result.score)}</span>
                                                <span className="text-[9px] font-bold opacity-40 uppercase">{t('aiScore')}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-display-xl font-bold mb-2">{formData.name}</h4>
                                            <div className={`px-5 py-2 rounded-full inline-flex items-center gap-2 border ${result.risk === 'past' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                                                <span className="text-xs font-bold uppercase tracking-widest leading-none">{result.risk === 'past' ? t('positiveTrend') : t('riskDetected')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={downloadTxt} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 flex items-center gap-2 transition-all group active:scale-95">
                                        <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">download_for_offline</span>
                                        <span className="font-bold text-sm">TXT Yuklab Olish</span>
                                    </button>
                                </div>

                                <div className="flex-1 space-y-6 overflow-y-auto custom-scrollbar pr-5">
                                    {result.text.split(/(?:\r?\n)+/).map((paragraph, i) => (
                                        <p key={i} className="text-lg leading-loose opacity-90 first-letter:text-2xl first-letter:font-bold first-letter:text-secondary-container">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {!result && !loading && (
                            <div className="m-auto text-center space-y-6 max-w-sm opacity-40">
                                <span className="material-symbols-outlined text-[100px] mb-4">psychology_alt</span>
                                <p className="text-xl font-bold">Ma'lumotlarni tahlil qilishga tayyor</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
