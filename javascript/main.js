// Forzar que el navegador vuelva arriba al recargar la página
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
});

window.addEventListener('load', function () {
    window.scrollTo(0, 0);
});