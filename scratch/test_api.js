const testData = {
  dk_admin_settings: {
    fontScale: 1.3,
    enableManualFontEdit: true,
    groupScales: { title: 1.2, sentence: 1.1, desc: 1.0, button: 1.0, small: 1.0 }
  }
};

async function runTest() {
  console.log("Testing POST to store...");
  const postRes = await fetch('https://sentence-quiz-tawny.vercel.app/api/store', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testData)
  });
  const postResult = await postRes.json();
  console.log("POST Result:", postResult);

  console.log("Testing GET from store...");
  const getRes = await fetch('https://sentence-quiz-tawny.vercel.app/api/store?t=' + Date.now());
  const getResult = await getRes.json();
  console.log("GET Result:", getResult);
}

runTest().catch(console.error);
