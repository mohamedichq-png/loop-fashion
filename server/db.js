import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure public uploads directory exists
const UPLOADS_DIR = path.resolve(__dirname, '../public/uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Initial seed data if DB does not exist
function initDatabase() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      console.error('[DB] Error reading existing database.json, re-initializing...', err);
    }
  }

  // Initial seed products
  const defaultProducts = [
    {
      id: "lp-001",
      name: "Blazer en Laine Pied-de-Poule Vintage",
      slug: "blazer-laine-pied-de-poule-vintage",
      category: "vestes-blazers",
      categoryLabel: "Vestes & Blazers",
      collections: ["vintage", "trouvailles-semaine", "nouveautes"],
      price: 135,
      comparePrice: 280,
      images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80"
      ],
      sizes: ["38 (FR)"],
      measurements: {
        carrure: "41 cm",
        poitrine: "49 cm",
        longueur: "73 cm",
        manches: "60 cm"
      },
      condition: "Excellent état",
      conditionDetails: "Très belle tenue du tissage. Doublure intérieure impeccable sans accroc, boutons d'origine en corne préservés.",
      brand: "Yves Saint Laurent Vintage",
      material: "100% Laine Vierge peignée, doublure satinée cupro",
      color: "Brun & Écru",
      stock: 1,
      isUnique: true,
      sku: "LP-YSL-8801",
      status: "Disponible",
      isPublished: true,
      weight: "750g",
      era: "Fin des années 1980",
      origin: "Fabriqué en France",
      stylingTip: "À porter ouvert sur un chemisier en soie fluide ou ceinturé à la taille avec un pantalon droit taille haute.",
      description: "Une pièce d'anthologie au tombé masculin-féminin parfaitement structuré. Son motif pied-de-poule subtil et ses épaulettes légères incarnent l'élégance parisienne des archives Saint Laurent. Une pièce rare et intemporelle.",
      seoTitle: "Blazer Laine Pied-de-Poule Yves Saint Laurent Vintage | LOOP FASHION",
      seoDescription: "Blazer vintage en pure laine vierge pied-de-poule YSL. Contrôlé et authentifié par LOOP FASHION. Pièce unique taille 38."
    },
    {
      id: "lp-002",
      name: "Trench-Coat Ceinturé Gabardine Beige",
      slug: "trench-coat-ceinture-gabardine-beige",
      category: "vestes-blazers",
      categoryLabel: "Vestes & Blazers",
      collections: ["vintage", "intemporels"],
      price: 185,
      comparePrice: 420,
      images: [
        "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
      ],
      sizes: ["38-40 (FR)"],
      measurements: {
        carrure: "43 cm",
        poitrine: "52 cm",
        longueur: "115 cm",
        manches: "61 cm"
      },
      condition: "Très bon état",
      conditionDetails: "Tissu déperlant très bien conservé. Légère patine d'usage sur la boucle de ceinture en cuir, témoin de son authenticité.",
      brand: "Burberrys Vintage Archive",
      material: "100% Coton Gabardine dense, doublure tartan emblématique",
      color: "Beige Miel",
      stock: 1,
      isUnique: true,
      sku: "LP-BUR-7912",
      status: "Disponible",
      isPublished: true,
      weight: "980g",
      era: "Années 1980",
      origin: "Fabriqué en Angleterre",
      stylingTip: "Relevez le col et nouez la ceinture négligemment pour une allure nonchalante et ultra chic.",
      description: "Le trench-coat d'archive par excellence. Sa gabardine de coton robuste et respirante traverse les intempéries avec une grâce infinie. Bavolet tempête au dos et bavolet de tir sur l'épaule.",
      seoTitle: "Trench-Coat Gabardine Vintage Burberrys | LOOP FASHION",
      seoDescription: "Trench vintage authentique Burberrys en gabardine de coton beige miel. Pièce unique sélectionnée et contrôlée."
    },
    {
      id: "lp-003",
      name: "Robe Portefeuille en Crêpe de Soie Terracotta",
      slug: "robe-portefeuille-soie-terracotta",
      category: "robes",
      categoryLabel: "Robes",
      collections: ["trouvailles-semaine", "nouveautes"],
      price: 145,
      comparePrice: 310,
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"
      ],
      sizes: ["36-38 (FR)"],
      measurements: {
        poitrine: "46 cm",
        taille: "36 cm (ajustable par lien)",
        longueur: "110 cm",
        manches: "48 cm"
      },
      condition: "État neuf avec étiquette",
      conditionDetails: "Jamais portée, étiquette d'atelier d'origine encore présente. Soie fluide sans aucune altération.",
      brand: "Courrèges Vintage",
      material: "100% Soie crêpe lourde",
      color: "Terracotta Chaud",
      stock: 1,
      isUnique: true,
      sku: "LP-CRG-9104",
      status: "Disponible",
      isPublished: true,
      weight: "380g",
      era: "Années 1990",
      origin: "Fabriqué en France",
      stylingTip: "Idéale avec des bottines en cuir cognac à talon bobine ou des sandales minimalistes dorées.",
      description: "Une silhouette sculpturale et féminine. Le tombé lourd de ce crêpe de soie caresse la silhouette en épousant chaque mouvement. Encolure en V flatteuse et nouage sur le côté.",
      seoTitle: "Robe Portefeuille Soie Terracotta Courrèges Vintage | LOOP FASHION",
      seoDescription: "Robe portefeuille en pure soie terracotta Courrèges Vintage. État neuf d'archive, pièce unique."
    },
    {
      id: "lp-004",
      name: "Petite Robe Noire Structurée Boutons Bijoux",
      slug: "petite-robe-noire-boutons-bijoux",
      category: "robes",
      categoryLabel: "Robes",
      collections: ["intemporels", "vintage"],
      price: 120,
      comparePrice: 260,
      images: [
        "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80"
      ],
      sizes: ["36 (FR)"],
      measurements: {
        carrure: "37 cm",
        poitrine: "44 cm",
        taille: "35 cm",
        longueur: "92 cm"
      },
      condition: "Excellent état",
      conditionDetails: "Tissu d'une tenue parfaite, noir profond sans décoloration. Boutons dorés martelés comme neufs.",
      brand: "Guy Laroche Paris Archive",
      material: "Laine froide mélangée & doublure acétate",
      color: "Noir Profond",
      stock: 1,
      isUnique: true,
      sku: "LP-GL-8911",
      status: "Disponible",
      isPublished: true,
      weight: "490g",
      era: "Années 1980",
      origin: "Fabriqué en France",
      stylingTip: "Portez-la en journée avec des mocassins et des chaussettes fines, ou en soirée avec une bouche rouge mate.",
      description: "La quintessence de l'élégance parisienne intemporelle. Coupe cintrée soulignée par une rangée de boutons bijoux martelés dorés à la feuille d'or mat.",
      seoTitle: "Petite Robe Noire Vintage Guy Laroche Paris | LOOP FASHION",
      seoDescription: "Robe noire structurée d'archive Guy Laroche avec boutons bijoux dorés. Pièce unique pour femme."
    },
    {
      id: "lp-005",
      name: "Chemisier Soie Lavée Ivoire Col Lavallière",
      slug: "chemisier-soie-lavee-ivoire-col-lavalliere",
      category: "hauts",
      categoryLabel: "Hauts & Chemises",
      collections: ["intemporels", "nouveautes"],
      price: 95,
      comparePrice: 210,
      images: [
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=900&q=80"
      ],
      sizes: ["38 (FR)"],
      measurements: {
        carrure: "39 cm",
        poitrine: "48 cm",
        longueur: "66 cm",
        manches: "59 cm"
      },
      condition: "Excellent état",
      conditionDetails: "Soie lavée souple, toucher pêche voluptueux. Boutons en nacre naturelle cousus main d'origine.",
      brand: "Chloé Archive",
      material: "100% Soie lavée naturelle",
      color: "Ivoire Nacré",
      stock: 1,
      isUnique: true,
      sku: "LP-CHL-9203",
      status: "Disponible",
      isPublished: true,
      weight: "220g",
      era: "Début des années 1990",
      origin: "Fabriqué en France",
      stylingTip: "Laissez le col lavallière délicatement dénoué pour un effet bohème chic sous un blazer à carreaux.",
      description: "Une pièce d'une douceur extraordinaire. Cette blouse en soie lavée possède un tombé fluide et mat qui illumine le teint. Poignets froncés avec boutons nacrés.",
      seoTitle: "Chemisier Soie Lavée Ivoire Col Lavallière Chloé Vintage | LOOP FASHION",
      seoDescription: "Chemisier fluide en pure soie lavée d'archive Chloé. État remarquable, col lavallière féminin."
    },
    {
      id: "lp-007",
      name: "Pull Col Roulé Cachemire Épais Crème",
      slug: "pull-col-roule-cachemire-epais-creme",
      category: "maille",
      categoryLabel: "Maille & Tricot",
      collections: ["intemporels", "nouveautes"],
      price: 155,
      comparePrice: 380,
      images: [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80"
      ],
      sizes: ["M (convient du 36 au 40 oversize)"],
      measurements: {
        carrure: "44 cm",
        poitrine: "54 cm",
        longueur: "68 cm",
        manches: "62 cm"
      },
      condition: "Excellent état",
      conditionDetails: "Cachemire nettoyé professionnellement, gonflant exceptionnel, aucun boulochage.",
      brand: "Malo Vintage Milano",
      material: "100% Cachemire 4 fils",
      color: "Crème & Lait",
      stock: 1,
      isUnique: true,
      sku: "LP-MALO-9405",
      status: "Disponible",
      isPublished: true,
      weight: "520g",
      era: "Années 1990",
      origin: "Fabriqué en Italie",
      stylingTip: "Glissez le devant dans une jupe plissée midi ou sur un pantalon en laine large.",
      description: "Un cachemire d'une densité somptueuse comme on n'en fabrique presque plus aujourd'hui. Chaleur enveloppante, tricotage côtes anglaises régulier et col montant réconfortant.",
      seoTitle: "Pull Cachemire Col Roulé Épais Malo Vintage | LOOP FASHION",
      seoDescription: "Pull vintage 100% cachemire 4 fils crème Malo. Une douceur absolue, pièce unique d'exception."
    },
    {
      id: "lp-011",
      name: "Sac Besace Cuir Box Fermoir Doré Céline Vintage",
      slug: "sac-besace-cuir-box-celine-vintage",
      category: "sacs",
      categoryLabel: "Sacs à main",
      collections: ["vintage", "accessoires", "nouveautes"],
      price: 340,
      comparePrice: 750,
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80"
      ],
      sizes: ["Taille Unique (24 x 18 x 7 cm)"],
      measurements: {
        largeur: "24 cm",
        hauteur: "18 cm",
        profondeur: "7 cm",
        bandouliere: "105 cm (réglable)"
      },
      condition: "Excellent état",
      conditionDetails: "Cuir box nourri et ciré par notre maroquinier partenaire. Fermoir d'origine dorure intacte. Intérieur doublé cuir d'agneau sans tache.",
      brand: "Céline Vintage Paris",
      material: "Cuir de veau box pleine fleur, bijouterie laiton doré",
      color: "Cognac Ambré",
      stock: 1,
      isUnique: true,
      sku: "LP-CEL-7820",
      status: "Disponible",
      isPublished: true,
      weight: "620g",
      era: "Fin des années 1970",
      origin: "Fabriqué en Italie pour Céline Paris",
      stylingTip: "Se porte en bandoulière sur un manteau en drap de laine beige ou à l'épaule sur une veste de costume.",
      description: "Une pièce de maroquinerie d'archive d'une rareté bouleversante. Le cuir box développe une patine miroir veloutée. Rabat géométrique épuré et fermoir blason siglé.",
      seoTitle: "Sac Besace Cuir Box Céline Vintage Paris | LOOP FASHION",
      seoDescription: "Sac besace d'archive Céline en cuir box cognac. Bijouterie dorée préservée, certifié authentique."
    },
    {
      id: "lp-013",
      name: "Carré de Soie Roulotté Main Motifs Équestres",
      slug: "carre-soie-roulotte-main-equestre",
      category: "accessoires",
      categoryLabel: "Accessoires",
      collections: ["accessoires", "vintage", "nouveautes"],
      price: 165,
      comparePrice: 395,
      images: [
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=900&q=80"
      ],
      sizes: ["90 x 90 cm"],
      measurements: {
        dimensions: "90 cm x 90 cm"
      },
      condition: "Excellent état",
      conditionDetails: "Roulotté bien rebondi cousu main. Soie crissante de haute densité, aucune tâche.",
      brand: "Hermès Vintage Archive",
      material: "100% Twill de soie lourde",
      color: "Sauge, Terracotta & Or",
      stock: 1,
      isUnique: true,
      sku: "LP-HER-8409",
      status: "Disponible",
      isPublished: true,
      weight: "85g",
      era: "Années 1980",
      origin: "Fabriqué en France",
      stylingTip: "Noué autour du cou, tressé dans une chevelure ou enroulé autour de l'anse de votre sac besace.",
      description: "Un chef-d'œuvre de l'artisanat lyonnais. Les nuances de sauge et de terracotta dialoguent avec splendeur sur un twill de soie d'une tenue remarquable.",
      seoTitle: "Carré de Soie 90cm Hermès Vintage | LOOP FASHION",
      seoDescription: "Carré de soie Hermès d'archive avec roulotté main. Teintes sauge et terracotta exclusives."
    }
  ];

  const defaultOrders = [
    {
      id: "LP-2026-9041",
      date: "04/10/2026, 14:22:00",
      customer: {
        firstName: "Camille",
        lastName: "Laurent",
        email: "camille.laurent@paris-mode.fr",
        phone: "+33 6 12 34 56 78"
      },
      shippingAddress: {
        street: "24 Rue de Turenne",
        postalCode: "75003",
        city: "Paris",
        country: "France"
      },
      shippingMethod: "colissimo",
      shippingCost: 0,
      total: 135,
      status: "Livrée",
      paymentMethod: "card",
      items: [
        {
          id: "lp-001",
          name: "Blazer en Laine Pied-de-Poule Vintage",
          price: 135,
          selectedSize: "38 (FR)",
          quantity: 1,
          images: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80"
          ]
        }
      ]
    }
  ];

  const seed = {
    products: defaultProducts,
    orders: defaultOrders,
    updatedAt: new Date().toISOString()
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2), 'utf-8');
  return seed;
}

