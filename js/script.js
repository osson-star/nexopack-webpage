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
        headers: ['Size','Top∅ (mm)','Pcs/Bag','Bags/Ctn','Pcs/Ctn','Ctn L (mm)','Ctn W (mm)','Ctn H (mm)'],
        rows: [
            ['2.5oz',51,50,20,1000,260,205,290],
            ['3oz',55,50,20,1000,280,225,290],
            ['4oz',62,50,20,1000,310,250,290],
            ['5oz',63,50,20,1000,320,255,290],
            ['6oz',68,50,20,1000,340,280,290],
            ['7oz',73,50,20,1000,370,300,320],
            ['7.5oz',70,50,20,1000,355,280,340],
            ['8B oz',75,50,20,1000,380,300,340],
            ['8oz',80,50,20,1000,400,325,385],
            ['9oz',77,50,20,1000,390,310,350],
            ['10oz',80,50,20,1000,400,320,400],
            ['10oz',90,50,20,1000,455,365,480],
            ['12oz',90,50,20,1000,455,365,465],
            ['16oz',90,50,20,1000,455,365,530],
            ['20oz',90,50,20,1000,455,365,610],
            ['22oz',90,50,20,1000,455,365,615],
        ]
    },
    ripple: {
        title: 'Ripple Wall Paper Cup — Specifications',
        headers: ['Size','Top∅ (mm)','Pcs/Bag','Bags/Ctn','Pcs/Ctn','Ctn L (mm)','Ctn W (mm)','Ctn H (mm)'],
        rows: [
            ['4oz',62,25,40,1000,505,390,315],
            ['7oz',73,25,20,500,410,365,290],
            ['8oz',80,25,20,500,440,315,400],
            ['10oz',80,25,20,500,450,330,405],
            ['10oz',90,25,20,500,460,360,450],
            ['12oz',90,25,20,500,420,360,450],
            ['16oz',90,25,20,500,550,360,450],
        ]
    },
    soupCup: {
        title: 'Kraft Paper Soup Bowl — Specifications',
        headers: ['Part No.', 'Size', 'Top∅ (mm)', 'Bottom∅ (mm)', 'Height (mm)', 'Pcs / Ctn', 'Ctn L (mm)', 'Ctn W (mm)', 'Ctn H (mm)'],
        rows: [
            ['D520000-29', '8oz',  96, 75, 60,  500, 485, 390, 265],
            ['D520000-30', '12oz', 96, 80, 75,  500, 485, 390, 300],
            ['D520000-31', '16oz', 96, 75, 100, 500, 485, 390, 350],
            ['D520000-36', '26oz', 115, 93, 110, 500, 580, 465, 370],
            ['D520000-27', '32oz', 115, 93, 130, 500, 580, 465, 400],
        ]
    },
    lunchBox: {
        title: 'Rectangle Lunch Box — Specifications',
        headers: ['Part No.', 'Material', 'Capacity', 'Top L (mm)', 'Top W (mm)', 'Height (mm)', 'Pcs / Ctn', 'Ctn L (mm)', 'Ctn W (mm)', 'Ctn H (mm)'],
        rows: [
            ['D51-ZB0005W', 'White', '500ml',  171, 118, 40, 300, 375, 355, 430],
            ['D51-ZB0006W', 'White', '650ml',  171, 118, 51, 300, 375, 355, 430],
            ['D51-ZB0007W', 'White', '750ml',  171, 118, 57, 300, 375, 355, 445],
            ['D51-ZB0008W', 'White', '1000ml', 171, 118, 75, 300, 375, 355, 470],
            ['D51-ZB0001W', 'Kraft', '500ml',  171, 118, 40, 300, 375, 355, 430],
            ['D51-ZB0002W', 'Kraft', '650ml',  171, 118, 51, 300, 375, 355, 430],
            ['D51-ZB0003W', 'Kraft', '750ml',  171, 118, 57, 300, 375, 355, 445],
            ['D51-ZB0004W', 'Kraft', '1000ml', 171, 118, 75, 300, 375, 355, 470],
        ]
    },
    roundContainer: {
        title: 'Kraft Paper Round Container — Specifications',
        headers: ['Part No.', 'Capacity', 'Top∅ (mm)', 'Bottom∅ (mm)', 'Height (mm)', 'Pcs / Ctn', 'Ctn L (mm)', 'Ctn W (mm)', 'Ctn H (mm)'],
        rows: [
            ['D520000-16', '500ml',  150, 128, 45, 300, 445, 300, 470],
            ['D520000-19', '750ml',  150, 128, 60, 300, 455, 305, 485],
            ['D520000-20', '1000ml', 150, 128, 75, 300, 455, 305, 490],
            ['D520000-23', '1100ml', 165, 144, 70, 300, 500, 335, 495],
            ['D520000-26', '1300ml', 185, 160, 65, 300, 560, 375, 505],
        ]
    },
    double: {
        title: 'Double Wall Paper Cup — Specifications',
        headers: ['Size','Top∅ (mm)','Pcs/Bag','Bags/Ctn','Pcs/Ctn','Ctn L (mm)','Ctn W (mm)','Ctn H (mm)'],
        rows: [
            ['4oz',62,25,40,1000,505,390,315],
            ['7oz',73,25,20,500,470,365,290],
            ['8oz',80,25,20,500,450,400,320],
            ['10oz',80,25,20,500,470,330,405],
            ['10oz',90,25,20,500,460,420,370],
            ['12oz',90,25,20,500,440,450,360],
            ['16oz',90,25,20,500,580,450,360],
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
            return '<td class="px-3 py-2 text-sage-700 whitespace-nowrap">' + cell + '</td>';
        }).join('') +
        '</tr>'
    ).join('');

    panel.classList.remove('hidden');
    panel.classList.remove('spec-panel-enter');
    void panel.offsetWidth; // force reflow so animation restarts
    panel.classList.add('spec-panel-enter');
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function closeSpecPanel() {
    document.getElementById('specPanel').classList.add('hidden');
}

