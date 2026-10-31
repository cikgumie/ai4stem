/**
 * JUNIOR AI - Modular Navigation Component (Ceria & Fun Edition)
 * Menyediakan navigasi seragam untuk semua halaman Junior AI
 * dengan penunjuk modul aktif dan sinkronisasi cerita murid.
 */

document.addEventListener('DOMContentLoaded', () => {
    renderJuniorNavbar();
    renderJuniorFooter();
});

function renderJuniorNavbar() {
    const placeholder = document.getElementById('junior-navbar-placeholder');
    if (!placeholder) return;

    const currentFile = window.location.pathname.split('/').pop() || 'index.html';

    const navLinks = [
        { href: 'index.html', title: 'Utama', icon: 'compass', emoji: '🏠', activeBg: 'bg-amber-100 text-amber-900 border-2 border-amber-300' },
        { href: 'generatif_ai.html', title: '1. Generatif AI', icon: 'file-text', emoji: '✍️', activeBg: 'bg-emerald-100 text-emerald-900 border-2 border-emerald-300' },
        { href: 'photo_ai.html', title: '2. Photo & Komik', icon: 'image', emoji: '🎨', activeBg: 'bg-sky-100 text-sky-900 border-2 border-sky-300' },
        { href: 'video_ai.html', title: '3. Video AI (Vids)', icon: 'video', emoji: '🎬', activeBg: 'bg-purple-100 text-purple-900 border-2 border-purple-300' },
        { href: 'gamifikasi_ai.html', title: '4. Gamifikasi', icon: 'gamepad-2', emoji: '🎮', activeBg: 'bg-pink-100 text-pink-900 border-2 border-pink-300' },
    ];

    const getLinkClass = (link) => {
        const isActive = currentFile === link.href;
        if (isActive) {
            return `${link.activeBg} font-fun font-bold shadow-sm scale-105`;
        }
        return 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-fun font-semibold transition-all';
    };

    const navHTML = `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b-2 border-slate-100 shadow-sm transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <!-- Brand Logo -->
            <div class="flex items-center gap-3">
                <a href="index.html" class="flex items-center gap-3 group">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-pink-400 to-sky-400 flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <span class="text-2xl">🚀</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="font-fun text-2xl font-bold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                                Junior<span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-pink-500 to-sky-500">AI</span>
                            </span>
                            <span class="text-[11px] font-fun font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border-2 border-amber-300 shadow-xs">
                                Ceria &bull; Murid Pintar
                            </span>
                        </div>
                        <p class="text-xs text-slate-500 font-medium hidden sm:block">Misi Pencipta Digital Sekolah 🌟</p>
                    </div>
                </a>
            </div>

            <!-- Desktop Links -->
            <div class="hidden lg:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border-2 border-slate-200/60">
                ${navLinks.map(link => `
                    <a href="${link.href}" class="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm ${getLinkClass(link)}">
                        <span>${link.emoji}</span>
                        <span>${link.title}</span>
                    </a>
                `).join('')}
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2.5">
                <!-- Story Status Modal Button -->
                <button onclick="openStoryStatusModal()" class="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 text-xs font-fun font-bold shadow-xs transition-all cursor-pointer">
                    <span class="text-sm">📖</span>
                    <span class="hidden sm:inline">Cerita Saya</span>
                </button>

                <!-- Back to Main AI4STEM -->
                <a href="../index.html" class="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 text-xs font-fun font-semibold text-slate-700 hover:text-slate-900 transition-all" title="Kembali ke Portal Guru AI4STEM">
                    <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
                    <span class="hidden md:inline">Portal Guru</span>
                </a>

                <!-- Mobile Menu Button -->
                <button id="junior-mobile-toggle" onclick="toggleJuniorMobileMenu()" class="lg:hidden p-2.5 rounded-2xl bg-slate-100 border-2 border-slate-200 text-slate-700 hover:text-slate-900 cursor-pointer">
                    <i data-lucide="menu" class="w-5 h-5"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Drawer -->
        <div id="junior-mobile-menu" class="hidden lg:hidden border-t-2 border-slate-100 bg-white/98 backdrop-blur-2xl px-6 py-5 space-y-2 shadow-xl">
            ${navLinks.map(link => `
                <a href="${link.href}" class="flex items-center gap-3 px-4 py-3 rounded-2xl text-base ${getLinkClass(link)}">
                    <span class="text-xl">${link.emoji}</span>
                    <span>${link.title}</span>
                </a>
            `).join('')}
            <div class="pt-3 border-t border-slate-200 flex items-center justify-between">
                <a href="../index.html" class="text-xs font-bold text-slate-600 hover:text-sky-600 flex items-center gap-2 py-2">
                    <i data-lucide="corner-up-left" class="w-4 h-4"></i> Kembali ke Portal AI4STEM Utama (Guru)
                </a>
            </div>
        </div>
    </nav>

    <!-- Global Story Status Modal -->
    <div id="junior-story-modal" class="fixed inset-0 z-50 hidden bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white max-w-lg w-full rounded-[2rem] p-6 sm:p-8 border-4 border-amber-300 shadow-2xl relative">
            <button onclick="closeStoryStatusModal()" class="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
            <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl border-2 border-amber-300">
                    📖
                </div>
                <div>
                    <h3 class="font-fun text-2xl font-bold text-slate-900">Cerita Projek Murid</h3>
                    <p class="text-xs text-slate-500 font-medium">Tersimpan automatik untuk Modul Gambar, Video & Game</p>
                </div>
            </div>

            <div id="modal-story-content" class="space-y-4">
                <!-- Injected via JS -->
            </div>

            <div class="mt-6 pt-4 border-t-2 border-slate-100 flex items-center justify-between">
                <a href="generatif_ai.html#editor" class="text-xs font-fun font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1.5">
                    <i data-lucide="edit-3" class="w-4 h-4"></i> Edit Cerita di Modul 1
                </a>
                <button onclick="copyCurrentStoryModal()" id="btn-modal-copy" class="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-fun text-xs font-bold transition-all cursor-pointer shadow-md shadow-emerald-500/20 flex items-center gap-1.5">
                    <i data-lucide="copy" class="w-4 h-4"></i> Salin Cerita
                </button>
            </div>
        </div>
    </div>
    `;

    placeholder.innerHTML = navHTML;
    if (window.lucide) lucide.createIcons();
}

