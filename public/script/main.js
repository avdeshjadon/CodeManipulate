// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const toggleIcon = document.querySelector('.toggle-icon');

// Check for saved dark mode preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  body.classList.add('dark');
  toggleIcon.textContent = '☀️';
}

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  
  // Update icon with animation
  toggleIcon.style.transform = 'scale(0)';
  setTimeout(() => {
    toggleIcon.textContent = isDark ? '☀️' : '🌙';
    toggleIcon.style.transform = 'scale(1)';
  }, 150);
  
  // Save preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
  // Add click animation
  darkModeToggle.style.transform = 'scale(0.95)';
  setTimeout(() => {
    darkModeToggle.style.transform = 'scale(1)';
  }, 100);
});

// File upload functionality
document.getElementById('fileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const inputCode = document.getElementById('inputCode');
    inputCode.value = event.target.result;
    
    // Add success animation
    const codeSection = inputCode.closest('.code-section');
    codeSection.style.transform = 'scale(1.02)';
    codeSection.style.borderColor = 'var(--primary-color)';
    
    setTimeout(() => {
      codeSection.style.transform = 'scale(1)';
      codeSection.style.borderColor = 'var(--border-color)';
    }, 300);
    
    // Update detected language placeholder
    const detectedLang = document.getElementById('detectedLang');
    detectedLang.textContent = 'Analyzing...';
    detectedLang.style.animation = 'pulse 1s infinite';
  };
  reader.readAsText(file);
});

// Convert button functionality
document.getElementById('convertBtn').addEventListener('click', async () => {
  const inputCode = document.getElementById('inputCode').value;
  const targetLang = document.getElementById('targetLang').value;
  const convertBtn = document.getElementById('convertBtn');
  const outputCode = document.getElementById('outputCode');
  const detectedLang = document.getElementById('detectedLang');

  if (!inputCode.trim()) {
    // Error animation
    showError('Please enter or upload some code.');
    return;
  }

  // Add loading state
  convertBtn.classList.add('loading');
  convertBtn.disabled = true;
  outputCode.placeholder = 'Converting your code...';
  
  // Update detected language
  detectedLang.textContent = 'Processing...';
  detectedLang.style.animation = 'pulse 1s infinite';

  try {
    const response = await fetch('/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: inputCode, targetLang })
    });

    const data = await response.json();
    
    // Update detected language with animation
    setTimeout(() => {
      detectedLang.style.animation = 'none';
      detectedLang.textContent = data.detectedLang || 'Unknown';
      
      // Success animation
      detectedLang.style.transform = 'scale(1.1)';
      setTimeout(() => {
        detectedLang.style.transform = 'scale(1)';
      }, 200);
    }, 500);

    // Update output with animation
    setTimeout(() => {
      outputCode.value = data.convertedCode || 'No output';
      
      // Success animation for output section
      const outputSection = outputCode.closest('.code-section');
      outputSection.style.transform = 'scale(1.02)';
      outputSection.style.borderColor = 'var(--primary-color)';
      
      setTimeout(() => {
        outputSection.style.transform = 'scale(1)';
        outputSection.style.borderColor = 'var(--border-color)';
      }, 300);
    }, 700);

  } catch (err) {
    console.error("Client Error:", err);
    
    // Error state
    outputCode.value = '// ❌ Conversion failed. Please try again.';
    detectedLang.style.animation = 'none';
    detectedLang.textContent = 'Error';
    
    // Error animation
    showError('Conversion failed. Please try again.');
    
  } finally {
    // Reset button state after animation
    setTimeout(() => {
      convertBtn.classList.remove('loading');
      convertBtn.disabled = false;
      outputCode.placeholder = 'Converted code will appear here...';
    }, 1000);
  }
});

// Error handling function
function showError(message) {
  // Create temporary error notification
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ef4444;
    color: white;
    padding: 1rem;
    border-radius: 8px;
    font-weight: 500;
    z-index: 1000;
    animation: slideInRight 0.3s ease;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  `;
  errorDiv.textContent = message;
  
  document.body.appendChild(errorDiv);
  
  // Remove after 3 seconds
  setTimeout(() => {
    errorDiv.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(errorDiv);
    }, 300);
  }, 3000);
  
  // Add shake animation to input
  const inputSection = document.querySelector('.code-section');
  inputSection.style.animation = 'shake 0.5s ease';
  setTimeout(() => {
    inputSection.style.animation = 'none';
  }, 500);
}

// Add ripple effect to buttons
function addRippleEffect(element, event) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s linear;
    background-color: rgba(255, 255, 255, 0.3);
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    pointer-events: none;
  `;
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  
  setTimeout(() => {
    if (element.contains(ripple)) {
      element.removeChild(ripple);
    }
  }, 600);
}

// Add ripple effect to interactive elements
document.querySelectorAll('.file-upload-btn, .convert-btn, .dark-mode-toggle').forEach(element => {
  element.addEventListener('click', function(e) {
    addRippleEffect(this, e);
  });
});

// Add additional CSS animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;
document.head.appendChild(additionalStyles);

// Smooth scrolling for better UX
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.animation = 'fadeIn 0.5s ease forwards';
});

const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(fadeInStyle);