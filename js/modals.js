// js/modals.js — Shared modal logic for Email Us and Request a Quote

function openModal(modalId) {
  var modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// ESC closes any open modal
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(function(m) {
      closeModal(m.id);
    });
  }
});

// Clicking the backdrop closes the modal
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal(e.target.id);
  }
});

// Pill selector: clicking a pill selects it and writes to hidden input
function initPillSelectors() {
  document.querySelectorAll('.pill-group').forEach(function(group) {
    group.querySelectorAll('.pill').forEach(function(pill) {
      pill.addEventListener('click', function() {
        group.querySelectorAll('.pill').forEach(function(p) {
          p.classList.remove('pill-active');
        });
        pill.classList.add('pill-active');
        var hiddenInput = document.getElementById(group.dataset.target);
        if (hiddenInput) hiddenInput.value = pill.dataset.value;
      });
    });
  });
}

// Validate basic email format
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Show inline error on a field
function showFieldError(fieldId, message) {
  var el = document.getElementById(fieldId + '-error');
  if (el) { el.textContent = message; el.classList.remove('hidden'); }
}

// Hide inline error on a field
function clearFieldError(fieldId) {
  var el = document.getElementById(fieldId + '-error');
  if (el) el.classList.add('hidden');
}

// Handle contact form submit
function handleContactSubmit(e) {
  e.preventDefault();
  var form = document.getElementById('contact-form');
  var name    = document.getElementById('contact-name').value.trim();
  var company = document.getElementById('contact-company').value.trim();
  var email   = document.getElementById('contact-email').value.trim();
  var message = document.getElementById('contact-message').value.trim();

  var valid = true;
  ['contact-name','contact-company','contact-email','contact-message'].forEach(clearFieldError);

  if (!name)                { showFieldError('contact-name',    'Please enter your name.');         valid = false; }
  if (!company)             { showFieldError('contact-company', 'Please enter your company name.'); valid = false; }
  if (!isValidEmail(email)) { showFieldError('contact-email',   'Please enter a valid email.');     valid = false; }
  if (!message)             { showFieldError('contact-message', 'Please enter a message.');         valid = false; }
  if (!valid) return;

  var btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending\u2026';

  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, company: company, email: email, message: message })
  })
  .then(function(res) { return res.json().then(function(data) { return { ok: res.ok, data: data }; }); })
  .then(function(result) {
    if (result.ok) {
      document.getElementById('contact-form-body').classList.add('hidden');
      document.getElementById('contact-success').classList.remove('hidden');
    } else {
      showContactError();
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  })
  .catch(function() {
    showContactError();
    btn.disabled = false;
    btn.textContent = 'Send Message';
  });
}

function showContactError() {
  var el = document.getElementById('contact-form-error');
  if (el) el.classList.remove('hidden');
}

