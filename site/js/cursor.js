(() => {
    const cursorImg = document.getElementById('cursor-img');
    if (!cursorImg) return;

    const params = new URLSearchParams(window.location.search);
    const storedPosition = (() => {
        try {
            return JSON.parse(sessionStorage.getItem('sparkleCursorPosition') || 'null');
        } catch {
            return null;
        }
    })();

    const readNumber = (value) => {
        const number = Number(value);
        return Number.isFinite(number) ? number : null;
    };

    const initialX = readNumber(params.get('cx')) ?? readNumber(storedPosition?.x);
    const initialY = readNumber(params.get('cy')) ?? readNumber(storedPosition?.y);

    const placeCursor = (x, y) => {
        cursorImg.style.left = `${x}px`;
        cursorImg.style.top = `${y}px`;
        cursorImg.style.opacity = '1';

        try {
            sessionStorage.setItem('sparkleCursorPosition', JSON.stringify({ x, y }));
        } catch {
            // Ignore storage failures; live pointer movement still works.
        }
    };

    cursorImg.style.opacity = '0';

    if (initialX !== null && initialY !== null) {
        placeCursor(initialX, initialY);
    }

    document.addEventListener('mousemove', (event) => {
        placeCursor(event.clientX, event.clientY);
    });

    document.querySelectorAll('a, button, [role="button"], .die-container').forEach((element) => {
        element.addEventListener('mouseenter', () => {
            cursorImg.style.transform = 'translate(-50%, -50%) scale(0.65) rotate(45deg)';
        });
        element.addEventListener('mouseleave', () => {
            cursorImg.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
        });
    });
})();
