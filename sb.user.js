// ==UserScript==
// @name         scriptblox auto acc
// @namespace    http://tampermonkey.net/
// @version      69420
// @description  email generator for scriptblox
// @author       by l0stveil aka mxxer
// @match        https://scriptblox.com/signup
// @match        https://scriptblox.com/verify*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @connect      emailnator.com
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const v1 = Math.floor(Math.random() * 100);
    const v2 = Math.floor(Math.random() * 100);

    let v3 = false;
    let v4 = [];
    let v5 = 0;

    const v6 = () => {
        const v7 = Math.floor(Math.random() * 5) + 12;
        const v8 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
        let v9 = "";
        for (let v10 = 0; v10 < v7; v10++) {
            v9 += v8.charAt(Math.floor(Math.random() * v8.length));
        }
        return v9;
    };

    const v11 = (v12) => {
        console.log(`v${v1}.${v2} | ${v12}`);
    };

    let v13 = {};
    let v150 = 0;
    let v151 = {};

    const v14 = (v15, v16, v17 = 'info', v18 = null) => {
        const v152 = v16 + v17;
        const v153 = Date.now();

        if (v151[v152] && v153 - v151[v152] < 5000) {
            return;
        }

        v151[v152] = v153;

        if (v18 && v13[v18]) {
            v13[v18].remove();
            delete v13[v18];
        }

        let v164 = Object.keys(v13).length;
        for (let v165 in v13) {
            const v166 = v13[v165];
            v166.style.bottom = `${20 + (v164 * 70)}px`;
            v164--;
        }

        const v154 = 20 + (Object.keys(v13).length * 70);

        const v19 = document.createElement('div');
        v19.style = `position:fixed;bottom:${v154}px;right:20px;z-index:99999;background:#1c1c1c;color:white;padding:15px;border-radius:8px;font-family:Poppins,sans-serif;min-width:280px;max-width:320px;box-shadow:0 5px 15px rgba(0,0,0,0.5);animation:fadeIn 0.3s;border:2px solid #ff6600;transform:translateX(0);transition:all 0.3s ease;`;

        let v167 = '#ff6600';
        if (v17 === 'error') v167 = '#f44336';
        if (v17 === 'success') v167 = '#4CAF50';

        const v20 = document.createElement('div');
        v20.style = `position:absolute;top:0;left:0;height:4px;width:100%;background:linear-gradient(to right,${v167},#ff9900,${v167});animation:rainbow 3s linear infinite;background-size:200% auto;`;
        v19.appendChild(v20);

        v19.innerHTML += `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <span style="font-weight:bold;color:${v167};font-size:16px">${v15}</span>
                <span style="cursor:pointer;font-size:18px" onclick="this.parentNode.parentNode.remove()">×</span>
            </div>
            <div style="font-size:14px">${v16}</div>
        `;

        document.body.appendChild(v19);
        if (v18) v13[v18] = v19;

        const v155 = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) {
                if (v18) delete v13[v18];
                v19.remove();
                v155.disconnect();

                let v168 = Object.keys(v13).length;
                for (let v169 in v13) {
                    const v170 = v13[v169];
                    v170.style.bottom = `${20 + (v168 * 70)}px`;
                    v168--;
                }
            }
        });

        v155.observe(v19);

        if (v17 !== 'error') {
            const v156 = document.createElement('div');
            v156.style = `position:absolute;bottom:0;left:0;height:3px;width:100%;background:${v167};transform-origin:left;`;
            v19.appendChild(v156);

            const v157 = v17 === 'success' ? 6000 : 4000;
            v156.animate([
                { transform: 'scaleX(1)' },
                { transform: 'scaleX(0)' }
            ], {
                duration: v157,
                easing: 'linear',
                fill: 'forwards'
            });

            setTimeout(() => {
                v19.style.animation = 'fadeOut 0.3s forwards';
                v19.style.opacity = '0';
                v19.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    v19.remove();
                    if (v18) delete v13[v18];

                    let v171 = Object.keys(v13).length;
                    for (let v172 in v13) {
                        const v173 = v13[v172];
                        v173.style.bottom = `${20 + (v171 * 70)}px`;
                        v171--;
                    }
                }, 300);
            }, v157);
        }
    };

    const v21 = () => {
        return new Promise((v22, v23) => {
            v11('getting emailnator session');

            GM_xmlhttpRequest({
                method: "GET",
                url: "https://www.emailnator.com/",
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
                },
                onload: function(v24) {
                    const v25 = v24.responseHeaders.split('\n')
                        .filter(v26 => v26.toLowerCase().startsWith('set-cookie:'))
                        .map(v26 => v26.slice('set-cookie:'.length).trim());

                    let v27 = '';
                    let v28 = '';

                    if (v25 && v25.length > 0) {
                        v28 = v25.join('; ');

                        for (const v29 of v25) {
                            if (v29.includes('XSRF-TOKEN=')) {
                                const v30 = v29.match(/XSRF-TOKEN=([^;]+)/);
                                if (v30 && v30[1]) {
                                    v27 = decodeURIComponent(v30[1]);
                                }
                            }
                        }
                    }

                    if (!v27) {
                        const v31 = v24.responseText.match(/<meta name="csrf-token" content="([^"]+)"/);
                        if (v31 && v31[1]) {
                            v27 = v31[1];
                        }
                    }

                    if (v27) {
                        v11('session ready');
                        GM_setValue('emailToken', v27);
                        GM_setValue('emailCookies', v28);
                        v22(v27);
                    } else {
                        v23(new Error('no token found'));
                    }
                },
                onerror: function(v32) {
                    v23(v32);
                }
            });
        });
    };

    const v33 = (v34) => {
        if (!v34 || !v34.includes('@')) return [v34];

        const [v35, v36] = v34.split('@');
        const v37 = v35.length;
        const v38 = [];

        const v39 = 10;

        for (let v40 = 0; v40 < Math.min(Math.pow(2, v37 - 1), v39); v40++) {
            const v41 = [];
            let v42 = 0;

            for (let v43 = 0; v43 < v37; v43++) {
                v41.push(v35.charAt(v43));
                if (v43 < v37 - 1 && (v40 & (1 << v42))) {
                    v41.push('.');
                }
                v42++;
            }

            v38.push(v41.join('') + '@' + v36);
        }

        return v38;
    };

    const v44 = (v45) => {
        if (!v45 || !v45.includes('@')) return [v45];

        const [v46, v47] = v45.split('@');
        const v48 = [];

        for (let v49 = 0; v49 < 5; v49++) {
            const v50 = Math.random().toString(36).substring(2, 7);
            v48.push(`${v46}+${v50}@${v47}`);
        }

        return v48;
    };

    const v51 = (v52, v53) => {
        return new Promise((v54, v55) => {
            if (v52) {
                if (!v53 || !v53.includes('@') || v53.length < 5) {
                    v55(new Error('invalid custom email'));
                    return;
                }

                const v56 = v6();
                v11(`custom email: ${v53}`);
                v11(`password: ${v56}`);
                GM_setValue('genEmail', v53);
                GM_setValue('genPassword', v56);
                v54({email: v53, password: v56});
                return;
            }

            const v57 = Date.now();
            if (v57 - v5 < 1500) {
                setTimeout(() => v51(v52, v53).then(v54).catch(v55), 1500);
                return;
            }

            if (v3) {
                v55(new Error('already generating'));
                return;
            }

            v3 = true;
            v5 = v57;

            const v58 = GM_getValue('emailToken');
            const v59 = GM_getValue('emailCookies');

            if (!v58) {
                v11('no token, getting session');
                v21().then(v60 => {
                    v3 = false;
                    v51(v52, v53).then(v54).catch(v55);
                }).catch(v61 => {
                    v3 = false;
                    v55(v61);
                });
                return;
            }

            v11('generating googlemail email');

            let v62 = ["googleMail"];

            GM_xmlhttpRequest({
                method: "POST",
                url: "https://www.emailnator.com/generate-email",
                headers: {
                    'X-XSRF-TOKEN': v58,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
                    'Content-Type': 'application/json',
                    'Cookie': v59
                },
                data: JSON.stringify({
                    email: v62
                }),
                onload: function(v63) {
                    v3 = false;

                    try {
                        if (v63.status === 419) {
                            v11('token expired, refreshing');
                            GM_setValue('emailToken', null);
                            GM_setValue('emailCookies', null);
                            setTimeout(() => v21().then(v64 => v51(v52, v53).then(v54).catch(v55)).catch(v55), 1000);
                            return;
                        }

                        const v65 = JSON.parse(v63.responseText);
                        if (v65 && v65.email && v65.email[0]) {
                            let v66 = v65.email[0];

                            if (v4.includes(v66)) {
                                v11('duplicate email, trying again');
                                v51(v52, v53).then(v54).catch(v55);
                                return;
                            }

                            const v67 = v6();
                            v11(`email: ${v66}`);
                            v11(`password: ${v67}`);
                            GM_setValue('genEmail', v66);
                            GM_setValue('genPassword', v67);

                            v4.push(v66);
                            if (v4.length > 50) v4.shift();

                            try {
                                const v68 = JSON.parse(localStorage.getItem('generatedEmails') || '[]');
                                v68.push({email: v66, password: v67, date: new Date().toISOString()});
                                localStorage.setItem('generatedEmails', JSON.stringify(v68));
                            } catch (v69) {
                                console.error('Failed to save to localStorage', v69);
                            }

                            v54({email: v66, password: v67});
                        } else {
                            v55(new Error('invalid response'));
                        }
                    } catch (v70) {
                        v55(new Error('Unexpected end of JSON input'));
                    }
                },
                onerror: function(v71) {
                    v3 = false;
                    v55(v71);
                }
            });
        });
    };

    const v72 = (v73) => {
        return new Promise((v74, v75) => {
            const v76 = GM_getValue('emailToken');
            const v77 = GM_getValue('emailCookies');

            if (!v76 || !v77) {
                v11('Missing XSRF token or cookies, initializing new session');
                v21().then(() => v72(v73).then(v74).catch(v75)).catch(v75);
                return;
            }

            v11('checking inbox for: ' + v73);

            GM_xmlhttpRequest({
                method: "POST",
                url: "https://www.emailnator.com/message-list",
                headers: {
                    'X-XSRF-TOKEN': v76,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
                    'Content-Type': 'application/json',
                    'Cookie': v77
                },
                data: JSON.stringify({
                    email: v73
                }),
                onload: function(v78) {
                    try {
                        if (v78.status === 419) {
                            v11('XSRF token expired, refreshing session');
                            GM_setValue('emailToken', null);
                            GM_setValue('emailCookies', null);
                            v21().then(() => v72(v73).then(v74).catch(v75)).catch(v75);
                            return;
                        }

                        const v79 = JSON.parse(v78.responseText);
                        if (v79 && v79.messageData && v79.messageData.length > 0) {
                            const v80 = v79.messageData.find(v81 =>
                                (v81.from && (v81.from.includes("ScriptBlox") || v81.from.toLowerCase().includes("verify"))) ||
                                (v81.subject && (v81.subject.includes("ScriptBlox") || v81.subject.toLowerCase().includes("verify") || v81.subject.toLowerCase().includes("verification")))
                            );

                            if (v80) {
                                v11('found verification email');

                                GM_xmlhttpRequest({
                                    method: "POST",
                                    url: "https://www.emailnator.com/message-list",
                                    headers: {
                                        'X-XSRF-TOKEN': v76,
                                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
                                        'Content-Type': 'application/json',
                                        'Cookie': v77
                                    },
                                    data: JSON.stringify({
                                        email: v73,
                                        messageID: v80.messageID
                                    }),
                                    onload: function(v82) {
                                        try {
                                            const v83 = v82.responseText;

                                            let v84 = '';

                                            const v85 = v83.match(/(\d{8})/g);
                                            if (v85 && v85.length > 0) {
                                                v84 = v85[0];
                                            } else {
                                                const v86 = v83.match(/verification code is (\d+)/i) ||
                                                               v83.match(/verification code: (\d+)/i) ||
                                                               v83.match(/verification code.*?(\d{4,8})/i) ||
                                                               v83.match(/code.*?(\d{4,8})/i);

                                                if (v86 && v86[1]) {
                                                    v84 = v86[1];
                                                } else {
                                                    const v87 = v83.match(/(\d{4,8})/g);
                                                    if (v87 && v87.length > 0) {
                                                        const v88 = v87.filter(v89 => v89.length === 8);
                                                        if (v88.length > 0) {
                                                            v84 = v88[0];
                                                        } else {
                                                            v84 = v87[0];
                                                        }
                                                    }
                                                }
                                            }

                                            if (v84) {
                                                v11('found verification code: ' + v84);
                                                v74(v84);
                                            } else {
                                                v11('could not find verification code in email');
                                                v75(new Error('No verification code found'));
                                            }
                                        } catch (v90) {
                                            v11('failed to parse message: ' + v90.message);
                                            v75(v90);
                                        }
                                    },
                                    onerror: function(v91) {
                                        v11('error fetching message: ' + v91.message);
                                        v75(v91);
                                    }
                                });
                            } else {
                                v11('no verification email found yet, retrying in 3s');
                                setTimeout(() => v72(v73).then(v74).catch(v75), 3000);
                            }
                        } else {
                            v11('no messages found in inbox, retrying in 3s');
                            setTimeout(() => v72(v73).then(v74).catch(v75), 3000);
                        }
                    } catch (v92) {
                        v11('failed to check inbox: ' + v92.message);
                        v75(v92);
                    }
                },
                onerror: function(v93) {
                    v11('error checking inbox: ' + v93.message);
                    v75(v93);
                }
            });
        });
    };

    const v94 = () => {
        const v95 = document.createElement('style');
        v95.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
            @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
            @keyframes fadeOut { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(20px)} }
            @keyframes rainbow { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
            @keyframes pulse { 0%{transform:scale(1)} 50%{transform:scale(1.03)} 100%{transform:scale(1)} }

            .sb-draggable {
                cursor: move;
            }

            @media (max-width: 768px) {
                #scriptblox-generator {
                    max-width: 85% !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                }
            }

            .dot-variant-list {
                max-height: 150px;
                overflow-y: auto;
                margin-top: 5px;
                background: #252525;
                border-radius: 4px;
                padding: 5px;
            }

            .variant-item {
                padding: 5px;
                border-bottom: 1px solid #333;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .copy-btn {
                background: none;
                border: none;
                color: #ff9900;
                cursor: pointer;
                padding: 2px 5px;
            }
        `;
        document.head.appendChild(v95);

        const v96 = document.createElement('div');
        v96.className = 'sb-draggable';
        v96.id = 'scriptblox-generator';
        v96.style = `position:fixed;bottom:20px;left:20px;z-index:99999;background:#1c1c1c;padding:15px;border-radius:8px;font-family:Poppins,sans-serif;box-shadow:0 5px 15px rgba(0,0,0,0.5);animation:fadeIn 0.3s;color:#fff;border:2px solid #ff6600;max-width:300px;`;

        const v97 = document.createElement('div');
        v97.style = 'position:absolute;top:0;left:0;height:4px;width:100%;background:linear-gradient(to right,#ff6600,#ff9900,#ffcc00,#ff6600);animation:rainbow 3s linear infinite;background-size:200% auto;';
        v96.appendChild(v97);

        v96.innerHTML += `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                <div style="font-weight:bold;font-size:16px;color:#ff9900;text-align:center">account maker</div>
                <div style="display:flex;gap:5px;">
                    <div id="show-help" style="cursor:pointer;font-size:20px;color:#ff9900;">?</div>
                </div>
            </div>

            <div style="margin-bottom:10px;">
                <select id="email-type" style="width:100%;background:#333;border:none;color:white;padding:6px;border-radius:4px;font-family:Poppins;margin-bottom:10px;">
                    <option value="googlemail">googlegmail.com</option>
                    <option value="custom">custom email</option>
                </select>
                <div id="custom-email-container" style="display:none;margin-top:5px;">
                    <input id="custom-email-input" type="text" placeholder="Enter your email" style="width:100%;background:#333;border:none;color:white;padding:6px;border-radius:4px;font-family:Poppins;margin-bottom:5px;">
                    <div style="display:flex;gap:5px;margin-bottom:5px;">
                        <button id="add-dots-btn" style="flex:1;background:#333;border:none;color:white;padding:6px;border-radius:4px;cursor:pointer;font-family:Poppins;font-size:12px">add dots</button>
                        <button id="add-plus-btn" style="flex:1;background:#333;border:none;color:white;padding:6px;border-radius:4px;cursor:pointer;font-family:Poppins;font-size:12px">add plus</button>
                    </div>
                    <div id="variants-container" style="display:none;">
                        <div class="dot-variant-list" id="variants-list"></div>
                    </div>
                </div>
            </div>

            <button id="gen-btn" style="width:100%;background:#ff6600;border:none;color:white;padding:8px;border-radius:4px;cursor:pointer;font-family:Poppins;margin-bottom:10px;font-weight:bold;animation:pulse 2s infinite">generate</button>

            <div id="email-display" style="font-size:13px;margin-top:5px;word-break:break-all;display:none">
                <div style="margin-bottom:4px"><span style="color:#ff9900">email:</span> <span id="email-value"></span></div>
                <div><span style="color:#ff9900">password:</span> <span id="pass-value"></span></div>
                <div style="display:flex;gap:5px;margin-top:8px;">
                    <button id="copy-email-btn" style="flex:1;background:#333;border:none;color:white;padding:6px;border-radius:4px;cursor:pointer;font-family:Poppins;font-size:12px">copy email</button>
                    <button id="copy-pass-btn" style="flex:1;background:#333;border:none;color:white;padding:6px;border-radius:4px;cursor:pointer;font-family:Poppins;font-size:12px">copy pass</button>
                </div>
                <div id="verify-container" style="margin-top:5px;">
                    <button id="verify-btn" style="width:100%;background:#333;border:none;color:white;padding:6px;border-radius:4px;cursor:pointer;font-family:Poppins;font-size:12px;">get verify code</button>
                </div>
                <div id="code-display" style="margin-top:8px;display:none;">
                    <div><span style="color:#ff9900">code:</span> <span id="code-value"></span></div>
                    <button id="copy-code-btn" style="width:100%;background:#333;border:none;color:white;padding:6px;border-radius:4px;cursor:pointer;font-family:Poppins;margin-top:5px;font-size:12px">copy code</button>
                </div>
            </div>

            <div style="display:flex;gap:5px;margin-top:10px;">
                <a href="https://discord.com/users/1311743263241277462" target="_blank" style="flex:1;background:#5865F2;border:none;color:white;padding:6px;border-radius:4px;cursor:pointer;font-family:Poppins;font-size:12px;text-decoration:none;text-align:center;display:flex;align-items:center;justify-content:center;gap:5px;">
                    <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg" style="width:15px;height:15px;">
                    my discord profile
                </a>
                <a href="https://discord.com/invite/ZxprC4tHaN" target="_blank" style="flex:1;background:#5865F2;border:none;color:white;padding:6px;border-radius:4px;cursor:pointer;font-family:Poppins;font-size:12px;text-decoration:none;text-align:center;display:flex;align-items:center;justify-content:center;gap:5px;">
                    <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg" style="width:15px;height:15px;">
                    my discord server
                </a>
            </div>
            <div style="text-align:center;margin-top:5px;font-size:10px;color:#666;">made by l0stveil aka mxxer (this script is open source and can be skidded without asking)</div>
        `;

        document.body.appendChild(v96);

        document.getElementById('email-type').addEventListener('change', (v98) => {
            const v99 = document.getElementById('custom-email-container');
            if (v98.target.value === 'custom') {
                v99.style.display = 'block';
            } else {
                v99.style.display = 'none';
            }
        });

        document.getElementById('add-dots-btn').addEventListener('click', () => {
            const v100 = document.getElementById('custom-email-input').value;
            if (!v100 || !v100.includes('@')) {
                v14('error', 'please enter a valid email', 'error', 'invalid-email');
                return;
            }

            const v101 = v33(v100);
            v102(v101);
        });

        document.getElementById('add-plus-btn').addEventListener('click', () => {
            const v103 = document.getElementById('custom-email-input').value;
            if (!v103 || !v103.includes('@')) {
                v14('error', 'please enter a valid email', 'error', 'invalid-email');
                return;
            }

            const v104 = v44(v103);
            v102(v104);
        });

        const v102 = (v105) => {
            const v106 = document.getElementById('variants-list');
            v106.innerHTML = '';

            v105.forEach((v107) => {
                const v108 = document.createElement('div');
                v108.className = 'variant-item';
                v108.innerHTML = `
                    <span style="font-size:12px;word-break:break-all;">${v107}</span>
                    <button class="copy-btn">copy</button>
                `;
                v106.appendChild(v108);

                v108.querySelector('.copy-btn').addEventListener('click', () => {
                    navigator.clipboard.writeText(v107);
                    v14('copied', 'email variant copied', 'success', 'variant-copied');
                    document.getElementById('custom-email-input').value = v107;
                });
            });

            document.getElementById('variants-container').style.display = 'block';
        };

        let v109 = false;
        let v110 = 0;
        let v111 = 0;

        v96.addEventListener('mousedown', (v112) => {
            if (v112.target.className === 'sb-draggable' || v112.target.closest('.sb-draggable')) {
                v109 = true;
                v110 = v112.clientX - v96.getBoundingClientRect().left;
                v111 = v112.clientY - v96.getBoundingClientRect().top;
            }
        });

        v96.addEventListener('touchstart', (v113) => {
            if (v113.target.className === 'sb-draggable' || v113.target.closest('.sb-draggable')) {
                v109 = true;
                v110 = v113.touches[0].clientX - v96.getBoundingClientRect().left;
                v111 = v113.touches[0].clientY - v96.getBoundingClientRect().top;
            }
        });

        document.addEventListener('mousemove', (v114) => {
            if (v109) {
                v96.style.left = (v114.clientX - v110) + 'px';
                v96.style.top = (v114.clientY - v111) + 'px';
                v96.style.bottom = 'auto';
            }
        });

        document.addEventListener('touchmove', (v115) => {
            if (v109) {
                v96.style.left = (v115.touches[0].clientX - v110) + 'px';
                v96.style.top = (v115.touches[0].clientY - v111) + 'px';
                v96.style.bottom = 'auto';
            }
        });

        document.addEventListener('mouseup', () => {
            v109 = false;
        });

        document.addEventListener('touchend', () => {
            v109 = false;
        });

        document.getElementById('show-help').addEventListener('click', () => {
            const v116 = document.createElement('div');
            v116.style = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:100000;display:flex;justify-content:center;align-items:center;font-family:Poppins,sans-serif;`;

            const v117 = document.createElement('div');
            v117.style = `background:#1c1c1c;border-radius:8px;padding:20px;max-width:500px;width:90%;border:2px solid #ff6600;`;

            v117.innerHTML = `
                <div style="font-weight:bold;font-size:18px;color:#ff9900;margin-bottom:15px;display:flex;justify-content:space-between;align-items:center">
                    <span>how to use</span>
                    <span style="cursor:pointer;font-size:20px" id="close-help">×</span>
                </div>
                <div style="font-size:14px;line-height:1.5;margin-bottom:15px;">
                    <p style="margin-bottom:10px;">1. select an email type:</p>
                    <ul style="margin-left:20px;margin-bottom:10px;">
                        <li><b>googlegmail.com</b> - auto-generated email</li>
                        <li><b>custom email</b> - use your own email</li>
                    </ul>
                    <p style="margin-bottom:10px;">2. click "generate" to create an account</p>
                    <p style="margin-bottom:10px;">3. copy the email and password</p>
                    <p style="margin-bottom:10px;">4. use "get verify code" to check for verification email</p>
                    <p style="margin-bottom:10px;color:#ff9900;">note: verification only works with googlegmail emails</p>
                </div>
                <button id="close-help-btn" style="width:100%;background:#ff6600;border:none;color:white;padding:8px;border-radius:4px;cursor:pointer;font-family:Poppins;font-weight:bold">got it</button>
            `;

            v116.appendChild(v117);
            document.body.appendChild(v116);

            document.getElementById('close-help').addEventListener('click', () => {
                v116.remove();
            });

            document.getElementById('close-help-btn').addEventListener('click', () => {
                v116.remove();
            });
        });

        document.getElementById('gen-btn').addEventListener('click', () => {
            document.getElementById('gen-btn').innerText = "generating...";
            document.getElementById('gen-btn').style.background = "#333";
            document.getElementById('verify-container').style.display = "none";
            document.getElementById('code-display').style.display = "none";

            const v118 = document.getElementById('email-type').value;
            const v119 = v118 === 'custom';
            const v120 = v119 ? document.getElementById('custom-email-input').value : '';

            v51(v119, v120).then(({email, password}) => {
                document.getElementById('email-value').innerText = email;
                document.getElementById('pass-value').innerText = password;
                document.getElementById('email-display').style.display = "block";
                document.getElementById('gen-btn').innerText = "generate again";
                document.getElementById('gen-btn').style.background = "#ff6600";

                if (!v119) {
                    document.getElementById('verify-container').style.display = "block";
                }

                v14('success', `generated new account`, 'success', 'gen-success');
            }).catch(v121 => {
                document.getElementById('gen-btn').innerText = "try again";
                document.getElementById('gen-btn').style.background = "#ff6600";
                v14('error', `failed to generate: ${v121.message}`, 'error', 'gen-error');

                const v122 = document.querySelectorAll('.text-red-500');
                for (const v123 of v122) {
                    const v124 = v123.textContent.trim().toLowerCase();
                    if (v124.includes('email already exists')) {
                        v14('error', 'email already exists, try again', 'error', 'email-exists');
                    }
                }
            });
        });

        document.getElementById('verify-btn').addEventListener('click', () => {
            const v125 = document.getElementById('email-value').innerText;
            if (!v125 || !v125.includes('@googlemail.com')) {
                v14('error', 'verification only works with googlegmail emails', 'error', 'verify-error');
                return;
            }

            document.getElementById('verify-btn').innerText = "checking...";
            document.getElementById('verify-btn').disabled = true;

            v72(v125).then(v126 => {
                                            document.getElementById('code-value').innerText = v126;
                                            document.getElementById('code-display').style.display = "block";
                document.getElementById('verify-btn').innerText = "code found!";
                                            v14('success', `verification code found: ${v126}`, 'success', 'code-found');
                                        }).catch(v127 => {
                document.getElementById('verify-btn').innerText = "try again";
                document.getElementById('verify-btn').disabled = false;
                v14('error', `no verification found`, 'error', 'code-error');
            });
        });

        document.getElementById('copy-email-btn').addEventListener('click', () => {
            const v128 = document.getElementById('email-value').innerText;

            navigator.clipboard.writeText(v128).then(() => {
                v14('copied', 'email copied', 'success', 'email-copied');
                document.getElementById('copy-email-btn').innerText = "copied!";
                                                            setTimeout(() => {
                    document.getElementById('copy-email-btn').innerText = "copy email";
                }, 2000);
            });
        });

        document.getElementById('copy-pass-btn').addEventListener('click', () => {
            const v129 = document.getElementById('pass-value').innerText;

            navigator.clipboard.writeText(v129).then(() => {
                v14('copied', 'password copied', 'success', 'pass-copied');
                document.getElementById('copy-pass-btn').innerText = "copied!";
                                                                            setTimeout(() => {
                    document.getElementById('copy-pass-btn').innerText = "copy pass";
                }, 2000);
            });
        });

        document.getElementById('copy-code-btn').addEventListener('click', () => {
            const v130 = document.getElementById('code-value').innerText;

            navigator.clipboard.writeText(v130).then(() => {
                v14('copied', 'verification code copied', 'success', 'code-copied');
                document.getElementById('copy-code-btn').innerText = "copied!";
                                                                                            setTimeout(() => {
                    document.getElementById('copy-code-btn').innerText = "copy code";
                }, 2000);
            });
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', v94);
    } else {
        v94();
    }
})();