function renderJuniorFooter() {
    const footerPlaceholder = document.getElementById('junior-footer-placeholder');
    if (!footerPlaceholder) return;

    footerPlaceholder.innerHTML = `
    <footer class="mt-24 border-t-4 border-amber-200 bg-white py-14 relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div class="md:col-span-2">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="text-3xl">🚀</span>
                        <span class="font-fun text-3xl font-bold text-slate-900">Junior<span class="text-sky-500">AI</span></span>
                        <span class="text-[11px] font-fun font-bold px-3 py-1 rounded-full bg-pink-100 text-pink-700 border-2 border-pink-300">Edisi Murid Sekolah</span>
                    </div>
                    <p class="text-slate-600 text-sm max-w-md leading-relaxed mb-4 font-medium">
                        Platform pembelajaran kecerdasan buatan (AI) yang ceria, selamat dan interaktif. Belajar menulis cerita 100 perkataan, melukis komik watak, mencipta video bergerak di Google Vids, dan mereka game sendiri!
                    </p>
                    <p class="text-xs text-slate-400 font-semibold">
                        Bahagian daripada Hub Inovasi AI4STEM Malaysia (2026).
                    </p>
                </div>

                <div>
                    <h4 class="font-fun text-base font-bold text-slate-900 tracking-wide mb-4 flex items-center gap-1.5">
                        <span>🗺️</span> 4 Misi Hebat
                    </h4>
                    <ul class="space-y-2.5 text-sm text-slate-600 font-fun font-semibold">
                        <li><a href="generatif_ai.html" class="hover:text-emerald-600 transition-colors flex items-center gap-2">✍️ Modul 1: Tulis Cerita 100 Perkataan</a></li>
                        <li><a href="photo_ai.html" class="hover:text-sky-600 transition-colors flex items-center gap-2">🎨 Modul 2: Jana Gambar & Komik 4-Panel</a></li>
                        <li><a href="video_ai.html" class="hover:text-purple-600 transition-colors flex items-center gap-2">🎬 Modul 3: Video AI & Google Vids</a></li>
                        <li><a href="gamifikasi_ai.html" class="hover:text-pink-600 transition-colors flex items-center gap-2">🎮 Modul 4: Bina Game Berasaskan Cerita</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-fun text-base font-bold text-slate-900 tracking-wide mb-4 flex items-center gap-1.5">
                        <span>🔗</span> Pautan Pantas
                    </h4>
                    <ul class="space-y-2.5 text-sm text-slate-600 font-fun font-semibold">
                        <li><a href="../index.html" class="hover:text-sky-600 transition-colors flex items-center gap-1.5">🏫 Portal Utama Guru AI4STEM</a></li>
                        <li><a href="../penghantaran_pautan.html" class="hover:text-sky-600 transition-colors flex items-center gap-1.5">📤 Hantar Pautan Hasil Tugasan</a></li>
                        <li><a href="../bina_site.html" class="hover:text-sky-600 transition-colors flex items-center gap-1.5">🌐 Panduan Bina Google Sites</a></li>
                    </ul>
                </div>
            </div>

            <div class="pt-8 border-t-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-4">
                <p>&copy; 2026 Junior AI & AI4STEM. Dicipta ceria khas untuk pemerkasaan murid sekolah.</p>
                <div class="flex items-center gap-3">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                        🛡️ 100% Mesra & Selamat Untuk Murid
                    </span>
                </div>
            </div>
        </div>
    </footer>
    `;
    if (window.lucide) lucide.createIcons();
}

function toggleJuniorMobileMenu() {
    const menu = document.getElementById('junior-mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

function openStoryStatusModal() {
    const modal = document.getElementById('junior-story-modal');
    const content = document.getElementById('modal-story-content');
    if (!modal || !content) return;

    const data = window.JuniorData ? window.JuniorData.getStory() : null;
    if (data) {
        const words = (data.storyText || '').trim().split(/\s+/).filter(Boolean).length;
        content.innerHTML = `
            <div class="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs uppercase font-fun font-bold tracking-wider text-amber-800">${data.title || 'Cerita Tanpa Tajuk'}</span>
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-fun font-bold ${words >= 80 && words <= 120 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'}">
                        ${words} Patah Perkataan
                    </span>
                </div>
                <div class="text-xs text-slate-600 mb-2 font-medium">
                    <strong>Watak:</strong> ${data.character || '-'} &bull; <strong>Latar:</strong> ${data.setting || '-'}
                </div>
                <p class="text-xs sm:text-sm text-slate-700 leading-relaxed max-h-48 overflow-y-auto pr-2 bg-white p-3 rounded-xl border border-amber-200 italic">
                    "${data.storyText || ''}"
                </p>
            </div>
        `;
    }

    modal.classList.remove('hidden');
}

function closeStoryStatusModal() {
    const modal = document.getElementById('junior-story-modal');
    if (modal) modal.classList.add('hidden');
}

function copyCurrentStoryModal() {
    const data = window.JuniorData ? window.JuniorData.getStory() : null;
    if (data && data.storyText) {
        const btn = document.getElementById('btn-modal-copy');
        window.JuniorData.copyText(data.storyText, btn);
    }
}
