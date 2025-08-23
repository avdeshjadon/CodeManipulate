document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selections ---
    const fileInput = document.getElementById('fileInput');
    const inputCode = document.getElementById('inputCode');
    const convertBtn = document.getElementById('convertBtn');
    const outputCodeEl = document.getElementById('outputCode');
    const targetLang = document.getElementById('targetLang');
    const detectedLangEl = document.getElementById('detectedLang');
    const themeCheckbox = document.getElementById('theme-checkbox');
    const body = document.body;

    // --- Theme Management ---
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeCheckbox.checked = true;
        } else {
            body.classList.remove('dark-mode');
            themeCheckbox.checked = false;
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeCheckbox.addEventListener('change', () => {
        const newTheme = themeCheckbox.checked ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // --- File Input Handler ---
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            inputCode.value = event.target.result;
        };
        reader.readAsText(file);
    });
    
    // --- Convert Button Handler ---
    convertBtn.addEventListener('click', async () => {
        const code = inputCode.value;
        const lang = targetLang.value;

        if (!code.trim()) {
            showNotification('Please enter or upload some code.');
            return;
        }
        
        setLoadingState(true);

        try {
            const response = await fetch('http://localhost:3000/convert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code, targetLang: lang })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Server error occurred.');
            }

            const data = await response.json();
            detectedLangEl.textContent = data.detectedLang || 'Could not detect';
            outputCodeEl.value = data.convertedCode || 'No output received.';
            
        } catch (err) {
            console.error("Client Error:", err);
            outputCodeEl.value = `Error: ${err.message}`;
            showNotification(`⚠️ Conversion failed: ${err.message}`);
        } finally {
            setLoadingState(false);
        }
    });

    // --- UI Helper Functions ---
    function setLoadingState(isLoading) {
        const btnText = convertBtn.querySelector('.btn-text');
        const btnIcon = convertBtn.querySelector('.btn-icon i');

        if (isLoading) {
            convertBtn.disabled = true;
            btnText.textContent = 'Converting...';
            btnIcon.className = 'fa-solid fa-spinner fa-spin';
            outputCodeEl.value = 'Processing your request...';
            detectedLangEl.textContent = '...';
        } else {
            convertBtn.disabled = false;
            btnText.textContent = 'Convert';
            btnIcon.className = 'fa-solid fa-wand-magic-sparkles';
        }
    }

    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});