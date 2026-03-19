// js/script.js

// ─── Product card → pre-fill quote form ─────────────────────────────────────

/**
 * Called by product card "Select" buttons.
 * Sets the cup-type dropdown and smoothly scrolls to the quote form.
 *
 * @param {'single'|'ripple'|'double'} type
 */
// ─── Specification data ─────────────────────────────────────────────────────

const specData = {
    single: {
        title: 'Single Wall Paper Cup — Specifications',
        headers: ['Size','Top∅ (mm)','Bottom∅ (mm)','Height (mm)','Pcs/Bag','Bags/Ctn','Ctn L (cm)','Ctn W (cm)','Ctn H (cm)'],
        rows: [
            ['2.5oz',51,35,48,50,20,26,20.5,29],
            ['3oz',55,37,55,50,20,28,22.5,29],
            ['4oz',62,45,59,50,20,31,25,29],
            ['5oz',63,45,72,50,20,32,25.5,29],
            ['6oz',68,50,71,50,20,34,28,29],
            ['7oz',73,50,77,50,20,37,30,32],
            ['7.5oz',70,45,94,50,20,35.5,28,34],
            ['8B oz',75,52,89,50,20,38,30,34],
            ['8oz',80,56,92,50,20,40,32.5,38.5],
            ['9oz',77,52,95,50,20,39,31,35],
            ['10oz',80,52,108,50,20,40,32,40],
            ['10oz',90,60,95,50,20,45.5,36.5,48],
            ['12oz',90,60,108,50,20,45.5,36.5,46.5],
            ['16oz',90,60,134,50,20,45.5,36.5,53],
            ['20oz',90,60,160,50,20,45.5,36.5,61],
            ['22oz',90,60,170,50,20,45.5,36.5,61.5],
        ]
    },
    ripple: {
        title: 'Ripple Wall Paper Cup — Specifications',
        headers: ['Size','Top∅ (mm)','Bottom∅ (mm)','Height (mm)','Pcs/Bag','Bags/Ctn','Ctn L (cm)','Ctn W (cm)','Ctn H (cm)'],
        rows: [
            ['4oz',62,45,59,25,40,50.5,39,31.5],
            ['7oz',73,50,77,25,20,41,36.5,29],
            ['8oz',80,56,92,25,20,44,31.5,40],
            ['10oz',80,52,112,25,20,45,33,40.5],
            ['10oz',90,60,95,25,20,46,36,45],
            ['12oz',90,60,108,25,20,42,36,45],
            ['16oz',90,60,134,25,20,55,36,45],
        ]
    },
    double: {
        title: 'Double Wall Paper Cup — Specifications',
        headers: ['Size','Top∅ (mm)','Bottom∅ (mm)','Height (mm)','Pcs/Bag','Bags/Ctn','Ctn L (cm)','Ctn W (cm)','Ctn H (cm)'],
        rows: [
            ['4oz',62,45,59,25,40,50.5,39,31.5],
            ['7oz',73,50,77,25,20,47,36.5,29],
            ['8oz',80,56,92,25,20,45,40,32],
            ['10oz',80,52,112,25,20,47,33,40.5],
            ['10oz',90,60,95,25,20,46,42,37],
            ['12oz',90,60,108,25,20,44,45,36],
            ['16oz',90,60,134,25,20,58,45,36],
        ]
    }
};

function showSpecPanel(type) {
    const panel = document.getElementById('specPanel');
    const data = specData[type];
    if (!data || !panel) return;

    document.getElementById('specTitle').textContent = data.title;

    const thead = document.getElementById('specHead');
    thead.innerHTML = '<tr>' + data.headers.map(h => '<th class="px-3 py-2.5 font-semibold whitespace-nowrap">' + h + '</th>').join('') + '</tr>';

    const tbody = document.getElementById('specBody');
    tbody.innerHTML = data.rows.map((row, i) =>
        '<tr class="' + (i % 2 === 0 ? 'bg-cream-dark' : 'bg-cream') + '">' +
        row.map((cell, j) => {
            if (j === 0) {
                const match = String(cell).match(/^([\d.]+\s*\w*?)\s*(oz)$/i);
                if (match) {
                    const num = isNaN(Number(match[1])) ? match[1] : Number(match[1]).toFixed(1);
                    return '<td class="px-3 py-2 text-sage-700 whitespace-nowrap text-center font-bold"><span>' + num + '</span><span>-</span><span>oz</span></td>';
                }
            }
            if (j === 6 || j === 7 || j === 8) {
                return '<td class="px-3 py-2 text-sage-700 whitespace-nowrap">' + Number(cell).toFixed(1) + '</td>';
            }
            return '<td class="px-3 py-2 text-sage-700 whitespace-nowrap">' + cell + '</td>';
        }).join('') +
        '</tr>'
    ).join('');

    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function closeSpecPanel() {
    document.getElementById('specPanel').classList.add('hidden');
}

function selectCupType(type) {
    // Show specification panel if data exists
    if (specData[type]) {
        showSpecPanel(type);
        return;
    }
    // Otherwise scroll to quote form
    const select = document.getElementById('cupType');
    if (select) {
        select.value = type;
        document.getElementById('cupTypeError').classList.add('hidden');
    }
    document.getElementById('quote').scrollIntoView({ behavior: 'smooth' });
}

// ─── Quote form — validation & submit ───────────────────────────────────────

function showError(fieldId, show) {
    const el = document.getElementById(fieldId + 'Error');
    if (el) el.classList.toggle('hidden', !show);
}

function validateQuoteForm() {
    const name     = document.getElementById('name').value.trim();
    const email    = document.getElementById('email').value.trim();
    const cupType  = document.getElementById('cupType').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nameOk     = name.length > 0;
    const emailOk    = emailPattern.test(email);
    const cupTypeOk  = cupType !== '';
    const quantityOk = !isNaN(quantity) && quantity > 0;

    showError('name',     !nameOk);
    showError('email',    !emailOk);
    showError('cupType',  !cupTypeOk);
    showError('quantity', !quantityOk);

    return nameOk && emailOk && cupTypeOk && quantityOk;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quoteForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateQuoteForm()) return;

        // Hide form fields, show success message
        Array.from(form.elements).forEach(el => {
            if (el.id !== 'formSuccess') el.closest('div')?.classList.add('hidden');
        });

        // Hide the submit button specifically (it's a direct child button)
        form.querySelector('button[type="submit"]').classList.add('hidden');

        document.getElementById('formSuccess').classList.remove('hidden');
    });

    // Clear field errors on input
    ['name', 'email', 'cupType', 'quantity'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => showError(id, false));
        if (el) el.addEventListener('change', () => showError(id, false));
    });
});

// ─── Navbar — ghost → frosted on scroll ──────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar-float');
  if (nav) nav.classList.toggle('navbar-float--scrolled', window.scrollY > 60);
});
