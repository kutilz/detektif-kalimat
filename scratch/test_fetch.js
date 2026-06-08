fetch('https://sentence-quiz-tawny.vercel.app/api/store')
  .then(r => r.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
