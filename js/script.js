const countdownElement = document.getElementById('countdown');
const eventDate = new Date('2025-06-09T00:00:00+06:00'); // Event date start of day

function convertToBanglaNumber(number) {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number.toString().split('').map(digit => banglaDigits[digit] || digit).join('');
}

const countdown = setInterval(() => {
  const now = new Date();
  
  // Reset style class
  countdownElement.classList.remove('event-message');

  // Check date only (year, month, day)
  const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

  if (nowDateOnly.getTime() > eventDateOnly.getTime()) {
    // After event day — event ended
    clearInterval(countdown);
    countdownElement.classList.add('event-message');
    countdownElement.innerHTML = "ইভেন্ট শেষ হয়েছে। ধন্যবাদ!";
    return;
  }

  if (nowDateOnly.getTime() === eventDateOnly.getTime()) {
    // On event day — event running
    countdownElement.classList.add('event-message');
    countdownElement.innerHTML = "🎉 ইভেন্ট চলমান আছে!";
    return;
  }

  // Before event day — show countdown to eventDate (start of event day)
  const distance = eventDate.getTime() - now.getTime();

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `
    <div class="countdown-item"><span>${convertToBanglaNumber(days)}</span> দিন</div>
    <div class="countdown-item"><span>${convertToBanglaNumber(hours)}</span> ঘণ্টা</div>
    <div class="countdown-item"><span>${convertToBanglaNumber(minutes)}</span> মিনিট</div>
    <div class="countdown-item"><span>${convertToBanglaNumber(seconds)}</span> সেকেন্ড</div>
  `;

}, 1000);
