// --- 1. Forzar que el navegador vuelva arriba al recargar la página ---
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
});

window.addEventListener('load', function () {
    window.scrollTo(0, 0);
});


// --- 2. FONDO ANIMADO DE ONDAS GEOMÉTRICAS (FLUIDO, RÁPIDO Y LIMPIO) ---
(function() {
    if (document.getElementById('gold-wave-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'gold-wave-canvas';
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    let step = 0;
    let animationFrameId = null;

    function drawAbstractWaves() {
        // Limpiamos de forma transparente para que el fondo CSS (#0b0b0b) mande sin bloques extraños
        ctx.clearRect(0, 0, width, height);

        ctx.lineWidth = 1.5;

        // Cantidad de líneas optimizada para máxima velocidad sin lag
        const totalLines = 12; 

        const waveSets = [
            { offsetY: height * 0.3, speedMultiplier: 0.005 }, 
            { offsetY: height * 0.6, speedMultiplier: 0.003 }
        ];

        waveSets.forEach((set) => {
            for (let i = 0; i < totalLines; i++) {
                ctx.beginPath();

                let alpha = (1 - (i / totalLines)) * 0.6 + 0.2;
                ctx.strokeStyle = i % 2 === 0 ? `rgba(255, 215, 0, ${alpha})` : `rgba(212, 175, 55, ${alpha})`;

                // Salto optimizado (25 en 25) para que vuele sin ralentizar la web
                for (let x = 0; x <= width; x += 25) {
                    let waveFactor = x * 0.0015;
                    let y = set.offsetY + 
                            Math.sin(waveFactor + (step * set.speedMultiplier) + (i * 0.08)) * (140 + (i * 5)) +
                            Math.cos((x * 0.003) - (step * 0.004)) * 70;

                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            }
        });

        step += 1;
        animationFrameId = requestAnimationFrame(drawAbstractWaves);
    }

    drawAbstractWaves();

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else {
            drawAbstractWaves();
        }
    });
})();