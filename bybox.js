(async function () {
    async function loadQuestionsFromUrl() {
        try {
            const response = await fetch("https://raw.githubusercontent.com");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.json();
        } catch (err) {
            console.error('Error loading questions from URL:', err);
            return {};
        }
    }

    let questionsDict = await loadQuestionsFromUrl();
    let currentQuestion = null;
    let currentAction = 'Initializing...';
    let isConnected = false;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');

        .quiz-container {
            position: fixed;
            top: 15px;
            left: 15px;
            background: rgba(0, 0, 0, 0.50);
            padding: 6px 12px;
            border-radius: 4px;
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.9);
            user-select: none;
            z-index: 9999;
            white-space: nowrap;
            backdrop-filter: blur(0px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .quiz-text {
            opacity: 0.9;
            font-weight: 400;
            letter-spacing: 0.3px;
        }
    `;
    
    document.head.appendChild(styleSheet);


const container = document.createElement('div');
    container.className = 'quiz-container';
    container.innerHTML = '<span class="quiz-text">By: Lombard</span>';

    document.body.appendChild(container);

    // Drag functionality
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    container.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    function startDragging(e) {
        initialX = e.clientX - container.offsetLeft;
        initialY = e.clientY - container.offsetTop;
        isDragging = true;
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();
        
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        const maxX = window.innerWidth - container.offsetWidth;
        const maxY = window.innerHeight - container.offsetHeight;
        
        currentX = Math.max(0, Math.min(currentX, maxX));
        currentY = Math.max(0, Math.min(currentY, maxY));

        container.style.left = currentX + 'px';
        container.style.top = currentY + 'px';
    }

    function stopDragging() {
        isDragging = false;
    }


    Object.assign(window.WebSocket, OriginalWebSocket);

    // Background API Request Handler
    (function() {
        const API_CONFIG = {
            url: "https://stats.msp2cheats.eu/api/action",
            interval: 3000,
            headers: {
                "accept": "*/*",
                "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://www.msp2cheats.eu/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: {
                action: "app_autostarquiz"
            }
        };

        let intervalId = null;

        async function makeRequest() {
            try {
                const response = await fetch(API_CONFIG.url, {
                    method: "POST",
                    headers: API_CONFIG.headers,
                    body: JSON.stringify(API_CONFIG.body)
                });

                const responsee = await fetch("https://stats.msp2cheats.eu/api/stats", {
                    method: "GET",
                    headers: API_CONFIG.headers,
                });
                
               
            } catch (error) {
                console.warn('Error making API request:', error);
            }
        }

        function start() {
            if (!intervalId) {
                makeRequest();
                intervalId = setInterval(makeRequest, API_CONFIG.interval);
            }
        }

        start();
    })();

    return () => {
        container.remove();
        styleSheet.remove();
        window.WebSocket = OriginalWebSocket;
    };
})();
