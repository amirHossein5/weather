function toggleTheme() {
    if (localStorage.theme === 'dark') {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    applyTheme();
}

function applyTheme() {
    if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        document.querySelector('#theme-toggler .dark').classList.add('hidden');
        document.querySelector('#theme-toggler .light').classList.remove('hidden');
        document.body.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        document.querySelector('#theme-toggler .dark').classList.remove('hidden');
        document.querySelector('#theme-toggler .light').classList.add('hidden');
        document.body.classList.remove('dark');
        localStorage.theme = 'light';
    }
}

window.addEventListener('load', () => {
    applyTheme();
    document.querySelector('#theme-toggler').classList.remove('hidden');
});
