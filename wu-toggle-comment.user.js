// ==UserScript==
// @name         Toggle comment Visibility
// @namespace    https://www.wrestle-universe.com/
// @version      0.0.1
// @description  Toggle the visibility of comment feed on button click
// @author       keima
// @match        https://www.wrestle-universe.com/*/lives/*
// @match        https://www.wrestle-universe.com/*/videos/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const BUTTON_TEXT = "💬";

    function toggleVisibility() {
        const ulElement = document.querySelector('ul.space-y-4px.overflow-y-auto.scroll-smooth');
        if (ulElement) {
            ulElement.style.display = ulElement.style.display === 'none' ? '' : 'none';
        }
    }

    function addButton(container) {
        if (document.getElementById('toggle-ul-visibility-button')) {
            return;
        }

        const button = document.createElement('button');
        button.id = 'toggle-ul-visibility-button';
        button.textContent = BUTTON_TEXT;
        button.addEventListener('click', toggleVisibility);
        container.prepend(button);
        container.className = 'grid items-center gap-x-4px p-12px grid-cols-[auto,1fr,auto] bg-bg-high-gray rounded';
    }

    function observeChanges() {
        const targetNode = document.body;
        const config = { childList: true, subtree: true };
        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    const container = document.querySelector('div.grid.items-center.gap-x-4px.p-12px.grid-cols-\\[1fr\\,auto\\].bg-bg-high-gray.rounded');
                    console.log("observeChanges", container);
                    if (container) {
                        addButton(container);
                        // observer.disconnect();
                        break;
                    }
                }
            }
        });
        observer.observe(targetNode, config);
    }

    observeChanges();
})();
