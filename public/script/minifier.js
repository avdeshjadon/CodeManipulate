document.addEventListener("DOMContentLoaded", () => {
    const minifyBtn = document.getElementById("minifyBtn");
    if (!minifyBtn) return;

    const inputCodeEl = document.getElementById("inputCode");
    const outputCodeEl = document.getElementById("outputCode");
    const clearBtn = document.getElementById("clearBtn");
    const copyBtn = document.getElementById("copyBtn");
    const inputCharCount = document.getElementById("inputCharCount");
    const outputCharCount = document.getElementById("outputCharCount");
    const languageSelector = document.getElementById("languageSelector");

    const modalAlerter = window.showNotification || ((title, msg) => alert(`${title}: ${msg}`));

    function updateCounts() {
        const inputLength = inputCodeEl.value.length;
        const outputLength = outputCodeEl.value.length;
        inputCharCount.textContent = `Characters: ${inputLength}`;
        outputCharCount.textContent = `Characters: ${outputLength}`;

        if (inputLength > 0 && outputLength > 0 && outputLength < inputLength) {
            const saved = inputLength - outputLength;
            const percentage = ((saved / inputLength) * 100).toFixed(2);
            modalAlerter("Success!", `Saved ${saved} characters (${percentage}% reduction).`, "success");
        }
    }

    minifyBtn.addEventListener("click", async () => {
        const code = inputCodeEl.value;
        const language = languageSelector.value;

        if (!code.trim()) {
            modalAlerter("Warning", "Please enter some code to minify.", "info");
            return;
        }

        minifyBtn.disabled = true;
        minifyBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>Minifying...</span>`;

        try {
            const response = await fetch("/minify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, language }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "An unknown error occurred.");
            }

            outputCodeEl.value = data.minifiedCode;
            updateCounts();
        } catch (error) {
            outputCodeEl.value = `Error: ${error.message}`;
            modalAlerter("Minification Failed", error.message, "error");
        } finally {
            minifyBtn.disabled = false;
            minifyBtn.innerHTML = `<i class="fas fa-compress"></i> <span>Minify Code</span>`;
        }
    });

    clearBtn.addEventListener("click", () => {
        inputCodeEl.value = "";
        outputCodeEl.value = "";
        updateCounts();
    });

    copyBtn.addEventListener("click", () => {
        if (!outputCodeEl.value) return;
        navigator.clipboard.writeText(outputCodeEl.value).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = `<i class="fas fa-check"></i>`;
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        });
    });
    
    languageSelector.addEventListener("change", () => {
        const selectedLanguage = languageSelector.options[languageSelector.selectedIndex].text;
        inputCodeEl.placeholder = `Paste your ${selectedLanguage} code here...`;
    });

    inputCodeEl.addEventListener("input", updateCounts);
    updateCounts();
});