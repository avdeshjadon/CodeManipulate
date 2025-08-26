document.addEventListener("DOMContentLoaded", () => {
  const docElement = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");

  function applyTheme(theme) {
    if (theme === "dark") {
      docElement.classList.add("dark-mode");
      themeIcon.className = "fas fa-sun";
    } else {
      docElement.classList.remove("dark-mode");
      themeIcon.className = "fas fa-moon";
    }
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const newTheme = docElement.classList.contains("dark-mode")
      ? "light"
      : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  });

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  const animatedElements = document.querySelectorAll(".anim-group");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  animatedElements.forEach((el) => observer.observe(el));

  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;

    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you for reaching out. I will get back to you soon.",
          confirmButtonColor: "#469154",
          showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
          },
        });
        form.reset();
      } else {
        throw new Error(result.message || "An unknown error occurred.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops... Something went wrong!",
        text: error.message,
        confirmButtonColor: "#469154",
        showClass: {
          popup: "animate__animated animate__shakeX animate__faster",
        },
      });
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  });
});
