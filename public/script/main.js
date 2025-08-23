document.getElementById('fileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    document.getElementById('inputCode').value = event.target.result;
  };
  reader.readAsText(file);
});

// 🔧 Convert using Gemini
document.getElementById('convertBtn').addEventListener('click', async () => {
  const inputCode = document.getElementById('inputCode').value;
  const targetLang = document.getElementById('targetLang').value;
  const convertBtn = document.getElementById('convertBtn');
  const outputCodeEl = document.getElementById('outputCode');

  if (!inputCode.trim()) {
    alert('Please enter or upload some code.');
    return;
  }
  
  // Disable button and show loading state
  convertBtn.disabled = true;
  convertBtn.innerText = 'Converting...';
  outputCodeEl.value = 'Processing your code...';

  try {
    // Note: This URL assumes your backend is running on port 3000
    const response = await fetch('http://localhost:3000/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: inputCode, targetLang })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong on the server.');
    }

    const data = await response.json();
    document.getElementById('detectedLang').innerText = data.detectedLang || 'Could not detect';
    outputCodeEl.value = data.convertedCode || 'No output received.';
  } catch (err) {
    console.error("Client Error:", err);
    outputCodeEl.value = `Error: ${err.message}`;
    alert('⚠️ Conversion failed. Check the console for details.');
  } finally {
    // Re-enable the button
    convertBtn.disabled = false;
    convertBtn.innerText = 'Convert';
  }
});