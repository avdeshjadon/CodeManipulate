// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  const isDark = body.classList.contains('dark-theme');
  
  // Update icon
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  
  // Save preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// File upload functionality
document.getElementById('fileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const inputCode = document.getElementById('inputCode');
    inputCode.value = event.target.result;
    
    // Update detected language placeholder
    const detectedLang = document.getElementById('detectedLang');
    detectedLang.textContent = 'Analyzing...';
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
    showError('Please enter or upload some code.');
    return;
  }

  // Add loading state
  convertBtn.classList.add('loading');
  convertBtn.disabled = true;
  
  // Update detected language
  detectedLang.textContent = 'Processing...';

  try {
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // This would be replaced with actual API call
    const result = simulateConversion(inputCode, targetLang);
    
    // Update detected language
    detectedLang.textContent = result.detectedLang;
    
    // Update output
    outputCode.value = result.convertedCode;
    
  } catch (err) {
    console.error("Error:", err);
    outputCode.value = '// ❌ Conversion failed. Please try again.';
    detectedLang.textContent = 'Error';
    showError('Conversion failed. Please try again.');
  } finally {
    // Reset button state
    convertBtn.classList.remove('loading');
    convertBtn.disabled = false;
  }
});

// Simulate conversion (would be replaced with actual API call)
function simulateConversion(code, targetLang) {
  // Simple language detection based on code patterns
  let detectedLang = 'Unknown';
  
  if (code.includes('def ') && code.includes('import ')) detectedLang = 'Python';
  else if (code.includes('function ') || code.includes('const ') || code.includes('let ')) detectedLang = 'JavaScript';
  else if (code.includes('#include') || code.includes('std::')) detectedLang = 'C++';
  else if (code.includes('#include') && !code.includes('std::')) detectedLang = 'C';
  else if (code.includes('public class') || code.includes('System.out')) detectedLang = 'Java';
  
  // Generate mock converted code
  const convertedCode = `// Converted from ${detectedLang} to ${targetLang}\n// This is a simulation - actual conversion would happen server-side\n\n${code.substring(0, 200)}...`;
  
  return {
    detectedLang,
    convertedCode
  };
}

// Error handling function
function showError(message) {
  // Create temporary error notification
  const errorDiv = document.createElement('div');
  errorDiv.textContent = message;
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
    animation: fadeIn 0.3s ease;
  `;
  
  document.body.appendChild(errorDiv);
  
  // Remove after 3 seconds
  setTimeout(() => {
    document.body.removeChild(errorDiv);
  }, 3000);
}

// Add some sample code on load for demonstration
window.addEventListener('load', () => {
  // Add sample JavaScript code
  const sampleCode = `// Sample JavaScript code
function greet(name) {
  return "Hello, " + name + "!";
}

const result = greet("World");
console.log(result);
`;
  
  document.getElementById('inputCode').value = sampleCode;
});