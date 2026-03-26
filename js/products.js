/* ===== Product Page Logic ===== */

const PRODUCT_CATEGORIES = [
  {
    id: 'paper',
    label: 'Paper',
    products: [
      {
        id: 'paper-cup',
        name: 'Paper Cup',
        tagline: 'Premium single-use hot & cold cups for cafes, restaurants, and branded chains.',
        description: 'Available in single wall, double wall, and ripple wall constructions. Choose from PE-lined or aqueous-coated options to match your sustainability goals.',
        wallTypes: [
          {
            id: 'single',
            name: 'Single Wall',
            bannerImage: 'images/Single Wall Paper Cup Banner Image.webp',
            description: 'Standard single-layer construction. Lightweight and cost-effective. Best for cold or warm beverages, or when paired with a sleeve.',
            sizes: [
              { size: '2.5 oz', topDia: '51 mm', pcsPerCase: 1000, carton: '260 × 205 × 290', cbm: 0.0155 },
              { size: '3 oz',   topDia: '55 mm', pcsPerCase: 1000, carton: '280 × 225 × 290', cbm: 0.0183 },
              { size: '4 oz',   topDia: '62 mm', pcsPerCase: 1000, carton: '310 × 250 × 290', cbm: 0.0225 },
              { size: '5 oz',   topDia: '63 mm', pcsPerCase: 1000, carton: '320 × 255 × 290', cbm: 0.0237 },
              { size: '6 oz',   topDia: '68 mm', pcsPerCase: 1000, carton: '340 × 280 × 290', cbm: 0.0276 },
              { size: '7 oz',   topDia: '73 mm', pcsPerCase: 1000, carton: '370 × 300 × 320', cbm: 0.0355 },
              { size: '7.5 oz', topDia: '70 mm', pcsPerCase: 1000, carton: '355 × 280 × 340', cbm: 0.0338 },
              { size: '8 oz',   topDia: '75 mm', pcsPerCase: 1000, carton: '380 × 300 × 340', cbm: 0.0388 },
              { size: '8 oz',   topDia: '80 mm', pcsPerCase: 1000, carton: '400 × 325 × 385', cbm: 0.0501 },
              { size: '9 oz',   topDia: '77 mm', pcsPerCase: 1000, carton: '390 × 310 × 350', cbm: 0.0423 },
              { size: '10 oz',  topDia: '80 mm', pcsPerCase: 1000, carton: '400 × 320 × 400', cbm: 0.0512 },
              { size: '10 oz',  topDia: '90 mm', pcsPerCase: 1000, carton: '455 × 365 × 480', cbm: 0.0797 },
              { size: '12 oz',  topDia: '90 mm', pcsPerCase: 1000, carton: '455 × 365 × 465', cbm: 0.0772 },
              { size: '16 oz',  topDia: '90 mm', pcsPerCase: 1000, carton: '455 × 365 × 530', cbm: 0.0880 },
              { size: '20 oz',  topDia: '90 mm', pcsPerCase: 1000, carton: '455 × 365 × 610', cbm: 0.1013 },
              { size: '22 oz',  topDia: '90 mm', pcsPerCase: 1000, carton: '455 × 365 × 615', cbm: 0.1021 },
              { subcat: 'Ice Cream Cup' },
              { size: '4 oz',  topDia: '74 mm', pcsPerCase: 1000, carton: '380 × 305 × 360', cbm: 0.0417, iceCream: true },
              { size: '6 oz',  topDia: '90 mm', pcsPerCase: 1000, carton: '465 × 365 × 370', cbm: 0.0628, iceCream: true },
              { size: '8 oz',  topDia: '95 mm', pcsPerCase: 1000, carton: '480 × 380 × 480', cbm: 0.0876, iceCream: true },
            ],
          },
          {
            id: 'double',
            name: 'Double Wall',
            bannerImage: 'images/Double Wall Papercup Banner.jpg',
            description: 'Two layers of paperboard with an insulating air gap. No sleeve needed — comfortable to hold with hot drinks.',
            sizes: [
              { size: '4 oz',  topDia: '62 mm', pcsPerCase: 1000, carton: '505 × 390 × 315', cbm: 0.0620 },
              { size: '7 oz',  topDia: '73 mm', pcsPerCase: 500,  carton: '470 × 365 × 290', cbm: 0.0497 },
              { size: '8 oz',  topDia: '80 mm', pcsPerCase: 500,  carton: '450 × 400 × 320', cbm: 0.0576 },
              { size: '10 oz', topDia: '80 mm', pcsPerCase: 500,  carton: '470 × 330 × 405', cbm: 0.0628 },
              { size: '10 oz', topDia: '90 mm', pcsPerCase: 500,  carton: '460 × 420 × 370', cbm: 0.0715 },
              { size: '12 oz', topDia: '90 mm', pcsPerCase: 500,  carton: '440 × 450 × 360', cbm: 0.0713 },
              { size: '16 oz', topDia: '90 mm', pcsPerCase: 500,  carton: '580 × 450 × 360', cbm: 0.0940 },
            ],
          },
          {
            id: 'ripple',
            name: 'Ripple Wall',
            bannerImage: 'images/Ripple Wall Paper Cup Banner.jpg',
            description: 'Outer ripple layer provides superior insulation and grip. Premium look and feel, ideal for branded takeaway.',
            sizes: [
              { size: '4 oz',  topDia: '62 mm', pcsPerCase: 1000, carton: '505 × 390 × 315', cbm: 0.0620 },
              { size: '7 oz',  topDia: '73 mm', pcsPerCase: 500,  carton: '410 × 365 × 290', cbm: 0.0434 },
              { size: '8 oz',  topDia: '80 mm', pcsPerCase: 500,  carton: '440 × 315 × 400', cbm: 0.0554 },
              { size: '10 oz', topDia: '80 mm', pcsPerCase: 500,  carton: '450 × 330 × 405', cbm: 0.0601 },
              { size: '10 oz', topDia: '90 mm', pcsPerCase: 500,  carton: '460 × 360 × 450', cbm: 0.0745 },
              { size: '12 oz', topDia: '90 mm', pcsPerCase: 500,  carton: '420 × 360 × 450', cbm: 0.0680 },
              { size: '16 oz', topDia: '90 mm', pcsPerCase: 500,  carton: '550 × 360 × 450', cbm: 0.0891 },
            ],
          },
        ],
        coatings: [
          { name: 'PE Coating', description: 'Polyethylene inner lining. Industry standard with excellent liquid barrier. Widely recyclable in specialist facilities.' },
          { name: 'Aqueous Coating', description: 'Water-based barrier coating. Fully recyclable in standard paper streams. The most eco-friendly option.' },
        ],
        moq: {
          standard: '5,000 pcs',
          customPrint: '5,000 pcs',
          note: 'Lower MOQs available for first-time orders. Contact us for details.',
        },
        customization: [
          'Full-colour offset or flexo printing',
          'Custom sizes and shapes on request',
          'Branded sleeves and carriers',
          'Matching lids available (PP / PS / Fibre lid)',
        ],
      },
      {
        id: 'kraft-container',
        name: 'Kraft Paper Food Container',
        tagline: 'Eco-friendly kraft paper containers for salads, soups, meals, and fresh produce.',
        description: 'PE-lined kraft board construction with excellent grease and liquid resistance. Available with PET, PP, or paper lids.',
        wallTypes: [
          {
            id: 'salad-bowl',
            name: 'Salad Bowl',
            description: 'Round kraft salad bowls in multiple sizes with matching PET or PP lid.',
            sizes: [
              { size: '500 ml',  shape: 'Round', topDia: '150 mm', pcsPerCase: 300, carton: '445 × 300 × 405', cbm: 0.0541 },
              { size: '750 ml',  shape: 'Round', topDia: '150 mm', pcsPerCase: 300, carton: '445 × 300 × 410', cbm: 0.0547 },
              { size: '900 ml',  shape: 'Round', topDia: '180 mm', pcsPerCase: 300, carton: '535 × 360 × 395', cbm: 0.0761 },
              { size: '1000 ml', shape: 'Round', topDia: '150 mm', pcsPerCase: 300, carton: '445 × 300 × 410', cbm: 0.0547 },
              { size: '1100 ml', shape: 'Round', topDia: '165 mm', pcsPerCase: 300, carton: '495 × 335 × 395', cbm: 0.0655 },
              { size: '1300 ml', shape: 'Round', topDia: '165 mm', pcsPerCase: 300, carton: '495 × 335 × 420', cbm: 0.0696 },
              { size: '1450 ml', shape: 'Round', topDia: '180 mm', pcsPerCase: 300, carton: '540 × 360 × 450', cbm: 0.0875 },
              { size: '1500 ml', shape: 'Round', topDia: '185 mm', pcsPerCase: 300, carton: '570 × 370 × 410', cbm: 0.0865 },
              { subcat: 'Lids' },
              { size: 'PET Lid', shape: 'Round', topDia: '150 mm', pcsPerCase: 300, carton: '480 × 360 × 170', cbm: 0.0294 },
              { size: 'PET Lid', shape: 'Round', topDia: '165 mm', pcsPerCase: 300, carton: '515 × 475 × 180', cbm: 0.0440 },
              { size: 'PET Lid', shape: 'Round', topDia: '180 mm', pcsPerCase: 300, carton: '510 × 200 × 550', cbm: 0.0561 },
              { size: 'PET Lid', shape: 'Round', topDia: '185 mm', pcsPerCase: 300, carton: '575 × 425 × 205', cbm: 0.0501 },
              { size: 'PP Lid',  shape: 'Round', topDia: '150 mm', pcsPerCase: 300, carton: '460 × 380 × 310', cbm: 0.0542 },
              { size: 'PP Lid',  shape: 'Round', topDia: '165 mm', pcsPerCase: 300, carton: '520 × 340 × 340', cbm: 0.0601 },
              { size: 'PP Lid',  shape: 'Round', topDia: '180 mm', pcsPerCase: 300, carton: '560 × 250 × 370', cbm: 0.0518 },
              { size: 'PP Lid',  shape: 'Round', topDia: '185 mm', pcsPerCase: 300, carton: '575 × 250 × 385', cbm: 0.0553 },
            ],
          },
          {
            id: 'soup-cup',
            name: 'Soup Container',
            topDiaHeader: 'L × W × H',
            description: 'Heavy-duty kraft soup containers with rolled rim. Ideal for hot soups, porridge, and stews. PP and paper lids available.',
            sizes: [
              { size: '8 oz',  shape: 'Round', topDia: '90 × 72 × 63 mm',   pcsPerCase: 500, carton: '450 × 185 × 460', cbm: 0.0383 },
              { size: '12 oz', shape: 'Round', topDia: '90 × 73 × 87 mm',   pcsPerCase: 500, carton: '460 × 190 × 480', cbm: 0.0420 },
              { size: '16 oz', shape: 'Round', topDia: '97 × 73 × 101 mm',  pcsPerCase: 500, carton: '495 × 195 × 510', cbm: 0.0492 },
              { size: '18 oz', shape: 'Round', topDia: '114 × 93 × 77 mm',  pcsPerCase: 500, carton: '580 × 240 × 495', cbm: 0.0689 },
              { size: '24 oz', shape: 'Round', topDia: '115 × 93 × 88 mm',  pcsPerCase: 500, carton: '585 × 240 × 580', cbm: 0.0814 },
              { size: '26 oz', shape: 'Round', topDia: '115 × 90 × 111 mm', pcsPerCase: 500, carton: '595 × 240 × 540', cbm: 0.0771 },
              { size: '32 oz', shape: 'Round', topDia: '115 × 90 × 133 mm', pcsPerCase: 500, carton: '595 × 240 × 550', cbm: 0.0785 },
              { subcat: 'Lids' },
              { size: 'PP Lid',    shape: 'Round', topDia: '90 mm',  pcsPerCase: 500, carton: '480 × 205 × 340', cbm: 0.0335 },
              { size: 'PP Lid',    shape: 'Round', topDia: '97 mm',  pcsPerCase: 500, carton: '510 × 215 × 320', cbm: 0.0351 },
              { size: 'PP Lid',    shape: 'Round', topDia: '116 mm', pcsPerCase: 500, carton: '610 × 250 × 355', cbm: 0.0541 },
              { size: 'Paper Lid', shape: 'Round', topDia: '90 mm',  pcsPerCase: 500, carton: '505 × 365 × 400', cbm: 0.0737 },
              { size: 'Paper Lid', shape: 'Round', topDia: '97 mm',  pcsPerCase: 500, carton: '505 × 365 × 400', cbm: 0.0737 },
              { size: 'Paper Lid', shape: 'Round', topDia: '116 mm', pcsPerCase: 500, carton: '640 × 320 × 490', cbm: 0.1004 },
            ],
          },
          {
            id: 'food-container',
            name: 'Food Container',
            topDiaHeader: 'L × W × H',
            description: 'Kraft food containers for meal prep, deli, and takeaway. Available in rectangular and square shapes with PP, PET, or paper lids.',
            shapeFilters: ['Rectangular', 'Square'],
            sizesBy: {
              Rectangular: [
                { size: '240 ml',  topDia: '140 × 103 × 46 mm', pcsPerCase: 300, carton: '440 × 210 × 430', cbm: 0.0397 },
                { size: '360 ml',  topDia: '140 × 103 × 55 mm', pcsPerCase: 300, carton: '440 × 210 × 430', cbm: 0.0397 },
                { size: '500 ml',  topDia: '172 × 120 × 47 mm', pcsPerCase: 300, carton: '500 × 250 × 485', cbm: 0.0606 },
                { size: '650 ml',  topDia: '172 × 120 × 51 mm', pcsPerCase: 300, carton: '500 × 250 × 485', cbm: 0.0606 },
                { size: '750 ml',  topDia: '172 × 120 × 57 mm', pcsPerCase: 300, carton: '500 × 250 × 495', cbm: 0.0619 },
                { size: '850 ml',  topDia: '172 × 120 × 63 mm', pcsPerCase: 300, carton: '500 × 250 × 495', cbm: 0.0619 },
                { size: '1000 ml', topDia: '172 × 120 × 78 mm', pcsPerCase: 300, carton: '500 × 250 × 515', cbm: 0.0644 },
                { subcat: 'Lids' },
                { size: 'PP Lid',    topDia: '140 × 103 mm', pcsPerCase: 300, carton: '440 × 260 × 225', cbm: 0.0257 },
                { size: 'PET Lid',   topDia: '172 × 120 mm', pcsPerCase: 300, carton: '555 × 270 × 270', cbm: 0.0405 },
                { size: 'PP Lid',    topDia: '172 × 120 mm', pcsPerCase: 300, carton: '530 × 250 × 350', cbm: 0.0464 },
                { size: 'Paper Lid', topDia: '172 × 120 mm', pcsPerCase: 300, carton: '530 × 350 × 510', cbm: 0.0946 },
              ],
              Square: [
                { size: '500 ml',  topDia: '131 × 131 × 48.5 mm',   pcsPerCase: 300, carton: '410 × 280 × 410', cbm: 0.0471 },
                { size: '750 ml',  topDia: '168 × 168 × 45 mm',     pcsPerCase: 300, carton: '530 × 350 × 420', cbm: 0.0779 },
                { size: '800 ml',  topDia: '145.5 × 145.5 × 55 mm', pcsPerCase: 300, carton: '465 × 315 × 425', cbm: 0.0623 },
                { size: '1000 ml', topDia: '168 × 168 × 55 mm',     pcsPerCase: 300, carton: '530 × 350 × 420', cbm: 0.0779 },
                { size: '1100 ml', topDia: '151 × 151 × 74 mm',     pcsPerCase: 300, carton: '460 × 310 × 450', cbm: 0.0642 },
                { size: '1200 ml', topDia: '168 × 168 × 66 mm',     pcsPerCase: 300, carton: '540 × 360 × 440', cbm: 0.0855 },
                { size: '1400 ml', topDia: '170 × 170 × 76 mm',     pcsPerCase: 300, carton: '540 × 360 × 460', cbm: 0.0894 },
                { subcat: 'Lids' },
                { size: 'PET Lid', topDia: '131 × 131 mm', pcsPerCase: 300, carton: '480 × 135 × 270', cbm: 0.0175 },
                { size: 'PET Lid', topDia: '168 × 168 mm', pcsPerCase: 300, carton: '480 × 175 × 350', cbm: 0.0294 },
                { size: 'PET Lid', topDia: '170 × 170 mm', pcsPerCase: 300, carton: '390 × 390 × 200', cbm: 0.0304 },
              ],
            },
          },
          {
            id: 'paper-box',
            name: 'Paper Box',
            topDiaHeader: 'L × W × H',
            description: 'Foldable kraft paper boxes for general takeaway. Stackable.',
            sizes: [
              { size: '800 ml',  shape: 'Rectangular', topDia: '130 × 107 × 65 mm',  pcsPerCase: 200, carton: '620 × 310 × 225', cbm: 0.0432 },
              { size: '1080 ml', shape: 'Rectangular', topDia: '165 × 135 × 50 mm',  pcsPerCase: 200, carton: '540 × 300 × 380', cbm: 0.0616 },
              { size: '1400 ml', shape: 'Rectangular', topDia: '170 × 135 × 65 mm',  pcsPerCase: 200, carton: '620 × 310 × 380', cbm: 0.0730 },
              { size: '1480 ml', shape: 'Rectangular', topDia: '210 × 155 × 48 mm',  pcsPerCase: 200, carton: '520 × 340 × 480', cbm: 0.0849 },
              { size: '2000 ml', shape: 'Rectangular', topDia: '215 × 160 × 65 mm',  pcsPerCase: 200, carton: '600 × 350 × 480', cbm: 0.1008 },
              { size: '2455 ml', shape: 'Rectangular', topDia: '215 × 160 × 90 mm',  pcsPerCase: 200, carton: '750 × 500 × 350', cbm: 0.1313 },
            ],
          },
          {
            id: 'compartment',
            name: 'Compartment Box',
            topDiaHeader: 'L × W × H',
            description: '2-compartment kraft boxes for balanced meals. Separates mains and sides in one container.',
            sizes: [
              { size: '500 ml',  shape: 'Rectangular', topDia: '120 × 170 × 45 mm', pcsPerCase: 300, carton: '520 × 260 × 300', cbm: 0.0406 },
              { size: '650 ml',  shape: 'Rectangular', topDia: '120 × 170 × 55 mm', pcsPerCase: 300, carton: '520 × 260 × 340', cbm: 0.0460 },
              { size: '750 ml',  shape: 'Rectangular', topDia: '120 × 170 × 65 mm', pcsPerCase: 300, carton: '520 × 260 × 360', cbm: 0.0487 },
              { size: '1000 ml', shape: 'Rectangular', topDia: '120 × 170 × 75 mm', pcsPerCase: 300, carton: '520 × 260 × 410', cbm: 0.0554 },
              { size: '1200 ml', shape: 'Rectangular', topDia: '222 × 160 × 45 mm', pcsPerCase: 300, carton: '500 × 450 × 270', cbm: 0.0608 },
              { size: '1400 ml', shape: 'Rectangular', topDia: '222 × 160 × 56 mm', pcsPerCase: 300, carton: '500 × 450 × 285', cbm: 0.0641 },
              { subcat: 'Lids' },
              { size: 'PP Lid', shape: 'Rectangular', topDia: '172 × 122 mm', pcsPerCase: 300, carton: '530 × 250 × 350', cbm: 0.0464 },
            ],
          },
          {
            id: 'food-tray',
            name: 'Food Tray',
            topDiaHeader: 'L × W × H',
            description: 'Open kraft food trays for fries, snacks, hot dogs, and street food. Lightweight 260gsm construction.',
            sizes: [
              { size: '#1', shape: 'Rectangular', topDia: '244 × 180 × 24 mm', pcsPerCase: 500, carton: '370 × 260 × 250', cbm: 0.0241 },
              { size: '#2', shape: 'Rectangular', topDia: '201 × 168 × 24 mm', pcsPerCase: 500, carton: '340 × 210 × 270', cbm: 0.0193 },
              { size: '#3', shape: 'Rectangular', topDia: '205 × 141 × 45 mm', pcsPerCase: 500, carton: '300 × 220 × 400', cbm: 0.0264 },
              { size: '#4', shape: 'Rectangular', topDia: '172 × 152 × 27 mm', pcsPerCase: 500, carton: '320 × 180 × 250', cbm: 0.0144 },
              { size: '#5', shape: 'Rectangular', topDia: '170 × 129 × 17 mm', pcsPerCase: 500, carton: '270 × 180 × 250', cbm: 0.0122 },
              { size: '#6', shape: 'Rectangular', topDia: '204 × 139 × 26 mm', pcsPerCase: 500, carton: '310 × 210 × 340', cbm: 0.0221 },
            ],
          },
        ],
        coatings: [
          { name: 'PE Coating', description: 'Single-side polyethylene lining. Standard for grease and liquid resistance in food containers.' },
          { name: 'Double PE Coating', description: 'Both sides PE-lined for maximum moisture protection. Used in fruit trays and wet-food applications.' },
        ],
        moq: {
          standard: '5,000 pcs',
        },
        customization: [
          'Custom sizes and shapes on request',
          'Matching lids available (PET / PP / Paper)',
          'Food-grade certified materials',
        ],
      },
    ],
  },
  { id: 'plastic',    label: 'Plastic',    products: [], comingSoon: true },
  { id: 'fibre',      label: 'Fibre',      products: [], comingSoon: true },
  { id: 'cornstarch', label: 'Cornstarch', products: [], comingSoon: true },
  { id: 'husk',       label: 'Husk',       products: [], comingSoon: true },
];

