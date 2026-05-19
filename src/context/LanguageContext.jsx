import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [notifications, setNotifications] = useState(JSON.parse(localStorage.getItem('notifications')) ?? false);
    const [aiAuto, setAiAuto] = useState(JSON.parse(localStorage.getItem('aiAuto')) ?? false);

    useEffect(() => {
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
    }, [lang]);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        if (theme === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
    }, [theme]);

    const requestNotificationPermission = async () => {
        if (!("Notification" in window)) {
            alert("Bu brauzer bildirishnomalarni qo'llab-quvvatlamaydi.");
            return false;
        }

        if (Notification.permission === "granted") return true;

        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            return true;
        } else {
            alert("Bildirishnomalar rad etildi. Tahlil natijalarini olish uchun ularga ruxsat bering.");
            return false;
        }
    };

    const notify = (title, body) => {
        if (notifications && Notification.permission === "granted") {
            new Notification(title, { body, icon: '/vite.svg' });
        }
    };

    const t = (key) => {
        return translations[lang][key] || key;
    };

    return (
        <LanguageContext.Provider value={{
            lang, setLang,
            theme, setTheme,
            notifications, setNotifications,
            aiAuto, setAiAuto,
            requestNotificationPermission,
            notify,
            t
        }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
