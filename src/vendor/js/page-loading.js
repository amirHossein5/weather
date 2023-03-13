import {setAttributes} from '@vendor/js/helpers'

export function show(msg = 'is loading...') {
    let loadingEl = document.createElement('div');
    let loadingText = document.createElement('p');

    setAttributes(loadingEl, [
        ['id', '#pageLoading'],
        ['class', 'fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center text-xl bg-[var(--theme-bg)]'],
    ])
    setAttributes(loadingText, [
        ['class', 'animate-pulse']
    ])

    loadingText.innerText = msg;
    loadingEl.append(loadingText);
    document.querySelector('body').append(loadingEl)
}

export function hide() {
    document.querySelector('body').childNodes.forEach((child) => {
        if (child.id === '#pageLoading') child.remove();
    });
}

export function changeMsg(msg = 'is loading...') {
    document.querySelector('body').childNodes.forEach((child) => {
        if (child.id === '#pageLoading') {
            child.querySelector('p').innerText = msg;
        }
    });
}
