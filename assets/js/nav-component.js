/**
 * AI4STEM - Modular Navigation Component v2.1 (2026)
 * - Lucide SVG icons (no Font Awesome dependency)
 * - "Pelawat" button removed (guestbook removed)
 * - "Explorasi AI" & "Laman STEM" dropdowns (Akan Datang)
 * - Mobile menu auto-close on link click
 * - Auto-Clear Cache system for version updates
 */

(function () {
    const APP_VERSION = '2026.07.20.01';
    const savedVersion = localStorage.getItem('ai4stem_version');

    if (savedVersion !== APP_VERSION) {
        localStorage.clear();
        sessionStorage.clear();
        localStorage.setItem('ai4stem_version', APP_VERSION);
        console.log(`%c [AI4STEM] Updated to v${APP_VERSION}. Cache cleared.`, 'background: #4f46e5; color: white; padding: 2px 5px; border-radius: 3px;');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (!navPlaceholder) return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const theme = navPlaceholder.getAttribute('data-theme') || 'dark';
    const accent = navPlaceholder.getAttribute('data-accent') || 'brand';

    const accentColor = {
        'brand': 'emerald-400',
        'accent': 'cyan-400',
        'gem': 'cyan-400',
        'magic': 'pink-400',
        'teal': 'teal-400'
    }[accent] || 'emerald-400';

    const bgAccent = 'bg-slate-900/80 border border-slate-800/80';
    const textAccent = `text-${accentColor} glow-text-${accentColor.split('-')[0]}`;
    const textBase = 'text-slate-400';
    const textHover = `hover:text-${accentColor} transition-colors`;

    const isActive = (path) => currentPath === path;
    const activeClass = (path) => isActive(path)
        ? `font-bold ${textAccent} ${bgAccent}`
        : `font-medium ${textBase} ${textHover}`;

    const navHTML = `
    <!-- Main Navigation Bar -->
    <nav class="fixed top-0 w-full z-50 bg-slate-950/80 border-slate-900/80 backdrop-blur-lg border-b">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <!-- Logo -->
            <a href="index.html" class="flex items-center gap-2 group">
                <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <i data-lucide="sparkles" class="w-5 h-5"></i>
                </div>
                <div class="flex flex-col">
                    <span class="font-display font-bold text-lg text-white leading-tight">
                        AI4<span class="text-emerald-400 glow-text-green">STEM</span>
                    </span>
                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Hub STEM & AI</span>
                </div>
            </a>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-1 bg-slate-900/60 border-slate-800/60 p-1.5 rounded-full border">
                <a href="index.html" class="px-5 py-2 text-sm ${activeClass('index.html')} rounded-full transition-all">Utama</a>
                
                <!-- Dropdown Kuasai AI -->
                <div class="relative group">
                    <button class="px-5 py-2 text-sm font-semibold ${textBase} ${textHover} rounded-full transition-all flex items-center gap-1">
                        Kuasai AI <i data-lucide="chevron-down" class="w-3.5 h-3.5 transition-transform group-hover:rotate-180"></i>
                    </button>
                    <div class="absolute top-full left-0 mt-2 w-48 bg-slate-900 border-slate-800 rounded-2xl shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2 transform origin-top scale-95 group-hover:scale-100">
                        <a href="generatif_ai.html" class="block px-4 py-2.5 text-sm ${activeClass('generatif_ai.html')} rounded-xl transition-colors">Generatif</a>
                        <a href="visual_ai.html" class="block px-4 py-2.5 text-sm ${activeClass('visual_ai.html')} rounded-xl transition-colors">Visual</a>
                        <a href="gamifikasi_ai.html" class="block px-4 py-2.5 text-sm ${activeClass('gamifikasi_ai.html')} rounded-xl transition-colors">Gamifikasi</a>
                        <a href="video_ai.html" class="block px-4 py-2.5 text-sm ${activeClass('video_ai.html')} rounded-xl transition-colors">Video</a>
                        <a href="penghantaran_pautan.html" class="block px-4 py-2.5 text-sm ${activeClass('penghantaran_pautan.html')} rounded-xl transition-colors">Hantar Pautan</a>
                    </div>
                </div>

                <!-- Dropdown Explorasi AI -->
                <div class="relative group">
                    <button class="px-5 py-2 text-sm font-semibold ${textBase} ${textHover} rounded-full transition-all flex items-center gap-1">
                        Explorasi AI <i data-lucide="chevron-down" class="w-3.5 h-3.5 transition-transform group-hover:rotate-180"></i>
                    </button>
                    <div class="absolute top-full left-0 mt-2 w-48 bg-slate-900 border-slate-800 rounded-2xl shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2 transform origin-top scale-95 group-hover:scale-100">
                        <span class="block px-4 py-2.5 text-sm text-slate-500 italic rounded-xl">Akan Datang</span>
                    </div>
                </div>

                <!-- Dropdown / Link Laman STEM -->
                <div class="relative group">
                    <a href="penghantaran_pautan.html" class="px-5 py-2 text-sm font-semibold ${activeClass('penghantaran_pautan.html')} rounded-full transition-all flex items-center gap-1">
                        Laman STEM <i data-lucide="chevron-down" class="w-3.5 h-3.5 transition-transform group-hover:rotate-180"></i>
                    </a>
                    <div class="absolute top-full left-0 mt-2 w-52 bg-slate-900 border-slate-800 rounded-2xl shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2 transform origin-top scale-95 group-hover:scale-100">
                        <a href="penghantaran_pautan.html" class="block px-4 py-2.5 text-sm ${activeClass('penghantaran_pautan.html')} rounded-xl transition-colors">Hantar Pautan STEM</a>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu Button -->
            <button onclick="toggleMobileMenu()" class="md:hidden p-2 ${textBase} ${textHover} transition-colors">
                <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
        </div>
    </nav>

    <!-- Mobile Menu Drawer -->
    <div id="mobile-menu" class="fixed inset-0 z-[100] translate-x-full transition-transform duration-300 ease-in-out md:hidden">
        <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onclick="toggleMobileMenu()"></div>
        <div class="absolute right-0 top-0 bottom-0 w-80 ${theme === 'light' ? 'bg-white' : 'bg-slate-950'} shadow-2xl p-6 flex flex-col overflow-y-auto ${theme === 'dark' ? 'border-l border-slate-800' : ''}">
            <div class="flex justify-between items-center mb-8">
                <span class="font-display font-bold text-xl ${theme === 'light' ? 'text-slate-800' : 'text-white'}">Menu <span class="${textAccent}">Utama</span></span>
                <button onclick="toggleMobileMenu()" class="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
            
            <div class="space-y-4">
                <a href="index.html" class="mobile-nav-link block px-4 py-3 ${activeClass('index.html')} font-semibold rounded-xl transition-all">Utama</a>
                
                <div class="border-t ${theme === 'light' ? 'border-slate-100' : 'border-slate-800'} my-4 pt-4">
                    <span class="px-4 text-[10px] font-bold ${textAccent} uppercase tracking-widest">Kuasai AI</span>
                    <div class="mt-2 space-y-1">
                        <a href="generatif_ai.html" class="mobile-nav-link block px-4 py-2.5 text-sm ${activeClass('generatif_ai.html')} rounded-xl transition-colors">Generatif</a>
                        <a href="visual_ai.html" class="mobile-nav-link block px-4 py-2.5 text-sm ${activeClass('visual_ai.html')} rounded-xl transition-colors">Visual</a>
                        <a href="gamifikasi_ai.html" class="mobile-nav-link block px-4 py-2.5 text-sm ${activeClass('gamifikasi_ai.html')} rounded-xl transition-colors">Gamifikasi</a>
                        <a href="video_ai.html" class="mobile-nav-link block px-4 py-2.5 text-sm ${activeClass('video_ai.html')} rounded-xl transition-colors">Video</a>
                        <a href="penghantaran_pautan.html" class="mobile-nav-link block px-4 py-2.5 text-sm ${activeClass('penghantaran_pautan.html')} rounded-xl transition-colors">Hantar Pautan</a>
                    </div>
                </div>

                <div class="border-t ${theme === 'light' ? 'border-slate-100' : 'border-slate-800'} my-4 pt-4">
                    <span class="px-4 text-[10px] font-bold text-amber-500 uppercase tracking-widest">Explorasi AI</span>
                    <div class="mt-2 space-y-1">
                        <span class="block px-4 py-2.5 text-sm text-slate-400 italic rounded-xl">Akan Datang</span>
                    </div>
                </div>

                <div class="border-t ${theme === 'light' ? 'border-slate-100' : 'border-slate-800'} my-4 pt-4">
                    <span class="px-4 text-[10px] font-bold text-teal-500 uppercase tracking-widest">Laman STEM</span>
                    <div class="mt-2 space-y-1">
                        <a href="penghantaran_pautan.html" class="mobile-nav-link block px-4 py-2.5 text-sm ${activeClass('penghantaran_pautan.html')} rounded-xl transition-colors">Hantar Pautan STEM</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    navPlaceholder.innerHTML = navHTML;

    // Auto-close mobile menu when any nav link is clicked
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            if (menu && !menu.classList.contains('translate-x-full')) {
                menu.classList.add('translate-x-full');
            }
        });
    });
});

/**
 * Mobile Menu Toggle Logic
 */
window.toggleMobileMenu = function () {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;

    if (menu.classList.contains('translate-x-full')) {
        menu.classList.remove('translate-x-full');
    } else {
        menu.classList.add('translate-x-full');
    }
}

/**
 * Robust Copy to Clipboard with Fallback
 */
window.copyTextToClipboard = function (text) {
    return new Promise((resolve, reject) => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(resolve).catch(() => {
                fallbackCopyTextToClipboard(text, resolve, reject);
            });
        } else {
            fallbackCopyTextToClipboard(text, resolve, reject);
        }
    });
};

function fallbackCopyTextToClipboard(text, resolve, reject) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    textArea.style.opacity = "0";
    textArea.style.pointerEvents = "none";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) resolve();
        else reject(new Error('Copy command failed'));
    } catch (err) {
        document.body.removeChild(textArea);
        reject(err);
    }
}
