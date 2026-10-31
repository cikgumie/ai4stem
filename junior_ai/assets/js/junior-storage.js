/**
 * JUNIOR AI - Data Storage & Cross-Module Sync
 * Menguruskan simpanan Cerita 100 Perkataan, Karakter, Storyboard & Gamifikasi
 * merentas semua modul secara automatik menggunakan localStorage.
 */

const JUNIOR_STORAGE_KEY = 'junior_ai_project_data';
const JUNIOR_PROGRESS_KEY = 'junior_ai_missions_completed';

const DEFAULT_SAMPLE_STORY = {
    title: "Misi Robot Robi Selamatkan Sungai Biru",
    character: "Robi si Robot Cilik & Sarah Pengkaji Alam",
    setting: "Pusat Sains Hijau & Tebing Sungai Biru",
    genre: "Sains Alam Sekitar & Teknologi Robotik",
    storyText: "Pada tahun 2050, Robi si robot pembersih bersama Sarah mengesan sisa plastik mencemari Sungai Biru. Ikan-ikan mula kehilangan habitat. Robi mengaktifkan sensor kecerdasan buatannya untuk menganalisis punca kebocoran paip di kilang lama. Dengan pantas, Sarah memasang dron pemantau manakala Robi menggunakan jaring eko-magnetik untuk mengumpul 500 botol terbuang dalam sekelip mata. Penduduk kampung terpegun melihat air sungai kembali jernih bercahaya. Sarah dan Robi berikrar akan terus menjaga ekosistem bumi dengan teknologi pintar.",
    wordCount: 71,
    savedAt: new Date().toISOString()
};

const JuniorData = {
    getStory() {
        try {
            const raw = localStorage.getItem(JUNIOR_STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && parsed.storyText) return parsed;
            }
        } catch (e) {
            console.warn("Storage read error", e);
        }
        return DEFAULT_SAMPLE_STORY;
    },

    saveStory(data) {
        try {
            const current = this.getStory();
            const updated = {
                ...current,
                ...data,
                savedAt: new Date().toISOString()
            };
            localStorage.setItem(JUNIOR_STORAGE_KEY, JSON.stringify(updated));
            this.markMissionDone(1);
            return updated;
        } catch (e) {
            console.error("Storage write error", e);
            return null;
        }
    },

    hasCustomStory() {
        try {
            const raw = localStorage.getItem(JUNIOR_STORAGE_KEY);
            return !!raw;
        } catch (e) {
            return false;
        }
    },

    resetStory() {
        localStorage.removeItem(JUNIOR_STORAGE_KEY);
    },

    getCompletedMissions() {
        try {
            const raw = localStorage.getItem(JUNIOR_PROGRESS_KEY);
            return raw ? JSON.parse(raw) : [1]; // default module 1 in progress
        } catch (e) {
            return [1];
        }
    },

    markMissionDone(moduleId) {
        try {
            const completed = this.getCompletedMissions();
            if (!completed.includes(moduleId)) {
                completed.push(moduleId);
                localStorage.setItem(JUNIOR_PROGRESS_KEY, JSON.stringify(completed));
            }
        } catch (e) {
            console.warn("Mission save error", e);
        }
    },

    copyText(text, btnElement) {
        if (!navigator.clipboard) {
            const el = document.createElement('textarea');
            el.value = text;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        } else {
            navigator.clipboard.writeText(text);
        }

        if (btnElement) {
            const origContent = btnElement.innerHTML;
            btnElement.classList.add('bg-emerald-500', 'text-slate-950', 'border-emerald-400');
            btnElement.innerHTML = `<i data-lucide="check" class="w-4 h-4 inline mr-1"></i> Disalin!`;
            if (window.lucide) lucide.createIcons();

            setTimeout(() => {
                btnElement.classList.remove('bg-emerald-500', 'text-slate-950', 'border-emerald-400');
                btnElement.innerHTML = origContent;
                if (window.lucide) lucide.createIcons();
            }, 2000);
        }

        this.showToast("Prompt / Teks berjaya disalin ke papan klip!");
    },

    showToast(message, type = "success") {
        let container = document.getElementById('junior-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'junior-toast-container';
            container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900/95 border border-emerald-500/40 text-emerald-300 shadow-2xl backdrop-blur-md transform translate-y-4 opacity-0 transition-all duration-300 text-sm font-semibold';
        toast.innerHTML = `
            <div class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <i data-lucide="check-circle" class="w-4 h-4"></i>
            </div>
            <span>${message}</span>
        `;
        container.appendChild(toast);
        if (window.lucide) lucide.createIcons();

        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-4', 'opacity-0');
        });

        setTimeout(() => {
            toast.classList.add('translate-y-4', 'opacity-0');
            setTimeout(() => toast.remove(), 400);
        }, 3200);
    }
};

window.JuniorData = JuniorData;
