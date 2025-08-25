document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const docElement = document.documentElement;

  function applyTheme(theme) {
    if (theme === "dark") {
      docElement.classList.add("dark-mode");
      if (themeToggle) themeToggle.querySelector("i").className = "fas fa-sun";
    } else {
      docElement.classList.remove("dark-mode");
      if (themeToggle) themeToggle.querySelector("i").className = "fas fa-moon";
    }
    localStorage.setItem("theme", theme);
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  function toggleTheme() {
    const newTheme = docElement.classList.contains("dark-mode") ? "light" : "dark";
    applyTheme(newTheme);
  }

  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);

  // --- Start of Code Translator Logic ---
  const convertBtn = document.getElementById("convertBtn");
  if (convertBtn) {
    const fileInput = document.getElementById("fileInput");
    const inputCode = document.getElementById("inputCode");
    const outputCode = document.getElementById("outputCode");
    const targetLangSelect = document.getElementById("targetLang");
    const detectedLang = document.getElementById("detectedLang");
    const inputCharCount = document.getElementById("inputCharCount");
    const outputCharCount = document.getElementById("outputCharCount");
    const clearBtn = document.getElementById("clearBtn");
    const copyBtn = document.getElementById("copyBtn");
    const clearOutputBtn = document.getElementById("clearOutputBtn");
    const charLimit = 5000;

    // --- CORE LOGIC THAT WAS MISSING ---
    convertBtn.addEventListener("click", async () => {
      const code = inputCode.value;
      const targetLang = targetLangSelect.value;

      if (!code.trim()) {
        showNotification("Warning", "Please enter some code to convert.", "info");
        return;
      }
      if (code.length > charLimit) {
        showNotification("Error", `Code exceeds the character limit of ${charLimit}.`, "error");
        return;
      }

      convertBtn.disabled = true;
      convertBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Converting...</span>';
      outputCode.value = "";
      detectedLang.textContent = "Analyzing...";


      try {
        const response = await fetch("/convert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, targetLang }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "An unknown server error occurred.");
        }

        const data = await response.json();
        outputCode.value = data.convertedCode;
        detectedLang.textContent = data.detectedLang;
        if (outputCharCount) outputCharCount.textContent = `Characters: ${data.convertedCode.length}`;

      } catch (error) {
        showNotification("Conversion Failed", error.message, "error");
        outputCode.value = "Error during conversion. Please check the console for details.";
        detectedLang.textContent = "Error";
      } finally {
        convertBtn.disabled = false;
        convertBtn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> <span>Convert Code</span>';
      }
    });
    // --- END OF CORE LOGIC ---

    function updateCharCount() {
      const currentLength = inputCode.value.length;
      inputCharCount.textContent = `${currentLength} / ${charLimit}`;
      inputCharCount.classList.toggle("error", currentLength > charLimit);
    }

    if (inputCode) {
      inputCode.addEventListener("input", updateCharCount);
      updateCharCount();
    }

    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          inputCode.value = event.target.result;
          updateCharCount();
        };
        reader.readAsText(file);
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        inputCode.value = "";
        updateCharCount();
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        if (!outputCode.value) return;
        navigator.clipboard
          .writeText(outputCode.value)
          .then(() => {
            showNotification("Success", "Code copied to clipboard!", "success");
            const originalIcon = '<i class="fas fa-copy"></i>';
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
              copyBtn.innerHTML = originalIcon;
            }, 2000);
          })
          .catch(() =>
            showNotification("Error", "Failed to copy code.", "error")
          );
      });
    }

    if (clearOutputBtn) {
      clearOutputBtn.addEventListener("click", () => {
        outputCode.value = "";
        if (outputCharCount) outputCharCount.textContent = "Characters: 0";
        if (detectedLang) detectedLang.textContent = "N/A";
      });
    }
  }

  // --- Modal Notification Logic ---
  const alertModal = document.getElementById("alertModal");
  const alertOverlay = document.getElementById("alertOverlay");
  const modalIcon = document.getElementById("modalIcon");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  function showNotification(title, message, type = "info") {
    if (!alertModal || !alertOverlay || !modalTitle || !modalMessage || !modalIcon) return;
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    alertModal.className = "modal";
    modalIcon.innerHTML = "";
    if (type === "success") {
      alertModal.classList.add("success");
      modalIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
    } else if (type === "error") {
      alertModal.classList.add("error");
      modalIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
    } else {
      modalIcon.innerHTML = '<i class="fas fa-info-circle"></i>';
    }
    alertModal.classList.add("show");
    alertOverlay.classList.add("show");
  }

  function hideNotification() {
    if (alertModal && alertOverlay) {
      alertModal.classList.remove("show");
      alertOverlay.classList.remove("show");
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", hideNotification);
  if (alertOverlay) alertOverlay.addEventListener("click", hideNotification);

  // --- Newsletter Form Logic ---
  const newsletterForm = document.querySelector(".footer .newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showNotification("Thank You!", "You have subscribed to our newsletter.", "success");
        emailInput.value = "";
      }
    });
  }
});