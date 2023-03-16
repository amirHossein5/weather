const themeTogglerSection = document.querySelector('#theme-toggler');
const darkThemeToggler = themeTogglerSection.querySelector('.dark');
const lightThemeToggler = themeTogglerSection.querySelector('.light');
const LIGHT = 'light';
const DARK = 'dark';

export function changeThemeToLight() {
    localStorage.setItem('theme', LIGHT);
    applyTheme();
}

export function changeThemeToDark() {
    localStorage.setItem('theme', DARK);
    applyTheme();
}

export function applyTheme() {
    if (localStorage.theme === DARK) {
        applyDarkThemeClasses();
        return;
    }
    if (localStorage.theme === LIGHT) {
        applyLightThemeClasses();
        return;
    }
    if (userDevicePrefersDarkTheme()) {
        applyDarkThemeClasses();
        return;
    }

    applyLightThemeClasses();
}

function userDevicePrefersDarkTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyDarkThemeClasses() {
    darkThemeToggler.classList.add('hidden');
    lightThemeToggler.classList.remove('hidden');
    document.body.classList.add('dark');
    themeTogglerSection.classList.remove('hidden');
}

function applyLightThemeClasses() {
    darkThemeToggler.classList.remove('hidden');
    lightThemeToggler.classList.add('hidden');
    document.body.classList.remove('dark');
    themeTogglerSection.classList.remove('hidden');
}