/* ---------- State ---------- */
let activeProductId = null;

/* ---------- Quote List (persisted in localStorage) ---------- */
const quoteList = JSON.parse(localStorage.getItem('nexopack_quote_list') || '[]');
let qlIdCounter = quoteList.length > 0 ? Math.max(...quoteList.map(i => i.id)) : 0;

function saveQuoteList() {
  localStorage.setItem('nexopack_quote_list', JSON.stringify(quoteList));
}

function getActiveWallName() {
  const btn = document.querySelector('.wall-tab-btn.wall-tab-active');
  return btn ? btn.textContent : '';
}

function getActiveShapeFilter() {
  const btn = document.querySelector('.shape-filter-btn.shape-filter-active');
  return btn ? btn.textContent : '';
}

function addToQuoteList(sizeData) {
  qlIdCounter++;
  quoteList.push({
    id: qlIdCounter,
    wallType: getActiveWallName(),
    shapeFilter: getActiveShapeFilter(),
    size: sizeData.size,
    topDia: sizeData.topDia,
    pcsPerCase: sizeData.pcsPerCase,
    carton: sizeData.carton,
    iceCream: sizeData.iceCream || false,
  });
  saveQuoteList();
  updateQuoteListCount();
}

function removeFromQuoteList(id) {
  const idx = quoteList.findIndex(item => item.id === id);
  if (idx !== -1) quoteList.splice(idx, 1);
  saveQuoteList();
  updateQuoteListCount();
  renderQuoteListModal();
}

