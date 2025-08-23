async function convertLanguage(code, targetLang) {
  const response = await fetch('/convert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, targetLang })
  });

  const data = await response.json();
  return data.convertedCode;
}
