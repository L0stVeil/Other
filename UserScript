// ==UserScript==
// @name         volcano bypasser
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  advanced volcano key bypass
// @author       l0stveil
// @match        https://key.volcano.best/*
// @match        https://linkvertise.com/42709/*
// @match        https://key.volcano.best/checkpoint_1*
// @match        https://key.volcano.best/checkpoint_2*
// @match        https://key.volcano.best/checkpoint_3*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=volcano.best
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const bypass = {
        init: function() {
            this.styles();
            this.main();
        },

        styles: function() {
            GM_addStyle(`
                .status-bar {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: rgba(20, 20, 25, 0.9);
                    color: #fff;
                    padding: 8px;
                    text-align: center;
                    z-index: 9999;
                    font-family: 'Segoe UI', sans-serif;
                    font-size: 12px;
                    border-top: 2px solid;
                    border-image: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff) 1;
                    transform: translateY(100%);
                    animation: slideUp 0.5s forwards;
                    backdrop-filter: blur(5px);
                }

                @keyframes slideUp {
                    to { transform: translateY(0); }
                }

                .cf-turnstile {
                    border: 3px solid transparent !important;
                    border-radius: 8px !important;
                    box-shadow: 0 0 25px rgba(255, 68, 68, 0.6) !important;
                    padding: 5px !important;
                    margin: 15px auto !important;
                    animation: glowPulse 2s infinite alternate, rainbowBorder 8s infinite linear;
                    position: relative;
                }

                @keyframes glowPulse {
                    from { box-shadow: 0 0 15px rgba(255, 68, 68, 0.4); }
                    to { box-shadow: 0 0 30px rgba(255, 68, 68, 0.8); }
                }

                @keyframes rainbowBorder {
                    0% { border-color: #ff0000; }
                    15% { border-color: #ff7f00; }
                    30% { border-color: #ffff00; }
                    45% { border-color: #00ff00; }
                    60% { border-color: #0000ff; }
                    75% { border-color: #4b0082; }
                    90% { border-color: #8b00ff; }
                    100% { border-color: #ff0000; }
                }

                button[type="submit"],
                button.button-glow,
                button[onclick="myFunction()"] {
                    border: 3px solid transparent !important;
                    box-shadow: 0 0 20px rgba(16, 185, 129, 0.6) !important;
                    transform: scale(1.05);
                    margin: 15px auto !important;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
                    animation: rainbowBorder 8s infinite linear;
                    position: relative;
                    background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff) !important;
                    background-size: 400% 400% !important;
                    animation: rainbowBg 10s ease infinite !important;
                }

                @keyframes rainbowBg {
                    0% { background-position: 0% 50% }
                    50% { background-position: 100% 50% }
                    100% { background-position: 0% 50% }
                }

                button[type="submit"]:hover,
                button.button-glow:hover,
                button[onclick="myFunction()"]:hover {
                    transform: scale(1.1) translateY(-2px) !important;
                    box-shadow: 0 0 30px rgba(16, 185, 129, 0.8) !important;
                }

                button[onclick*="lootlabs"] {
                    opacity: 0.5 !important;
                    text-decoration: line-through !important;
                    pointer-events: none !important;
                    position: relative !important;
                }

                button[onclick*="lootlabs"]::after {
                    content: "not supported";
                    position: absolute;
                    top: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #FF4444;
                    color: white;
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 10px;
                    white-space: nowrap;
                }

                input#key {
                    border: 3px solid transparent !important;
                    box-shadow: 0 0 20px rgba(255, 68, 68, 0.6) !important;
                    animation: glowPulse 2s infinite alternate, rainbowBorder 8s infinite linear;
                }

                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(15, 23, 42, 0.95);
                    z-index: 9998;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    font-family: 'Segoe UI', sans-serif;
                    opacity: 0;
                    animation: fadeIn 0.5s forwards;
                    backdrop-filter: blur(10px);
                }

                @keyframes fadeIn {
                    to { opacity: 1; }
                }

                .action-btn {
                    background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff) !important;
                    background-size: 400% 400% !important;
                    animation: rainbowBg 10s ease infinite !important;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    margin-top: 20px;
                    cursor: pointer;
                    font-weight: bold;
                    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
                    transition: all 0.3s ease;
                    transform: translateY(0);
                    position: relative;
                    overflow: hidden;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 150px;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
                }

                .action-btn:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: all 0.6s ease;
                }

                .action-btn:hover:before {
                    left: 100%;
                }

                .action-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.7);
                }

                .action-btn:active {
                    transform: translateY(0);
                }

                .settings-panel {
                    position: fixed;
                    top: 10px;
                    right: 10px;
                    background: rgba(32, 32, 32, 0.9);
                    border-radius: 12px;
                    padding: 20px;
                    z-index: 9999;
                    font-family: 'Segoe UI', sans-serif;
                    color: white;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
                    transform: translateX(120%);
                    animation: slideIn 0.4s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    backdrop-filter: blur(10px);
                    min-width: 280px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                @keyframes slideIn {
                    to { transform: translateX(0); }
                }

                .setting-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                    opacity: 0;
                    animation: fadeIn 0.3s forwards;
                    animation-delay: calc(var(--i) * 0.1s);
                    padding: 8px;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.05);
                }

                .setting-item:hover {
                    background: rgba(255, 255, 255, 0.1);
                }

                .setting-item input {
                    margin-right: 12px;
                    width: 18px;
                    height: 18px;
                    accent-color: #5865F2;
                }

                .settings-title {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    text-align: center;
                    text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
                    opacity: 0;
                    animation: fadeIn 0.3s forwards;
                    background: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradientMove 3s linear infinite;
                }

                @keyframes gradientMove {
                    to { background-position: 200% center; }
                }

                .settings-buttons {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                    opacity: 0;
                    animation: fadeIn 0.3s forwards;
                    animation-delay: 0.3s;
                }

                .settings-btn {
                    background: #5865F2;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    box-shadow: 0 0 10px rgba(88, 101, 242, 0.3);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
                }

                .settings-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 0 15px rgba(88, 101, 242, 0.5);
                    background: #4752C4;
                }

                .discord-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #5865F2;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    box-shadow: 0 0 10px rgba(88, 101, 242, 0.3);
                    transition: all 0.3s ease;
                    margin-top: 15px;
                    text-decoration: none;
                    font-weight: bold;
                }

                .discord-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 0 15px rgba(88, 101, 242, 0.5);
                    background: #4752C4;
                }

                .discord-icon {
                    width: 20px;
                    height: 20px;
                    margin-right: 8px;
                    filter: brightness(0) invert(1);
                }

                .settings-icon {
                    position: fixed;
                    top: 15px;
                    right: 15px;
                    background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff);
                    background-size: 400% 400%;
                    animation: rainbowBg 10s ease infinite;
                    color: white;
                    border: none;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-weight: bold;
                    z-index: 9999;
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
                    transition: all 0.3s ease;
                    transform: scale(0);
                    animation: popIn 0.5s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    animation-delay: 0.5s;
                    font-size: 24px;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
                }

                @keyframes popIn {
                    to { transform: scale(1); }
                }

                .settings-icon:hover {
                    transform: scale(1.1) rotate(30deg);
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
                }

                .instruction-bubble {
                    position: fixed;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(32, 32, 32, 0.9);
                    color: #FFFF00;
                    padding: 12px 20px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-family: 'Segoe UI', sans-serif;
                    z-index: 9997;
                    max-width: 300px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    text-align: center;
                    font-weight: bold;
                }

                .notification {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%) translateY(-100px);
                    background: rgba(32, 32, 32, 0.9);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-family: 'Segoe UI', sans-serif;
                    z-index: 10000;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
                }

                .final-message {
                    position: fixed;
                    bottom: 70px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(32, 32, 32, 0.9);
                    color: #FFFF00;
                    padding: 10px 15px;
                    border-radius: 10px;
                    font-family: 'Segoe UI', sans-serif;
                    font-size: 14px;
                    z-index: 10000;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    text-align: center;
                    font-weight: bold;
                    max-width: 250px;
                }
            `);
        },

        main: function() {
            const currentUrl = window.location.href;

            const settingsBtn = document.createElement('button');
            settingsBtn.innerHTML = '⚙️';
            settingsBtn.style.position = 'fixed';
            settingsBtn.style.top = '15px';
            settingsBtn.style.right = '15px';
            settingsBtn.style.zIndex = '999999';
            settingsBtn.style.width = '50px';
            settingsBtn.style.height = '50px';
            settingsBtn.style.borderRadius = '50%';
            settingsBtn.style.border = 'none';
            settingsBtn.style.background = 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)';
            settingsBtn.style.backgroundSize = '400% 400%';
            settingsBtn.style.animation = 'rainbowBg 10s ease infinite';
            settingsBtn.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.7)';
            settingsBtn.style.fontSize = '24px';
            settingsBtn.style.cursor = 'pointer';
            settingsBtn.onclick = this.showSettings.bind(this);
            document.body.appendChild(settingsBtn);

            const statusBar = document.createElement('div');
            statusBar.className = 'status-bar';
            statusBar.textContent = 'made by L0stVeil (@1311743263241277462) and Await (@738698720635256872)';
            document.body.appendChild(statusBar);

            if (this.getSetting('showHints', true)) {
                this.showHints();
            }

            if (currentUrl.includes('key.volcano.best/lootlabs')) {
                window.location.href = 'https://key.volcano.best/';
                return;
            }

            if (currentUrl.includes('key.volcano.best/checkpoint_3')) {
                const keyInput = document.getElementById('key');
                if (keyInput) {
                    const keyValue = keyInput.value;
                    console.log('key found:', keyValue);

                    setTimeout(() => {
                        const finalMsg = document.createElement('div');
                        finalMsg.className = 'final-message';
                        finalMsg.textContent = 'copy the key and redeem it in volcano executor';
                        document.body.appendChild(finalMsg);
                    }, 1000);
                }
            } else if (currentUrl.includes('linkvertise.com/42709/')) {
                const overlay = document.createElement('div');
                overlay.className = 'overlay';

                const title = document.createElement('h2');
                title.textContent = 'bypassing linkvertise...';
                overlay.appendChild(title);

                const subtitle = document.createElement('p');
                subtitle.textContent = 'please wait while we process your request';
                overlay.appendChild(subtitle);

                document.body.appendChild(overlay);

                setTimeout(() => {
                    const bypassUrl = 'https://bypassunlock.com/api/bypass?url=' + encodeURIComponent(window.location.href);

                    try {
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: bypassUrl,
                            onload: function(response) {
                                try {
                                    const responseData = JSON.parse(response.responseText);

                                    if (responseData.success && responseData.result) {
                                        title.textContent = 'bypass successful!';
                                        bypass.showNotification('Bypass successful!', true);

                                        if (bypass.getSetting('autoRedirect', false)) {
                                            subtitle.textContent = 'redirecting to destination...';
                                            setTimeout(() => {
                                                window.location.href = responseData.result;
                                            }, 1500);
                                        } else {
                                            subtitle.textContent = 'bypass link:';

                                            const linkBox = document.createElement('div');
                                            linkBox.style.marginTop = '15px';
                                            linkBox.style.padding = '15px';
                                            linkBox.style.background = 'rgba(0,0,0,0.3)';
                                            linkBox.style.borderRadius = '8px';
                                            linkBox.style.wordBreak = 'break-all';
                                            linkBox.style.maxWidth = '80%';
                                            linkBox.style.boxShadow = '0 0 15px rgba(0,0,0,0.3)';
                                            linkBox.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                                            linkBox.style.animation = 'fadeIn 0.5s forwards';
                                            linkBox.textContent = responseData.result;
                                            overlay.appendChild(linkBox);

                                            const buttonContainer = document.createElement('div');
                                            buttonContainer.style.display = 'flex';
                                            buttonContainer.style.justifyContent = 'center';
                                            buttonContainer.style.width = '100%';
                                            buttonContainer.style.marginTop = '15px';

                                            const copyBtn = document.createElement('button');
                                            copyBtn.className = 'action-btn';
                                            copyBtn.textContent = 'copy link';
                                            copyBtn.style.marginRight = '10px';
                                            copyBtn.onclick = function() {
                                                navigator.clipboard.writeText(responseData.result).then(() => {
                                                    copyBtn.textContent = 'copied!';
                                                    bypass.showNotification('Link copied!');
                                                    setTimeout(() => {
                                                        copyBtn.textContent = 'copy link';
                                                    }, 2000);
                                                });
                                            };

                                            const goBtn = document.createElement('button');
                                            goBtn.className = 'action-btn';
                                            goBtn.textContent = 'go to link';
                                            goBtn.onclick = function() {
                                                window.location.href = responseData.result;
                                            };

                                            buttonContainer.appendChild(copyBtn);
                                            buttonContainer.appendChild(goBtn);
                                            overlay.appendChild(buttonContainer);
                                        }
                                    } else {
                                        title.textContent = 'bypass failed!';
                                        subtitle.textContent = 'please join discord for support';

                                        const retryBtn = document.createElement('button');
                                        retryBtn.className = 'action-btn';
                                        retryBtn.textContent = 'try again';
                                        retryBtn.onclick = function() {
                                            window.location.reload();
                                        };
                                        overlay.appendChild(retryBtn);

                                        const discordBtn = document.createElement('a');
                                        discordBtn.className = 'discord-btn';
                                        discordBtn.href = 'https://discord.gg/ZxprC4tHaN';
                                        discordBtn.target = '_blank';
                                        discordBtn.innerHTML = '<svg class="discord-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/></svg> join discord';
                                        overlay.appendChild(discordBtn);
                                    }
                                } catch (error) {
                                    title.textContent = 'error processing response!';
                                    subtitle.textContent = 'please join discord for support';

                                    const retryBtn = document.createElement('button');
                                    retryBtn.className = 'action-btn';
                                    retryBtn.textContent = 'try again';
                                    retryBtn.onclick = function() {
                                        window.location.reload();
                                    };
                                    overlay.appendChild(retryBtn);

                                    const discordBtn = document.createElement('a');
                                    discordBtn.className = 'discord-btn';
                                    discordBtn.href = 'https://discord.gg/ZxprC4tHaN';
                                    discordBtn.target = '_blank';
                                    discordBtn.innerHTML = '<svg class="discord-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/></svg> join discord';
                                    overlay.appendChild(discordBtn);
                                }
                            },
                            onerror: function() {
                                title.textContent = 'bypass request failed!';
                                subtitle.textContent = 'please join discord for support';

                                const retryBtn = document.createElement('button');
                                retryBtn.className = 'action-btn';
                                retryBtn.textContent = 'try again';
                                retryBtn.onclick = function() {
                                    window.location.reload();
                                };
                                overlay.appendChild(retryBtn);

                                const discordBtn = document.createElement('a');
                                discordBtn.className = 'discord-btn';
                                discordBtn.href = 'https://discord.gg/ZxprC4tHaN';
                                discordBtn.target = '_blank';
                                discordBtn.innerHTML = '<svg class="discord-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/></svg> join discord';
                                overlay.appendChild(discordBtn);
                            }
                        });
                    } catch (error) {
                        title.textContent = 'bypass error!';
                        subtitle.textContent = 'please join discord for support';

                        const retryBtn = document.createElement('button');
                        retryBtn.className = 'action-btn';
                        retryBtn.textContent = 'try again';
                        retryBtn.onclick = function() {
                            window.location.reload();
                        };
                        overlay.appendChild(retryBtn);

                        const discordBtn = document.createElement('a');
                        discordBtn.className = 'discord-btn';
                        discordBtn.href = 'https://discord.gg/ZxprC4tHaN';
                        discordBtn.target = '_blank';
                        discordBtn.innerHTML = '<svg class="discord-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/></svg> join discord';
                        overlay.appendChild(discordBtn);
                    }
                }, 1000);
            }
        },

        showSettings: function() {
            const existingPanel = document.querySelector('.settings-panel');
            if (existingPanel) {
                existingPanel.remove();
                return;
            }

            const panel = document.createElement('div');
            panel.className = 'settings-panel';

            const title = document.createElement('div');
            title.className = 'settings-title';
            title.textContent = 'volcano settings';
            panel.appendChild(title);


            const redirectItem = document.createElement('div');
            redirectItem.className = 'setting-item';
            redirectItem.style.setProperty('--i', '1');

            const redirectCheck = document.createElement('input');
            redirectCheck.type = 'checkbox';
            redirectCheck.id = 'autoRedirect';
            redirectCheck.checked = this.getSetting('autoRedirect', false);
            redirectCheck.onchange = () => {
                this.saveSetting('autoRedirect', redirectCheck.checked);
            };

            const redirectLabel = document.createElement('label');
            redirectLabel.htmlFor = 'autoRedirect';
            redirectLabel.textContent = 'auto redirect';

            redirectItem.appendChild(redirectCheck);
            redirectItem.appendChild(redirectLabel);
            panel.appendChild(redirectItem);


            const copyItem = document.createElement('div');
            copyItem.className = 'setting-item';
            copyItem.style.setProperty('--i', '2');

            const copyCheck = document.createElement('input');
            copyCheck.type = 'checkbox';
            copyCheck.id = 'autoCopy';
            copyCheck.checked = this.getSetting('autoCopy', false);
            copyCheck.onchange = () => {
                this.saveSetting('autoCopy', copyCheck.checked);
            };

            const copyLabel = document.createElement('label');
            copyLabel.htmlFor = 'autoCopy';
            copyLabel.textContent = 'auto copy key';

            copyItem.appendChild(copyCheck);
            copyItem.appendChild(copyLabel);
            panel.appendChild(copyItem);


            const discordContainer = document.createElement('div');
            discordContainer.style.marginTop = '20px';
            discordContainer.style.textAlign = 'center';

            const discordBtn = document.createElement('a');
            discordBtn.className = 'discord-btn';
            discordBtn.href = 'https://discord.gg/ZxprC4tHaN';
            discordBtn.target = '_blank';
            discordBtn.innerHTML = '<svg class="discord-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/></svg> join discord';
            discordContainer.appendChild(discordBtn);
            panel.appendChild(discordContainer);

            // Buttons
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'settings-buttons';

            const closeBtn = document.createElement('button');
            closeBtn.className = 'settings-btn';
            closeBtn.textContent = 'close';
            closeBtn.onclick = () => panel.remove();

            const resetBtn = document.createElement('button');
            resetBtn.className = 'settings-btn';
            resetBtn.textContent = 'reset';
            resetBtn.onclick = () => {
                this.resetSettings();
                panel.remove();
                this.showSettings();
            };

            buttonsDiv.appendChild(resetBtn);
            buttonsDiv.appendChild(closeBtn);
            panel.appendChild(buttonsDiv);

            document.body.appendChild(panel);
        },

        showNotification: function(message, playSound = false) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.transform = 'translateX(-50%) translateY(0)';

                if (playSound) {
                    try {
                        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                        const oscillator = audioCtx.createOscillator();
                        const gainNode = audioCtx.createGain();

                        oscillator.connect(gainNode);
                        gainNode.connect(audioCtx.destination);

                        oscillator.type = 'sine';
                        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
                        oscillator.frequency.setValueAtTime(1320, audioCtx.currentTime + 0.1);

                        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

                        oscillator.start();
                        oscillator.stop(audioCtx.currentTime + 0.5);
                    } catch (e) {
                        console.log('audio playback failed:', e);
                    }
                }

                setTimeout(() => {
                    notification.style.transform = 'translateX(-50%) translateY(-100px)';
                    setTimeout(() => notification.remove(), 500);
                }, 3000);
            }, 100);
        },

        showHints: function() {
            this.removeHints();
        },

        removeHints: function() {
            const hints = document.querySelectorAll('.instruction-bubble');
            hints.forEach(hint => hint.remove());
        },

        getSetting: function(key, defaultValue) {
            const value = GM_getValue(key);
            return value !== undefined ? value : defaultValue;
        },

        saveSetting: function(key, value) {
            GM_setValue(key, value);
        },

        resetSettings: function() {
            GM_setValue('autoRedirect', false);
            GM_setValue('autoCopy', false);
        }
    };

    bypass.init();
})();