function updateQuoteListCount() {
  const countEl = document.getElementById('quote-list-count');
  const badgeEl = document.getElementById('ql-count-badge');
  if (countEl) {
    countEl.textContent = quoteList.length;
    if (quoteList.length > 0) {
      countEl.classList.remove('hidden');
    } else {
      countEl.classList.add('hidden');
    }
  }
  if (badgeEl) {
    badgeEl.textContent = quoteList.length + (quoteList.length === 1 ? ' item' : ' items');
  }
}

function openQuoteList() {
  renderQuoteListModal();
  const panel = document.getElementById('ql-panel');
  const backdrop = document.getElementById('ql-backdrop');
  if (panel) panel.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuoteList() {
  const panel = document.getElementById('ql-panel');
  const backdrop = document.getElementById('ql-backdrop');
  if (panel) panel.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

function renderQuoteListModal() {
  const body = document.getElementById('ql-body');
  if (!body) return;
  body.textContent = '';

  /* Check for existing footer and remove */
  const existingFooter = document.querySelector('.ql-footer');
  if (existingFooter) existingFooter.remove();

  if (quoteList.length === 0) {
    /* Empty state */
    const empty = document.createElement('div');
    empty.className = 'ql-empty';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'ql-empty-icon';
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconSvg.setAttribute('width', '24');
    iconSvg.setAttribute('height', '24');
    iconSvg.setAttribute('viewBox', '0 0 24 24');
    iconSvg.setAttribute('fill', 'none');
    iconSvg.setAttribute('stroke', 'currentColor');
    iconSvg.setAttribute('stroke-width', '1.5');
    iconSvg.setAttribute('stroke-linecap', 'round');
    iconSvg.setAttribute('stroke-linejoin', 'round');
    const p1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p1.setAttribute('d', 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2');
    const r1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    r1.setAttribute('x', '9'); r1.setAttribute('y', '3'); r1.setAttribute('width', '6'); r1.setAttribute('height', '4'); r1.setAttribute('rx', '1');
    iconSvg.appendChild(p1);
    iconSvg.appendChild(r1);
    iconWrap.appendChild(iconSvg);

    const msg = document.createElement('p');
    msg.textContent = 'Your list is empty';
    const hint = document.createElement('p');
    hint.className = 'ql-empty-hint';
    hint.textContent = 'Browse the product table and press + Add to start building your quote.';

    empty.appendChild(iconWrap);
    empty.appendChild(msg);
    empty.appendChild(hint);
    body.appendChild(empty);
    return;
  }

  /* Items section */
  const section = document.createElement('div');
  section.className = 'ql-section';
  const sLabel = document.createElement('p');
  sLabel.className = 'ql-section-label';
  sLabel.textContent = 'Selected Products';
  section.appendChild(sLabel);

  quoteList.forEach(item => {
    const card = document.createElement('div');
    card.className = 'ql-item';

    /* Header */
    const header = document.createElement('div');
    header.className = 'ql-item-header';
    const info = document.createElement('div');
    const name = document.createElement('p');
    name.className = 'ql-item-name';
    let label = item.wallType;
    if (item.iceCream) label += ' (Ice Cream)';
    name.textContent = label + ' \u2014 ' + item.size;
    if (item.shapeFilter) {
      const shapeBadge = document.createElement('span');
      shapeBadge.className = 'ql-shape-badge';
      shapeBadge.textContent = item.shapeFilter;
      name.appendChild(shapeBadge);
    }
    const spec = document.createElement('p');
    spec.className = 'ql-item-spec';
    spec.textContent = 'Top Dia. ' + item.topDia + ' \u00b7 ' + item.pcsPerCase.toLocaleString() + ' pcs/case \u00b7 Carton ' + item.carton + ' mm';
    info.appendChild(name);
    info.appendChild(spec);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'ql-item-remove';
    removeBtn.title = 'Remove';
    const removeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    removeSvg.setAttribute('width', '16'); removeSvg.setAttribute('height', '16');
    removeSvg.setAttribute('viewBox', '0 0 24 24'); removeSvg.setAttribute('fill', 'none');
    removeSvg.setAttribute('stroke', 'currentColor'); removeSvg.setAttribute('stroke-width', '2');
    removeSvg.setAttribute('stroke-linecap', 'round');
    const rl1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    rl1.setAttribute('x1','18'); rl1.setAttribute('y1','6'); rl1.setAttribute('x2','6'); rl1.setAttribute('y2','18');
    const rl2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    rl2.setAttribute('x1','6'); rl2.setAttribute('y1','6'); rl2.setAttribute('x2','18'); rl2.setAttribute('y2','18');
    removeSvg.appendChild(rl1); removeSvg.appendChild(rl2);
    removeBtn.appendChild(removeSvg);
    removeBtn.addEventListener('click', () => removeFromQuoteList(item.id));

    header.appendChild(info);
    header.appendChild(removeBtn);
    card.appendChild(header);

    /* Fields */
    const fields = document.createElement('div');
    fields.className = 'ql-item-fields';

    /* Volume */
    const fVol = document.createElement('div');
    fVol.className = 'ql-field';
    const lVol = document.createElement('label');
    lVol.textContent = 'Order Volume (pcs)';
    const iVol = document.createElement('input');
    iVol.type = 'number'; iVol.min = '500'; iVol.step = '500'; iVol.placeholder = 'e.g. 5000';
    fVol.appendChild(lVol); fVol.appendChild(iVol);

    /* Coating */
    const fCoat = document.createElement('div');
    fCoat.className = 'ql-field';
    const lCoat = document.createElement('label');
    lCoat.textContent = 'Coating';
    const sCoat = document.createElement('select');
    const o1 = document.createElement('option'); o1.textContent = 'PE Coating';
    const o2 = document.createElement('option'); o2.textContent = 'Aqueous Coating';
    sCoat.appendChild(o1); sCoat.appendChild(o2);
    fCoat.appendChild(lCoat); fCoat.appendChild(sCoat);

    /* Destination */
    const fDest = document.createElement('div');
    fDest.className = 'ql-field';
    const lDest = document.createElement('label');
    lDest.textContent = 'Destination';
    const sDest = document.createElement('select');
    const d1 = document.createElement('option'); d1.textContent = 'Hong Kong';
    const d2 = document.createElement('option'); d2.textContent = 'Export (Overseas)';
    sDest.appendChild(d1); sDest.appendChild(d2);
    fDest.appendChild(lDest); fDest.appendChild(sDest);

    /* Custom Print checkbox */
    const fCp = document.createElement('div');
    fCp.className = 'ql-field';
    const cpWrap = document.createElement('div');
    cpWrap.className = 'ql-field-check';
    const cpId = 'ql-cp-' + item.id;
    const cpInput = document.createElement('input');
    cpInput.type = 'checkbox'; cpInput.id = cpId;
    const cpLabel = document.createElement('span');
    cpLabel.textContent = 'Custom Print';
    cpLabel.addEventListener('click', () => cpInput.click());
    cpWrap.appendChild(cpInput); cpWrap.appendChild(cpLabel);
    fCp.appendChild(cpWrap);

    fields.appendChild(fVol);
    fields.appendChild(fCoat);
    fields.appendChild(fDest);
    fields.appendChild(fCp);
    card.appendChild(fields);

    /* Upload zone (hidden until Custom Print checked) */
    const uploadId = 'ql-upload-' + item.id;
    const fileId = 'ql-file-' + item.id;
    const fnameId = 'ql-fname-' + item.id;

    const uploadZone = document.createElement('div');
    uploadZone.className = 'ql-upload-zone';
    uploadZone.id = uploadId;

    const uzIcon = document.createElement('div');
    uzIcon.className = 'ql-upload-zone-icon';
    const uzSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    uzSvg.setAttribute('width','18'); uzSvg.setAttribute('height','18');
    uzSvg.setAttribute('viewBox','0 0 24 24'); uzSvg.setAttribute('fill','none');
    uzSvg.setAttribute('stroke','currentColor'); uzSvg.setAttribute('stroke-width','2');
    uzSvg.setAttribute('stroke-linecap','round'); uzSvg.setAttribute('stroke-linejoin','round');
    const uzP1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    uzP1.setAttribute('d','M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4');
    const uzPoly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    uzPoly.setAttribute('points','17 8 12 3 7 8');
    const uzLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    uzLine.setAttribute('x1','12'); uzLine.setAttribute('y1','3'); uzLine.setAttribute('x2','12'); uzLine.setAttribute('y2','15');
    uzSvg.appendChild(uzP1); uzSvg.appendChild(uzPoly); uzSvg.appendChild(uzLine);
    uzIcon.appendChild(uzSvg);

    const uzText = document.createElement('div');
    uzText.className = 'ql-upload-zone-text';
    const uzP = document.createElement('p');
    const uzStrong = document.createElement('strong');
    uzStrong.textContent = 'Upload artwork';
    uzP.appendChild(uzStrong);
    uzP.appendChild(document.createTextNode(' \u2014 logo or design file'));
    const uzHint = document.createElement('p');
    uzHint.className = 'hint';
    uzHint.textContent = 'PNG, JPG, PDF or AI \u00b7 Max 10 MB';
    uzText.appendChild(uzP); uzText.appendChild(uzHint);

    const fileInput = document.createElement('input');
    fileInput.type = 'file'; fileInput.id = fileId;
    fileInput.accept = '.png,.jpg,.jpeg,.pdf,.ai';
    fileInput.style.display = 'none';

    uploadZone.appendChild(uzIcon);
    uploadZone.appendChild(uzText);
    uploadZone.appendChild(fileInput);
    uploadZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('click', e => e.stopPropagation());

    /* Filename display */
    const fnameWrap = document.createElement('div');
    fnameWrap.className = 'ql-upload-fname';
    fnameWrap.id = fnameId;
    const fnSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    fnSvg.setAttribute('width','14'); fnSvg.setAttribute('height','14');
    fnSvg.setAttribute('viewBox','0 0 24 24'); fnSvg.setAttribute('fill','none');
    fnSvg.setAttribute('stroke','currentColor'); fnSvg.setAttribute('stroke-width','2');
    fnSvg.setAttribute('stroke-linecap','round');
    const fnP = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    fnP.setAttribute('d','M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z');
    const fnPoly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    fnPoly.setAttribute('points','14 2 14 8 20 8');
    fnSvg.appendChild(fnP); fnSvg.appendChild(fnPoly);
    const fnText = document.createElement('span');
    fnText.className = 'ql-fname-text';
    const fnRemove = document.createElement('button');
    fnRemove.className = 'ql-remove-file';
    fnRemove.title = 'Remove file';
    const fnRSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    fnRSvg.setAttribute('width','12'); fnRSvg.setAttribute('height','12');
    fnRSvg.setAttribute('viewBox','0 0 24 24'); fnRSvg.setAttribute('fill','none');
    fnRSvg.setAttribute('stroke','currentColor'); fnRSvg.setAttribute('stroke-width','2.5');
    fnRSvg.setAttribute('stroke-linecap','round');
    const fnRL1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    fnRL1.setAttribute('x1','18'); fnRL1.setAttribute('y1','6'); fnRL1.setAttribute('x2','6'); fnRL1.setAttribute('y2','18');
    const fnRL2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    fnRL2.setAttribute('x1','6'); fnRL2.setAttribute('y1','6'); fnRL2.setAttribute('x2','18'); fnRL2.setAttribute('y2','18');
    fnRSvg.appendChild(fnRL1); fnRSvg.appendChild(fnRL2);
    fnRemove.appendChild(fnRSvg);
    fnameWrap.appendChild(fnSvg); fnameWrap.appendChild(fnText); fnameWrap.appendChild(fnRemove);

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        fnText.textContent = fileInput.files[0].name;
        fnameWrap.classList.add('visible');
      }
    });
    fnRemove.addEventListener('click', () => {
      fileInput.value = '';
      fnameWrap.classList.remove('visible');
    });

    /* Toggle upload on checkbox */
    cpInput.addEventListener('change', () => {
      if (cpInput.checked) {
        uploadZone.classList.add('visible');
      } else {
        uploadZone.classList.remove('visible');
        fnameWrap.classList.remove('visible');
        fileInput.value = '';
      }
    });

    card.appendChild(uploadZone);
    card.appendChild(fnameWrap);
    section.appendChild(card);
  });

  body.appendChild(section);

  /* Divider */
  const divider = document.createElement('div');
  divider.className = 'ql-divider';
  body.appendChild(divider);

  /* Contact section */
  const contact = document.createElement('div');
  contact.className = 'ql-contact';
  const cLabel = document.createElement('p');
  cLabel.className = 'ql-section-label';
  cLabel.textContent = 'Contact Details';
  contact.appendChild(cLabel);

  const grid = document.createElement('div');
  grid.className = 'ql-contact-grid';

  function contactField(labelText, type, placeholder, fullWidth) {
    const wrap = document.createElement('div');
    wrap.className = 'ql-field' + (fullWidth ? ' ql-full-width' : '');
    const label = document.createElement('label');
    label.textContent = labelText;
    wrap.appendChild(label);
    if (type === 'textarea') {
      const ta = document.createElement('textarea');
      ta.placeholder = placeholder;
      wrap.appendChild(ta);
    } else {
      const input = document.createElement('input');
      input.type = type;
      input.placeholder = placeholder;
      wrap.appendChild(input);
    }
    return wrap;
  }

  grid.appendChild(contactField('Full Name *', 'text', 'John Chan', false));
  grid.appendChild(contactField('Company Name', 'text', 'ABC Catering Ltd.', false));
  grid.appendChild(contactField('Email Address *', 'email', 'john@company.com', false));
  grid.appendChild(contactField('Phone', 'tel', '+852 9123 4567', false));
  grid.appendChild(contactField('Message', 'textarea', 'e.g. Pantone colours, logo artwork, delivery timeline...', true));
  contact.appendChild(grid);
  body.appendChild(contact);

  /* Footer (appended to panel, not body, so it stays fixed at bottom) */
  const panel = document.getElementById('ql-panel');
  const footer = document.createElement('div');
  footer.className = 'ql-footer';
  const hint = document.createElement('p');
  hint.className = 'ql-footer-hint';
  hint.textContent = "We'll review your selections and respond with a detailed quotation within 1 business day.";
  const submitBtn = document.createElement('button');
  submitBtn.className = 'ql-submit';
  submitBtn.textContent = 'Submit Quote Request \u2192';
  footer.appendChild(hint);
  footer.appendChild(submitBtn);
  panel.appendChild(footer);
}

