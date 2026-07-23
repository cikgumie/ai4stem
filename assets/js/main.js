/* Pendidik AI - Main JS (2026) */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Animations (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });
    }

    // 2. Initialize Icons (Lucide)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 3. Initialize Typewriter (Hero)
    const typeElement = document.getElementById('typewriter-text');
    if (typeElement) {
        const phrases = [
            "Melalui Program STEM",
            "Dengan Teknologi AI",
            "Inovasi & Reka Cipta",
            "Sains & Matematik",
            "Pendidikan Masa Hadapan"
        ];
        initTypewriter(typeElement, phrases);
    }

    // 4. Initialize Typewriter (Formula RASA)
    const formulaTypeElement = document.getElementById('typewriter-formula');
    if (formulaTypeElement) {
        const formulaPhrases = [
            "Formula R.A.S.A",
            "Kuasai Prompt Engineering",
            "Seni Arahan AI"
        ];
        initTypewriter(formulaTypeElement, formulaPhrases);
    }

    // 5. Initialize Typewriter (Visual AI)
    const visualTypeElement = document.getElementById('typewriter-visual');
    if (visualTypeElement) {
        const visualPhrases = [
            "Modul Penjana Imej AI",
            "Seni Visual Masa Depan",
            "Keajaiban Dalam Satu Klik"
        ];
        initTypewriter(visualTypeElement, visualPhrases);
    }

    // 6. Initialize Typewriter (Gamifikasi AI)
    const gamifikasiTypeElement = document.getElementById('typewriter-gamifikasi');
    if (gamifikasiTypeElement) {
        const gamifikasiPhrases = [
            "Modul Gamifikasi AI",
            "Bilik Darjah Masa Depan",
            "Seni Pembelajaran Interaktif"
        ];
        initTypewriter(gamifikasiTypeElement, gamifikasiPhrases);
    }

    // 7. Initialize Typewriter (Video AI)
    const videoTypeElement = document.getElementById('typewriter-video');
    if (videoTypeElement) {
        const videoPhrases = [
            "Modul Penjana Video AI",
            "Seni Imajinasi Bergerak",
            "Klip Video Masa Depan"
        ];
        initTypewriter(videoTypeElement, videoPhrases);
    }

    // 8. Initialize Typewriter (Bina Site)
    const binaSiteTypeElement = document.getElementById('typewriter-bina-site');
    if (binaSiteTypeElement) {
        const binaSitePhrases = [
            "Hub Maklumat STEM",
            "Galeri Bahan Digital",
            "Pusat Pembelajaran Murid",
            "Portfolio Inovasi Guru"
        ];
        initTypewriter(binaSiteTypeElement, binaSitePhrases);
    }

    // 8. Back-to-Top Button Visibility
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
                backToTop.classList.add('opacity-100', 'translate-y-0');
            } else {
                backToTop.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
                backToTop.classList.remove('opacity-100', 'translate-y-0');
            }
        });
    }
});

/**
 * Typewriter Effect Logic
 */
function initTypewriter(element, phrases) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}


/**
 * Smooth scroll to a specific section ID
 * @param {string} id - The ID of the target element
 */
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // If element not found, we might be on a sub-page
        // Redirect to home with anchor
        window.location.href = `index.html#${id}`;
    }
}

/**
 * Helper to open modal (to be used across pages if needed)
 */
function openModal(title, content) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBox = document.getElementById('modal-box');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    if (modalOverlay && modalBox && modalTitle && modalBody) {
        modalTitle.innerText = title;
        modalBody.innerText = content;

        modalOverlay.classList.remove('hidden');
        setTimeout(() => {
            modalOverlay.classList.remove('opacity-0');
            modalBox.classList.remove('scale-95');
        }, 10);
    }
}

/**
 * Helper to close modal
 */
function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBox = document.getElementById('modal-box');

    if (modalOverlay && modalBox) {
        modalOverlay.classList.add('opacity-0');
        modalBox.classList.add('scale-95');
        setTimeout(() => {
            modalOverlay.classList.add('hidden');
        }, 300);
    }
}