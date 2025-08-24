document.addEventListener("DOMContentLoaded", () => {
  const formatBtn = document.getElementById("formatBtn");
  if (!formatBtn) return;

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
    { name: "CSS", parser: "css" },
    { name: "SCSS", parser: "scss" },
    { name: "Less", parser: "less" },
    { name: "JavaScript", parser: "babel" },
    { name: "JSX", parser: "babel" },
    { name: "TypeScript", parser: "babel" },
    { name: "TSX", parser: "babel" },
    { name: "JSON", parser: "json" },
    { name: "JSON5", parser: "json" },
    { name: "JSONC", parser: "json" },
    { name: "Markdown", parser: "markdown" },
    { name: "MDX", parser: "markdown" },
    { name: "GraphQL", parser: "graphql" },
    { name: "YAML", parser: "yaml" },
    { name: "Vue", parser: "vue" },
    { name: "Handlebars", parser: "glimmer" },
  ];

  const populateLanguageList = () => {
    langListContainer.innerHTML = "";
    languages.forEach((lang) => {
      const item = document.createElement("button");
      item.className = "language-item";
      item.textContent = lang.name;
      item.dataset.parser = lang.parser;
      item.dataset.name = lang.name;
      langListContainer.appendChild(item);
    });
  };

  const toggleModal = (show) => {
    modal.classList.toggle("show", show);
    overlay.classList.toggle("show", show);
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
      outputCodeEl.value = "";
      document.getElementById(
        "errorMessage"
      ).textContent = `Unable to format your ${currentLangName} code. Reason:\n${error.message}`;
      document.getElementById("errorModal").classList.add("show");
    }
  };

  formatBtn.addEventListener("click", formatCode);
  langSelectBtn.addEventListener("click", () => toggleModal(true));
  closeModalBtn.addEventListener("click", () => toggleModal(false));
  overlay.addEventListener("click", () => toggleModal(false));

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const langItems = langListContainer.querySelectorAll(".language-item");
    langItems.forEach((item) => {
      const langName = item.textContent.toLowerCase();
      item.style.display = langName.includes(searchTerm) ? "block" : "none";
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
      setTimeout(() => {
        copyBtn.innerHTML = originalIcon;
      }, 2000);
    });
  });

  inputCodeEl.addEventListener("input", updateCounts);

  populateLanguageList();
  updateCounts();

  document.getElementById("errorCloseBtn").addEventListener("click", () => {
    document.getElementById("errorModal").classList.remove("show");
  });
});