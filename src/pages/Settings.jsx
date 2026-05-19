import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Settings() {
    const { lang, setLang, theme, setTheme, notifications, setNotifications, aiAuto, setAiAuto, requestNotificationPermission, t } = useLanguage();
    const [saved, setSaved] = useState(false);
    const [showNoteInfo, setShowNoteInfo] = useState(false);

    const handleSave = () => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
        localStorage.setItem('aiAuto', JSON.stringify(aiAuto));
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const handleNotifyToggle = async (val) => {
        if (val) {
            setShowNoteInfo(true);
        } else {
            setNotifications(false);
        }
    };

    const confirmNotifications = async () => {
        const granted = await requestNotificationPermission();
        if (granted) {
            setNotifications(true);
        }
        setShowNoteInfo(false);
    };

    const Toggle = ({ value, onChange }) => (
        <button
            onClick={() => onChange(!value)}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${value ? 'bg-secondary-container' : 'bg-white/10'}`}
        >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${value ? 'left-7' : 'left-1'}`}></div>
        </button>
    );

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Explanation Modal for Notifications */}
            <AnimatePresence>
                {showNoteInfo && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-panel p-8 rounded-3xl max-w-sm text-center space-y-6 shadow-2xl border-secondary-container/30">
                            <div className="w-20 h-20 bg-secondary-container/10 rounded-full flex items-center justify-center mx-auto">
                                <span className="material-symbols-outlined text-4xl text-secondary-container animate-bounce">notifications_active</span>
                            </div>
                            <h2 className="text-xl font-bold">Bildirishnomalar nima uchun kerak?</h2>
                            <p className="text-sm text-on-surface-variant leading-relaxed">
                                Tahlil jarayoni vaqt talab qilishi mumkin. Agar siz saytdan chiqib ketsangiz yoki boshqa oynaga o'tsangiz,
                                AI tahlilni yakunlaganda sizga darhol xabar yuboramiz. Shunda natijani o'tkazib yubormaysiz.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setShowNoteInfo(false)} className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all">Bekor qilish</button>
                                <button onClick={confirmNotifications} className="flex-1 py-3 rounded-xl bg-secondary-container text-on-secondary font-bold shadow-lg shadow-secondary-container/20">Ruxsat berish</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="flex flex-col gap-2">
                <h1 className="font-headline-lg text-headline-lg">{t('settings')}</h1>
                <p className="text-on-surface-variant font-body-md opacity-70">
                    {lang === 'uz' ? 'Tizim parametrlarini shaxsiylashtiring' : lang === 'ru' ? 'Персонализируйте параметры системы' : 'Personalize system parameters'}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {[
                    {
                        title: t('settingsInterface'),
                        icon: "palette",
                        items: [
                            {
                                label: t('language'),
                                desc: lang === 'uz' ? 'Interfeys tilini tanlang' : 'Choose interface language',
                                control: (
                                    <select value={lang} onChange={e => setLang(e.target.value)}
                                        className="bg-surface-container-high border border-white/10 text-on-surface px-4 py-2 rounded-xl focus:outline-none focus:border-secondary-container text-sm cursor-pointer hover:bg-white/5">
                                        <option value="uz">O'zbekcha</option>
                                        <option value="ru">Русский</option>
                                        <option value="en">English</option>
                                    </select>
                                )
                            },
                            {
                                label: t('theme'),
                                desc: lang === 'uz' ? 'Vizual rejimni tanlang' : 'Choose visual mode',
                                control: (
                                    <div className="flex gap-2">
                                        {["dark", "light"].map(mode => (
                                            <button key={mode} onClick={() => setTheme(mode)}
                                                className={`px-4 py-2 rounded-xl text-xs md:text-sm border transition-all ${theme === mode ? 'bg-secondary-container/20 border-secondary-container text-secondary-container font-bold' : 'border-white/10 text-on-surface-variant hover:border-white/20'}`}>
                                                {mode === 'dark' ? `🌙` : `☀️`} {t(mode)}
                                            </button>
                                        ))}
                                    </div>
                                )
                            },
                        ]
                    },
                    {
                        title: t('notifications'),
                        icon: "notifications",
                        items: [
                            {
                                label: t('pushNotifications'),
                                desc: lang === 'uz' ? 'AI natijalari haqida muhim bildirishnomalar' : 'Get notified about AI results',
                                control: <Toggle value={notifications} onChange={handleNotifyToggle} />
                            },
                            {
                                label: t('aiAutoAnalysis'),
                                desc: lang === 'uz' ? 'Ma\'lumot kiritilganda avtomatik tahlil' : 'Auto AI analysis on input',
                                control: <Toggle value={aiAuto} onChange={setAiAuto} />
                            },
                        ]
                    }
                ].map((section, si) => (
                    <motion.div key={si} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.1 }}
                        className="glass-panel rounded-3xl overflow-hidden border border-white/5">
                        <div className="flex items-center gap-3 px-6 py-5 bg-white/5 border-b border-white/5">
                            <span className="material-symbols-outlined text-secondary-container">{section.icon}</span>
                            <h2 className="font-bold">{section.title}</h2>
                        </div>
                        <div className="divide-y divide-white/5">
                            {section.items.map((item, ii) => (
                                <div key={ii} className="flex items-center justify-between px-6 py-6 gap-4">
                                    <div>
                                        <p className="font-bold text-sm md:text-base">{item.label}</p>
                                        <p className="text-on-surface-variant text-[11px] md:text-xs mt-1">{item.desc}</p>
                                    </div>
                                    <div className="flex-shrink-0">{item.control}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <button onClick={handleSave}
                    className="px-12 py-4 bg-secondary-container text-on-secondary font-bold rounded-2xl flex items-center gap-3 hover:shadow-[0_0_30px_rgba(0,241,254,0.4)] transition-all active:scale-95">
                    <span className="material-symbols-outlined">{saved ? 'check_circle' : 'save'}</span>
                    {saved ? t('saved') : t('save')}
                </button>
            </div>
        </div>
    );
}