// Handle quote form submit
function handleQuoteSubmit(e) {
  e.preventDefault();
  var form = document.getElementById('quote-modal-form');

  var productCategory  = document.getElementById('q-product-category').value;
  var material         = document.getElementById('q-material').value;
  var quantity         = document.getElementById('q-quantity').value;
  var deliveryLocation = document.getElementById('q-delivery').value;
  var customPrinting   = document.getElementById('q-custom-printing').value;
  var name             = document.getElementById('q-name').value.trim();
  var company          = document.getElementById('q-company').value.trim();
  var email            = document.getElementById('q-email').value.trim();
  var printFileInput   = document.getElementById('q-print-file');
  var printFile        = printFileInput && printFileInput.files[0];

  var valid = true;
  ['q-product-category','q-material','q-quantity','q-delivery','q-custom-printing','q-name','q-company','q-email'].forEach(clearFieldError);

  if (!productCategory)     { showFieldError('q-product-category', 'Please select a product category.'); valid = false; }
  if (!material)            { showFieldError('q-material',         'Please select a material.');          valid = false; }
  if (!quantity)            { showFieldError('q-quantity',         'Please enter or select a quantity.'); valid = false; }
  if (!deliveryLocation)    { showFieldError('q-delivery',         'Please select a delivery location.');  valid = false; }
  if (!customPrinting)      { showFieldError('q-custom-printing',  'Please select a printing option.');    valid = false; }
  if (!name)                { showFieldError('q-name',             'Please enter your name.');             valid = false; }
  if (!company)             { showFieldError('q-company',          'Please enter your company name.');     valid = false; }
  if (!isValidEmail(email)) { showFieldError('q-email',           'Please enter a valid email.');         valid = false; }
  if (!valid) return;

  var btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending\u2026';

  function doSubmit(printingFileData, printingFileName) {
    fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productCategory: productCategory,
        material: material,
        quantity: quantity,
        deliveryLocation: deliveryLocation,
        customPrinting: customPrinting,
        name: name,
        company: company,
        email: email,
        printingFileData: printingFileData || null,
        printingFileName: printingFileName || null
      })
    })
    .then(function(res) { return res.json().then(function(data) { return { ok: res.ok, data: data }; }); })
    .then(function(result) {
      if (result.ok) {
        document.getElementById('quote-form-body').classList.add('hidden');
        document.getElementById('quote-success').classList.remove('hidden');
      } else {
        showQuoteError();
        btn.disabled = false;
        btn.textContent = 'Submit Request';
      }
    })
    .catch(function() {
      showQuoteError();
      btn.disabled = false;
      btn.textContent = 'Submit Request';
    });
  }

  if (printFile) {
    var reader = new FileReader();
    reader.onload = function(ev) {
      doSubmit(ev.target.result, printFile.name);
    };
    reader.onerror = function() {
      doSubmit(null, null);
    };
    reader.readAsDataURL(printFile);
  } else {
    doSubmit(null, null);
  }
}

function showQuoteError() {
  var el = document.getElementById('quote-form-error');
  if (el) el.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
  initPillSelectors();

  // Quantity: sync custom text input ↔ pill selection
  var quantityCustom = document.getElementById('q-quantity-custom');
  var quantityHidden = document.getElementById('q-quantity');
  var quantityPillGroup = document.getElementById('q-quantity-pills');
  if (quantityCustom && quantityHidden && quantityPillGroup) {
    quantityCustom.addEventListener('input', function() {
      var val = quantityCustom.value.trim();
      quantityHidden.value = val;
      // deselect all quantity pills when typing a custom value
      quantityPillGroup.querySelectorAll('.pill').forEach(function(p) {
        p.classList.remove('pill-active');
      });
    });
    // when a quantity pill is clicked, clear the custom input
    quantityPillGroup.querySelectorAll('.pill').forEach(function(pill) {
      pill.addEventListener('click', function() {
        quantityCustom.value = '';
      });
    });
  }

  // Custom Printing: show/hide upload zone when "Yes" is selected
  var printingPillGroup = document.getElementById('q-custom-printing-pills');
  var uploadZone = document.getElementById('q-upload-zone');
  var uploadInput = document.getElementById('q-print-file');
  var uploadLabelText = document.getElementById('q-upload-label-text');
  if (printingPillGroup && uploadZone) {
    printingPillGroup.querySelectorAll('.pill').forEach(function(pill) {
      pill.addEventListener('click', function() {
        if (pill.dataset.value === 'Yes') {
          uploadZone.classList.remove('hidden');
        } else {
          uploadZone.classList.add('hidden');
          if (uploadInput) uploadInput.value = '';
          if (uploadLabelText) uploadLabelText.textContent = 'Upload print artwork';
        }
      });
    });
  }

  // Show selected filename in upload zone
  if (uploadInput && uploadLabelText) {
    uploadInput.addEventListener('change', function() {
      var file = uploadInput.files[0];
      if (file) uploadLabelText.textContent = file.name;
    });
  }

  var contactForm = document.getElementById('contact-form');
  if (contactForm) contactForm.addEventListener('submit', handleContactSubmit);

  var quoteForm = document.getElementById('quote-modal-form');
  if (quoteForm) quoteForm.addEventListener('submit', handleQuoteSubmit);
});