/* ---------- Sidebar ---------- */
function renderSidebar() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;

  nav.textContent = '';

  PRODUCT_CATEGORIES.forEach(cat => {
    const wrapper = document.createElement('div');
    wrapper.className = 'mb-6';

    /* Check if this category contains the active product */
    const hasActiveProduct = !cat.comingSoon && cat.products.some(p => p.id === activeProductId);

    /* Heading with chevron */
    const heading = document.createElement('p');
    heading.className = 'font-display text-xs font-semibold uppercase tracking-widest2 text-black/40 mb-2 sidebar-category-heading';

    const chevronSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chevronSvg.setAttribute('width', '10');
    chevronSvg.setAttribute('height', '10');
    chevronSvg.setAttribute('viewBox', '0 0 24 24');
    chevronSvg.setAttribute('fill', 'none');
    chevronSvg.setAttribute('stroke', 'currentColor');
    chevronSvg.setAttribute('stroke-width', '2.5');
    chevronSvg.setAttribute('stroke-linecap', 'round');
    chevronSvg.setAttribute('stroke-linejoin', 'round');
    chevronSvg.className.baseVal = 'sidebar-chevron' + (hasActiveProduct ? ' expanded' : '');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', '9 18 15 12 9 6');
    chevronSvg.appendChild(polyline);
    heading.appendChild(chevronSvg);

    heading.appendChild(document.createTextNode(cat.label));

    if (cat.comingSoon) {
      const badge = document.createElement('span');
      badge.className = 'text-[10px] normal-case tracking-normal font-medium bg-sage-100 text-sage-700 px-2 py-0.5 rounded-full leading-tight';
      badge.textContent = 'Coming Soon';
      heading.appendChild(badge);
    }
    wrapper.appendChild(heading);

    if (cat.comingSoon) {
      const comingSoonList = document.createElement('ul');
      comingSoonList.className = 'sidebar-products';
      const li = document.createElement('li');
      const p = document.createElement('p');
      p.className = 'text-xs text-black/25 pl-5 py-1';
      p.textContent = 'Products coming soon';
      li.appendChild(p);
      comingSoonList.appendChild(li);
      wrapper.appendChild(comingSoonList);

      heading.addEventListener('click', () => {
        const chevron = heading.querySelector('.sidebar-chevron');
        const isOpen = comingSoonList.classList.contains('open');
        if (isOpen) {
          comingSoonList.classList.remove('open');
          if (chevron) chevron.classList.remove('expanded');
        } else {
          comingSoonList.classList.add('open');
          if (chevron) chevron.classList.add('expanded');
        }
      });
    } else {
      const ul = document.createElement('ul');
      ul.className = 'space-y-0.5 sidebar-products' + (hasActiveProduct ? ' open' : '');
      cat.products.forEach(prod => {
        const isActive = prod.id === activeProductId;
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.className = 'sidebar-item w-full text-left text-sm py-1.5 pr-2 rounded-md hover:bg-cream transition-colors font-medium ' +
          (isActive ? 'sidebar-item-active text-sage-700' : 'text-black/60 hover:text-black');
        btn.textContent = prod.name;
        btn.addEventListener('click', () => {
          showProduct(cat.id, prod.id);
          closeDrawer();
        });
        li.appendChild(btn);
        ul.appendChild(li);
      });
      wrapper.appendChild(ul);

      /* Toggle collapse on heading click */
      heading.addEventListener('click', () => {
        const chevron = heading.querySelector('.sidebar-chevron');
        const isOpen = ul.classList.contains('open');
        if (isOpen) {
          ul.classList.remove('open');
          if (chevron) chevron.classList.remove('expanded');
        } else {
          ul.classList.add('open');
          if (chevron) chevron.classList.add('expanded');
        }
      });
    }

    nav.appendChild(wrapper);
  });
}