let dbCache = initDatabase();

export function getDatabase() {
  if (!dbCache) {
    dbCache = initDatabase();
  }
  return dbCache;
}

export function saveDatabase(data) {
  data.updatedAt = new Date().toISOString();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  dbCache = data;
}

// Product operations
export function getAllProducts(includeUnpublished = false) {
  const db = getDatabase();
  if (includeUnpublished) {
    return db.products || [];
  }
  return (db.products || []).filter(p => p.isPublished !== false && p.status !== 'Brouillon');
}

export function getProductById(id) {
  const db = getDatabase();
  return (db.products || []).find(p => p.id === id);
}

export function getProductBySlug(slug) {
  const db = getDatabase();
  return (db.products || []).find(p => p.slug === slug);
}

export function createProduct(productData) {
  const db = getDatabase();
  const id = productData.id || `lp-${String(Date.now()).slice(-4)}`;
  const slug = productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const newProduct = {
    ...productData,
    id,
    slug,
    isPublished: productData.isPublished !== undefined ? productData.isPublished : true,
    status: productData.status || (productData.stock > 0 ? "Disponible" : "Épuisé"),
    createdAt: new Date().toISOString()
  };

  db.products = [newProduct, ...(db.products || [])];
  saveDatabase(db);
  return newProduct;
}

