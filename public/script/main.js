document.addEventListener("DOMContentLoaded", () => {
  // Theme management
  const themeToggle = document.getElementById("themeToggle");
  const mobileThemeToggle = document.getElementById("mobileThemeToggle");
  const body = document.body;

  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      themeToggle.querySelector("i").className = "fas fa-sun";
      if (mobileThemeToggle) {
        mobileThemeToggle.querySelector("i").className = "fas fa-sun";
        mobileThemeToggle.querySelector("span").textContent = "Light Mode";
      }
    } else {
      body.classList.remove("dark-mode");
      themeToggle.querySelector("i").className = "fas fa-moon";
      if (mobileThemeToggle) {
        mobileThemeToggle.querySelector("i").className = "fas fa-moon";
        mobileThemeToggle.querySelector("span").textContent = "Dark Mode";
      }
    }
    localStorage.setItem("theme", theme);
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const newTheme = body.classList.contains("dark-mode") ? "light" : "dark";
    applyTheme(newTheme);
  });

  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener("click", () => {
      const newTheme = body.classList.contains("dark-mode") ? "light" : "dark";
      applyTheme(newTheme);
    });
  }

  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const closeMenu = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");

  function toggleMenu() {
    mobileMenu.classList.toggle("open");
    overlay.classList.toggle("show");
    document.body.style.overflow = mobileMenu.classList.contains("open")
      ? "hidden"
      : "";
  }

  mobileMenuBtn.addEventListener("click", toggleMenu);
  closeMenu.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Input area functionality
  const fileInput = document.getElementById("fileInput");
  const inputCode = document.getElementById("inputCode");
  const inputCharCount = document.getElementById("inputCharCount");
  const charLimit = 2000;

  function updateCharCount() {
    const currentLength = inputCode.value.length;
    inputCharCount.textContent = `${currentLength} / ${charLimit}`;
    if (currentLength > charLimit) {
      inputCharCount.classList.add("error");
    } else {
      inputCharCount.classList.remove("error");
    }
  }

  inputCode.addEventListener("input", updateCharCount);
  updateCharCount(); // Initial call

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

  // Clear button functionality
  const clearBtn = document.getElementById("clearBtn");
  clearBtn.addEventListener("click", () => {
    inputCode.value = "";
    updateCharCount();
  });

  // Copy button functionality
  const copyBtn = document.getElementById("copyBtn");
  const outputCode = document.getElementById("outputCode");

  copyBtn.addEventListener("click", () => {
    if (!outputCode.value) return;
    navigator.clipboard
      .writeText(outputCode.value)
      .then(() => {
        showNotification("Success", "Code copied to clipboard!", "success");
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
      })
      .catch((err) => {
        showNotification("Error", "Failed to copy code.", "error");
        console.error("Failed to copy text: ", err);
      });
  });

  // MODAL LOGIC
  const alertModal = document.getElementById("alertModal");
  const alertOverlay = document.getElementById("alertOverlay");
  const modalIcon = document.getElementById("modalIcon");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  function showNotification(title, message, type = "info") {
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
    alertModal.classList.remove("show");
    alertOverlay.classList.remove("show");
  }

  modalCloseBtn.addEventListener("click", hideNotification);
  alertOverlay.addEventListener("click", hideNotification);

  // Convert button handler
  const convertBtn = document.getElementById("convertBtn");
  const detectedLang = document.getElementById("detectedLang");
  const outputCharCount = document.getElementById("outputCharCount");

  function setLoadingState(isLoading) {
    if (isLoading) {
      convertBtn.disabled = true;
      convertBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i><span>Converting...</span>';
    } else {
      convertBtn.disabled = false;
      convertBtn.innerHTML =
        '<i class="fas fa-wand-magic-sparkles"></i><span>Convert Code</span>';
    }
  }

  convertBtn.addEventListener("click", async () => {
    const code = inputCode.value;
    const targetLang = document.getElementById("targetLang").value;

    updateCharCount();

    if (!code.trim()) {
      showNotification(
        "Input Required",
        "Please enter or upload some code to convert.",
        "error"
      );
      return;
    }

    if (code.length > charLimit) {
      const excessChars = code.length - charLimit;
      const message = `Your code is ${excessChars} characters over the ${charLimit} character limit. Please reduce the code length.`;
      showNotification("Character Limit Exceeded", message, "error");
      return;
    }

    convertBtn.classList.add("clicked");
    setTimeout(() => convertBtn.classList.remove("clicked"), 300);

    setLoadingState(true);
    outputCode.value = "";
    detectedLang.textContent = "N/A";
    outputCharCount.textContent = "Characters: 0";

    try {
      const response = await fetch("http://localhost:3000/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, targetLang }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An unknown error occurred.");
      }

      const data = await response.json();
      detectedLang.textContent = data.detectedLang;
      outputCode.value = data.convertedCode;
      outputCharCount.textContent = `Characters: ${data.convertedCode.length}`;

      showNotification("Success", "Code converted successfully!", "success");
    } catch (err) {
      outputCode.value = `Error: ${err.message}`;
      showNotification("Conversion Failed", err.message, "error");
    } finally {
      setLoadingState(false);
    }
  });

  // Newsletter form handling
  const newsletterForm = document.querySelector(
    ".footer-section .newsletter-form"
  );
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput.value) {
        showNotification(
          "Thank You!",
          "You have subscribed to our newsletter.",
          "success"
        );
        emailInput.value = "";
      }
    });
  }
});