/* ---------- Product Rendering — Floating Cards ---------- */
function renderProduct(product) {
  const card = (title, content) =>
    `<div class="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-7 mb-5">
      <p class="font-display text-xs font-semibold uppercase tracking-widest text-sage-500 mb-5">${title}</p>${content}</div>`;

  const checkItems = product.customization.map(c =>
    `<li class="flex items-start gap-2">
      <span class="text-sage-500 mt-0.5"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
      <span>${c}</span>
    </li>`).join('');

  /* Wall-type tab buttons — data-idx drives switching */
  const tabButtons = product.wallTypes.map((w, i) =>
    `<button class="wall-tab-btn${i === 0 ? ' wall-tab-active' : ''}" data-wall-idx="${i}">${w.name}</button>`
  ).join('');

  return `
    <div class="content-enter">
      <div class="mb-0">
        <h2 class="font-display text-3xl md:text-4xl font-bold text-black" style="letter-spacing:-0.02em;">${product.name}</h2>
        <p class="mt-3 text-base text-black/60 leading-relaxed max-w-2xl">${product.tagline}</p>
        <p class="mt-2 text-sm text-black/45 leading-relaxed max-w-2xl">${product.description}</p>
      </div>

      <!-- Wall-type underline tabs -->
      <div class="wall-tab-strip" id="wall-tab-strip">
        ${tabButtons}
        <div class="wall-tab-indicator" id="wall-tab-indicator"></div>
      </div>
      <p class="wall-tab-desc" id="wall-tab-desc"></p>

      <!-- Product banner image -->
      <div id="product-image-slot" class="mb-2 rounded-2xl overflow-hidden" style="scroll-margin-top:6rem;"></div>
      <p id="image-disclaimer" class="text-[11px] text-black/25 mb-5 hidden">Images are for illustrative purposes only. Actual product may vary in colour, size, and finish.</p>

      <div class="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-7 mb-5">
        <div class="sizes-sticky-header flex items-center justify-between mb-5 flex-wrap gap-3">
          <p class="font-display text-xs font-semibold uppercase tracking-widest text-sage-500">Available Sizes</p>
          <div class="flex items-center gap-3 flex-wrap">
            <div id="wall-type-bar" class="flex gap-1.5">${product.wallTypes.map((w, i) =>
              `<button class="wall-type-inline-btn shape-filter-btn${i === 0 ? ' shape-filter-active' : ''}" data-wall-idx="${i}">${w.name}</button>`
            ).join('')}</div>
            <div id="shape-filter-bar" class="flex gap-1.5 hidden"></div>
          </div>
        </div>
        <div>
          <table class="spec-table spec-table-minimal">
            <thead id="wall-sizes-head"></thead>
            <tbody id="wall-sizes-body" class="text-black/60"></tbody>
          </table>
        </div>
      </div>

      ${card('Coating Options', product.coatings.map(c =>
        `<div class="mb-4 last:mb-0">
          <p class="font-medium text-black text-sm mb-1">${c.name}</p>
          <p class="text-sm text-black/55 leading-relaxed">${c.description}</p>
        </div>`).join(''))}

      <div id="order-customization">
      ${card('Order & Customization', `
        <div class="flex flex-col md:flex-row gap-8 mb-6">
          <div class="flex-1">
            <div class="space-y-2 text-sm">
              <p><span class="font-semibold text-black">Standard MOQ:</span> <span class="text-black/60">${product.moq.standard}</span><span class="text-sage-500 text-xs align-super">*</span></p>
${product.moq.customPrint ? `<p><span class="font-semibold text-black">Custom Print:</span> <span class="text-black/60">${product.moq.customPrint}</span><span class="text-sage-500 text-xs align-super">*</span></p>` : ''}
              <p class="text-black/35 text-xs mt-2"><span class="text-sage-500">*</span> MOQ may vary by product specification and stock availability.</p>
            </div>
          </div>
          <div class="flex-1">
            <ul class="space-y-2 text-sm text-black/60">${checkItems}</ul>
          </div>
        </div>
        <div class="flex flex-wrap gap-4">
          <button onclick="openModal('modal-email')" class="inline-flex items-center gap-1.5 bg-sage-700 hover:bg-sage-900 text-cream font-medium px-8 py-3 rounded-full text-sm transition-colors shadow-lg focus-visible:outline-none">Email Us</button>
        </div>`)}
      </div>
    </div>
  `;
}

