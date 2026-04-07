
// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => observer.observe(s));

// ── Preorder Modal ────────────────────────────────────────
const preorderModal  = document.getElementById('preorder-modal');
const openPreorder   = document.getElementById('open-preorder');
const closePreorder  = document.getElementById('close-preorder');
const cancelPreorder = document.getElementById('cancel-preorder');
const goNotify       = document.getElementById('go-notify');
const backPreorder   = document.getElementById('back-preorder');
const notifyForm     = document.getElementById('notify-form');
const step1          = document.getElementById('preorder-step-1');
const step2          = document.getElementById('preorder-step-2');
const step3          = document.getElementById('preorder-step-3');

function openPreorderModal() {
  preorderModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePreorderModal() {
  preorderModal.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => {
    step1.style.display = '';
    step2.style.display = 'none';
    step3.classList.remove('active');
    notifyForm && notifyForm.reset();
  }, 300);
}

openPreorder   && openPreorder.addEventListener('click',   (e) => { e.preventDefault(); openPreorderModal(); });
closePreorder  && closePreorder.addEventListener('click',  closePreorderModal);
cancelPreorder && cancelPreorder.addEventListener('click', closePreorderModal);
preorderModal  && preorderModal.addEventListener('click',  (e) => { if (e.target === preorderModal) closePreorderModal(); });

goNotify && goNotify.addEventListener('click', () => {
  step1.style.display = 'none';
  step2.style.display = 'block';
});

backPreorder && backPreorder.addEventListener('click', () => {
  step2.style.display = 'none';
  step1.style.display = '';
});

notifyForm && notifyForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = notifyForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Signing up…';
  submitBtn.disabled = true;

  const data = new FormData();
  data.append('name',     document.getElementById('notify-name').value);
  data.append('email',    document.getElementById('notify-email').value);
  data.append('_subject', 'New Pre-Order Notification Request');
  data.append('_replyto', document.getElementById('notify-email').value);

  try {
    await fetch('https://formspree.io/admin@ibtaura.co.in', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
  } catch (_) {}

  step2.style.display = 'none';
  step3.classList.add('active');
});

// ── Contact Modal ──────────────────────────────────────────
const modal       = document.getElementById('contact-modal');
const openBtn     = document.getElementById('open-contact');
const closeBtn    = document.getElementById('close-contact');
const cancelBtn   = document.getElementById('cancel-contact');
const form        = document.getElementById('contact-form');
const formView    = document.getElementById('modal-form-view');
const successView = document.getElementById('modal-success-view');

function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  formView.style.display = '';
  successView.classList.remove('active');
  form && form.reset();
}

openBtn   && openBtn.addEventListener('click',   (e) => { e.preventDefault(); openModal(); });
closeBtn  && closeBtn.addEventListener('click',  closeModal);
cancelBtn && cancelBtn.addEventListener('click', closeModal);
modal     && modal.addEventListener('click',     (e) => { if (e.target === modal) closeModal(); });

form && form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  const data = new FormData();
  data.append('name',     document.getElementById('fname').value);
  data.append('email',    document.getElementById('femail').value);
  data.append('_replyto', document.getElementById('femail').value);

  try {
    await fetch('https://formspree.io/admin@ibtaura.co.in', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
  } catch (_) {}

  formView.style.display = 'none';
  successView.classList.add('active');
});
