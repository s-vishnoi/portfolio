(() => {
    const pairs = [
        ...document.querySelectorAll('.about-work-card'),
        ...document.querySelectorAll('#animation-container')
    ];

    function titleLineWidth(title) {
        const range = document.createRange();
        range.selectNodeContents(title);
        const lineWidths = [...range.getClientRects()].map((rect) => rect.width);
        let width = lineWidths.length ? Math.max(...lineWidths) : title.getBoundingClientRect().width;

        if (title.classList.contains('about-work-title')) {
            width += parseFloat(getComputedStyle(title).fontSize) * 1.05;
        }

        return width;
    }

    function syncDescriptorWidths() {
        pairs.forEach((container) => {
            const title = container.querySelector('.about-work-title, .project-title');
            const descriptor = container.querySelector('.about-work-meta, .detail-meta');
            if (!title || !descriptor) return;

            const availableWidth = container.clientWidth;
            const measuredWidth = titleLineWidth(title);
            descriptor.style.width = `${Math.min(measuredWidth, availableWidth)}px`;
        });
    }

    let frame;
    function scheduleSync() {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(syncDescriptorWidths);
    }

    window.addEventListener('resize', scheduleSync, { passive: true });
    window.addEventListener('load', scheduleSync);
    document.fonts?.ready.then(scheduleSync);
    scheduleSync();
})();
