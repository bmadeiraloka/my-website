// ─── Nav active state ──────────────────────────────────────
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link[data-page]').forEach(link => {
  if (link.dataset.page === page) link.classList.add('active');
});

// ─── Mobile nav toggle ─────────────────────────────────────
const toggle = document.querySelector('.nav__toggle');
const mobileNav = document.querySelector('.nav__mobile');

toggle?.addEventListener('click', () => {
  const open = toggle.classList.toggle('open');
  mobileNav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
});

// Close mobile nav on link click
mobileNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// ─── Contact form ──────────────────────────────────────────
const form = document.getElementById('contact-form');
if (form) {
  const requiredFields = form.querySelectorAll('[required]');

  const validate = (field) => {
    const group = field.closest('.form-group');
    const empty = !field.value.trim();
    const invalidEmail = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
    const hasError = empty || invalidEmail;
    group.classList.toggle('has-error', hasError);
    field.classList.toggle('error', hasError);
    return !hasError;
  };

  requiredFields.forEach(field => {
    field.addEventListener('blur', () => validate(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validate(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = [...requiredFields].map(validate).every(Boolean);
    if (!allValid) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    // Simulate async submit
    setTimeout(() => {
      form.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    }, 1000);
  });
}
