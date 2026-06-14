// ============================
// GOOGLE APPS SCRIPT URL
// ============================

const APPS_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycby2V0-GzMt_YwBxkZLuA3ak5JH5QNQp0CbgT9cf9bw-qPmVnU6KHr5hTby4-3C3Bme74Q/exec";


// ============================
// AOS
// ============================

AOS.init({
  duration: 700,
  once: true
});


// ============================
// MIN DATE
// ============================

const today = new Date().toISOString().split("T")[0];

if(document.getElementById("bk_date"))
  document.getElementById("bk_date").min = today;

if(document.getElementById("cf_date"))
  document.getElementById("cf_date").min = today;


// ============================
// SEND DATA TO GOOGLE SHEETS
// ============================

async function sendToSheet(data){

  try{

    await fetch(APPS_SCRIPT_URL,{
      method:"POST",
      mode:"no-cors",
      body:JSON.stringify(data)
    });

    return true;

  }catch(error){

    console.error(error);
    return false;
  }
}


// ============================
// BOOKING FORM
// ============================

const bookingForm =
document.getElementById("bookingForm");

if(bookingForm){

bookingForm.addEventListener("submit",
async function(e){

e.preventDefault();

const data = {

type:"Booking",

name:
document.getElementById("bk_name").value,

phone:
document.getElementById("bk_phone").value,

whatsapp:
document.getElementById("bk_whatsapp").value,

email:
document.getElementById("bk_email").value,

destination:
document.getElementById("bk_destination").value,

travelers:
document.getElementById("bk_travelers").value,

date:
document.getElementById("bk_date").value,

budget:
document.getElementById("bk_budget").value,

message:
document.getElementById("bk_message").value

};

await sendToSheet(data);

alert("Booking Submitted Successfully");

bookingForm.reset();

});
}


// ============================
// CONTACT FORM
// ============================

const contactForm =
document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit",
async function(e){

e.preventDefault();

const data = {

type:"Contact",

name:
document.getElementById("cf_name").value,

phone:
document.getElementById("cf_phone").value,

whatsapp:
document.getElementById("cf_whatsapp").value,

email:
document.getElementById("cf_email").value,

destination:
document.getElementById("cf_destination").value,

travelers:
document.getElementById("cf_travelers").value,

date:
document.getElementById("cf_date").value,

budget:
document.getElementById("cf_budget").value,

message:
document.getElementById("cf_message").value

};

await sendToSheet(data);

document.getElementById(
"contactFormArea"
).style.display="none";

document.getElementById(
"contactSuccess"
).style.display="block";

});
}
