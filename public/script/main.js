// 📂 Read uploaded file content
document.getElementById('fileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    document.getElementById('inputCode').value = event.target.result;
  };
  reader.readAsText(file);
});

// 🔁 Convert using Gemini
document.getElementById('convertBtn').addEventListener('click', async () => {
  const inputCode = document.getElementById('inputCode').value;
  const targetLang = document.getElementById('targetLang').value;

  if (!inputCode.trim()) {
    alert('Please enter or upload some code.');
    return;
  }

  try {
    const response = await fetch('/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: inputCode, targetLang })
    });

    const data = await response.json();
    document.getElementById('detectedLang').innerText = data.detectedLang || 'N/A';
    document.getElementById('outputCode').value = data.convertedCode || 'No output';
  } catch (err) {
    console.error("Client Error:", err);
    alert('⚠️ Conversion failed.');
  }
});
