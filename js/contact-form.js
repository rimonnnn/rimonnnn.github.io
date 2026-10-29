/* =========================================================
   contact-form.js — Email via Formspree + WhatsApp fallback
========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitButton = document.getElementById('submitButton');
  const whatsappSubmitButton = document.getElementById('whatsappSubmitButton');
  const whatsappNumber = '201206174130';

  const showFormStatus = (message, type) => {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status visible ${type}`;
  };

  const getContactFormData = () => ({
    name: document.getElementById('clientName')?.value.trim() || '',
    email: document.getElementById('clientEmail')?.value.trim() || '',
    message: document.getElementById('clientMessage')?.value.trim() || ''
  });

  contactForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!submitButton) return;

    /* Keep the full markup (icon + label), not just the text, so the
       button icon is restored after sending. */
    const originalHTML = submitButton.innerHTML;
    submitButton.textContent = 'Sending via Email...';
    submitButton.setAttribute('disabled', 'true');
    whatsappSubmitButton?.setAttribute('disabled', 'true');
    formStatus?.classList.remove('visible', 'success', 'error');

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        contactForm.reset();
        showFormStatus('Message sent by email successfully. I will get back to you soon.', 'success');
      } else {
        showFormStatus('Email sending failed. Please try again or use WhatsApp instead.', 'error');
      }
    } catch (error) {
      showFormStatus('Network error. Please try again or send the message via WhatsApp.', 'error');
    } finally {
      submitButton.innerHTML = originalHTML;
      submitButton.removeAttribute('disabled');
      whatsappSubmitButton?.removeAttribute('disabled');
    }
  });

  whatsappSubmitButton?.addEventListener('click', () => {
    if (!contactForm) return;
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const { name, email, message } = getContactFormData();
    const whatsappMessage = `Hi Rimon, I saw your portfolio and would like to contact you.
Name: ${name}
Email: ${email}
Message: ${message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    showFormStatus('Opening WhatsApp with your message ready to send.', 'success');
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
});
