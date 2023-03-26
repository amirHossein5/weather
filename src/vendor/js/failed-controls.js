export function showFailedControlsSection(msg = 'Failed to get weather') {
    let section = document.querySelector('#failed-controls');

    section.querySelector('[data-fail-message]').innerText = msg;
    section.classList.remove('hidden');
}
