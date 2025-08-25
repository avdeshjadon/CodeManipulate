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
    const newTheme = docElement.classList.contains("dark-mode")
      ? "light"
      : "dark";
    applyTheme(newTheme);
  }

  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);

  const allToolsBtn = document.getElementById("allToolsBtn");
  const toolsDrawer = document.getElementById("toolsDrawer");
  const mainContainer = document.querySelector(".container");

  if (allToolsBtn && toolsDrawer && mainContainer) {
    allToolsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isDrawerOpen = toolsDrawer.classList.toggle("show");
      allToolsBtn.classList.toggle("active");

      if (isDrawerOpen) {
        document.documentElement.style.setProperty(
          "--drawer-height",
          `${toolsDrawer.scrollHeight}px`
        );
        mainContainer.classList.add("content-shifted");
      } else {
        mainContainer.classList.remove("content-shifted");
      }
    });

    document.addEventListener("click", (e) => {
      if (!toolsDrawer.contains(e.target) && !allToolsBtn.contains(e.target)) {
        if (toolsDrawer.classList.contains("show")) {
          toolsDrawer.classList.remove("show");
          allToolsBtn.classList.remove("active");
          mainContainer.classList.remove("content-shifted");
        }
      }
    });
  }

  const convertBtn = document.getElementById("convertBtn");
  if (convertBtn) {
    const inputCode = document.getElementById("inputCode");
    const outputCode = document.getElementById("outputCode");
    const targetLangSelect = document.getElementById("targetLang");
    const detectedLang = document.getElementById("detectedLang");
    const langSelectWrapper = document.querySelector(".select-wrapper");
    const rateLimitTimer = document.getElementById("rateLimitTimer");
    const inputCharCount = document.getElementById("inputCharCount");
    const outputCharCount = document.getElementById("outputCharCount");
    const clearBtn = document.getElementById("clearBtn");
    const copyBtn = document.getElementById("copyBtn");
    const clearOutputBtn = document.getElementById("clearOutputBtn");
    let countdownInterval;

    const resetConvertButton = () => {
      convertBtn.disabled = false;
      convertBtn.innerHTML =
        '<i class="fas fa-wand-magic-sparkles"></i> <span>Convert Code</span>';
    };

    function updateCharCount() {
      if (!inputCode) return;
      const currentLength = inputCode.value.length;
      const charLimit = 15000;
      inputCharCount.textContent = `${currentLength} / ${charLimit}`;
      inputCharCount.classList.toggle("error", currentLength > charLimit);
    }

    if (inputCode) {
      inputCode.addEventListener("input", updateCharCount);
      updateCharCount();
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
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
              copyBtn.innerHTML = originalIcon;
            }, 2000);
          })
          .catch(() => {
            showNotification("Error", "Failed to copy code.", "error");
          });
      });
    }

    if (clearOutputBtn) {
      clearOutputBtn.addEventListener("click", () => {
        outputCode.value = "";
        if (outputCharCount) outputCharCount.textContent = "Characters: 0";
        if (detectedLang) detectedLang.textContent = "N/A";
      });
    }

    const handleRateLimit = (retryAfter) => {
      let timeLeft = retryAfter;
      showNotification(
        "Rate Limit Reached",
        `You have made too many requests. Please try again in ${timeLeft} seconds.`,
        "error"
      );

      convertBtn.classList.add("control-hidden");
      if (langSelectWrapper) langSelectWrapper.classList.add("control-hidden");

      rateLimitTimer.classList.add("show");
      rateLimitTimer.innerHTML = `You can make another request in <strong>${timeLeft}s</strong>.`;

      clearInterval(countdownInterval);

      countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
          rateLimitTimer.innerHTML = `You can make another request in <strong>${timeLeft}s</strong>.`;
        } else {
          clearInterval(countdownInterval);
          rateLimitTimer.classList.remove("show");
          convertBtn.classList.remove("control-hidden");
          if (langSelectWrapper)
            langSelectWrapper.classList.remove("control-hidden");
          resetConvertButton();
        }
      }, 1000);
    };

    convertBtn.addEventListener("click", async () => {
      const code = inputCode.value;
      const targetLang = targetLangSelect.value;
      if (!code.trim()) {
        showNotification(
          "Warning",
          "Please enter some code to convert.",
          "info"
        );
        return;
      }
      convertBtn.disabled = true;
      convertBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> <span>Converting...</span>';

      try {
        const response = await fetch("/convert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, targetLang }),
        });
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 429) {
            handleRateLimit(data.retryAfter || 60);
          } else {
            throw new Error(data.error || "An unknown server error occurred.");
          }
        } else {
          outputCode.value = data.convertedCode;
          detectedLang.textContent = data.detectedLang;
          if (outputCharCount)
            outputCharCount.textContent = `Characters: ${data.convertedCode.length}`;
          resetConvertButton();
        }
      } catch (error) {
        showNotification("Conversion Failed", error.message, "error");
        resetConvertButton();
      }
    });
  }

  const alertModal = document.getElementById("alertModal");
  const alertOverlay = document.getElementById("alertOverlay");

  function showNotification(title, message, type = "info") {
    if (!alertModal || !alertOverlay) return;
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");
    const modalIcon = document.getElementById("modalIcon");

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

  window.showNotification = showNotification;

  function hideNotification() {
    if (alertModal && alertOverlay) {
      alertModal.classList.remove("show");
      alertOverlay.classList.remove("show");
    }
  }

  const modalCloseBtn = document.getElementById("modalCloseBtn");
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", hideNotification);
  if (alertOverlay) alertOverlay.addEventListener("click", hideNotification);
});
