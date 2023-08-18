// ==UserScript==
// @name         Wrestle Universe | toggle comment feed
// @namespace    https://www.wrestle-universe.com/
// @version      0.0.1
// @description  Toggle the visibility of comment feed on button click
// @author       keima
// @match        https://www.wrestle-universe.com/*/lives/*
// @match        https://www.wrestle-universe.com/*/videos/*
// @grant        none
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/keima/wrestle-universe-user-scripts/main/wu-toggle-comment.user.js
// @downloadURL  https://raw.githubusercontent.com/keima/wrestle-universe-user-scripts/main/wu-toggle-comment.user.js
// ==/UserScript==

(function() {
    'use strict';

    // config
    const BUTTON_TEXT = "💬";
    const ID_TOGGLE_BUTTON = "toggle-ul-visibility-button";
    const QUERY_COMMENT_LIST = "ul.space-y-4px.overflow-y-auto";

    const QUERY_COMMENT_FEED_HEADER = 'div.grid.items-center.gap-x-4px.p-12px.grid-cols-\\[1fr\\,auto\\].bg-bg-high-gray.rounded';
    const COMMENT_FEED_HEADER_CLASSNAME_REPLACED = 'grid items-center gap-x-4px p-12px grid-cols-[auto,1fr,auto] bg-bg-high-gray rounded';

    function toggleVisibility() {
        const ulElement = document.querySelector(QUERY_COMMENT_LIST);
        if (ulElement) {
            ulElement.style.display = ulElement.style.display === 'none' ? '' : 'none';
        }
    }

    function addButton(container) {
        if (document.getElementById(ID_TOGGLE_BUTTON)) {
            console.log("button already exists");
            return;
        }

        const button = document.createElement('button');
        button.id = ID_TOGGLE_BUTTON;
        button.textContent = BUTTON_TEXT;
        button.addEventListener('click', toggleVisibility);
        container.prepend(button);
    }

    function observeChanges() {
        const targetNode = document.body;
        const config = { childList: true, subtree: true };
        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    const container = document.querySelector(QUERY_COMMENT_FEED_HEADER);
                    console.log("observeChanges", container);
                    if (container) {
                        addButton(container);
                        container.className = COMMENT_FEED_HEADER_CLASSNAME_REPLACED;
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
