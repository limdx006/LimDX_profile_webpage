(function(){
  async function handleSubmit(e) {
    if (!e.target || e.target.id !== 'contact-form') return;
    e.preventDefault();
    const form = e.target;
    const name = (form.querySelector('input[name="name"]') || {}).value || '';
    const email = (form.querySelector('input[name="email"]') || {}).value || '';
    const message = (form.querySelector('textarea[name="message"]') || {}).value || '';
    const statusEl = document.getElementById('contact-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const endpoint = form.dataset.endpoint || window.FORM_ENDPOINT || '';

    function setStatus(text, isError) {
      if (!statusEl) return;
      statusEl.textContent = text;
      statusEl.style.color = isError ? 'crimson' : 'var(--color-primary, #2b8aef)';
    }

    if (!name || !email || !message) {
      setStatus('Please complete all fields.', true);
      return;
    }

    submitBtn && (submitBtn.disabled = true);
    setStatus('Sending...');

    try {
      if (endpoint) {
        // Send to configured endpoint (Formspree or similar expects JSON with Accept header)
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
        });
        if (res.ok) {
          setStatus('Message sent — thank you!');
          form.reset();
        } else {
          const text = await res.text().catch(() => '');
          setStatus('Send failed. Falling back to email client.', true);
          // fallback to mailto
          openMailClient();
        }
      } else {
        // No endpoint configured — open user's mail client via mailto
        openMailClient();
      }
    } catch (err) {
      setStatus('Network error. Opening email client as fallback.', true);
      openMailClient();
    } finally {
      submitBtn && (submitBtn.disabled = false);
    }

    function openMailClient() {
      const to = 'limdongx@gmail.com';
      const subject = encodeURIComponent(`Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
      window.location.href = mailto;
    }
  }

  document.addEventListener('submit', handleSubmit);
})();