export function updateProduct(id, updates) {
  const db = getDatabase();
  const index = (db.products || []).findIndex(p => p.id === id);
  if (index === -1) return null;

  db.products[index] = {
    ...db.products[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  saveDatabase(db);
  return db.products[index];
}

export function deleteProduct(id) {
  const db = getDatabase();
  const initialLength = (db.products || []).length;
  db.products = (db.products || []).filter(p => p.id !== id);
  
  if (db.products.length !== initialLength) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export function toggleProductPublish(id) {
  const db = getDatabase();
  const product = (db.products || []).find(p => p.id === id);
  if (!product) return null;

  product.isPublished = !product.isPublished;
  if (!product.isPublished) {
    product.status = "Brouillon";
  } else if (product.status === "Brouillon") {
    product.status = product.stock > 0 ? "Disponible" : "Épuisé";
  }
  
  saveDatabase(db);
  return product;
}

// Order operations
export function getAllOrders() {
  const db = getDatabase();
  return db.orders || [];
}

export function createOrder(orderData) {
  const db = getDatabase();
  const orderId = orderData.id || `LP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const newOrder = {
    ...orderData,
    id: orderId,
    date: new Date().toLocaleString('fr-FR'),
    status: orderData.status || "En préparation",
    createdAt: new Date().toISOString()
  };

  // Adjust product stock for purchased unique items
  if (Array.isArray(orderData.items)) {
    orderData.items.forEach(item => {
      const prod = (db.products || []).find(p => p.id === item.id);
      if (prod && prod.isUnique) {
        prod.stock = Math.max(0, (prod.stock || 1) - 1);
        prod.status = prod.stock === 0 ? "Vendu" : prod.status;
      }
    });
  }

  db.orders = [newOrder, ...(db.orders || [])];
  saveDatabase(db);
  return newOrder;
}

export function updateOrderStatus(orderId, newStatus) {
  const db = getDatabase();
  const order = (db.orders || []).find(o => o.id === orderId);
  if (!order) return null;

  order.status = newStatus;
  order.updatedAt = new Date().toISOString();
  saveDatabase(db);
  return order;
}