/* ---------- Wall-type Tab Switching ---------- */
let activeWallProduct = null;

function positionWallIndicator(btn) {
  const indicator = document.getElementById('wall-tab-indicator');
  if (!indicator || !btn) return;
  indicator.style.left = btn.offsetLeft + 'px';
  indicator.style.width = btn.offsetWidth + 'px';
}

function buildSizeRows(sizes, wallType) {
  const thead = document.getElementById('wall-sizes-head');
  const tbody = document.getElementById('wall-sizes-body');
  if (!tbody || !thead) return;

  /* Detect if any data row has a shape field */
  const hasShape = sizes.some(s => s.shape);
  const hasDims = wallType && wallType.topDiaHeader;
  const colCount = hasShape ? 6 : 5;
  const diaLabel = (wallType && wallType.topDiaHeader) || 'Top Dia.';

  /* Build thead */
  thead.textContent = '';
  const headTr = document.createElement('tr');
  let cols;
  if (hasShape) {
    cols = [['Size','12%'],['Shape','13%'],[diaLabel,'22%'],['Pcs / Case','12%'],['Carton (L × W × H)','28%'],['','13%']];
  } else if (hasDims) {
    cols = [['Size','14%'],[diaLabel,'22%'],['Pcs / Case','14%'],['Carton (L × W × H)','36%'],['','14%']];
  } else {
    cols = [['Size','14%'],[diaLabel,'14%'],['Pcs / Case','16%'],['Carton (L × W × H)','40%'],['','16%']];
  }
  cols.forEach(([label, w]) => {
    const th = document.createElement('th');
    th.textContent = label;
    th.style.width = w;
    headTr.appendChild(th);
  });
  thead.appendChild(headTr);

  /* Build tbody */
  tbody.textContent = '';
  sizes.forEach((s, i) => {
    /* Subcategory divider row */
    if (s.subcat) {
      const tr = document.createElement('tr');
      tr.className = 'subcat-row spec-row-animate';
      tr.style.animationDelay = (i * 0.04) + 's';
      const td = document.createElement('td');
      td.colSpan = colCount;
      const badge = document.createElement('span');
      badge.className = 'subcat-badge';
      badge.textContent = s.subcat;
      td.appendChild(badge);
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    const tr = document.createElement('tr');
    tr.className = 'spec-row-animate' + (s.iceCream ? ' ice-cream-row' : '');
    tr.style.animationDelay = (i * 0.04) + 's';

    const tdSize = document.createElement('td');
    tdSize.className = 'font-medium text-black whitespace-nowrap';
    if (hasShape) tdSize.style.paddingRight = '70px';
    tdSize.textContent = s.size;

    tr.appendChild(tdSize);

    if (hasShape) {
      const tdShape = document.createElement('td');
      tdShape.textContent = s.shape || '';
      tr.appendChild(tdShape);
    }

    const tdDia = document.createElement('td');
    tdDia.className = 'whitespace-nowrap';
    tdDia.textContent = s.topDia;

    const tdPcs = document.createElement('td');
    tdPcs.textContent = s.pcsPerCase.toLocaleString();

    const tdCarton = document.createElement('td');
    tdCarton.className = 'whitespace-nowrap';
    tdCarton.textContent = s.carton + ' mm';

    const tdAction = document.createElement('td');
    tdAction.className = 'text-right';
    tdAction.style.width = '70px';
    const addBtn = document.createElement('button');
    addBtn.className = 'inline-flex items-center gap-1 text-sage-700 hover:text-sage-900 text-xs font-semibold transition-colors';
    addBtn.type = 'button';

    const plusSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    plusSvg.setAttribute('width', '14');
    plusSvg.setAttribute('height', '14');
    plusSvg.setAttribute('viewBox', '0 0 24 24');
    plusSvg.setAttribute('fill', 'none');
    plusSvg.setAttribute('stroke', 'currentColor');
    plusSvg.setAttribute('stroke-width', '2.5');
    plusSvg.setAttribute('stroke-linecap', 'round');
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '12'); line1.setAttribute('y1', '5');
    line1.setAttribute('x2', '12'); line1.setAttribute('y2', '19');
    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '5');  line2.setAttribute('y1', '12');
    line2.setAttribute('x2', '19'); line2.setAttribute('y2', '12');
    plusSvg.appendChild(line1);
    plusSvg.appendChild(line2);

    addBtn.appendChild(plusSvg);
    addBtn.appendChild(document.createTextNode('Add'));
    let addedItemId = null;

    function setAddedState() {
      addBtn.textContent = '';
      const checkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      checkSvg.setAttribute('width', '14'); checkSvg.setAttribute('height', '14');
      checkSvg.setAttribute('viewBox', '0 0 24 24'); checkSvg.setAttribute('fill', 'none');
      checkSvg.setAttribute('stroke', 'currentColor'); checkSvg.setAttribute('stroke-width', '2.5');
      checkSvg.setAttribute('stroke-linecap', 'round'); checkSvg.setAttribute('stroke-linejoin', 'round');
      const polyCheck = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      polyCheck.setAttribute('points', '20 6 9 17 4 12');
      checkSvg.appendChild(polyCheck);
      addBtn.appendChild(checkSvg);
      addBtn.appendChild(document.createTextNode('Added'));
      addBtn.className = 'inline-flex items-center gap-1 text-sage-300 hover:text-red-400 text-xs font-semibold transition-colors cursor-pointer';
    }

    function setAddState() {
      addBtn.textContent = '';
      const newPlusSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      newPlusSvg.setAttribute('width', '14'); newPlusSvg.setAttribute('height', '14');
      newPlusSvg.setAttribute('viewBox', '0 0 24 24'); newPlusSvg.setAttribute('fill', 'none');
      newPlusSvg.setAttribute('stroke', 'currentColor'); newPlusSvg.setAttribute('stroke-width', '2.5');
      newPlusSvg.setAttribute('stroke-linecap', 'round');
      const nl1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      nl1.setAttribute('x1', '12'); nl1.setAttribute('y1', '5');
      nl1.setAttribute('x2', '12'); nl1.setAttribute('y2', '19');
      const nl2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      nl2.setAttribute('x1', '5'); nl2.setAttribute('y1', '12');
      nl2.setAttribute('x2', '19'); nl2.setAttribute('y2', '12');
      newPlusSvg.appendChild(nl1); newPlusSvg.appendChild(nl2);
      addBtn.appendChild(newPlusSvg);
      addBtn.appendChild(document.createTextNode('Add'));
      addBtn.className = 'inline-flex items-center gap-1 text-sage-700 hover:text-sage-900 text-xs font-semibold transition-colors';
    }

    addBtn.addEventListener('click', () => {
      if (addedItemId !== null) {
        removeFromQuoteList(addedItemId);
        addedItemId = null;
        setAddState();
      } else {
        addToQuoteList(s);
        addedItemId = quoteList[quoteList.length - 1].id;
        setAddedState();
      }
    });
    tdAction.appendChild(addBtn);

    tr.appendChild(tdDia);
    tr.appendChild(tdPcs);
    tr.appendChild(tdCarton);
    tr.appendChild(tdAction);
    tbody.appendChild(tr);
  });
}

