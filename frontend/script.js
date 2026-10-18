// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// Mobile menu accessibility & interaction
const toggle = document.getElementById('menuToggle');
const links = document.querySelector('.nav-links');

if (toggle && links) {
  const closeMenu = () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    links.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = links.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking a nav link
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (links.classList.contains('is-open') && !links.contains(e.target) && e.target !== toggle) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });
}

// Contact Form — Envío vía endpoint FastAPI + Resend
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const sendBtn = document.getElementById('sendBtn');

if (contactForm && formFeedback && sendBtn) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const subject = subjectInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';

    if (!name || !email || !message) {
      formFeedback.className = 'form-feedback error';
      formFeedback.textContent = 'Por favor completa tu nombre, correo y mensaje.';
      return;
    }

    // Estado cargando
    sendBtn.disabled = true;
    const originalBtnHtml = sendBtn.innerHTML;
    sendBtn.innerHTML = '<span>Enviando mensaje...</span>';
    formFeedback.className = 'form-feedback loading';
    formFeedback.textContent = 'Despachando correo a través de FastAPI y Resend...';

    // URL del endpoint: local por defecto (puerto 8000) o variable configurada
    const apiUrl = window.PORTFOLIO_API_URL || 'http://localhost:8000/api/send-email';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject: subject || null,
          message,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = '✓ ¡Mensaje enviado con éxito! Te responderé a la brevedad.';
        contactForm.reset();
      } else {
        formFeedback.className = 'form-feedback error';
        const detail = data.detail || 'Ocurrió un error al procesar el envío.';
        if (detail.includes('RESEND_API_KEY')) {
          formFeedback.textContent = 'Aviso: La clave RESEND_API_KEY debe configurarse en backend/.env';
        } else {
          formFeedback.textContent = `Error: ${detail}`;
        }
      }
    } catch (err) {
      formFeedback.className = 'form-feedback error';
      formFeedback.innerHTML = 'Microservicio local no disponible. Inicia el backend con <code>uvicorn main:app --reload</code> en <code>/backend</code> o escríbeme directo a <a href="mailto:nicolas.psilvera@gmail.com" style="color:var(--violet-deep);font-weight:700;">nicolas.psilvera@gmail.com</a>';
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = originalBtnHtml;
    }
  });
}
