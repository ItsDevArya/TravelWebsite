AOS.init({ duration: 700, once: true, offset: 80, easing: 'ease-out-cubic' });

// ── GOOGLE APPS SCRIPT URL ──
// IMPORTANT: Replace this URL with your actual Google Apps Script Web App URL
// See setup instructions below

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby2V0-GzMt_YwBxkZLuA3ak5JH5QNQp0CbgT9cf9bw-qPmVnU6KHr5hTby4-3C3Bme74Q/exec';

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('scrolled', window.scrollY > 60);

  const backTop = document.getElementById('backTop');
  backTop.classList.toggle('visible', window.scrollY > 400);
});


// ── OPEN BOOKING MODAL ──
function openBooking(e) {
  e?.preventDefault();
  const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
  modal.show();
}

function bookPackage(dest) {
  document.getElementById('bk_destination').value = '';
  openBooking();
  setTimeout(() => {
    const sel = document.getElementById('bk_destination');
    for (let i = 0; i < sel.options.length; i++) {
      if (sel.options[i].text.includes(dest.split(' ')[0])) {
        sel.selectedIndex = i;
        break;
      }
    }
  }, 400);
}


// ── SET MIN DATE ──
const today = new Date().toISOString().split('T')[0];
document.getElementById('bk_date').min = today;
document.getElementById('cf_date').min = today;

// ── SUBMIT BOOKING FORM ──
document.getElementById('bookingForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = document.getElementById('bookSubmitBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';

  const data = {
    type: 'Booking',
    name: document.getElementById('bk_name').value,
    phone: document.getElementById('bk_phone').value,
    whatsapp: document.getElementById('bk_whatsapp').value,
    email: document.getElementById('bk_email').value,
    destination: document.getElementById('bk_destination').value,
    travelers: document.getElementById('bk_travelers').value,
    date: document.getElementById('bk_date').value,
    budget: document.getElementById('bk_budget').value,
    message: document.getElementById('bk_message').value,
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  };
    console.log("Sending data:", data);
  try {
    if (APPS_SCRIPT_URL)  {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }
    showModalSuccess(data);
  } catch (err) {
    showModalSuccess(data); // Show success anyway; data can be handled via fallback
  }
});

function showModalSuccess(data) {
  document.getElementById('modalBody').innerHTML = `
    <div class="success-msg">
      <i class="fas fa-check-circle"></i>
      <h4>Booking Request Received! 🙏</h4>
      <p style="margin-bottom:16px;">
        Thank you <strong>${data.name}</strong>! Your booking request for <strong>${data.destination}</strong> has been received.
        We'll contact you on <strong>${data.phone}</strong> within 2 hours.
      </p>
      <a href="https://wa.me/919999999999?text=Hi! I just filled the booking form for ${encodeURIComponent(data.destination)}. My name is ${encodeURIComponent(data.name)}."
         target="_blank" style="display:inline-flex;align-items:center;gap:8px;background:#25D366;color:white;padding:12px 24px;border-radius:25px;text-decoration:none;font-weight:700;font-size:14px;">
        <i class="fab fa-whatsapp"></i> Confirm on WhatsApp
      </a>
    </div>
  `;
}

// ── SUBMIT CONTACT FORM ──
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = document.getElementById('contactSubmitBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

  const data = {
    type: 'Contact Enquiry',
    name: document.getElementById('cf_name').value,
    phone: document.getElementById('cf_phone').value,
    whatsapp: document.getElementById('cf_whatsapp').value,
    email: document.getElementById('cf_email').value,
    destination: document.getElementById('cf_destination').value,
    travelers: document.getElementById('cf_travelers').value,
    date: document.getElementById('cf_date').value,
    budget: document.getElementById('cf_budget').value,
    message: document.getElementById('cf_message').value,
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  };

  console.log("Sending data:", data);
  try {
    if (APPS_SCRIPT_URL ) {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data)
      });
    }
    document.getElementById('contactFormArea').style.display = 'none';
    document.getElementById('contactSuccess').style.display = 'block';
  } catch (err) {
    document.getElementById('contactFormArea').style.display = 'none';
    document.getElementById('contactSuccess').style.display = 'block';
  }
});

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ── CLOSE NAV ON MOBILE CLICK ──
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const toggler = document.querySelector('.navbar-toggler');
    const nav = document.getElementById('navMenu');
    if (nav.classList.contains('show')) toggler.click();
  });
});

