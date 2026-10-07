// MODIFIER ICI : tes produits. img = URL image (Unsplash ou la tienne).
const U = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;
const PRODUCTS = [
  { id: 1, name: "Casque Audio Studio", cat: "Tech", price: 129, old: 179, rating: 4.8, reviews: 312, badge: "-28%", img: U("1505740420928-5e560c06d30e"), desc: "Son haute fidélité, réduction de bruit, 40h d'autonomie." },
  { id: 2, name: "Montre Classique", cat: "Mode", price: 189, old: null, rating: 4.7, reviews: 148, badge: "Nouveau", img: U("1523275335684-37898b6baf30"), desc: "Cadran minimaliste, bracelet cuir véritable, résistante à l'eau." },
  { id: 3, name: "Sneakers Urban", cat: "Mode", price: 99, old: 140, rating: 4.6, reviews: 521, badge: "-30%", img: U("1542291026-7eec264c27ff"), desc: "Confort toute la journée, semelle amortissante, style intemporel." },
  { id: 4, name: "Lunettes de Soleil", cat: "Mode", price: 59, old: null, rating: 4.5, reviews: 97, badge: "", img: U("1572635196237-14b3f281503f"), desc: "Verres polarisés UV400, monture légère et robuste." },
  { id: 5, name: "Sac à Dos Voyage", cat: "Accessoires", price: 79, old: 99, rating: 4.9, reviews: 264, badge: "Best-seller", img: U("1553062407-98eeb64c6a62"), desc: "30L, compartiment ordinateur, tissu déperlant." },
  { id: 6, name: "Appareil Photo Vintage", cat: "Tech", price: 449, old: 529, rating: 4.8, reviews: 76, badge: "-15%", img: U("1526170375885-4d8ecf77b99f"), desc: "Capteur haute résolution, look rétro, objectif inclus." },
  { id: 7, name: "Montre Connectée", cat: "Tech", price: 159, old: null, rating: 4.4, reviews: 389, badge: "Populaire", img: U("1546868871-7041f2a55e12"), desc: "Suivi santé, GPS, notifications, 7 jours d'autonomie." },
  { id: 8, name: "Écouteurs Sans Fil", cat: "Tech", price: 69, old: 89, rating: 4.6, reviews: 702, badge: "-22%", img: U("1583394838336-acd977736f90"), desc: "Bluetooth 5.3, étui de charge, résistants à la transpiration." }
];