function showSoupCupSpecPanel() {
    const data = specData['soupCup'];
    const panel = document.getElementById('soupCupSpecPanel');
    if (!data || !panel) return;

    closeSpecPanel();

    document.getElementById('soupCupSpecTitle').textContent = data.title;

    const thead = document.getElementById('soupCupSpecHead');
    thead.innerHTML = '<tr>' + data.headers.map(h => '<th class="px-3 py-2.5 font-semibold whitespace-nowrap">' + h + '</th>').join('') + '</tr>';

    const tbody = document.getElementById('soupCupSpecBody');
    tbody.innerHTML = data.rows.map((row, i) =>
        '<tr class="' + (i % 2 === 0 ? 'bg-cream-dark' : 'bg-cream') + '">' +
        row.map(cell => '<td class="px-3 py-2 text-sage-700 whitespace-nowrap">' + cell + '</td>').join('') +
        '</tr>'
    ).join('');

    panel.classList.remove('hidden');
    panel.classList.remove('spec-panel-enter');
    void panel.offsetWidth; // force reflow so animation restarts
    panel.classList.add('spec-panel-enter');
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function closeSoupCupSpecPanel() {
    document.getElementById('soupCupSpecPanel').classList.add('hidden');
}

function showRoundContainerSpecPanel() {
    const data = specData['roundContainer'];
    const panel = document.getElementById('roundContainerSpecPanel');
    if (!data || !panel) return;

    closeSoupCupSpecPanel();

    document.getElementById('roundContainerSpecTitle').textContent = data.title;

    const thead = document.getElementById('roundContainerSpecHead');
    thead.innerHTML = '<tr>' + data.headers.map(h => '<th class="px-3 py-2.5 font-semibold whitespace-nowrap">' + h + '</th>').join('') + '</tr>';

    const tbody = document.getElementById('roundContainerSpecBody');
    tbody.innerHTML = data.rows.map((row, i) =>
        '<tr class="' + (i % 2 === 0 ? 'bg-cream-dark' : 'bg-cream') + '">' +
        row.map(cell => '<td class="px-3 py-2 text-sage-700 whitespace-nowrap">' + cell + '</td>').join('') +
        '</tr>'
    ).join('');

    panel.classList.remove('hidden');
    panel.classList.remove('spec-panel-enter');
    void panel.offsetWidth;
    panel.classList.add('spec-panel-enter');
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function closeRoundContainerSpecPanel() {
    document.getElementById('roundContainerSpecPanel').classList.add('hidden');
}

function showLunchBoxSpecPanel() {
    const data = specData['lunchBox'];
    const panel = document.getElementById('lunchBoxSpecPanel');
    if (!data || !panel) return;

    closeSoupCupSpecPanel();
    closeRoundContainerSpecPanel();

    document.getElementById('lunchBoxSpecTitle').textContent = data.title;

    const thead = document.getElementById('lunchBoxSpecHead');
    thead.innerHTML = '<tr>' + data.headers.map(h => '<th class="px-3 py-2.5 font-semibold whitespace-nowrap">' + h + '</th>').join('') + '</tr>';

    const tbody = document.getElementById('lunchBoxSpecBody');
    tbody.innerHTML = data.rows.map((row, i) =>
        '<tr class="' + (i % 2 === 0 ? 'bg-cream-dark' : 'bg-cream') + '">' +
        row.map(cell => '<td class="px-3 py-2 text-sage-700 whitespace-nowrap">' + cell + '</td>').join('') +
        '</tr>'
    ).join('');

    panel.classList.remove('hidden');
    panel.classList.remove('spec-panel-enter');
    void panel.offsetWidth;
    panel.classList.add('spec-panel-enter');
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function closeLunchBoxSpecPanel() {
    document.getElementById('lunchBoxSpecPanel').classList.add('hidden');
}

function selectCupType(type) {
    // Show specification panel if data exists
    if (specData[type]) {
        if (type === 'soupCup') {
            closeRoundContainerSpecPanel();
            closeLunchBoxSpecPanel();
            showSoupCupSpecPanel();
        } else if (type === 'roundContainer') {
            closeSoupCupSpecPanel();
            closeLunchBoxSpecPanel();
            showRoundContainerSpecPanel();
        } else if (type === 'lunchBox') {
            closeSoupCupSpecPanel();
            closeRoundContainerSpecPanel();
            showLunchBoxSpecPanel();
        } else {
            closeSoupCupSpecPanel();
            closeRoundContainerSpecPanel();
            closeLunchBoxSpecPanel();
            showSpecPanel(type);
        }
        return;
    }
    // Otherwise open the quote modal
    openModal('modal-quote');
}

// ─── Pulp product specification data ────────────────────────────────────────

const pulpSpecData = {
    cups: {
        title: 'Pulp Cups — Specifications',
        headers: ['Code', 'Name', 'Top∅ (mm)', 'Pcs / Bag', 'Bags / Ctn', 'Pcs / Ctn', 'Ctn L (mm)', 'Ctn W (mm)', 'Ctn H (mm)'],
        rows: [
            ['1OZ-C',  '1 oz Cup',  62, 50, 40, 2000, 325, 285, 265],
            ['2OZ-C',  '2 oz Cup',  62, 50, 40, 2000, 350, 330, 270],
            ['4OZ-C',  '4 oz Cup',  75, 50, 40, 2000, 390, 360, 315],
            ['8OZ-C',  '8 oz Cup',  80, 50, 20, 1000, 420, 420, 340],
            ['12OZ-C', '12 oz Cup', 90, 50, 20, 1000, 460, 420, 380],
        ]
    },
    lids: {
        title: 'Pulp Lids — Specifications',
        headers: ['Code', 'Name', 'Fit Cup Ø (mm)', 'Pcs / Bag', 'Bags / Ctn', 'Pcs / Ctn', 'Ctn L (mm)', 'Ctn W (mm)', 'Ctn H (mm)'],
        rows: [
            ['80A',   '80mm Flip Lid',         80,  50, 20, 1000, 350, 290, 430],
            ['80B',   '80mm Lid',              80,  50, 20, 1000, 350, 290, 430],
            ['80C',   '80mm Flat Lid',         80,  50, 20, 1000, 350, 290, 430],
            ['81A',   '81mm Flip Lid',         81,  50, 20, 1000, 350, 290, 430],
            ['89A',   '90mm Flip Lid',         89,  50, 20, 1000, 400, 285, 485],
            ['90A',   '90mm Flip Lid',         90,  50, 20, 1000, 400, 285, 485],
            ['90B',   '90mm Lid',              90,  50, 20, 1000, 400, 285, 485],
            ['90B-2', '90mm Lid Style 2',      90,  50, 20, 1000, 400, 285, 485],
            ['90C',   '90mm Flat Lid',         90,  50, 20, 1000, 400, 245, 485],
            ['90D',   '90mm Dome Lid',         90,  50, 20, 1000, 400, 285, 485],
            ['95E',   '95mm Flat Lid',         95,  50, 20, 1000, 430, 270, 525],
            ['100F',  'Ice Cream Lid (100mm)', 100, 50, 10,  500, 550, 440, 310],
        ]
    },
    trays: {
        title: 'Trays & Accessories — Specifications',
        headers: ['Code', 'Name', 'Size (mm)', 'Pcs / Bag', 'Bags / Ctn', 'Pcs / Ctn', 'Ctn L (mm)', 'Ctn W (mm)', 'Ctn H (mm)'],
        rows: [
            ['BT2-1',  '1+1 Cup Holder Tray',         '217 × 110 × 50', 100,  6,  600, 450, 340, 450],
            ['BT4',    '4-Cup Holder Tray',            '198 × 198 × 54', 100,  3,  300, 600, 220, 610],
            ['JCR-1D', '140mm Reinforced Soup Spoon',  '140 × 42 × 50',  100, 10, 1000, 415, 270, 175],
        ]
    }
};

function showPulpSpecPanel(type) {
    const panel = document.getElementById('pulpSpecPanel');
    const data = pulpSpecData[type];
    if (!data || !panel) return;

    document.getElementById('pulpSpecTitle').textContent = data.title;

    const thead = document.getElementById('pulpSpecHead');
    thead.innerHTML = '<tr>' + data.headers.map(h =>
        '<th class="px-3 py-2.5 font-semibold whitespace-nowrap">' + h + '</th>'
    ).join('') + '</tr>';

    const tbody = document.getElementById('pulpSpecBody');
    tbody.innerHTML = data.rows.map((row, i) =>
        '<tr class="' + (i % 2 === 0 ? 'bg-cream-dark' : 'bg-cream') + '">' +
        row.map(cell => '<td class="px-3 py-2 text-sage-700 whitespace-nowrap">' + cell + '</td>').join('') +
        '</tr>'
    ).join('');

    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function closePulpSpecPanel() {
    document.getElementById('pulpSpecPanel').classList.add('hidden');
}

// ─── Navbar — ghost → frosted on scroll ──────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar-float');
  if (nav) nav.classList.toggle('navbar-float--scrolled', window.scrollY > 60);
});