let wallTabUserClicked = false;

function switchWallType(idx) {
  if (!activeWallProduct) return;
  const wall = activeWallProduct.wallTypes[idx];
  if (!wall) return;

  /* Update active tab */
  const btns = document.querySelectorAll('.wall-tab-btn');
  btns.forEach(b => b.classList.remove('wall-tab-active'));
  const activeBtn = btns[idx];
  if (activeBtn) {
    activeBtn.classList.add('wall-tab-active');
    positionWallIndicator(activeBtn);
  }

  /* Sync inline wall type buttons */
  const inlineBtns = document.querySelectorAll('.wall-type-inline-btn');
  inlineBtns.forEach(b => b.classList.remove('shape-filter-active'));
  if (inlineBtns[idx]) inlineBtns[idx].classList.add('shape-filter-active');

  /* Update banner image */
  const imageSlot = document.getElementById('product-image-slot');
  const disclaimer = document.getElementById('image-disclaimer');
  if (imageSlot) {
    imageSlot.textContent = '';
    if (wall.bannerImage) {
      imageSlot.className = 'mb-2 rounded-2xl overflow-hidden';
      const img = document.createElement('img');
      img.src = wall.bannerImage;
      img.alt = wall.name;
      img.className = 'w-full h-auto block';
      img.style.objectFit = 'cover';
      imageSlot.appendChild(img);
      if (disclaimer) disclaimer.classList.remove('hidden');
      if (wallTabUserClicked) imageSlot.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      imageSlot.className = 'hidden';
      if (disclaimer) disclaimer.classList.add('hidden');
    }
  }

  /* Fade out description, then update */
  const desc = document.getElementById('wall-tab-desc');
  if (desc) {
    desc.classList.add('fading');
    setTimeout(() => {
      desc.textContent = wall.description;
      desc.classList.remove('fading');
    }, 200);
  }

  /* Shape filters (e.g. Food Container: Rectangular / Square) */
  const filterBar = document.getElementById('shape-filter-bar');
  if (filterBar) {
    filterBar.textContent = '';
    if (wall.shapeFilters && wall.sizesBy) {
      filterBar.classList.remove('hidden');
      wall.shapeFilters.forEach((shape, fi) => {
        const btn = document.createElement('button');
        btn.className = 'shape-filter-btn' + (fi === 0 ? ' shape-filter-active' : '');
        btn.textContent = shape;
        btn.addEventListener('click', () => {
          filterBar.querySelectorAll('.shape-filter-btn').forEach(b => b.classList.remove('shape-filter-active'));
          btn.classList.add('shape-filter-active');
          buildSizeRows(wall.sizesBy[shape], wall);
        });
        filterBar.appendChild(btn);
      });
      /* Show first shape */
      buildSizeRows(wall.sizesBy[wall.shapeFilters[0]], wall);
    } else {
      filterBar.classList.add('hidden');
      buildSizeRows(wall.sizes, wall);
    }
  } else {
    buildSizeRows(wall.sizes, wall);
  }
}