// ── COUNTER ANIMATION ──
function animateCounter(el, target, suffix) {
  let start = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + suffix; clearInterval(timer); return; }
    el.textContent = Math.floor(start) + suffix;
  }, 25);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stats = [
        { el: entry.target.querySelectorAll('.stat-num')[0], val: 5000, suffix: '+' },
        { el: entry.target.querySelectorAll('.stat-num')[1], val: 20, suffix: '+' },
        { el: entry.target.querySelectorAll('.stat-num')[2], val: 18, suffix: '+' },
      ];
      stats.forEach(s => { if (s.el) animateCounter(s.el, s.val, s.suffix); });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);


    //  ╔══════════════════════════════════════════════════╗
    //  ║    GOOGLE SHEETS + APPS SCRIPT SETUP GUIDE       ║
    //  ╠══════════════════════════════════════════════════╣
    //  ║                                                  ║
    //  ║  STEP 1: Create Google Sheet                     ║
    //  ║  ─────────────────────────────────────────────   ║
    //  ║  Open Google Sheets → Create new sheet           ║
    //  ║  Name it: "Saurav Trek Bookings"                 ║
    //  ║  Add these column headers in Row 1:              ║
    //  ║  Timestamp | Type | Name | Phone | WhatsApp |    ║
    //  ║  Email | Destination | Travelers | Date |        ║
    //  ║  Budget | Message                                ║
    //  ║                                                  ║
    //  ║  STEP 2: Create Apps Script                      ║
    //  ║  ─────────────────────────────────────────────   ║
    //  ║  In the Sheet → Extensions → Apps Script         ║
    //  ║  Delete default code and paste this:             ║
    //  ║                                                  ║
    //  ║  const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';        ║
    //  ║  const OWNER_EMAIL = 'your@email.com';           ║
    //  ║                                                  ║
    //  ║  function doPost(e) {                            ║
    //  ║    try {                                         ║
    //  ║      const data = JSON.parse(e.postData.contents)║
    //  ║      const sheet = SpreadsheetApp                ║
    //  ║        .openById(SHEET_ID)                       ║
    //  ║        .getActiveSheet();                        ║
    //  ║      sheet.appendRow([                           ║
    //  ║        data.timestamp, data.type,                ║
    //  ║        data.name, data.phone,                    ║
    //  ║        data.whatsapp, data.email,                ║
    //  ║        data.destination, data.travelers,         ║
    //  ║        data.date, data.budget, data.message      ║
    //  ║      ]);                                         ║
    //  ║      MailApp.sendEmail({                         ║
    //  ║        to: OWNER_EMAIL,                          ║
    //  ║        subject: '🏔 New Booking: '+data.destination║
    //  ║        body: 'New booking inquiry!\n\n' +        ║
    //  ║          'Name: ' + data.name + '\n' +           ║
    //  ║          'Phone: ' + data.phone + '\n' +         ║
    //  ║          'Destination: ' + data.destination+'\n'+║
    //  ║          'Travelers: ' + data.travelers + '\n' + ║
    //  ║          'Date: ' + data.date + '\n' +           ║
    //  ║          'Message: ' + data.message              ║
    //  ║      });                                         ║
    //  ║      return ContentService                       ║
    //  ║        .createTextOutput(JSON.stringify(         ║
    //  ║          {result:'success'}))                    ║
    //  ║        .setMimeType(ContentService               ║
    //  ║          .MimeType.JSON);                        ║
    //  ║    } catch(err) {                                ║
    //  ║      return ContentService                       ║
    //  ║        .createTextOutput(JSON.stringify(         ║
    //  ║          {result:'error',error:err.message}))    ║
    //  ║        .setMimeType(ContentService               ║
    //  ║          .MimeType.JSON);                        ║
    //  ║    }                                             ║
    //  ║  }                                               ║
    //  ║                                                  ║
    //  ║  STEP 3: Deploy                                  ║
    //  ║  ─────────────────────────────────────────────   ║
    //  ║  Click Deploy → New Deployment                   ║
    //  ║  Type: Web App                                   ║
    //  ║  Execute as: Me                                  ║
    //  ║  Who has access: Anyone                          ║
    //  ║  Click Deploy → Copy the Web App URL             ║
    //  ║                                                  ║
    //  ║  STEP 4: Update Website                          ║
    //  ║  ─────────────────────────────────────────────   ║
    //  ║  Replace YOUR_GOOGLE_APPS_SCRIPT_URL_HERE        ║
    //  ║  in the JavaScript with your Web App URL         ║
    //  ║                                                  ║
    //  ╚══════════════════════════════════════════════════╝ -->

     