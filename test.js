const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('🎮 تست بازی حدس عدد');
console.log('عدد تصادفی: ' + Math.floor(Math.random() * 100) + 1);

rl.question('برای ادامه Enter بزنید...', () => {
  console.log('✅ تست موفقیت‌آمیز بود!');
  rl.close();
});