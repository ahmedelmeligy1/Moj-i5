// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function closeMobileNav() {
  navLinks?.classList.remove('is-open');
  navOverlay?.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-locked');
}
function openMobileNav() {
  navLinks?.classList.add('is-open');
  navOverlay?.classList.add('is-open');
  navToggle?.setAttribute('aria-expanded', 'true');
  document.body.classList.add('nav-locked');
}
navToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.contains('is-open');
  isOpen ? closeMobileNav() : openMobileNav();
});
navOverlay?.addEventListener('click', closeMobileNav);

// ===== Smooth scroll =====
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || href === '#') return;
  const target = document.querySelector(href);
  if (!target) return;
  e.preventDefault();
  closeMobileNav();
  const top = target.getBoundingClientRect().top + window.pageYOffset - 20;
  window.scrollTo({ top, behavior: 'smooth' });
  if (link.closest('.nav-links')) {
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
  }
});

// ===== Filter =====
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.cards-grid .card');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const status = card.dataset.status, category = card.dataset.category;
      let show = filter === 'all' || (filter === 'available' || filter === 'soon' ? status === filter : category === filter);
      card.classList.toggle('is-hidden', !show);
    });
  });
});

// ===== Nav highlight =====
const sections = ['home','services','how','availability','faq','contact'].map(id => document.getElementById(id)).filter(Boolean);
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120; let cur = null;
  sections.forEach(s => { if (s.offsetTop <= y) cur = s.id; });
  if (!cur) return;
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
});

// ===== Details Modal =====
const DETAILS = {
  'باقات واتساب': {
    color:'green', badge:'قريباً — بانتظار اعتماد Meta',
    lead:'رسائل تشغيلية وقوالب تواصل وخدمة عملاء عبر واتساب.',
    includes:['تنبيهات الطلبات','قوالب رسائل جاهزة','دعم العملاء','ربط مع مركز الأعمال الموحد'],
    packages:[
      {name:'تنبيهات واتساب',status:'قريباً',icon:'bell',color:'orange'},
      {name:'دعم واتساب',status:'قريباً',icon:'headset',color:'blue'},
      {name:'حملات واتساب',status:'لاحقاً',icon:'megaphone',color:'red'},
      {name:'واتساب متقدم',status:'لاحقاً',icon:'whatsapp',color:'green'}
    ],
    audience:'أصحاب المتاجر الذين يرغبون في تواصل احترافي وآلي مع عملائهم عبر واتساب.',
    approval:'نعم، تتطلب هذه الخدمة إعداداً وطلب موافقة من Meta قبل تفعيلها.',
    cta:'سجل اهتمامك بباقات واتساب', ctaColor:'green'
  },
  'مركز الأعمال الموحد': {
    color:'purple', badge:'قريباً',
    lead:'إدارة الطلبات والخدمات والدعم والتشغيل من مركز واحد.',
    includes:['لوحة موحدة للطلبات','إدارة الدعم والخدمات','تكامل مع باقي الخدمات','تقارير سريعة'],
    audience:'المتاجر التي تحتاج تنظيم عملياتها اليومية في مكان واحد.',
    approval:'لا يحتاج موافقة، يفعل تلقائياً عند الإطلاق.',
    cta:'سجل اهتمامك', ctaColor:'purple'
  },
  'المساعد الذكي': {
    color:'blue', badge:'قريباً',
    lead:'مساعد ذكي للتوصيات ووصف المنتجات وتحسين تجربة التاجر.',
    includes:['اقتراحات ذكية للمنتجات','كتابة أوصاف تلقائية','تحليل سلوك العملاء','دعم لغوي متقدم'],
    audience:'التجار الراغبون في استخدام الذكاء الاصطناعي لتوفير الوقت وتحسين الأداء.',
    approval:'لا يحتاج موافقة، يفعل تلقائياً.',
    cta:'سجل اهتمامك', ctaColor:'purple'
  },
  'شارة موثوق': {
    color:'purple', badge:'متاح بشروط',
    lead:'تعزيز الثقة في متجرك بعد التحقق والمراجعة.',
    includes:['شارة موثقة على المتجر','مراجعة رسمية من فريق موج','زيادة معدل التحويل','ظهور مميز في البحث'],
    audience:'المتاجر التي أثبتت جدارتها وترغب في تعزيز الثقة مع العملاء.',
    approval:'نعم، تتطلب مراجعة وتحقق قبل منح الشارة.',
    cta:'اطلب شارة موثوق', ctaColor:'green'
  },
  'التقارير المتقدمة': {
    color:'green', badge:'متاح الآن',
    lead:'مؤشرات أداء ومبيعات وتقارير تشغيلية تساعدك على اتخاذ القرار.',
    includes:['تقارير مبيعات لحظية','تحليل سلوك العملاء','مؤشرات أداء KPI','تصدير التقارير'],
    audience:'كل تاجر يريد فهم أداء متجره بشكل دقيق.',
    approval:'متاح مباشرة، لا يحتاج موافقة.',
    cta:'فعّل التقارير المتقدمة', ctaColor:'green'
  },
  'الظهور المميز والإعلانات': {
    color:'orange', badge:'متاح الآن',
    lead:'حلول لزيادة الظهور داخل موج وتعزيز نمو المتجر.',
    includes:['ظهور مميز في القوائم','حملات إعلانية مستهدفة','تقارير أداء الحملات','دعم متخصص'],
    audience:'المتاجر التي تريد نمواً سريعاً وزيادة الوصول.',
    approval:'تحتاج مراجعة سريعة قبل التفعيل.',
    cta:'اطلب خدمة الظهور المميز', ctaColor:'orange'
  }
};

