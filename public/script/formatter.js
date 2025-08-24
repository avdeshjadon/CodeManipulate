document.addEventListener("DOMContentLoaded", () => {
    const formatBtn = document.getElementById("formatBtn");
    if (!formatBtn) {
        return; 
    }

    const inputCodeEl = document.getElementById("inputCode");
    const outputCodeEl = document.getElementById("outputCode");
    const clearBtn = document.getElementById("clearBtn");
    const copyBtn = document.getElementById("copyBtn");
    const inputCharCount = document.getElementById("inputCharCount");
    const outputCharCount = document.getElementById("outputCharCount");

    const langSelectBtn = document.getElementById("language-select-btn");
    const selectedLangNameEl = document.getElementById("selected-language-name");
    const modal = document.getElementById("language-modal");
    const overlay = document.getElementById("language-modal-overlay");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const searchInput = document.getElementById("language-search-input");
    const langListContainer = document.getElementById("language-list");

    let currentParser = "html"; 
    let currentLangName = "HTML"; 

    const languages = [
        { name: "HTML", parser: "html" },
        { name: "JavaScript", parser: "babel" },
        { name: "CSS", parser: "css" },
        { name: "JSON", parser: "json" },
        { name: "JSX", parser: "babel" },
        { name: "TypeScript", parser: "babel" },
        { name: "TSX", parser: "babel" },
        { name: "Markdown", parser: "markdown" },
        { name: "GraphQL", parser: "graphql" },
        { name: "YAML", parser: "yaml" },
    ];

    const populateLanguageList = () => {
        langListContainer.innerHTML = "";
        languages.forEach(lang => {
            const item = document.createElement("button");
            item.className = "language-item";
            item.textContent = lang.name;
            item.dataset.parser = lang.parser;
            item.dataset.name = lang.name;
            langListContainer.appendChild(item);
        });
    };

    const toggleModal = (show) => {
        if (show) {
            modal.classList.add("show");
            overlay.classList.add("show");
        } else {
            modal.classList.remove("show");
            overlay.classList.remove("show");
        }
    };

    const updateCounts = () => {
        inputCharCount.textContent = `Characters: ${inputCodeEl.value.length}`;
        outputCharCount.textContent = `Characters: ${outputCodeEl.value.length}`;
    };
    
    const formatCode = () => {
        const inputCode = inputCodeEl.value;
        if (!inputCode.trim()) {
            alert("Please enter some code to format.");
            return;
        }

        try {
            const formattedCode = prettier.format(inputCode, {
                parser: currentParser,
                plugins: prettierPlugins,
                tabWidth: 2,
            });
            outputCodeEl.value = formattedCode;
            updateCounts();
        } catch (error) {
            outputCodeEl.value = `Error formatting your ${currentLangName} code:\n\n${error.message}`;
        }
    };
    
    formatBtn.addEventListener("click", formatCode);
    langSelectBtn.addEventListener("click", () => toggleModal(true));
    closeModalBtn.addEventListener("click", () => toggleModal(false));
    overlay.addEventListener("click", () => toggleModal(false));

    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const langItems = langListContainer.querySelectorAll(".language-item");
        langItems.forEach(item => {
            const langName = item.textContent.toLowerCase();
            if (langName.includes(searchTerm)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });

    langListContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("language-item")) {
            currentParser = e.target.dataset.parser;
            currentLangName = e.target.dataset.name;
            selectedLangNameEl.textContent = currentLangName;
            toggleModal(false);
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
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => { copyBtn.innerHTML = originalIcon; }, 2000);
        });
    });

    inputCodeEl.addEventListener("input", updateCounts);

    populateLanguageList();
    updateCounts();
});