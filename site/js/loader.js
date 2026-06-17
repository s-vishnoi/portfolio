// loader.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Preloader HTML
    const preloaderHTML = `
        <div id="preloader">
            <div class="preloader-content">
                <div class="preloader-die"></div>
                <div class="preloader-sparkle"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', preloaderHTML);

    // 2. Handle Loading Finish
    const minLoadTime = 1000; // 1 second
    const start = Date.now();
    let isFinished = false;

    const hidePreloader = () => {
        if (isFinished) return;
        isFinished = true;
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('loaded');
        }
    };

    // If window is already loaded, hide immediately or after minLoadTime
    if (document.readyState === 'complete') {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, minLoadTime - elapsed);
        setTimeout(hidePreloader, remaining);
    } else {
        window.addEventListener('load', () => {
            const elapsed = Date.now() - start;
            const remaining = Math.max(0, minLoadTime - elapsed);
            setTimeout(hidePreloader, remaining);
        });
    }

    // Absolute fallback: hide preloader after 2 seconds no matter what,
    // to prevent the preloader from getting stuck due to slow media/videos.
    setTimeout(hidePreloader, 2000);

    // 3. Handle Link Clicks (Fade Out Transition)
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Ignore if:
            // - No href
            // - Anchor link (#)
            // - External link (starts with http, mailto) - UNLESS it's internal (relative)
            // - Opens in new tab
            // - Has its own custom navigation handler (data-no-loader)
            if (!href || href.startsWith('#') || href.startsWith('mailto:') || link.target === '_blank') return;
            if (link.hasAttribute('data-no-loader')) return;

            // Simple check for internal links (relative path or same domain)
            // We'll assume relative paths like "about.html" or "BODY/" are internal
            e.preventDefault();

            document.body.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = href;
            }, 500); // Match CSS transition time
        });
    });

    // 4. Reset on back-button (bfcache restore)
    window.addEventListener('pageshow', () => {
        // Remove body fade-out
        document.body.classList.remove('fade-out');
        // Hide preloader immediately (don't re-play it on back nav)
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('loaded');
    });
});
