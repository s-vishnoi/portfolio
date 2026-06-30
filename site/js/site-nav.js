(() => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    const pages = {
        home: 'index.html',
        about: 'index.html',
        city: 'city-scaling.html',
        equality: 'scientific-equality.html',
        consulting: 'consulting.html',
        passion: 'passion.html',
        writings: 'writings.html',
        projects: 'projects.html',
        pastRoles: 'past-roles.html',
        visionSound: 'vision-sound.html'
    };

    const aliases = {
        '': 'about',
        '/': 'about',
        'index.html': 'about',
        'city-scaling.html': 'city',
        'scientific-equality.html': 'equality',
        'consulting.html': 'consulting',
        'passion.html': 'passion',
        'writings.html': 'writings',
        'projects.html': 'projects',
        'past-roles.html': 'pastRoles',
        'vision-sound.html': 'visionSound'
    };

    const navTargetsByIndex = {
        0: pages.about,
        1: pages.about,
        2: pages.city,
        3: pages.passion,
        4: pages.writings,
        5: pages.home
    };

    const pageFaces = {
        about: 1,
        city: 2,
        equality: 2,
        consulting: 5,
        passion: 3,
        writings: 4,
        pastRoles: 6,
        visionSound: 1
    };

    const portalTargets = new Set([pages.home, pages.about, pages.city, pages.equality, pages.consulting, pages.passion, pages.writings, pages.pastRoles, pages.visionSound]);
    const randomPageKeys = ['about', 'city', 'equality', 'consulting', 'passion', 'writings'];

    const baseRotations = {
        1: { x: -20, y: 25 },
        2: { x: -20, y: -65 },
        3: { x: -20, y: -155 },
        4: { x: -20, y: 115 },
        5: { x: -110, y: 25 },
        6: { x: 70, y: 25 }
    };

    const pageFaceRotations = {
        about: baseRotations[1],
        city: baseRotations[2],
        equality: baseRotations[2],
        consulting: baseRotations[5],
        passion: baseRotations[3],
        writings: baseRotations[4],
        pastRoles: baseRotations[6],
        visionSound: baseRotations[1]
    };

    let currentRotX = -20;
    let currentRotY = 25;
    let isRolling = false;
    let rollCount = 0;

    const pageFromPath = () => {
        const file = window.location.pathname.split('/').pop();
        return aliases[file] || aliases[window.location.pathname] || 'about';
    };

    const canonicalTarget = (href) => {
        if (!href) return null;
        const file = href.split('?')[0].split('#')[0].split('/').pop();
        const pageKey = aliases[file];
        return pageKey ? pages[pageKey] : href;
    };

    const withOrigin = (targetPage, sourceElement, event) => {
        let cx = event?.clientX;
        let cy = event?.clientY;

        if ((!cx || !cy) && sourceElement) {
            const rect = sourceElement.getBoundingClientRect();
            cx = rect.left + rect.width / 2;
            cy = rect.top + rect.height / 2;
        }

        const separator = targetPage.includes('?') ? '&' : '?';
        return `${targetPage}${separator}cx=${cx || window.innerWidth / 2}&cy=${cy || window.innerHeight / 2}`;
    };

    const rememberAboutPosition = () => {
        if (pageFromPath() !== 'about') return;

        try {
            sessionStorage.setItem('aboutReturnY', String(window.scrollY || 0));
        } catch {
            // Return still works; it just falls back to the top of the page.
        }
    };

    const restoreAboutPosition = () => {
        if (pageFromPath() !== 'about') return;
        const params = new URLSearchParams(window.location.search);
        const isReturning = params.get('return') === 'about';
        
        let y = 0;
        if (isReturning) {
            y = Number(params.get('y'));
            if (!Number.isFinite(y)) {
                try {
                    y = Number(sessionStorage.getItem('aboutReturnY')) || 0;
                } catch {
                    y = 0;
                }
            }
        } else {
            try {
                sessionStorage.removeItem('aboutReturnY');
            } catch {}
        }

        window.setTimeout(() => {
            window.scrollTo({ top: Math.max(y, 0), behavior: 'auto' });
            if (window.history?.replaceState) {
                window.history.replaceState({}, '', window.location.pathname);
            }
        }, 0);
    };

    const navigate = (targetPage, options = {}) => {
        const currentPage = pages[pageFromPath()];
        const canonicalPage = canonicalTarget(targetPage);

        if (!canonicalPage) return;

        if (canonicalPage === currentPage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (options.dieContainer) {
                setTimeout(() => {
                    options.dieContainer.style.animation = 'levitate 3s infinite ease-in-out';
                    isRolling = false;
                }, 1600);
            }
            return;
        }

        rememberAboutPosition();

        const go = () => {
            window.location.href = withOrigin(canonicalPage, options.sourceElement, options.event);
        };

        if (portalTargets.has(canonicalPage)) {
            setTimeout(go, options.delay ?? 300);
            return;
        }

        document.body.classList.add('fade-out');
        setTimeout(go, options.delay ?? 500);
    };

    const configureNavLinks = () => {
        document.querySelectorAll('.text-btn:not(#btn-main-contact):not([href^="#"])').forEach((link) => {
            const index = Number(link.dataset.index);
            const target = navTargetsByIndex[index] || canonicalTarget(link.getAttribute('href'));
            if (!target) return;

            link.href = target;
            link.setAttribute('data-no-loader', 'true');

            if (target === pages[pageFromPath()]) {
                link.classList.add('active-page');
            } else {
                link.classList.remove('active-page');
            }

            link.addEventListener('click', (event) => {
                event.preventDefault();

                if (link.id === 'btn-main-home') {
                    window.location.href = pages.home;
                    return;
                }

                link.classList.add('glitching');

                setTimeout(() => {
                    link.classList.remove('glitching');
                    navigate(target, {
                        sourceElement: link,
                        event,
                        delay: portalTargets.has(target) ? 0 : 500
                    });
                }, portalTargets.has(target) ? 300 : 0);
            });
        });
    };

    const configurePortalLinks = () => {
        document.querySelectorAll('[data-portal-link]').forEach((link) => {
            const target = canonicalTarget(link.getAttribute('href'));
            if (!target) return;

            link.setAttribute('data-no-loader', 'true');
            link.addEventListener('click', (event) => {
                event.preventDefault();
                rememberAboutPosition();
                navigate(target, {
                    sourceElement: link,
                    event,
                    delay: portalTargets.has(target) ? 0 : 500
                });
            });
        });
    };

    const configureDie = () => {
        const dieContainer = document.getElementById('die-trigger');
        const cube = document.getElementById('cube');
        if (!dieContainer || !cube) return;

        dieContainer.addEventListener('click', () => {
            if (isRolling) return;
            isRolling = true;
            dieContainer.style.animation = 'none';

            const currentPageKey = pageFromPath();
            const destinationKeys = randomPageKeys.filter((pageKey) => pageKey !== currentPageKey);
            const destinationKey = destinationKeys[Math.floor(Math.random() * destinationKeys.length)];
            const randFace = pageFaces[destinationKey];
            rollCount++;

            currentRotX = rollCount * 1440 + baseRotations[randFace].x;
            currentRotY = rollCount * 1440 + baseRotations[randFace].y;
            cube.style.transform = `translateZ(-18px) rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;

            navigate(pages[destinationKey], {
                sourceElement: dieContainer,
                dieContainer,
                delay: 300
            });
        });

        window.addEventListener('load', () => {
            if (window.innerWidth > 768) {
                dieContainer.style.animation = 'levitate 3s infinite ease-in-out';
            }
        });
    };

    const injectSiteFooter = () => {
        document.querySelectorAll('.site-mark').forEach((mark) => mark.remove());

        if (document.querySelector('.site-footer')) return;

        const style = document.createElement('style');
        style.textContent = `
            body.has-site-footer {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                min-height: 100vh;
            }

            .site-footer {
                width: 100%;
                box-sizing: border-box;
                margin-top: auto;
                padding: 24px clamp(20px, 5vw, 64px) max(10px, env(safe-area-inset-bottom));
                position: relative;
                z-index: 20;
                color: rgba(255, 255, 255, 0.24);
                font-family: 'Courier Prime', 'Courier New', monospace;
                font-size: clamp(0.72rem, 1.25vw, 1.05rem);
                font-weight: 700;
                letter-spacing: 0.38em;
                line-height: 1;
                text-align: center;
                text-transform: uppercase;
                pointer-events: none;
                user-select: none;
                white-space: nowrap;
            }
        `;

        const footer = document.createElement('footer');
        footer.className = 'site-footer';
        footer.textContent = 'vishnoi@2026';

        document.head.appendChild(style);
        document.body.classList.add('has-site-footer');
        document.body.appendChild(footer);
    };

    const animateIncomingPortalReveal = () => {
        const params = new URLSearchParams(window.location.search);
        const cx = params.get('cx');
        const cy = params.get('cy');
        if (!cx || !cy) return;

        const pageKey = pageFromPath();
        const revealSurface = document.getElementById('bg-gif-wrapper') || document.body;
        revealSurface.style.clipPath = `circle(0px at ${cx}px ${cy}px)`;
        revealSurface.style.transition = 'clip-path 1.2s cubic-bezier(0.5, 0, 0.2, 1)';

        const cube = document.getElementById('cube');
        const face = pageFaceRotations[pageKey];
        if (cube) {
            cube.style.transition = 'none';
            cube.style.transform = 'translateZ(-18px) rotateX(-720deg) rotateY(-720deg)';
            void cube.offsetHeight;
            cube.style.transition = 'transform 1.4s cubic-bezier(0.2, 0.8, 0.25, 1.1)';
            cube.style.transform = `translateZ(-18px) rotateX(${face.x}deg) rotateY(${face.y}deg)`;
        }

        const glowingRing = document.createElement('div');
        glowingRing.style.position = 'fixed';
        glowingRing.style.width = '0px';
        glowingRing.style.height = '0px';
        glowingRing.style.borderRadius = '50%';
        glowingRing.style.boxShadow = '0 0 60px 30px rgba(223, 255, 0, 1.2), inset 0 0 60px 30px rgba(223, 255, 0, 1.2)';
        glowingRing.style.border = '5px solid #ffffff';
        glowingRing.style.transform = 'translate(-50%, -50%)';
        glowingRing.style.left = cx + 'px';
        glowingRing.style.top = cy + 'px';
        glowingRing.style.transition = 'width 1.2s cubic-bezier(0.5, 0, 0.2, 1), height 1.2s cubic-bezier(0.5, 0, 0.2, 1)';
        glowingRing.style.pointerEvents = 'none';
        glowingRing.style.zIndex = '-1';
        document.body.appendChild(glowingRing);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                revealSurface.style.clipPath = `circle(150vw at ${cx}px ${cy}px)`;
                glowingRing.style.width = '300vw';
                glowingRing.style.height = '300vw';
            });
        });

        window.setTimeout(() => {
            revealSurface.style.clipPath = '';
            revealSurface.style.transition = '';
            glowingRing.remove();
        }, 1300);
    };

    document.addEventListener('DOMContentLoaded', () => {
        injectSiteFooter();
        animateIncomingPortalReveal();
        restoreAboutPosition();
        configureNavLinks();
        configurePortalLinks();
        configureDie();
    });
})();