function renderModal(key, fallback) {
  const d = DETAILS[key] || {
    color:'purple',
    badge: fallback?.badge || 'متاح',
    lead: fallback?.desc || '',
    includes:['تفاصيل الخدمة','مواصفات فنية','دعم متخصص','متابعة مستمرة'],
    audience:'المتاجر الراغبة في تحسين أدائها وتجربة عملائها.',
    approval:'يرجى التواصل معنا لمعرفة تفاصيل التفعيل.',
    cta:'سجل اهتمامك', ctaColor:'purple'
  };
  const iconHTML = fallback?.iconHTML || '';
  const iconClass = fallback?.iconClass || `icon-${d.color}`;
  const subClass = d.color === 'green' ? '' : (d.color === 'orange' ? 'orange' : 'purple');
  const badgeIconColor = d.color === 'green' ? '#22c55e' : (d.color === 'orange' ? '#f59e0b' : '#6d5cff');

  const PKG_ICONS = {
    bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
    headset:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14v-3a9 9 0 0 1 18 0v3"/><path d="M21 14a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zM3 14a2 2 0 0 0 2 2h1v-5H5a2 2 0 0 0-2 2zM19 16v1a4 4 0 0 1-4 4h-2"/></svg>',
    megaphone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
    whatsapp:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.82 14.11c-.24.67-1.4 1.28-1.94 1.36-.5.07-1.13.11-1.83-.11-.42-.13-.97-.31-1.66-.61-2.94-1.27-4.85-4.22-5-4.42-.15-.19-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.89 2.15.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.38-.42.5-.14.14-.28.29-.12.57.16.29.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.69-.81.87-1.08.18-.28.36-.23.61-.14.24.09 1.55.73 1.81.86.27.13.44.19.51.31.07.11.07.66-.17 1.31z"/></svg>'
  };
  const PKG_COLORS = {
    orange:{bg:'#fff3e0',fg:'#f59e0b'},
    blue:{bg:'#e0f2fe',fg:'#2ea6e0'},
    red:{bg:'#ffe4e6',fg:'#ef4444'},
    green:{bg:'#e8fff1',fg:'#22c55e'},
    purple:{bg:'#eeebff',fg:'#6d5cff'}
  };

  const pkgsHTML = d.packages ? `
    <div class="m-section">
      <h4>الباقات المتوقعة</h4>
      <div class="m-pkgs">${d.packages.map(p => {
        const c = PKG_COLORS[p.color || 'purple'] || PKG_COLORS.purple;
        const ic = PKG_ICONS[p.icon] || PKG_ICONS.bell;
        return `<div class="m-pkg">
          <div class="pi" style="background:${c.bg};color:${c.fg}">${ic}</div>
          <div class="pname">${p.name}</div>
          <span class="pbadge ${p.status.includes('لاحق') ? 'later' : ''}">${p.status}</span>
        </div>`;
      }).join('')}</div>
    </div>` : '';

  const checkSVG = '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#22c55e"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const baseHTML = `
    <div class="mh">
      <h2>${key}</h2>
      <div class="icon-box ${iconClass}">${iconHTML}</div>
    </div>
    <div class="m-sub ${subClass}"><span class="sub-dot"></span>${d.badge}</div>
    <p class="m-lead">${d.lead}</p>

    <div class="m-section">
      <h4>ماذا تشمل؟</h4>
      <div class="m-includes-body">
        <div class="m-includes-illus ${iconClass}">${iconHTML}</div>
        <ul class="m-list">${d.includes.map(i => `<li><span class="m-check">${checkSVG}</span> ${i}</li>`).join('')}</ul>
      </div>
    </div>


    ${pkgsHTML}

    <div class="m-section">
      <h4>لمن تناسب؟</h4>
      <p class="m-text">${d.audience}</p>
    </div>

    <div class="m-section">
      <h4>هل تحتاج موافقة أو إعداد؟</h4>
      <p class="m-text">${d.approval}</p>
    </div>

    <div class="m-section">
      <h4>الإجراء المناسب حسب حالة الخدمة</h4>
      <div class="m-actions-list">
        <div class="m-arow green"><span class="ar-label"><span class="ar-icon"><i class="fa-solid fa-check"></i></span>متاح</span><span class="ar-btn">اطلب الخدمة</span></div>
        <div class="m-arow orange"><span class="ar-label"><span class="ar-icon"><i class="fa-regular fa-clock"></i></span>قريباً</span><span class="ar-btn">سجل اهتمامك</span></div>
        <div class="m-arow yellow"><span class="ar-label"><span class="ar-icon"><i class="fa-solid fa-star-half-stroke"></i></span>متاح جزئياً</span><span class="ar-btn">اطلب مراجعة / اطلب الخدمة</span></div>
        <div class="m-arow purple"><span class="ar-label"><span class="ar-icon"><i class="fa-solid fa-people-arrows"></i></span>عبر شركاء أو AI</span><span class="ar-btn">اطلب عرض سعر / اطلب الخدمة</span></div>
        <div class="m-arow blue"><span class="ar-label"><span class="ar-icon"><i class="fa-solid fa-star"></i></span>أساسي</span><span class="ar-btn">عرض طريقة الاستخدام</span></div>
      </div>
    </div>
  `;



  // Dynamic CTA based on badge/status
  const badgeStr = (d.badge || fallback?.badge || '').trim();
  let ctaText = d.cta, ctaColor = d.ctaColor || 'purple';
  const auto = (() => {
    if (/أساسي/.test(badgeStr)) return {t:'عرض طريقة الاستخدام',c:'purple'};
    if (/جزئي/.test(badgeStr))  return {t:'اطلب الخدمة',c:'orange'};
    if (/شروط/.test(badgeStr))  return {t:'اطلب مراجعة',c:'purple'};
    if (/قريب/.test(badgeStr))  return {t:'سجل اهتمامك',c:'orange'};
    if (/شركاء|AI/i.test(badgeStr)) return {t:'اطلب عرض سعر',c:'purple'};
    if (/متاح/.test(badgeStr))  return {t:'اطلب الخدمة',c:'green'};
    return null;
  })();
  if (auto && !DETAILS[key]) { ctaText = auto.t; ctaColor = auto.c; }
  else if (auto && DETAILS[key]) { ctaText = ctaText || auto.t; ctaColor = auto.c; }

  return baseHTML + `
    <button class="m-cta ${ctaColor}"><i class="fa-regular fa-heart"></i> ${ctaText}</button>
    <p class="m-foot">سنعود بتوفير الخدمة واعتمادها لتكون من أوائل المستفيدين.</p>
  `;
}

const modal = document.getElementById('detailsModal');
const modalBody = document.getElementById('modalBody');

function openModal(key, fallback) {
  modalBody.innerHTML = renderModal(key, fallback);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.closest('.modal-close')) closeModal();
  const ctaBtn = e.target.closest('.m-cta');
  if (ctaBtn) {
    closeModal();
    const target = document.getElementById('join');
    if (target) {
      setTimeout(() => {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 150);
    }
  }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// Main cards
document.querySelectorAll('.cards-grid .card').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const title = card.querySelector('h3')?.textContent.trim() || '';
    const desc = card.querySelector('p')?.textContent.trim() || '';
    const badge = card.querySelector('.badge')?.textContent.trim() || '';
    const iconBox = card.querySelector('.icon-box');
    const iconHTML = iconBox?.innerHTML || '';
    const iconClass = iconBox?.className.replace('icon-box','').trim() || '';
    openModal(title, { desc, badge, iconHTML, iconClass });
  });
});

// Mini cards
document.querySelectorAll('.mini-card').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const title = card.querySelector('.mini-title')?.textContent.trim() || '';
    const desc = card.querySelector('p')?.textContent.trim() || '';
    const badge = card.querySelector('.mini-badge')?.textContent.trim() || '';
    const iconEl = card.querySelector('.mini-icon');
    const iconHTML = iconEl?.innerHTML || '';
    const iconClass = iconEl?.className.replace('mini-icon','').trim() || '';
    openModal(title, { desc, badge, iconHTML, iconClass });
  });
});

// ===== Contact Modal =====
const contactModal = document.getElementById('contactModal');
const contactForm  = document.getElementById('contactForm');
const contactNote  = document.getElementById('contactNote');

function openContactModal() {
  if (!contactModal) return;
  contactModal.classList.add('is-open');
  contactModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => contactModal.querySelector('input[name="name"]')?.focus(), 60);
}
function closeContactModal() {
  if (!contactModal) return;
  contactModal.classList.remove('is-open');
  contactModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (contactNote) { contactNote.textContent = ''; contactNote.classList.remove('error'); }
}

// Intercept every "تواصل معنا" link
document.querySelectorAll('[data-contact-open]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeMobileNav();
    openContactModal();
  });
});

contactModal?.addEventListener('click', (e) => {
  if (e.target === contactModal || e.target.closest('[data-contact-close]')) closeContactModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && contactModal?.classList.contains('is-open')) closeContactModal();
});

// Only allow real digits in phone fields, live as the user types
document.querySelectorAll('input[type="tel"]').forEach((input) => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, input.maxLength > 0 ? input.maxLength : 10);
  });
});

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const SA_PHONE_RE = /^0?5[0-9]{8}$/; // e.g. 5XXXXXXXX or 05XXXXXXXX

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm).entries());
  const emailOk = EMAIL_RE.test((data.email || '').trim());
  const phoneOk = SA_PHONE_RE.test((data.phone || '').trim());
  if (!data.name || !phoneOk || !emailOk || !data.subject || !data.message) {
    contactNote.textContent = !phoneOk
      ? 'يرجى إدخال رقم جوال سعودي صحيح.'
      : !emailOk
        ? 'يرجى إدخال بريد إلكتروني صحيح.'
        : 'يرجى تعبئة جميع الحقول.';
    contactNote.classList.add('error');
    return;
  }
  // Build a mailto fallback so the message actually reaches info@moj.sa
  const cleanPhone = data.phone.replace(/^0/, '');
  const body = `الاسم: ${data.name}%0Aالجوال: 966${cleanPhone}%0Aالبريد: ${data.email}%0A%0A${encodeURIComponent(data.message)}`;
  const href = `mailto:info@moj.sa?subject=${encodeURIComponent(data.subject)}&body=${body}`;
  window.location.href = href;
  contactNote.classList.remove('error');
  contactNote.textContent = 'تم تجهيز رسالتك — سيفتح بريدك الآن لإرسالها.';
  setTimeout(() => { contactForm.reset(); closeContactModal(); }, 1400);
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('is-visible', window.scrollY > 400);
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Early access signup form
const signupForm = document.getElementById('signupForm');
const signupNote = document.getElementById('signupNote');
const roleLabels = document.querySelectorAll('.sf-role');

roleLabels.forEach((label) => {
  const input = label.querySelector('input[type="radio"]');
  input?.addEventListener('change', () => {
    roleLabels.forEach((l) => l.classList.remove('is-checked'));
    if (input.checked) label.classList.add('is-checked');
  });
});

signupForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(signupForm).entries());
  const emailOk = EMAIL_RE.test((data.email || '').trim());
  const phoneOk = SA_PHONE_RE.test((data.phone || '').trim());
  if (!emailOk || !phoneOk || !data.role || !data.agree) {
    signupNote.textContent = !emailOk
      ? 'يرجى إدخال بريد إلكتروني صحيح.'
      : !phoneOk
        ? 'يرجى إدخال رقم جوال سعودي صحيح.'
        : 'يرجى اختيار نوع التسجيل والموافقة على الشروط.';
    signupNote.classList.add('error');
    return;
  }
  const cleanPhone = data.phone.replace(/^0/, '');
  const roleLabel = data.role === 'seller' ? 'بائع' : 'مشترك';
  const body = `البريد: ${data.email}%0Aالجوال: 966${cleanPhone}%0Anوع التسجيل: ${roleLabel}`;
  const href = `mailto:info@moj.sa?subject=${encodeURIComponent('تسجيل مبكر - موج')}&body=${body}`;
  window.location.href = href;
  signupNote.classList.remove('error');
  signupNote.textContent = 'تم تجهيز بياناتك — سيفتح بريدك الآن لإتمام التسجيل.';
  setTimeout(() => { signupForm.reset(); roleLabels.forEach((l) => l.classList.remove('is-checked')); }, 1600);
});

// Hover focus mode: dim sibling cards so the hovered one draws all attention
// Skipped on touch devices (no real hover) to avoid a state getting stuck after a tap
function setupGridFocus(gridSelector, itemSelector) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll(gridSelector).forEach((grid) => {
    const items = grid.querySelectorAll(itemSelector);
    if (!items.length) return;
    items.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        grid.classList.add('has-focus');
        item.classList.add('is-focused');
      });
      item.addEventListener('mouseleave', () => {
        item.classList.remove('is-focused');
        if (!grid.querySelector(`${itemSelector}.is-focused`)) {
          grid.classList.remove('has-focus');
        }
      });
    });
  });
}
setupGridFocus('.cards-grid', '.card');
setupGridFocus('.mini-grid', '.mini-card');

// ===== FAQ accordion =====
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  question?.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      }
    });
    if (isOpen) {
      item.classList.remove('is-open');
      question.setAttribute('aria-expanded', 'false');
      answer.style.maxHeight = null;
    } else {
      item.classList.add('is-open');
      question.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});
