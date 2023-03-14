function toggleTheme() {
    if (localStorage.theme === 'dark') {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    applyTheme();
}

function applyTheme() {
    if (localStorage.theme === 'dark') {
        document.querySelector('#theme-toggler .dark').classList.add('hidden');
        document.querySelector('#theme-toggler .light').classList.remove('hidden');
        document.body.classList.add('dark');
    } else {
        document.querySelector('#theme-toggler .dark').classList.remove('hidden');
        document.querySelector('#theme-toggler .light').classList.add('hidden');
        document.body.classList.remove('dark');
    }
}

window.addEventListener('load', () => {
    applyTheme();
    document.querySelector('#theme-toggler').classList.remove('hidden');
});