function initWallTabs(product) {
  activeWallProduct = product;
  /* Attach click listeners to top tabs */
  document.querySelectorAll('.wall-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      wallTabUserClicked = true;
      switchWallType(Number(btn.dataset.wallIdx));
    });
  });
  /* Attach click listeners to inline wall type buttons */
  document.querySelectorAll('.wall-type-inline-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      wallTabUserClicked = true;
      switchWallType(Number(btn.dataset.wallIdx));
    });
  });
  /* Show first wall type */
  switchWallType(0);
  /* Reposition indicator on resize */
  window.addEventListener('resize', () => {
    const active = document.querySelector('.wall-tab-btn.wall-tab-active');
    if (active) positionWallIndicator(active);
  });
}

/* ---------- Show Product ---------- */
function showProduct(categoryId, productId) {
  const category = PRODUCT_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return;
  const product = category.products.find(p => p.id === productId);
  if (!product) return;

  activeProductId = productId;

  const content = document.getElementById('product-content');
  if (!content) return;

  // Data is from hardcoded PRODUCT_CATEGORIES constant — safe to use innerHTML
  content.innerHTML = renderProduct(product); // eslint-disable-line -- hardcoded data only
  renderSidebar();

  /* Init wall-type tabs if this product has them */
  if (product.wallTypes && product.wallTypes.length > 0) {
    initWallTabs(product);
  }
}

/* ---------- Mobile Drawer ---------- */
function openDrawer() {
  const drawer = document.getElementById('sidebar-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer) drawer.classList.add('open');
  if (backdrop) {
    backdrop.classList.remove('hidden');
    requestAnimationFrame(() => backdrop.classList.add('open'));
  }
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  const drawer = document.getElementById('sidebar-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) {
    backdrop.classList.remove('open');
    setTimeout(() => backdrop.classList.add('hidden'), 300);
  }
  document.body.style.overflow = '';
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Navbar — ghost → frosted on scroll (same as homepage)
  const nav = document.querySelector('.navbar-float');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('navbar-float--scrolled', window.scrollY > 60);
  });

  // Render sidebar & first product
  activeProductId = 'paper-cup';
  renderSidebar();
  showProduct('paper', 'paper-cup');

  // Restore quote list count from localStorage
  updateQuoteListCount();

  // Mobile drawer triggers
  const drawerTrigger = document.getElementById('drawer-trigger');
  const drawerClose = document.getElementById('drawer-close');
  const backdrop = document.getElementById('drawer-backdrop');

  if (drawerTrigger) drawerTrigger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  /* Quote list modal triggers */
  const qlBtn = document.getElementById('quote-list-btn');
  const qlClose = document.getElementById('ql-close');
  const qlBackdrop = document.getElementById('ql-backdrop');

  if (qlBtn) qlBtn.addEventListener('click', openQuoteList);
  if (qlClose) qlClose.addEventListener('click', closeQuoteList);
  if (qlBackdrop) qlBackdrop.addEventListener('click', closeQuoteList);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeQuoteList();
  });
});
