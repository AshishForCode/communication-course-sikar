// ===================================================================
// COMMUNICATION TRAINING PROGRAM - INTERACTIVE LOGIC
// ===================================================================

const WHATSAPP_PHONE = '919252131901';

// Auto-select program when clicking a program card button
function selectProgram(programName) {
  const selectElem = document.getElementById('programSelect');
  if (selectElem) {
    for (let i = 0; i < selectElem.options.length; i++) {
      if (selectElem.options[i].text.toLowerCase().includes(programName.toLowerCase().slice(0, 3))) {
        selectElem.selectedIndex = i;
        break;
      }
    }
  }
}

// FAQ Accordion Toggle
function toggleFaq(button) {
  const item = button.parentElement;
  const answer = item.querySelector('.faq-answer');
  const isActive = item.classList.contains('active');

  // Close all open FAQs
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('active');
    const ans = el.querySelector('.faq-answer');
    if (ans) ans.style.maxHeight = null;
  });

  // Toggle current FAQ
  if (!isActive) {
    item.classList.add('active');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// Handle Form Submission -> WhatsApp Link Generation
function handleFormSubmit(event) {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const program = document.getElementById('programSelect').value;
  const userCity = document.getElementById('userCity').value.trim();

  if (!fullName || !phoneNumber || !program) {
    alert('Please fill out all required fields.');
    return;
  }

  // Compose clean WhatsApp message
  let message = `*COMMUNICATION COURSE INQUIRY (Sikar)*\n\n`;
  message += `👤 *Name:* ${fullName}\n`;
  message += `📱 *Phone:* ${phoneNumber}\n`;
  message += `🎯 *Selected Program:* ${program}\n`;
  if (userCity) {
    message += `📍 *City / Target Goal:* ${userCity}\n`;
  }
  message += `\nI would like to reserve a seat / get the fee structure & syllabus details. Please connect with me.`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

  // Give immediate visual feedback on the button
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Redirecting to WhatsApp...</span> 🚀`;

  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    submitBtn.innerHTML = `<span>Sent! Check WhatsApp</span> ✓`;
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 4000);
  }, 400);
}

// Make sure first FAQ is open by default for preview
document.addEventListener('DOMContentLoaded', () => {
  const firstFaqBtn = document.querySelector('.faq-question');
  if (firstFaqBtn) {
    toggleFaq(firstFaqBtn);
  }
});
