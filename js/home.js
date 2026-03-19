// js/home.js — Homepage product grid and tab switching

const products = [
  { name: "Paper Cups", description: "Single wall, double wall, and ripple wall — premium cups with PE or aqueous coating and custom branding.", material: "paper", link: "products.html" },
  { name: "Paper Straws", description: "Biodegradable straws in various colours and diameters.", material: "paper" },
  { name: "Napkins", description: "1-ply and 2-ply napkins. White, kraft, and custom print available.", material: "paper" },
  { name: "Pizza Boxes", description: "Corrugated kraft pizza boxes in 8\u2033 to 18\u2033 sizes.", material: "paper" },
  { name: "Burger Boxes", description: "Clamshell kraft burger containers with grease-resistant lining.", material: "paper" },
  { name: "Paper Bags", description: "Flat and SOS bags for takeaway. Multiple sizes and prints.", material: "paper" },
  { name: "Plastic Cups", description: "PET and PP cups for cold drinks. 12oz\u201324oz. Crystal clear.", material: "plastic" },
  { name: "Bamboo Straws", description: "", material: "bamboo" },
  { name: "", description: "", material: "bamboo" },
  { name: "", description: "", material: "bamboo" },
  { name: "", description: "", material: "bamboo" },
  { name: "", description: "", material: "bamboo" },
  { name: "", description: "", material: "bamboo" },
  { name: "", description: "", material: "cornstarch" },
  { name: "", description: "", material: "cornstarch" },
  { name: "", description: "", material: "cornstarch" },
  { name: "", description: "", material: "cornstarch" },
  { name: "", description: "", material: "cornstarch" },
  { name: "", description: "", material: "cornstarch" },
  { name: "", description: "", material: "husk" },
  { name: "", description: "", material: "husk" },
  { name: "", description: "", material: "husk" },
  { name: "", description: "", material: "husk" },
  { name: "", description: "", material: "husk" },
  { name: "", description: "", material: "husk" },
  { name: "Bagasse / Sugarcane Cup", description: "", material: "bagasse" },
  { name: "Bagasse / Sugarcane Lid", description: "", material: "bagasse" },
  { name: "", description: "", material: "bagasse" },
  { name: "", description: "", material: "bagasse" },
  { name: "", description: "", material: "bagasse" },
  { name: "", description: "", material: "bagasse" },
  { name: "Cup Lids", description: "Flat and dome lids compatible with standard cup sizes.", material: "plastic" },
  { name: "Plastic Straws", description: "Standard and jumbo straws. Individually wrapped options.", material: "plastic" },
  { name: "Cutlery Sets", description: "Forks, knives, spoons. Individual and combo packs.", material: "plastic" },
  { name: "Food Containers", description: "Hinged-lid containers for salads, deli, and hot food.", material: "plastic" },
  { name: "Sauce Cups", description: "Portion cups with lids. 1oz\u20134oz for dips and sauces.", material: "plastic" },
];

function showTab(material, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const grid = document.getElementById('product-grid');
  const filtered = products.filter(p => p.material === material && p.name);
  grid.innerHTML = filtered.map(p => {
    const tag = p.link ? 'a' : 'div';
    const href = p.link ? ` href="${p.link}"` : '';
    return `
    <${tag}${href} class="product-card relative bg-cream rounded-lg overflow-hidden cursor-pointer border border-divider">
      <div class="p-6 flex items-center justify-between">
        <h3 class="font-display text-lg font-semibold transition-colors duration-300">${p.name}</h3>
        <span class="arrow transition-colors duration-300 text-muted">&rarr;</span>
      </div>
    </${tag}>
  `;
  }).join('');
}

// Initialize with paper tab active
document.addEventListener('DOMContentLoaded', () => {
  const firstTab = document.querySelector('.tab');
  if (firstTab) {
    firstTab.classList.add('active');
    showTab('paper', firstTab);
  }
});

// ─── Navbar — ghost → frosted on scroll ──────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar-float');
  if (nav) nav.classList.toggle('navbar-float--scrolled', window.scrollY > 60);
});
