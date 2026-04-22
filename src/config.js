// White-label configuration
// Each business gets their own config. In production, this is fetched from Supabase by tenant slug.

const configs = {
  'institut-epilation': {
    businessName: "Institut d'Épilation Laser",
    slug: 'institut-epilation',
    tagline: 'Accumulez des points, obtenez des récompenses exclusives',
    logo: './logo-dark.png',
    logoLight: './logo.png',
    favicon: '💎',
    heroImage: './images/institut-epilation/laser.jpg',
    galleryImages: [
      './images/institut-epilation/epilation-femme.jpg',
      './images/institut-epilation/epilation-cire.jpg',
      './images/institut-epilation/epilation-homme.jpg',
      './images/institut-epilation/creme.jpg',
    ],
    // Points settings
    pointsPerDollar: 10,
    referralBonus: 75,
    visitBonus: 25,
    pointsLabel: 'Points fidélité',
    // Theme (overrides CSS variables)
    theme: {
      primary: '#32373c',
      primaryLight: '#4a5058',
      accent: '#C9A96E',
      accentLight: '#D4BA8A',
      accentDark: '#B08D4F',
      bg: '#FAFAF8',
      font: '"hero-new", system-ui, -apple-system, sans-serif',
    },
    // Rewards catalog
    rewards: [
      { id: 1, name: '10% rabais sur un service', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 2, name: '25$ de rabais', points_required: 500, type: 'discount_fixed', value: 25 },
      { id: 3, name: 'Épilation cire gratuite', points_required: 1000, type: 'free_service', value: 'cire', image: './images/institut-epilation/epilation-cire.jpg' },
      { id: 4, name: 'Séance laser gratuite', points_required: 2000, type: 'free_service', value: 'laser', image: './images/institut-epilation/laser.jpg' },
    ],
    // Referral message
    referralMessage: 'Rejoins le programme fidélité et obtiens 75 points gratuits!',
    // Contact
    phone: '418-555-0000',
    address: 'Québec, QC',
  },

  'la-peltrie': {
    businessName: 'La Peltrie',
    slug: 'la-peltrie',
    tagline: 'Accumulez des points à chaque visite, mangez gratuit!',
    logo: import.meta.env.BASE_URL + 'logos/la-peltrie.png',
    logoLight: import.meta.env.BASE_URL + 'logos/la-peltrie.png',
    favicon: '🍔',
    heroImage: import.meta.env.BASE_URL + 'images/la-peltrie/hero.jpg',
    galleryImages: [
      import.meta.env.BASE_URL + 'images/la-peltrie/sloppy-joe.png',
      import.meta.env.BASE_URL + 'images/la-peltrie/club-homard.png',
      import.meta.env.BASE_URL + 'images/la-peltrie/guedille-poulet.png',
    ],
    pointsPerDollar: 10,
    referralBonus: 75,
    visitBonus: 25,
    pointsLabel: 'Points Peltrie',
    theme: {
      primary: '#1a1a2e',
      primaryLight: '#2d2d44',
      accent: '#8c54ff',
      accentLight: '#a478ff',
      accentDark: '#6b3fd4',
      bg: '#FAFAF8',
      font: '"Oswald", system-ui, -apple-system, sans-serif',
    },
    rewards: [
      { id: 1, name: 'Poutine classique gratuite', points_required: 150, type: 'free_service', value: 'poutine' },
      { id: 2, name: '10% rabais sur la facture', points_required: 300, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Trio gratuit', points_required: 500, type: 'free_service', value: 'trio' },
      { id: 4, name: 'Repas pour 2 gratuit', points_required: 1000, type: 'free_service', value: 'repas2' },
    ],
    referralMessage: 'Rejoins le programme fidélité La Peltrie et obtiens 75 points gratuits!',
    phone: '(418) 651-0862',
    address: '4244 Rue St-Félix, Québec, G1Y 1X5',
  },

  'smith-cafe': {
    businessName: 'La Maison Smith',
    slug: 'smith-cafe',
    tagline: 'Accumulez des points à chaque café, récoltez les récompenses!',
    logo: import.meta.env.BASE_URL + 'logos/smith-cafe.png',
    logoLight: import.meta.env.BASE_URL + 'logos/smith-cafe.png',
    favicon: '☕',
    heroImage: import.meta.env.BASE_URL + 'images/smith-cafe/hero.jpg',
    galleryImages: [
      import.meta.env.BASE_URL + 'images/smith-cafe/torrefaction.jpg',
      import.meta.env.BASE_URL + 'images/smith-cafe/giselle.jpg',
    ],
    pointsPerDollar: 10,
    referralBonus: 75,
    visitBonus: 25,
    pointsLabel: 'Points Smith',
    theme: {
      primary: '#181818',
      primaryLight: '#333333',
      accent: '#a97f61',
      accentLight: '#be865c',
      accentDark: '#8a6545',
      bg: '#fdf1e2',
      font: '"Lora", "Montserrat", system-ui, sans-serif',
    },
    rewards: [
      { id: 1, name: 'Café gratuit', points_required: 100, type: 'free_service', value: 'cafe' },
      { id: 2, name: '10% rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Sac de café 340g gratuit', points_required: 500, type: 'free_service', value: 'sac' },
      { id: 4, name: 'Expérience torréfaction gratuite', points_required: 1000, type: 'free_service', value: 'torrefaction' },
    ],
    referralMessage: 'Rejoins le programme fidélité La Maison Smith et obtiens 75 points gratuits!',
    phone: '418-529-0096',
    address: 'Québec, QC',
  },

  // ====== PROSPECTS COLD OUTREACH ======

  'maelstrom': {
    businessName: 'Maelstrom', slug: 'maelstrom', tagline: 'Votre fidélité récompensée à chaque brunch', logo: null, logoLight: null, favicon: '☕',
    heroImage: './images/maelstrom/hero.webp',
    galleryImages: ['./images/maelstrom/interior.webp'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Maelstrom',
    theme: { primary: '#a66c4b', primaryLight: '#bf8a68', accent: '#d4a053', accentLight: '#e0b973', accentDark: '#b8843a', bg: '#fdf6ef', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Café gratuit', points_required: 100, type: 'free_service', value: 'cafe' },
      { id: 2, name: '10% rabais sur le brunch', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Brunch gratuit', points_required: 500, type: 'free_service', value: 'brunch' },
      { id: 4, name: 'Brunch pour 2 gratuit', points_required: 1000, type: 'free_service', value: 'brunch2' },
    ],
    referralMessage: 'Rejoins le programme fidélité Maelstrom et obtiens 75 points gratuits!',
    phone: '418-523-0700', address: 'Saint-Roch, Québec',
  },

  'clocher-penche': {
    businessName: 'Le Clocher Penché', slug: 'clocher-penche', tagline: 'Votre fidélité récompensée à chaque visite', logo: null, logoLight: null, favicon: '🍽️',
    heroImage: './images/clocher-penche/hero.jpg',
    galleryImages: ['./images/clocher-penche/food.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Clocher',
    theme: { primary: '#2c2c2c', primaryLight: '#444444', accent: '#c8a97e', accentLight: '#d9c0a0', accentDark: '#a88d62', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Cocktail offert', points_required: 150, type: 'free_service', value: 'cocktail' },
      { id: 2, name: '15% rabais sur le souper', points_required: 300, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Entrée gratuite', points_required: 500, type: 'free_service', value: 'entree' },
      { id: 4, name: 'Repas pour 2 offert', points_required: 1000, type: 'free_service', value: 'repas2' },
    ],
    referralMessage: 'Rejoins le programme fidélité Le Clocher Penché et obtiens 75 points gratuits!',
    phone: '418-640-0597', address: 'Saint-Roch, Québec',
  },

  'cantook': {
    businessName: 'Cantook Micro Torréfaction', slug: 'cantook', tagline: 'Accumulez des points à chaque café', logo: null, logoLight: null, favicon: '☕',
    heroImage: './images/cantook/hero.jpg',
    galleryImages: ['./images/cantook/roaster.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Cantook',
    theme: { primary: '#6d917d', primaryLight: '#88a895', accent: '#dd833e', accentLight: '#e69d63', accentDark: '#c06d2e', bg: '#fdf6ef', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Espresso gratuit', points_required: 100, type: 'free_service', value: 'espresso' },
      { id: 2, name: '10% rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Sac de café 340g gratuit', points_required: 500, type: 'free_service', value: 'sac' },
      { id: 4, name: 'Atelier torréfaction', points_required: 1000, type: 'free_service', value: 'atelier' },
    ],
    referralMessage: 'Rejoins Cantook et obtiens 75 points gratuits!',
    phone: '418-529-4769', address: 'Québec',
  },

  'boule-miche': {
    businessName: 'La Boule-Miche', slug: 'boule-miche', tagline: 'Votre boulangerie fidélité', logo: null, logoLight: null, favicon: '🥐',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Boule-Miche',
    theme: { primary: '#2b2b2b', primaryLight: '#444444', accent: '#d4a76a', accentLight: '#e0bb88', accentDark: '#b88d52', bg: '#fdf8f2', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Croissant gratuit', points_required: 100, type: 'free_service', value: 'croissant' },
      { id: 2, name: '10% rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Gâteau gratuit', points_required: 500, type: 'free_service', value: 'gateau' },
      { id: 4, name: 'Commande spéciale gratuite', points_required: 1000, type: 'free_service', value: 'special' },
    ],
    referralMessage: 'Rejoins La Boule-Miche et obtiens 75 points gratuits!',
    phone: '418-688-7538', address: 'Sainte-Foy, Québec',
  },

  'croquembouche': {
    businessName: 'Le Croquembouche', slug: 'croquembouche', tagline: 'Pâtisserie artisanale — fidélité récompensée', logo: null, logoLight: null, favicon: '🎂',
    heroImage: './images/croquembouche/hero.jpg',
    galleryImages: ['./images/croquembouche/lunch.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Croquembouche',
    theme: { primary: '#3b1a0e', primaryLight: '#5a2e1e', accent: '#e63323', accentLight: '#f05a4d', accentDark: '#c42818', bg: '#fdf6ef', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Pâtisserie gratuite', points_required: 100, type: 'free_service', value: 'patisserie' },
      { id: 2, name: '15% rabais traiteur', points_required: 300, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Boîte de macarons gratuite', points_required: 500, type: 'free_service', value: 'macarons' },
      { id: 4, name: 'Gâteau personnalisé offert', points_required: 1000, type: 'free_service', value: 'gateau' },
    ],
    referralMessage: 'Rejoins Le Croquembouche et obtiens 75 points!',
    phone: '418-523-9009', address: 'Saint-Roch, Québec',
  },

  'crossfit-saintefoy': {
    businessName: 'CrossFit Sainte-Foy', slug: 'crossfit-saintefoy', tagline: 'Votre effort récompensé à chaque WOD', logo: null, logoLight: null, favicon: '💪',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points CrossFit',
    theme: { primary: '#1a1a1a', primaryLight: '#333333', accent: '#e2001a', accentLight: '#ff3344', accentDark: '#b80015', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Drop-in gratuit pour un ami', points_required: 150, type: 'free_service', value: 'dropin' },
      { id: 2, name: 'T-shirt CrossFit', points_required: 300, type: 'free_service', value: 'tshirt' },
      { id: 3, name: 'Mois gratuit', points_required: 750, type: 'free_service', value: 'mois' },
      { id: 4, name: 'Personal training (1 session)', points_required: 1000, type: 'free_service', value: 'pt' },
    ],
    referralMessage: 'Rejoins CrossFit Sainte-Foy et obtiens 75 points gratuits!',
    phone: '418-914-6696', address: 'Sainte-Foy, Québec',
  },

  'tonic-gym': {
    businessName: 'Tonic Gym', slug: 'tonic-gym', tagline: 'Entraînez-vous, accumulez, récoltez', logo: null, logoLight: null, favicon: '🏋️',
    heroImage: './images/tonic-gym/hero.jpg',
    galleryImages: ['./images/tonic-gym/gym.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Tonic',
    theme: { primary: '#32373c', primaryLight: '#4a5058', accent: '#f5a623', accentLight: '#f7ba50', accentDark: '#d08c15', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Shake protéiné gratuit', points_required: 100, type: 'free_service', value: 'shake' },
      { id: 2, name: 'Invité gratuit (1 semaine)', points_required: 250, type: 'free_service', value: 'invite' },
      { id: 3, name: 'Mois gratuit', points_required: 500, type: 'free_service', value: 'mois' },
      { id: 4, name: 'Personal training (3 sessions)', points_required: 1000, type: 'free_service', value: 'pt3' },
    ],
    referralMessage: 'Rejoins Tonic Gym et obtiens 75 points gratuits!',
    phone: '418-260-9552', address: 'Québec',
  },

  'facteur23': {
    businessName: 'Gym Facteur 23', slug: 'facteur23', tagline: 'Votre effort compte — accumulez des points', logo: null, logoLight: null, favicon: '💪',
    heroImage: './images/facteur23/hero.jpeg',
    galleryImages: ['./images/facteur23/gym.jpeg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points F23',
    theme: { primary: '#ff2121', primaryLight: '#ff5050', accent: '#32373c', accentLight: '#4a5058', accentDark: '#1e2226', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Shake gratuit', points_required: 100, type: 'free_service', value: 'shake' },
      { id: 2, name: '10% rabais abonnement', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Mois gratuit', points_required: 500, type: 'free_service', value: 'mois' },
      { id: 4, name: 'Programme personnalisé', points_required: 1000, type: 'free_service', value: 'programme' },
    ],
    referralMessage: 'Rejoins Facteur 23 et obtiens 75 points!',
    phone: '418-833-0023', address: 'Lévis',
  },

  'cite-sportive': {
    businessName: 'Cité Sportive', slug: 'cite-sportive', tagline: 'Fitness, tennis, récompenses', logo: null, logoLight: null, favicon: '🎾',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Cité',
    theme: { primary: '#1fd3c0', primaryLight: '#4de0d0', accent: '#6370a7', accentLight: '#828dba', accentDark: '#4e5a8c', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Cours gratuit', points_required: 150, type: 'free_service', value: 'cours' },
      { id: 2, name: 'Heure de tennis gratuite', points_required: 300, type: 'free_service', value: 'tennis' },
      { id: 3, name: '15% rabais abonnement', points_required: 500, type: 'discount_percent', value: 15 },
      { id: 4, name: 'Mois gratuit', points_required: 1000, type: 'free_service', value: 'mois' },
    ],
    referralMessage: 'Rejoins Cité Sportive et obtiens 75 points!',
    phone: '418-833-7884', address: 'Lévis',
  },

  'nube-pilates': {
    businessName: 'Nube Pilates', slug: 'nube-pilates', tagline: 'Votre bien-être récompensé', logo: null, logoLight: null, favicon: '🧘',
    heroImage: './images/nube-pilates/hero.png',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Nube',
    theme: { primary: '#c95a16', primaryLight: '#e0742e', accent: '#000000', accentLight: '#333333', accentDark: '#000000', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Cours gratuit', points_required: 150, type: 'free_service', value: 'cours' },
      { id: 2, name: '10% rabais forfait', points_required: 300, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Forfait 5 cours gratuit', points_required: 750, type: 'free_service', value: 'forfait5' },
      { id: 4, name: 'Mois illimité gratuit', points_required: 1500, type: 'free_service', value: 'illimite' },
    ],
    referralMessage: 'Rejoins Nube Pilates et obtiens 75 points!',
    phone: '418-871-0369', address: 'Québec',
  },

  'poze-studio': {
    businessName: 'Poze Pilates Studio', slug: 'poze-studio', tagline: 'Pilates, barre, yoga — fidélité récompensée', logo: null, logoLight: null, favicon: '🧘',
    heroImage: './images/poze-studio/hero.jpg',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Poze',
    theme: { primary: '#000000', primaryLight: '#222222', accent: '#d4838f', accentLight: '#e09da7', accentDark: '#b86b76', bg: '#fdf6f7', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Cours gratuit', points_required: 150, type: 'free_service', value: 'cours' },
      { id: 2, name: '10% rabais forfait', points_required: 300, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Forfait 5 cours', points_required: 750, type: 'free_service', value: 'forfait5' },
    ],
    referralMessage: 'Rejoins Poze Studio et obtiens 75 points!',
    phone: '', address: 'Montcalm, Québec',
  },

  'sento-spa': {
    businessName: 'Sento Spa', slug: 'sento-spa', tagline: 'Votre bien-être, nos récompenses', logo: null, logoLight: null, favicon: '♨️',
    heroImage: './images/sento-spa/hero.jpg',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Sento',
    theme: { primary: '#1a1a1a', primaryLight: '#333333', accent: '#d4af37', accentLight: '#e0c35c', accentDark: '#b8962e', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Accès thermique offert', points_required: 200, type: 'free_service', value: 'acces' },
      { id: 2, name: '15% rabais massage', points_required: 400, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Massage 60 min gratuit', points_required: 750, type: 'free_service', value: 'massage' },
      { id: 4, name: 'Forfait détente pour 2', points_required: 1500, type: 'free_service', value: 'forfait2' },
    ],
    referralMessage: 'Rejoins Sento Spa et obtiens 75 points!',
    phone: '418-988-1730', address: 'Lévis',
  },

  'la-source': {
    businessName: 'Centre de Santé La Source', slug: 'la-source', tagline: 'Massothérapie et bien-être — fidélité récompensée', logo: null, logoLight: null, favicon: '💆',
    heroImage: './images/la-source/hero.jpg',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points La Source',
    theme: { primary: '#21A46D', primaryLight: '#3bb883', accent: '#35C687', accentLight: '#5dd6a0', accentDark: '#28a770', bg: '#f5faf5', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: '10% rabais massage', points_required: 200, type: 'discount_percent', value: 10 },
      { id: 2, name: 'Soin gratuit', points_required: 400, type: 'free_service', value: 'soin' },
      { id: 3, name: 'Massage 60 min gratuit', points_required: 750, type: 'free_service', value: 'massage' },
      { id: 4, name: 'Forfait bien-être complet', points_required: 1500, type: 'free_service', value: 'forfait' },
    ],
    referralMessage: 'Rejoins La Source et obtiens 75 points!',
    phone: '418-872-3020', address: 'Sainte-Foy, Québec',
  },

  'pur-visage': {
    businessName: 'Esthétique Pur Visage', slug: 'pur-visage', tagline: 'Soins du visage — fidélité récompensée', logo: null, logoLight: null, favicon: '✨',
    heroImage: './images/pur-visage/hero.jpg',
    galleryImages: ['./images/pur-visage/interior.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Pur Visage',
    theme: { primary: '#2e2630', primaryLight: '#483d4c', accent: '#c5a47e', accentLight: '#d4b99a', accentDark: '#a88b64', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: '10% rabais soin', points_required: 200, type: 'discount_percent', value: 10 },
      { id: 2, name: 'Soin visage express gratuit', points_required: 400, type: 'free_service', value: 'express' },
      { id: 3, name: 'Soin complet gratuit', points_required: 750, type: 'free_service', value: 'complet' },
      { id: 4, name: 'Forfait beauté VIP', points_required: 1500, type: 'free_service', value: 'vip' },
    ],
    referralMessage: 'Rejoins Pur Visage et obtiens 75 points!',
    phone: '418-650-0309', address: 'Sainte-Foy, Québec',
  },

  'pascal-boulanger': {
    businessName: 'Pascal Le Boulanger', slug: 'pascal-boulanger', tagline: 'Pain artisanal — fidélité récompensée', logo: null, logoLight: null, favicon: '🍞',
    heroImage: './images/pascal-boulanger/hero.jpg',
    galleryImages: ['./images/pascal-boulanger/four.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Pascal',
    theme: { primary: '#59291d', primaryLight: '#743d2e', accent: '#d0a863', accentLight: '#dbbe84', accentDark: '#b38e4d', bg: '#fdf6ef', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Pain gratuit', points_required: 100, type: 'free_service', value: 'pain' },
      { id: 2, name: '10% rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Boîte viennoiseries gratuite', points_required: 500, type: 'free_service', value: 'viennoiseries' },
      { id: 4, name: 'Commande spéciale offerte', points_required: 1000, type: 'free_service', value: 'special' },
    ],
    referralMessage: 'Rejoins Pascal Le Boulanger et obtiens 75 points!',
    phone: '418-912-8501', address: 'Stoneham',
  },

  'spa-infinima': {
    businessName: 'Spa Infinima', slug: 'spa-infinima', tagline: 'Détente et fidélité', logo: null, logoLight: null, favicon: '🧖',
    heroImage: './images/spa-infinima/hero.jpg',
    galleryImages: ['./images/spa-infinima/bains.png'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Infinima',
    theme: { primary: '#345C00', primaryLight: '#4a7a15', accent: '#9DFF20', accentLight: '#b3ff55', accentDark: '#7fd010', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: '10% rabais soin', points_required: 200, type: 'discount_percent', value: 10 },
      { id: 2, name: 'Massage 30 min gratuit', points_required: 400, type: 'free_service', value: 'massage30' },
      { id: 3, name: 'Massage 60 min gratuit', points_required: 750, type: 'free_service', value: 'massage60' },
      { id: 4, name: 'Forfait détente complet', points_required: 1500, type: 'free_service', value: 'forfait' },
    ],
    referralMessage: 'Rejoins Spa Infinima et obtiens 75 points!',
    phone: '418-651-0001', address: 'Sainte-Foy, Québec',
  },

  'studio-bella': {
    businessName: 'Studio Bella', slug: 'studio-bella', tagline: 'Esthétique — votre beauté récompensée', logo: null, logoLight: null, favicon: '💅',
    heroImage: './images/studio-bella/hero.jpg',
    galleryImages: ['./images/studio-bella/cils.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Bella',
    theme: { primary: '#f00a77', primaryLight: '#ff3d95', accent: '#333333', accentLight: '#555555', accentDark: '#1a1a1a', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: '10% rabais soin', points_required: 200, type: 'discount_percent', value: 10 },
      { id: 2, name: 'Soin express gratuit', points_required: 400, type: 'free_service', value: 'express' },
      { id: 3, name: 'Soin complet gratuit', points_required: 750, type: 'free_service', value: 'complet' },
    ],
    referralMessage: 'Rejoins Studio Bella et obtiens 75 points!',
    phone: '418-914-4413', address: 'Sainte-Foy, Québec',
  },

  'esthetique-mimosa': {
    businessName: 'Esthétique Mimosa', slug: 'esthetique-mimosa', tagline: 'Soins esthétiques — fidélité récompensée', logo: null, logoLight: null, favicon: '🌸',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Mimosa',
    theme: { primary: '#2a2535', primaryLight: '#453e50', accent: '#d4a0c0', accentLight: '#e0b4cf', accentDark: '#b885a5', bg: '#fdf5fa', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: '10% rabais soin', points_required: 200, type: 'discount_percent', value: 10 },
      { id: 2, name: 'Soin visage gratuit', points_required: 400, type: 'free_service', value: 'visage' },
      { id: 3, name: '50$ de rabais', points_required: 750, type: 'discount_fixed', value: 50 },
    ],
    referralMessage: 'Rejoins Esthétique Mimosa et obtiens 75 points!',
    phone: '418-653-2333', address: 'Sainte-Foy, Québec',
  },

  'la-planque': {
    businessName: 'La Planque', slug: 'la-planque', tagline: 'Votre fidélité récompensée à chaque repas', logo: null, logoLight: null, favicon: '🍷',
    heroImage: './images/la-planque/hero.png',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Planque',
    theme: { primary: '#064d53', primaryLight: '#0a6e76', accent: '#a03610', accentLight: '#c44d25', accentDark: '#7d2a0c', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Dessert gratuit', points_required: 150, type: 'free_service', value: 'dessert' },
      { id: 2, name: '15% rabais', points_required: 300, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Entrée + dessert gratuits', points_required: 500, type: 'free_service', value: 'combo' },
      { id: 4, name: 'Repas pour 2 offert', points_required: 1000, type: 'free_service', value: 'repas2' },
    ],
    referralMessage: 'Rejoins La Planque et obtiens 75 points!',
    phone: '418-914-8780', address: 'Limoilou, Québec',
  },

  'emporium': {
    businessName: 'Emporium Microbrasserie', slug: 'emporium', tagline: 'Bière artisanale et pizza — fidélité récompensée', logo: null, logoLight: null, favicon: '🍺',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Emporium',
    theme: { primary: '#1a1a1a', primaryLight: '#333333', accent: '#d4af37', accentLight: '#e0c35c', accentDark: '#b8962e', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Pinte gratuite', points_required: 100, type: 'free_service', value: 'pinte' },
      { id: 2, name: '10% rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Pizza gratuite', points_required: 500, type: 'free_service', value: 'pizza' },
      { id: 4, name: 'Soirée pour 4 offerte', points_required: 1000, type: 'free_service', value: 'soiree4' },
    ],
    referralMessage: 'Rejoins Emporium et obtiens 75 points!',
    phone: '418-204-0514', address: 'Charlesbourg, Québec',
  },

  // ====== BATCH 2 — COLD OUTREACH ======

  'tatouage-toutankhamon': {
    businessName: 'Tatouage Toutankhamon', slug: 'tatouage-toutankhamon', tagline: 'Votre fidélité encrée', logo: null, logoLight: null, favicon: '🖤',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Encre',
    theme: { primary: '#1a1a1a', primaryLight: '#333', accent: '#c0392b', accentLight: '#e74c3c', accentDark: '#a02e22', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: '10% rabais tatouage', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 2, name: 'Piercing gratuit', points_required: 500, type: 'free_service', value: 'piercing' },
      { id: 3, name: '50$ de rabais', points_required: 750, type: 'discount_fixed', value: 50 },
      { id: 4, name: '1h de tatouage gratuit', points_required: 1500, type: 'free_service', value: 'tattoo1h' },
    ],
    referralMessage: 'Rejoins Toutankhamon et obtiens 75 points!',
    phone: '', address: 'Vieux-Québec',
  },

  'paradoxe-tatouage': {
    businessName: 'ParadoXe Tatouage', slug: 'paradoxe-tatouage', tagline: 'Chaque encre compte', logo: null, logoLight: null, favicon: '🖤',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points ParadoXe',
    theme: { primary: '#0d0d0d', primaryLight: '#2a2a2a', accent: '#8b5cf6', accentLight: '#a78bfa', accentDark: '#7c3aed', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: '10% rabais tatouage', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 2, name: '50$ de rabais', points_required: 500, type: 'discount_fixed', value: 50 },
      { id: 3, name: '1h de tatouage gratuit', points_required: 1000, type: 'free_service', value: 'tattoo1h' },
    ],
    referralMessage: 'Rejoins ParadoXe et obtiens 75 points!',
    phone: '', address: 'Sainte-Foy, Québec',
  },

  'atomik-tattoo': {
    businessName: 'Atomik Tattoo', slug: 'atomik-tattoo', tagline: 'Fidélité explosive', logo: null, logoLight: null, favicon: '⚡',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Atomik',
    theme: { primary: '#1a1a1a', primaryLight: '#333', accent: '#22c55e', accentLight: '#4ade80', accentDark: '#16a34a', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: '10% rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 2, name: 'Bijou piercing gratuit', points_required: 500, type: 'free_service', value: 'bijou' },
      { id: 3, name: '1h de tatouage gratuit', points_required: 1000, type: 'free_service', value: 'tattoo1h' },
    ],
    referralMessage: 'Rejoins Atomik et obtiens 75 points!',
    phone: '', address: 'Québec',
  },

  'saint-paul-tattoo': {
    businessName: 'Saint-Paul Tattoo', slug: 'saint-paul-tattoo', tagline: 'Art sur peau — fidélité récompensée', logo: null, logoLight: null, favicon: '🖤',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points SP',
    theme: { primary: '#111', primaryLight: '#2a2a2a', accent: '#d97706', accentLight: '#f59e0b', accentDark: '#b45309', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: '10% rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 2, name: '50$ de rabais', points_required: 500, type: 'discount_fixed', value: 50 },
      { id: 3, name: '1h gratuite', points_required: 1000, type: 'free_service', value: 'tattoo1h' },
    ],
    referralMessage: 'Rejoins Saint-Paul Tattoo et obtiens 75 points!',
    phone: '', address: 'Vieux-Québec',
  },

  'fringuee-et-futee': {
    businessName: 'Fringuée et Futée', slug: 'fringuee-et-futee', tagline: 'Mode locale — fidélité récompensée', logo: null, logoLight: null, favicon: '👗',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Fringue',
    theme: { primary: '#2d2d2d', primaryLight: '#444', accent: '#ec4899', accentLight: '#f472b6', accentDark: '#db2777', bg: '#fdf5f9', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: '10% rabais', points_required: 200, type: 'discount_percent', value: 10 },
      { id: 2, name: '25$ de rabais', points_required: 400, type: 'discount_fixed', value: 25 },
      { id: 3, name: 'Accessoire gratuit', points_required: 600, type: 'free_service', value: 'accessoire' },
      { id: 4, name: '50$ de rabais', points_required: 1000, type: 'discount_fixed', value: 50 },
    ],
    referralMessage: 'Rejoins Fringuée et Futée et obtiens 75 points!',
    phone: '', address: 'Québec',
  },

  'chez-on-danse': {
    businessName: 'Chez On Danse!', slug: 'chez-on-danse', tagline: 'Dansez, accumulez, récoltez', logo: null, logoLight: null, favicon: '💃',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Danse',
    theme: { primary: '#1a1a2e', primaryLight: '#2d2d44', accent: '#e63946', accentLight: '#f06070', accentDark: '#c42d39', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Cours gratuit', points_required: 150, type: 'free_service', value: 'cours' },
      { id: 2, name: '10% rabais session', points_required: 300, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Forfait 5 cours', points_required: 750, type: 'free_service', value: 'forfait5' },
    ],
    referralMessage: 'Rejoins Chez On Danse et obtiens 75 points!',
    phone: '', address: 'Sainte-Foy, Québec',
  },

  'studio-dependance': {
    businessName: 'Studio DepenDance', slug: 'studio-dependance', tagline: 'La danse, une dépendance récompensée', logo: null, logoLight: null, favicon: '🩰',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Danse',
    theme: { primary: '#2a2040', primaryLight: '#3d3058', accent: '#a855f7', accentLight: '#c084fc', accentDark: '#9333ea', bg: '#faf5ff', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Cours gratuit', points_required: 150, type: 'free_service', value: 'cours' },
      { id: 2, name: '10% rabais forfait', points_required: 300, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Session privée gratuite', points_required: 750, type: 'free_service', value: 'prive' },
    ],
    referralMessage: 'Rejoins Studio DepenDance et obtiens 75 points!',
    phone: '', address: 'Québec',
  },

  'fromagerie-les-rivieres': {
    businessName: 'Fromagerie Les Rivières', slug: 'fromagerie-les-rivieres', tagline: 'Fromages d\'ici — fidélité récompensée', logo: null, logoLight: null, favicon: '🧀',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Fromage',
    theme: { primary: '#3c2a1a', primaryLight: '#5a4030', accent: '#d4a033', accentLight: '#e0b44d', accentDark: '#b8882a', bg: '#fdf6ef', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Fromage du jour gratuit', points_required: 100, type: 'free_service', value: 'fromage' },
      { id: 2, name: '10% rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Plateau dégustation gratuit', points_required: 500, type: 'free_service', value: 'plateau' },
    ],
    referralMessage: 'Rejoins la Fromagerie Les Rivières et obtiens 75 points!',
    phone: '', address: 'Les Rivières, Québec',
  },

  'madame-alice-fleuriste': {
    businessName: 'Madame Alice Fleuriste', slug: 'madame-alice-fleuriste', tagline: 'Fleurs fraîches — fidélité fleurie', logo: null, logoLight: null, favicon: '💐',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Fleurs',
    theme: { primary: '#2a3a2a', primaryLight: '#3d5040', accent: '#e891a8', accentLight: '#f0a8bc', accentDark: '#d47890', bg: '#fdf5f7', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Bouquet express gratuit', points_required: 200, type: 'free_service', value: 'bouquet' },
      { id: 2, name: '15% rabais', points_required: 400, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Arrangement floral gratuit', points_required: 750, type: 'free_service', value: 'arrangement' },
    ],
    referralMessage: 'Rejoins Madame Alice et obtiens 75 points!',
    phone: '', address: 'Limoilou, Québec',
  },

  'les-halles-en-fleurs': {
    businessName: 'Les Halles en Fleurs', slug: 'les-halles-en-fleurs', tagline: 'Votre fleuriste fidélité', logo: null, logoLight: null, favicon: '🌺',
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Halles',
    theme: { primary: '#2d3a2d', primaryLight: '#405040', accent: '#d4637a', accentLight: '#e0808f', accentDark: '#b84d63', bg: '#fdf5f6', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Rose gratuite', points_required: 100, type: 'free_service', value: 'rose' },
      { id: 2, name: '10% rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Bouquet gratuit', points_required: 500, type: 'free_service', value: 'bouquet' },
    ],
    referralMessage: 'Rejoins Les Halles en Fleurs et obtiens 75 points!',
    phone: '', address: 'Montcalm, Québec',
  },

  'cafe-vieux-cap-rouge': {
    businessName: 'Cafe Vieux-Cap-Rouge', slug: 'cafe-vieux-cap-rouge', tagline: 'Votre cafe fidele, 24h/24', logo: null, logoLight: null, favicon: '☕',
    heroImage: './images/cafe-vieux-cap-rouge/hero.png',
    galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Cafe',
    theme: { primary: '#E85420', primaryLight: '#F06830', accent: '#5D4037', accentLight: '#795548', accentDark: '#3E2723', bg: '#FFF5F0', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Cafe gratuit', points_required: 100, type: 'free_service', value: 'cafe' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Dejeuner gratuit', points_required: 500, type: 'free_service', value: 'dejeuner' },
      { id: 4, name: '25$ de credit', points_required: 1000, type: 'free_service', value: 'credit25' },
    ],
    referralMessage: 'Rejoins le programme fidelite Cafe Vieux-Cap-Rouge et obtiens 75 points gratuits!',
    phone: '418-653-3969', address: '1487 Rue Provancher Local 104, Quebec',
  },

  'fendel-lilo': {
    businessName: 'Fendel & Lilo', slug: 'fendel-lilo', tagline: 'Cheesecakes, patisseries et gourmandises', logo: './images/fendel-lilo/logo.png', logoLight: null, favicon: '🍰',
    heroImage: './images/fendel-lilo/hero.png',
    galleryImages: ['./images/fendel-lilo/food.png'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Fendel',
    theme: { primary: '#E8A0BF', primaryLight: '#F0BCD4', accent: '#D4A76A', accentLight: '#E0BB88', accentDark: '#B88D52', bg: '#FFF5F9', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Mini cheesecake gratuit', points_required: 100, type: 'free_service', value: 'mini' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Cheesecake entier gratuit', points_required: 500, type: 'free_service', value: 'cheesecake' },
      { id: 4, name: '30$ de credit', points_required: 1000, type: 'free_service', value: 'credit30' },
    ],
    referralMessage: 'Rejoins le programme fidelite Fendel & Lilo et obtiens 75 points gratuits!',
    phone: '418-478-3039', address: '955 Rte Jean-Gauvin, Quebec',
  },

  'ramona-tannous': {
    businessName: 'Patisserie Ramona Tannous', slug: 'ramona-tannous', tagline: 'Patisseries artisanales depuis 30 ans', logo: './images/ramona-tannous/logo.png', logoLight: './images/ramona-tannous/logo.png', favicon: '🥐',
    heroImage: './images/ramona-tannous/food.jpg',
    galleryImages: ['./images/ramona-tannous/exterior.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Ramona',
    theme: { primary: '#8B4513', primaryLight: '#A0522D', accent: '#D4A76A', accentLight: '#E0BB88', accentDark: '#B88D52', bg: '#FDF6EF', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Patisserie gratuite', points_required: 100, type: 'free_service', value: 'patisserie' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Gateau gratuit', points_required: 500, type: 'free_service', value: 'gateau' },
      { id: 4, name: '30$ de credit', points_required: 1000, type: 'free_service', value: 'credit30' },
    ],
    referralMessage: 'Rejoins le programme fidelite Patisserie Ramona Tannous et obtiens 75 points gratuits!',
    phone: '418-877-4691', address: '3583 Rue de l\'Hetriere, Saint-Augustin-de-Desmaures',
  },

  'boulangerie-bonneau': {
    businessName: 'Boulangerie Bonneau', slug: 'boulangerie-bonneau', tagline: 'Pains et patisseries artisanales', logo: null, logoLight: null, favicon: '🍞',
    heroImage: './images/boulangerie-bonneau/food1.jpg', galleryImages: ['./images/boulangerie-bonneau/interior1.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Bonneau',
    theme: { primary: '#8B6914', primaryLight: '#A07D1A', accent: '#D4A76A', accentLight: '#E0BB88', accentDark: '#B88D52', bg: '#FDF6EF', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Croissant gratuit', points_required: 100, type: 'free_service', value: 'croissant' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Pain artisanal gratuit', points_required: 500, type: 'free_service', value: 'pain' },
      { id: 4, name: '25$ de credit', points_required: 1000, type: 'free_service', value: 'credit25' },
    ],
    referralMessage: 'Rejoins Boulangerie Bonneau et obtiens 75 points gratuits!',
    phone: '418-650-2600', address: '1099 Bd de la Chaudiere, Cap-Rouge',
  },

  'paillard-cap-rouge': {
    businessName: 'Paillard', slug: 'paillard-cap-rouge', tagline: 'Boulangerie-patisserie artisanale', logo: './images/paillard-cap-rouge/logo.png', logoLight: './images/paillard-cap-rouge/logo.png', favicon: '🥖',
    heroImage: './images/paillard-cap-rouge/food.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Paillard',
    theme: { primary: '#1A1A1A', primaryLight: '#333333', accent: '#C8A97E', accentLight: '#D9C0A0', accentDark: '#A88D62', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Cafe gratuit', points_required: 100, type: 'free_service', value: 'cafe' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Pizza gratuite', points_required: 500, type: 'free_service', value: 'pizza' },
      { id: 4, name: '30$ de credit', points_required: 1000, type: 'free_service', value: 'credit30' },
    ],
    referralMessage: 'Rejoins Paillard et obtiens 75 points gratuits!',
    phone: '', address: 'Cap-Rouge, Quebec',
  },

  'patisserie-de-la-gare': {
    businessName: 'Patisserie De La Gare', slug: 'patisserie-de-la-gare', tagline: 'Patisseries fines', logo: './images/patisserie-de-la-gare/logo.jpg', logoLight: './images/patisserie-de-la-gare/logo.jpg', favicon: '🎂',
    heroImage: './images/patisserie-de-la-gare/food1.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points La Gare',
    theme: { primary: '#C2185B', primaryLight: '#E91E63', accent: '#F06292', accentLight: '#F8BBD0', accentDark: '#AD1457', bg: '#FFF5F8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Patisserie gratuite', points_required: 100, type: 'free_service', value: 'patisserie' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Boite de patisseries', points_required: 500, type: 'free_service', value: 'boite' },
      { id: 4, name: '25$ de credit', points_required: 1000, type: 'free_service', value: 'credit25' },
    ],
    referralMessage: 'Rejoins Patisserie De La Gare et obtiens 75 points gratuits!',
    phone: '', address: '2900 Ch. Des Quatre-Bourgeois, Cap-Rouge',
  },

  'concept-beaute': {
    businessName: 'Concept Beaute Signature', slug: 'concept-beaute', tagline: 'Coiffure et soins beaute', logo: './images/concept-beaute/logo.png', logoLight: './images/concept-beaute/logo.png', favicon: '💇',
    heroImage: './images/concept-beaute/service.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Beaute',
    theme: { primary: '#B8860B', primaryLight: '#DAA520', accent: '#D4A76A', accentLight: '#E0BB88', accentDark: '#B88D52', bg: '#FDF8F0', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Soin mains gratuit', points_required: 150, type: 'free_service', value: 'mains' },
      { id: 2, name: '15% de rabais', points_required: 300, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Coupe gratuite', points_required: 500, type: 'free_service', value: 'coupe' },
      { id: 4, name: 'Soin complet gratuit', points_required: 1000, type: 'free_service', value: 'soin' },
    ],
    referralMessage: 'Rejoins Concept Beaute Signature et obtiens 75 points gratuits!',
    phone: '418-877-4198', address: '990 Bd de la Chaudiere, Cap-Rouge',
  },

  'pro-coiffure': {
    businessName: 'Pro Coiffure', slug: 'pro-coiffure', tagline: 'Coiffure et esthetique', logo: './images/pro-coiffure/logo.png', logoLight: './images/pro-coiffure/logo.png', favicon: '✂️',
    heroImage: './images/pro-coiffure/slider.png', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Pro',
    theme: { primary: '#2C3E50', primaryLight: '#34495E', accent: '#3498DB', accentLight: '#5DADE2', accentDark: '#2980B9', bg: '#F5F7FA', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Produit capillaire gratuit', points_required: 150, type: 'free_service', value: 'produit' },
      { id: 2, name: '15% de rabais', points_required: 300, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Coupe gratuite', points_required: 500, type: 'free_service', value: 'coupe' },
      { id: 4, name: 'Coloration gratuite', points_required: 1000, type: 'free_service', value: 'coloration' },
    ],
    referralMessage: 'Rejoins Pro Coiffure et obtiens 75 points gratuits!',
    phone: '581-994-6867', address: '1070 Bd Chaudiere Local 110B, Cap-Rouge',
  },

  'coiffure-synergie': {
    businessName: 'Coiffure Synergie', slug: 'coiffure-synergie', tagline: 'Coiffure, esthetique et bronzage', logo: null, logoLight: null, favicon: '💈',
    heroImage: './images/coiffure-synergie/hero.png', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Synergie',
    theme: { primary: '#6B4E5E', primaryLight: '#8A6878', accent: '#E8C4C0', accentLight: '#F0D5D2', accentDark: '#C4868B', bg: '#F9F5F7', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Produit gratuit', points_required: 150, type: 'free_service', value: 'produit' },
      { id: 2, name: '15% de rabais', points_required: 300, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Coupe gratuite', points_required: 500, type: 'free_service', value: 'coupe' },
      { id: 4, name: 'Forfait complet gratuit', points_required: 1000, type: 'free_service', value: 'forfait' },
    ],
    referralMessage: 'Rejoins Coiffure Synergie et obtiens 75 points gratuits!',
    phone: '', address: 'Cap-Rouge, Quebec',
  },

  'le-cafeier': {
    businessName: 'Boutique Le Cafeier', slug: 'le-cafeier', tagline: 'Cafes, thes et gourmandises depuis 1992', logo: './images/le-cafeier/logo.jpg', logoLight: './images/le-cafeier/logo.jpg', favicon: '☕',
    heroImage: './images/le-cafeier/store.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Cafeier',
    theme: { primary: '#5D4037', primaryLight: '#795548', accent: '#D4A76A', accentLight: '#E0BB88', accentDark: '#B88D52', bg: '#FDF6EF', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Cafe gratuit', points_required: 100, type: 'free_service', value: 'cafe' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Sac de cafe gratuit', points_required: 500, type: 'free_service', value: 'sac' },
      { id: 4, name: '25$ de credit', points_required: 1000, type: 'free_service', value: 'credit25' },
    ],
    referralMessage: 'Rejoins Le Cafeier et obtiens 75 points gratuits!',
    phone: '418-871-9304', address: '811 Route Jean Gauvin, Cap-Rouge',
  },

  'les-bruleries': {
    businessName: 'Les Bruleries', slug: 'les-bruleries', tagline: 'Micro-torrefacteur artisanal', logo: './images/les-bruleries/logo.png', logoLight: './images/les-bruleries/logo.png', favicon: '☕',
    heroImage: './images/les-bruleries/latte.png', galleryImages: ['./images/les-bruleries/ambiance.png'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Bruleries',
    theme: { primary: '#3E2723', primaryLight: '#5D4037', accent: '#8D6E63', accentLight: '#A1887F', accentDark: '#6D4C41', bg: '#EFEBE9', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Espresso gratuit', points_required: 100, type: 'free_service', value: 'espresso' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Sac de cafe 340g gratuit', points_required: 500, type: 'free_service', value: 'sac' },
      { id: 4, name: 'Atelier degustation', points_required: 1000, type: 'free_service', value: 'atelier' },
    ],
    referralMessage: 'Rejoins Les Bruleries et obtiens 75 points gratuits!',
    phone: '', address: 'Sainte-Foy, Quebec',
  },

  'brulerie-rousseau': {
    businessName: 'Brulerie Rousseau', slug: 'brulerie-rousseau', tagline: 'Expert en cafe depuis 1867', logo: null, logoLight: null, favicon: '☕',
    heroImage: './images/brulerie-rousseau/hero.jpg', galleryImages: ['./images/brulerie-rousseau/founders.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Rousseau',
    theme: { primary: '#6D4C41', primaryLight: '#8D6E63', accent: '#A1887F', accentLight: '#BCAAA4', accentDark: '#5D4037', bg: '#FBF5F0', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Cafe gratuit', points_required: 100, type: 'free_service', value: 'cafe' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Sac de cafe gratuit', points_required: 500, type: 'free_service', value: 'sac' },
      { id: 4, name: '30$ de credit', points_required: 1000, type: 'free_service', value: 'credit30' },
    ],
    referralMessage: 'Rejoins Brulerie Rousseau et obtiens 75 points gratuits!',
    phone: '418-659-7786', address: 'Halles Sainte-Foy, Quebec',
  },

  'philtre-cafe': {
    businessName: 'Philtre Café', slug: 'philtre-cafe', tagline: 'Café de spécialité, végétarien et sans gluten', logo: null, logoLight: null, favicon: '☕',
    heroImage: './images/philtre-cafe/interior.jpg', galleryImages: ['./images/philtre-cafe/latte.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Philtre',
    theme: { primary: '#E8C4C0', primaryLight: '#F0D5D2', accent: '#2C3E50', accentLight: '#34495E', accentDark: '#1A252F', bg: '#FDF8F7', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Café gratuit', points_required: 100, type: 'free_service', value: 'cafe' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Lunch gratuit', points_required: 500, type: 'free_service', value: 'lunch' },
      { id: 4, name: '25$ de crédit', points_required: 1000, type: 'free_service', value: 'credit25' },
    ],
    referralMessage: 'Rejoins Philtre Café et obtiens 75 points gratuits!',
    phone: '', address: '1467 rue Esther-Blondin, Cap-Rouge',
  },

  'clinique-foglia': {
    businessName: 'Clinique Foglia', slug: 'clinique-foglia', tagline: 'Esthétique et massothérapie', logo: null, logoLight: null, favicon: '💆',
    heroImage: './images/clinique-foglia/visage.jpg', galleryImages: ['./images/clinique-foglia/salon.jpg', './images/clinique-foglia/reception.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Foglia',
    theme: { primary: '#8E7CC3', primaryLight: '#A899D6', accent: '#B39DDB', accentLight: '#CE93D8', accentDark: '#7B1FA2', bg: '#F9F5FF', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Soin mains gratuit', points_required: 150, type: 'free_service', value: 'mains' },
      { id: 2, name: '15% de rabais', points_required: 300, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Soin visage gratuit', points_required: 600, type: 'free_service', value: 'visage' },
      { id: 4, name: 'Massage 60min gratuit', points_required: 1200, type: 'free_service', value: 'massage' },
    ],
    referralMessage: 'Rejoins Clinique Foglia et obtiens 75 points gratuits!',
    phone: '', address: 'Rue du Campanile, Sainte-Foy',
  },

  'salons-darbourg': {
    businessName: 'Salons Darbourg', slug: 'salons-darbourg', tagline: 'Coiffure et esthétique', logo: './images/salons-darbourg/logo.png', logoLight: './images/salons-darbourg/logo.png', favicon: '✂️',
    heroImage: './images/salons-darbourg/service.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Darbourg',
    theme: { primary: '#1C1C1C', primaryLight: '#333', accent: '#D4A76A', accentLight: '#E0BB88', accentDark: '#B88D52', bg: '#FDF8F0', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Produit gratuit', points_required: 150, type: 'free_service', value: 'produit' },
      { id: 2, name: '15% de rabais', points_required: 300, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Soin esthétique gratuit', points_required: 500, type: 'free_service', value: 'soin' },
      { id: 4, name: 'Forfait complet gratuit', points_required: 1200, type: 'free_service', value: 'forfait' },
    ],
    referralMessage: 'Rejoins Salons Darbourg et obtiens 75 points gratuits!',
    phone: '', address: 'Place de la Cité, Sainte-Foy',
  },

  'quai-1635': {
    businessName: 'Quai 1635', slug: 'quai-1635', tagline: 'Restaurant sur le fleuve', logo: null, logoLight: null, favicon: '⚓',
    heroImage: './images/quai-1635/hero.png', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Quai',
    theme: { primary: '#1B4F72', primaryLight: '#2471A3', accent: '#3498DB', accentLight: '#5DADE2', accentDark: '#2980B9', bg: '#F0F8FF', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Cocktail gratuit', points_required: 150, type: 'free_service', value: 'cocktail' },
      { id: 2, name: '10% de rabais', points_required: 300, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Entree gratuite', points_required: 500, type: 'free_service', value: 'entree' },
      { id: 4, name: 'Repas pour 2 offert', points_required: 1500, type: 'free_service', value: 'repas2' },
    ],
    referralMessage: 'Rejoins Quai 1635 et obtiens 75 points gratuits!',
    phone: '418-651-7824', address: '4155 Ch. de la Plage-Jacques-Cartier, Cap-Rouge',
  },

  'shaker-cap-rouge': {
    businessName: 'Shaker', slug: 'shaker-cap-rouge', tagline: 'Cuisine & Mixologie', logo: null, logoLight: null, favicon: '🍸',
    heroImage: './images/shaker-cap-rouge/hero.png', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Shaker',
    theme: { primary: '#E74C3C', primaryLight: '#EC7063', accent: '#C0392B', accentLight: '#E74C3C', accentDark: '#A93226', bg: '#FDF5F4', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Cocktail gratuit', points_required: 150, type: 'free_service', value: 'cocktail' },
      { id: 2, name: '10% de rabais', points_required: 300, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Burger gratuit', points_required: 500, type: 'free_service', value: 'burger' },
      { id: 4, name: 'Tartare pour 2 offert', points_required: 1500, type: 'free_service', value: 'tartare2' },
    ],
    referralMessage: 'Rejoins Shaker et obtiens 75 points gratuits!',
    phone: '', address: '3695 Rue de l\'Hetriere #250, Saint-Augustin',
  },

  'bar-le-st-aug': {
    businessName: 'Bar Le St-Aug', slug: 'bar-le-st-aug', tagline: 'Bar et ambiance locale', logo: null, logoLight: null, favicon: '🍺',
    heroImage: './images/bar-le-st-aug/hero.png', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points St-Aug',
    theme: { primary: '#2ECC71', primaryLight: '#58D68D', accent: '#27AE60', accentLight: '#2ECC71', accentDark: '#1E8449', bg: '#F0FFF4', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Consommation gratuite', points_required: 100, type: 'free_service', value: 'drink' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Pizza gratuite', points_required: 500, type: 'free_service', value: 'pizza' },
      { id: 4, name: '25$ de credit', points_required: 1000, type: 'free_service', value: 'credit25' },
    ],
    referralMessage: 'Rejoins Bar Le St-Aug et obtiens 75 points gratuits!',
    phone: '418-878-5321', address: '201 Route 138, Saint-Augustin',
  },

  'el-padrino': {
    businessName: 'Barbershop El Padrino', slug: 'el-padrino', tagline: 'Barbershop premium pour hommes', logo: null, logoLight: null, favicon: '💈',
    heroImage: './images/el-padrino/hero.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Padrino',
    theme: { primary: '#121212', primaryLight: '#2A2A2A', accent: '#C4868B', accentLight: '#D9A5A9', accentDark: '#A86B6F', bg: '#FAF5F5', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Coupe gratuite', points_required: 150, type: 'free_service', value: 'coupe' },
      { id: 2, name: '15% de rabais', points_required: 300, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Rasage hot towel gratuit', points_required: 500, type: 'free_service', value: 'rasage' },
      { id: 4, name: 'Forfait VIP gratuit', points_required: 1000, type: 'free_service', value: 'vip' },
    ],
    referralMessage: 'Rejoins El Padrino et obtiens 75 points gratuits!',
    phone: '418-686-8856', address: '1409 Ch Sainte-Foy, Québec',
  },

  'krwn': {
    businessName: 'KRWN Barbershop', slug: 'krwn', tagline: 'Coupes premium hommes et femmes', logo: './images/krwn/logo.png', logoLight: './images/krwn/logo.png', favicon: '✂️',
    heroImage: './images/krwn/hero.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points KRWN',
    theme: { primary: '#000000', primaryLight: '#222', accent: '#108474', accentLight: '#15A895', accentDark: '#0A6658', bg: '#F2FAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Produit capillaire gratuit', points_required: 100, type: 'free_service', value: 'produit' },
      { id: 2, name: '15% de rabais', points_required: 300, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Coupe gratuite', points_required: 500, type: 'free_service', value: 'coupe' },
      { id: 4, name: 'Forfait complet gratuit', points_required: 1000, type: 'free_service', value: 'forfait' },
    ],
    referralMessage: 'Rejoins KRWN et obtiens 75 points gratuits!',
    phone: '418-805-6611', address: '827 Ave Myrand, Sainte-Foy',
  },

  'le-kollectiv': {
    businessName: 'Le Kollectiv', slug: 'le-kollectiv', tagline: 'Salon de coiffure au coeur de Limoilou', logo: './images/le-kollectiv/logo.jpg', logoLight: './images/le-kollectiv/logo.jpg', favicon: '💇',
    heroImage: './images/le-kollectiv/logo.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Kollectiv',
    theme: { primary: '#2C3E50', primaryLight: '#34495E', accent: '#E67E22', accentLight: '#F39C12', accentDark: '#D35400', bg: '#FDF8F2', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Soin capillaire gratuit', points_required: 150, type: 'free_service', value: 'soin' },
      { id: 2, name: '15% de rabais', points_required: 300, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Coupe gratuite', points_required: 500, type: 'free_service', value: 'coupe' },
      { id: 4, name: 'Coloration gratuite', points_required: 1200, type: 'free_service', value: 'coloration' },
    ],
    referralMessage: 'Rejoins Le Kollectiv et obtiens 75 points gratuits!',
    phone: '418-523-3682', address: '446 Ch de la Canardière, Limoilou',
  },

  'parikart': {
    businessName: 'Parikart', slug: 'parikart', tagline: 'Coiffure et esthétique complète', logo: './images/parikart/logo.png', logoLight: './images/parikart/logo.png', favicon: '💆',
    heroImage: './images/parikart/logo.png', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Parikart',
    theme: { primary: '#D4A76A', primaryLight: '#E0BB88', accent: '#B8860B', accentLight: '#DAA520', accentDark: '#8B6914', bg: '#FDF8F0', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Soin mains gratuit', points_required: 150, type: 'free_service', value: 'mains' },
      { id: 2, name: '15% de rabais', points_required: 300, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Coupe gratuite', points_required: 500, type: 'free_service', value: 'coupe' },
      { id: 4, name: 'Forfait beauté complet', points_required: 1200, type: 'free_service', value: 'forfait' },
    ],
    referralMessage: 'Rejoins Parikart et obtiens 75 points gratuits!',
    phone: '418-838-6600', address: '65 Rte du Président-Kennedy, Lévis',
  },

  'au-bonheur-des-pains': {
    businessName: 'Au Bonheur des Pains', slug: 'au-bonheur-des-pains', tagline: 'Boulangerie artisanale', logo: null, logoLight: null, favicon: '🥐',
    heroImage: './images/au-bonheur-des-pains/hero.png', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Bonheur',
    theme: { primary: '#E8A838', primaryLight: '#F0BC5C', accent: '#5D4037', accentLight: '#795548', accentDark: '#3E2723', bg: '#FDF8EF', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Viennoiserie gratuite', points_required: 100, type: 'free_service', value: 'viennoiserie' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Sandwich gratuit', points_required: 500, type: 'free_service', value: 'sandwich' },
      { id: 4, name: '25$ de crédit', points_required: 1000, type: 'free_service', value: 'credit25' },
    ],
    referralMessage: 'Rejoins Au Bonheur des Pains et obtiens 75 points gratuits!',
    phone: '418-496-6960', address: '1810 Route des Rivières, Lévis',
  },

  'borderon-fils': {
    businessName: 'Borderon & Fils', slug: 'borderon-fils', tagline: 'Boulangerie artisanale depuis 30 ans', logo: './images/borderon-fils/logo.jpg', logoLight: './images/borderon-fils/logo.jpg', favicon: '🍞',
    heroImage: './images/borderon-fils/hero.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Borderon',
    theme: { primary: '#5D4037', primaryLight: '#795548', accent: '#D4A76A', accentLight: '#E0BB88', accentDark: '#B88D52', bg: '#FDF6EF', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Croissant gratuit', points_required: 100, type: 'free_service', value: 'croissant' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Pain au levain gratuit', points_required: 500, type: 'free_service', value: 'pain' },
      { id: 4, name: '30$ de crédit', points_required: 1000, type: 'free_service', value: 'credit30' },
    ],
    referralMessage: 'Rejoins Borderon & Fils et obtiens 75 points gratuits!',
    phone: '418-521-5757', address: '1191 Ave Cartier, Québec',
  },

  'le-gout-du-plaisir': {
    businessName: 'Le Goût du Plaisir', slug: 'le-gout-du-plaisir', tagline: 'Boulangerie, pâtisserie et sandwichs', logo: './images/le-gout-du-plaisir/logo.png', logoLight: './images/le-gout-du-plaisir/logo.png', favicon: '🎂',
    heroImage: './images/le-gout-du-plaisir/hero.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Plaisir',
    theme: { primary: '#4A3748', primaryLight: '#6B5268', accent: '#D4A76A', accentLight: '#E0BB88', accentDark: '#B88D52', bg: '#F9F5F8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Pâtisserie gratuite', points_required: 100, type: 'free_service', value: 'patisserie' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Gâteau gratuit', points_required: 500, type: 'free_service', value: 'gateau' },
      { id: 4, name: '25$ de crédit', points_required: 1000, type: 'free_service', value: 'credit25' },
    ],
    referralMessage: 'Rejoins Le Goût du Plaisir et obtiens 75 points gratuits!',
    phone: '418-914-8998', address: '905 Rue de Nemours, Charlesbourg',
  },

  'limoncello': {
    businessName: 'Limoncello Bistro Italien', slug: 'limoncello', tagline: 'Bistro italien au coeur de Limoilou', logo: './images/limoncello/logo.jpg', logoLight: './images/limoncello/logo.jpg', favicon: '🍝',
    heroImage: './images/limoncello/hero.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Limoncello',
    theme: { primary: '#1A1A1A', primaryLight: '#333', accent: '#F5D547', accentLight: '#F7E070', accentDark: '#D4B530', bg: '#FFFDF5', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Dessert gratuit', points_required: 100, type: 'free_service', value: 'dessert' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Pasta gratuite', points_required: 500, type: 'free_service', value: 'pasta' },
      { id: 4, name: 'Repas pour 2 offert', points_required: 1500, type: 'free_service', value: 'repas2' },
    ],
    referralMessage: 'Rejoins Limoncello et obtiens 75 points gratuits!',
    phone: '418-204-0683', address: '523 3e Ave, Limoilou',
  },

  'boutique-mur': {
    businessName: 'Boutique MUR', slug: 'boutique-mur', tagline: 'Mode européenne haut de gamme', logo: './images/boutique-mur/logo.png', logoLight: './images/boutique-mur/logo.png', favicon: '👗',
    heroImage: './images/boutique-mur/hero.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points MUR',
    theme: { primary: '#DA225E', primaryLight: '#E84580', accent: '#2C2C2C', accentLight: '#444', accentDark: '#1A1A1A', bg: '#FFF5F8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Accessoire gratuit', points_required: 200, type: 'free_service', value: 'accessoire' },
      { id: 2, name: '15% de rabais', points_required: 400, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Pièce en solde offerte', points_required: 800, type: 'free_service', value: 'solde' },
      { id: 4, name: '50$ de crédit', points_required: 1500, type: 'free_service', value: 'credit50' },
    ],
    referralMessage: 'Rejoins Boutique MUR et obtiens 75 points gratuits!',
    phone: '418-780-0882', address: '2450 Bd Laurier, Place Ste-Foy',
  },

  'article-721': {
    businessName: 'Article 721', slug: 'article-721', tagline: 'Créations locales et trouvailles uniques', logo: './images/article-721/logo.jpg', logoLight: './images/article-721/logo.jpg', favicon: '🎁',
    heroImage: './images/article-721/hero.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points 721',
    theme: { primary: '#E99393', primaryLight: '#F0ABAB', accent: '#2C3E50', accentLight: '#34495E', accentDark: '#1A252F', bg: '#FFF8F8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Carte gratuite', points_required: 50, type: 'free_service', value: 'carte' },
      { id: 2, name: '10% de rabais', points_required: 200, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Chandelle gratuite', points_required: 400, type: 'free_service', value: 'chandelle' },
      { id: 4, name: '25$ de crédit', points_required: 800, type: 'free_service', value: 'credit25' },
    ],
    referralMessage: 'Rejoins Article 721 et obtiens 75 points gratuits!',
    phone: '581-742-4333', address: '721 3e Ave, Limoilou',
  },

  'atout-poils': {
    businessName: 'Atout-Poils', slug: 'atout-poils', tagline: 'Toilettage pour chiens et chats', logo: null, logoLight: null, favicon: '🐕',
    heroImage: './images/atout-poils/hero.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Poils',
    theme: { primary: '#5CB8E6', primaryLight: '#7CC8EE', accent: '#2C3E50', accentLight: '#34495E', accentDark: '#1A252F', bg: '#F0F8FF', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Coupe de griffes gratuite', points_required: 100, type: 'free_service', value: 'griffes' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Bain gratuit', points_required: 500, type: 'free_service', value: 'bain' },
      { id: 4, name: 'Toilettage complet gratuit', points_required: 1000, type: 'free_service', value: 'toilettage' },
    ],
    referralMessage: 'Rejoins Atout-Poils et obtiens 75 points gratuits!',
    phone: '418-838-4322', address: '4081 Rue des Turquoises, Lévis',
  },

  'barbier-nomade': {
    businessName: 'Barbier Nomade', slug: 'barbier-nomade', tagline: "L'expérience barbier hors du commun", logo: null, logoLight: null, favicon: '💈',
    heroImage: './images/barbier-nomade/interior.jpg', galleryImages: ['./images/barbier-nomade/barber.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Nomade',
    theme: { primary: '#1A1A1A', primaryLight: '#333', accent: '#E67E22', accentLight: '#F39C12', accentDark: '#D35400', bg: '#F8F6F0', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Coupe gratuite', points_required: 150, type: 'free_service', value: 'coupe' },
      { id: 2, name: '15% de rabais', points_required: 300, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Forfait barbe + coupe', points_required: 500, type: 'free_service', value: 'forfait' },
      { id: 4, name: 'Forfait VIP gratuit', points_required: 1000, type: 'free_service', value: 'vip' },
    ],
    referralMessage: 'Rejoins Barbier Nomade et obtiens 75 points gratuits!',
    phone: '581-307-3325', address: '3128 Chemin Royal, Beauport',
  },

  'studio-rebel': {
    businessName: 'Studio Rebel', slug: 'studio-rebel', tagline: 'Yoga, Pilates, Buti et plus', favicon: '🧘',
    heroImage: './images/studio-rebel/studio.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Rebel',
    theme: { primary: '#9B59B6', primaryLight: '#AF7AC5', accent: '#8E44AD', accentLight: '#BB8FCE', accentDark: '#7D3C98', bg: '#F9F5FC', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Cours gratuit', points_required: 100, type: 'free_service', value: 'cours' },
      { id: 2, name: '10% de rabais', points_required: 250, type: 'discount_percent', value: 10 },
      { id: 3, name: '5 cours gratuits', points_required: 500, type: 'free_service', value: '5cours' },
      { id: 4, name: 'Mois illimité gratuit', points_required: 1200, type: 'free_service', value: 'mois' },
    ],
    referralMessage: 'Rejoins Studio Rebel et obtiens 75 points gratuits!',
    phone: '', address: '281 rue St-Vallier Est, Québec',
  },

  'boutique-tropicale': {
    businessName: 'Boutique Tropicale', slug: 'boutique-tropicale', tagline: 'Animalerie spécialisée depuis 1984', logo: null, logoLight: null, favicon: '🐾',
    heroImage: './images/boutique-tropicale/aquarium.jpg', galleryImages: ['./images/boutique-tropicale/aquarium2.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Tropicale',
    theme: { primary: '#9B046F', primaryLight: '#C0088A', accent: '#27AE60', accentLight: '#2ECC71', accentDark: '#1E8449', bg: '#FFF5FB', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Gâterie animale gratuite', points_required: 50, type: 'free_service', value: 'gaterie' },
      { id: 2, name: '10% de rabais', points_required: 200, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Jouet gratuit', points_required: 400, type: 'free_service', value: 'jouet' },
      { id: 4, name: '25$ de crédit', points_required: 800, type: 'free_service', value: 'credit25' },
    ],
    referralMessage: 'Rejoins Boutique Tropicale et obtiens 75 points gratuits!',
    phone: '', address: 'Québec',
  },

  'barbier-le-saloon': {
    businessName: 'Barbier Le Saloon', slug: 'barbier-le-saloon', tagline: 'Barbershop authentique', logo: null, logoLight: null, favicon: '💈',
    heroImage: './images/barbier-le-saloon/interior.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Saloon',
    theme: { primary: '#006AFF', primaryLight: '#3388FF', accent: '#1A1A1A', accentLight: '#333', accentDark: '#000', bg: '#F0F5FF', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Coupe gratuite', points_required: 150, type: 'free_service', value: 'coupe' },
      { id: 2, name: '15% de rabais', points_required: 300, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Rasage gratuit', points_required: 500, type: 'free_service', value: 'rasage' },
      { id: 4, name: 'Forfait complet gratuit', points_required: 1000, type: 'free_service', value: 'forfait' },
    ],
    referralMessage: 'Rejoins Barbier Le Saloon et obtiens 75 points gratuits!',
    phone: '581-989-1719', address: 'Charlesbourg, Québec',
  },

  'croc-mignon': {
    businessName: 'Le Croc Mignon', slug: 'croc-mignon', tagline: 'Boucherie artisanale — viandes AAA et fruits de mer', logo: './images/croc-mignon/logo.png', logoLight: './images/croc-mignon/logo.png', favicon: '🥩',
    heroImage: './images/croc-mignon/hero.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Croc',
    theme: { primary: '#8B2C2C', primaryLight: '#A64545', accent: '#D4A76A', accentLight: '#E0BB88', accentDark: '#B88D52', bg: '#FBF5F2', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: '10% de rabais', points_required: 200, type: 'discount_percent', value: 10 },
      { id: 2, name: 'Saucisse maison gratuite', points_required: 400, type: 'free_service', value: 'saucisse' },
      { id: 3, name: 'Steak de bœuf Highland gratuit', points_required: 800, type: 'free_service', value: 'steak' },
      { id: 4, name: '50$ de crédit', points_required: 1500, type: 'free_service', value: 'credit50' },
    ],
    referralMessage: 'Rejoins Le Croc Mignon et obtiens 75 points gratuits!',
    phone: '581-741-7050', address: '594 3e Avenue, Limoilou',
  },

  'meandres': {
    businessName: 'Lunetterie des Méandres', slug: 'meandres', tagline: 'Lunetterie indépendante — montures de designers', logo: './images/meandres/logo.svg', logoLight: './images/meandres/logo.svg', favicon: '👓',
    heroImage: './images/meandres/hero.jpg', galleryImages: [],
    pointsPerDollar: 5, referralBonus: 100, visitBonus: 50, pointsLabel: 'Points Méandres',
    theme: { primary: '#1A1A1A', primaryLight: '#333333', accent: '#C49E5A', accentLight: '#D4B577', accentDark: '#A68344', bg: '#FAFAF7', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: '25$ sur prochain achat', points_required: 250, type: 'free_service', value: 'credit25' },
      { id: 2, name: '10% de rabais sur montures', points_required: 500, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Examen de la vue gratuit', points_required: 800, type: 'free_service', value: 'examen' },
      { id: 4, name: '100$ de crédit', points_required: 1500, type: 'free_service', value: 'credit100' },
    ],
    referralMessage: 'Rejoins Lunetterie des Méandres et obtiens 100 points gratuits!',
    phone: '418-847-0505', address: '2500 rue Beaurevoir, Lebourgneuf',
  },

  'mathieu-performance': {
    businessName: 'Mathieu Performance', slug: 'mathieu-performance', tagline: 'Boutique de vélos — vente, atelier et mise au point', logo: './images/mathieu-performance/logo.png', logoLight: './images/mathieu-performance/logo.png', favicon: '🚴',
    heroImage: './images/mathieu-performance/hero.webp', galleryImages: [],
    pointsPerDollar: 5, referralBonus: 100, visitBonus: 50, pointsLabel: 'Points Mathieu',
    theme: { primary: '#1E4D9B', primaryLight: '#2E5DAD', accent: '#FF6B35', accentLight: '#FF8A5E', accentDark: '#E55423', bg: '#F4F7FB', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Mise au point gratuite', points_required: 300, type: 'free_service', value: 'miseaupoint' },
      { id: 2, name: '15% sur accessoires', points_required: 500, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Casque offert', points_required: 800, type: 'free_service', value: 'casque' },
      { id: 4, name: '150$ sur prochain vélo', points_required: 2000, type: 'free_service', value: 'credit150' },
    ],
    referralMessage: 'Rejoins Mathieu Performance et obtiens 100 points gratuits!',
    phone: '418-524-2650', address: '496 1re Avenue, Limoilou',
  },

  'fleuriste-faubourg': {
    businessName: 'Fleuriste du Faubourg', slug: 'fleuriste-faubourg', tagline: 'Artisan fleuriste créateur — fleurs, plantes et déco', logo: './images/fleuriste-faubourg/logo.png', logoLight: './images/fleuriste-faubourg/logo.png', favicon: '💐',
    heroImage: './images/fleuriste-faubourg/hero.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Faubourg',
    theme: { primary: '#6B8E5A', primaryLight: '#88A877', accent: '#D4B5D8', accentLight: '#E3CBE6', accentDark: '#B594BA', bg: '#F7F9F4', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Bouquet saisonnier 10$', points_required: 150, type: 'free_service', value: 'bouquet10' },
      { id: 2, name: '15% sur bouquet sur mesure', points_required: 300, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Plante verte gratuite', points_required: 500, type: 'free_service', value: 'plante' },
      { id: 4, name: 'Composition florale 50$', points_required: 1000, type: 'free_service', value: 'composition' },
    ],
    referralMessage: 'Rejoins Fleuriste du Faubourg et obtiens 75 points gratuits!',
    phone: '418-914-9094', address: '565B rue Saint-Jean, Québec',
  },

  'champagne-chocolatier': {
    businessName: 'Champagne Chocolatier', slug: 'champagne-chocolatier', tagline: 'Chocolaterie artisanale depuis 20 ans — Saint-Roch', logo: './images/champagne-chocolatier/logo.jpg', logoLight: './images/champagne-chocolatier/logo.jpg', favicon: '🍫',
    heroImage: './images/champagne-chocolatier/logo.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Champagne',
    theme: { primary: '#4A2C1E', primaryLight: '#6B4130', accent: '#D4A76A', accentLight: '#E0BB88', accentDark: '#B88D52', bg: '#FBF7F2', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Boîte de truffes (6)', points_required: 200, type: 'free_service', value: 'truffes' },
      { id: 2, name: '10% de rabais', points_required: 350, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Tablette de chocolat fin', points_required: 500, type: 'free_service', value: 'tablette' },
      { id: 4, name: 'Coffret cadeau 50$', points_required: 1200, type: 'free_service', value: 'coffret' },
    ],
    referralMessage: 'Rejoins Champagne Chocolatier et obtiens 75 points gratuits!',
    phone: '418-522-0708', address: '525 rue Saint-Joseph Est, Saint-Roch',
  },

  'erico': {
    businessName: 'Érico Chocolaterie', slug: 'erico', tagline: 'Chocolatier créatif et musée du chocolat depuis 1987', logo: './images/erico/logo.jpg', logoLight: './images/erico/logo.jpg', favicon: '🍫',
    heroImage: './images/erico/logo.jpg', galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Érico',
    theme: { primary: '#3E2723', primaryLight: '#5D4037', accent: '#E67E22', accentLight: '#F39C53', accentDark: '#C05A15', bg: '#FBF6F0', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Chocolat chaud maison offert', points_required: 150, type: 'free_service', value: 'chocochaud' },
      { id: 2, name: 'Boîte de truffes (6 morceaux)', points_required: 300, type: 'free_service', value: 'truffes' },
      { id: 3, name: '10% de rabais en boutique', points_required: 500, type: 'discount_percent', value: 10 },
      { id: 4, name: 'Coffret cadeau chocolats fins 50$', points_required: 1200, type: 'free_service', value: 'coffret' },
    ],
    referralMessage: 'Rejoins Érico Chocolaterie et obtiens 75 points gratuits!',
    phone: '418-524-2122', address: '634 rue Saint-Jean, Québec',
  },

  'equilibre-traiteur': {
    businessName: 'Équilibre Traiteur', slug: 'equilibre-traiteur', tagline: 'Traiteur boutique — produits fins du Québec', favicon: '🍱',
    heroImage: null, galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Équilibre',
    theme: { primary: '#2E5D3A', primaryLight: '#4A7A55', accent: '#C9A96E', accentLight: '#DFC28E', accentDark: '#A88449', bg: '#F7F9F4', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Boîte à lunch offerte', points_required: 250, type: 'free_service', value: 'lunch' },
      { id: 2, name: '10% sur commande événement', points_required: 500, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Plateau fromages-charcuteries 4 pers.', points_required: 800, type: 'free_service', value: 'plateau' },
      { id: 4, name: 'Service traiteur 100$ offert', points_required: 1500, type: 'free_service', value: 'service100' },
    ],
    referralMessage: 'Rejoins Équilibre Traiteur et obtiens 75 points gratuits!',
    phone: '', address: 'Vieux-Limoilou, Québec',
  },

  'la-souche': {
    businessName: 'La Souche Microbrasserie', slug: 'la-souche', tagline: 'Microbrasserie artisanale — 15 bières d\'auteur', favicon: '🍺',
    heroImage: null, galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Souche',
    theme: { primary: '#3E2A1F', primaryLight: '#5C4230', accent: '#D9A441', accentLight: '#E8BC6D', accentDark: '#B88630', bg: '#FBF6ED', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Pinte maison offerte', points_required: 200, type: 'free_service', value: 'pinte' },
      { id: 2, name: 'Dégustation 4 bières', points_required: 400, type: 'free_service', value: 'degustation' },
      { id: 3, name: 'Planche charcuterie-fromages', points_required: 600, type: 'free_service', value: 'planche' },
      { id: 4, name: 'Growler 2L offert', points_required: 1000, type: 'free_service', value: 'growler' },
    ],
    referralMessage: 'Rejoins La Souche et obtiens 75 points gratuits!',
    phone: '581-742-1144', address: '801 Chemin de la Canardière, Limoilou',
  },

  'librairie-morency': {
    businessName: 'Librairie Morency', slug: 'librairie-morency', tagline: 'Librairie indépendante de Limoilou depuis 1994', favicon: '📚',
    heroImage: null, galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Morency',
    theme: { primary: '#1A3A5C', primaryLight: '#2E5178', accent: '#C96B4F', accentLight: '#DB8A72', accentDark: '#A44E36', bg: '#F8F5F0', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Livre de poche au choix', points_required: 250, type: 'free_service', value: 'poche' },
      { id: 2, name: '10% de rabais', points_required: 400, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Roman édition courante', points_required: 700, type: 'free_service', value: 'roman' },
      { id: 4, name: '50$ de crédit librairie', points_required: 1200, type: 'free_service', value: 'credit50' },
    ],
    referralMessage: 'Rejoins Librairie Morency et obtiens 75 points gratuits!',
    phone: '', address: '657 3e Avenue, Limoilou',
  },

  'yannick-fromagerie': {
    businessName: 'Yannick Fromagerie', slug: 'yannick-fromagerie', tagline: 'Fromages d\'ici et d\'ailleurs — importations privées', favicon: '🧀',
    heroImage: null, galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Yannick',
    theme: { primary: '#6B2C2C', primaryLight: '#8B3A3A', accent: '#E8B923', accentLight: '#F0CE52', accentDark: '#C29A1C', bg: '#FBF7EF', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Plateau dégustation 3 fromages', points_required: 250, type: 'free_service', value: 'plateau3' },
      { id: 2, name: '10% de rabais', points_required: 400, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Fromage AOP importation privée', points_required: 700, type: 'free_service', value: 'aop' },
      { id: 4, name: 'Panier cadeau gastronomique 75$', points_required: 1500, type: 'free_service', value: 'panier75' },
    ],
    referralMessage: 'Rejoins Yannick Fromagerie et obtiens 75 points gratuits!',
    phone: '', address: 'Limoilou, Québec',
  },

  'bijouterie-langlois': {
    businessName: 'Bijouterie Langlois', slug: 'bijouterie-langlois', tagline: 'Joaillerie sur mesure — conçue et fabriquée à Québec', favicon: '💎',
    heroImage: null, galleryImages: [],
    pointsPerDollar: 5, referralBonus: 150, visitBonus: 50, pointsLabel: 'Points Langlois',
    theme: { primary: '#1A1A1A', primaryLight: '#333333', accent: '#D4AF37', accentLight: '#E8C968', accentDark: '#A68928', bg: '#FAFAF7', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Nettoyage et polissage offert', points_required: 300, type: 'free_service', value: 'nettoyage' },
      { id: 2, name: '10% sur achats', points_required: 600, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Paire de boucles d\'oreilles signature', points_required: 1000, type: 'free_service', value: 'boucles' },
      { id: 4, name: '250$ de crédit en boutique', points_required: 2500, type: 'free_service', value: 'credit250' },
    ],
    referralMessage: 'Rejoins Bijouterie Langlois et obtiens 150 points gratuits!',
    phone: '', address: 'Saint-Roch, Québec',
  },

  'cremerie-st-sauveur': {
    businessName: 'Crèmerie Saint-Sauveur', slug: 'cremerie-st-sauveur', tagline: 'Gelato, soft et produits locaux au cœur de Saint-Sauveur', logo: './images/cremerie-st-sauveur/logo.jpg', logoLight: './images/cremerie-st-sauveur/logo.jpg', favicon: '🍦',
    heroImage: './images/cremerie-st-sauveur/logo.jpg', galleryImages: [],
    pointsPerDollar: 20, referralBonus: 50, visitBonus: 15, pointsLabel: 'Points Crèmerie',
    theme: { primary: '#C65D7B', primaryLight: '#D57B94', accent: '#F2C57C', accentLight: '#F7D7A1', accentDark: '#D9A656', bg: '#FDF5F0', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Cornet format régulier', points_required: 150, type: 'free_service', value: 'cornet' },
      { id: 2, name: 'Milk-shake maison', points_required: 300, type: 'free_service', value: 'milkshake' },
      { id: 3, name: 'Gelato format jumbo', points_required: 500, type: 'free_service', value: 'jumbo' },
      { id: 4, name: 'Carte cadeau 25$', points_required: 800, type: 'free_service', value: 'carte25' },
    ],
    referralMessage: 'Rejoins Crèmerie Saint-Sauveur et obtiens 50 points gratuits!',
    phone: '418-657-7995', address: '204 rue Saint-Vallier Ouest, Saint-Sauveur',
  },

  'la-reserve': {
    businessName: 'La Réserve Épicerie Fine', slug: 'la-reserve', tagline: 'Produits d\'importation italienne, grecque et espagnole', favicon: '🥂',
    heroImage: null, galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Réserve',
    theme: { primary: '#5C1A1A', primaryLight: '#7E2C2C', accent: '#D4A76A', accentLight: '#E0BB88', accentDark: '#B88D52', bg: '#FBF5F0', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Plateau charcuterie 3 viandes', points_required: 300, type: 'free_service', value: 'charcut' },
      { id: 2, name: 'Bouteille d\'huile d\'olive extra-vierge', points_required: 500, type: 'free_service', value: 'huile' },
      { id: 3, name: '10% sur l\'épicerie', points_required: 700, type: 'discount_percent', value: 10 },
      { id: 4, name: 'Panier italien gourmand 75$', points_required: 1500, type: 'free_service', value: 'panier75' },
    ],
    referralMessage: 'Rejoins La Réserve et obtiens 75 points gratuits!',
    phone: '418-914-5061', address: '994 3e Avenue, Limoilou',
  },

  'nano-cinco': {
    businessName: 'Nano Cinco', slug: 'nano-cinco', tagline: 'Nano-brasserie artisanale — IPA, sours et barrel-aged', favicon: '🍻',
    heroImage: null, galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Nano',
    theme: { primary: '#8B2C2C', primaryLight: '#A64545', accent: '#F2C057', accentLight: '#F7D581', accentDark: '#D4A42F', bg: '#FBF6EE', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Pinte maison offerte', points_required: 200, type: 'free_service', value: 'pinte' },
      { id: 2, name: 'Dégustation 4 styles', points_required: 400, type: 'free_service', value: 'flight' },
      { id: 3, name: 'Croissant-croissant fait maison', points_required: 500, type: 'free_service', value: 'croissant' },
      { id: 4, name: 'Tournée privée de la brasserie', points_required: 1000, type: 'free_service', value: 'tour' },
    ],
    referralMessage: 'Rejoins Nano Cinco et obtiens 75 points gratuits!',
    phone: '', address: '236 3e Rue, Limoilou',
  },

  'librairie-pantoute': {
    businessName: 'Librairie Pantoute', slug: 'librairie-pantoute', tagline: 'Librairie indépendante — Saint-Roch et Vieux-Québec', logo: './images/librairie-pantoute/logo.jpg', logoLight: './images/librairie-pantoute/logo.jpg', favicon: '📖',
    heroImage: null, galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Pantoute',
    theme: { primary: '#2D4A3A', primaryLight: '#426150', accent: '#C07548', accentLight: '#D18D64', accentDark: '#A45C32', bg: '#F7F4EE', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Livre de poche au choix', points_required: 200, type: 'free_service', value: 'poche' },
      { id: 2, name: '10% de rabais en boutique', points_required: 400, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Signature ou rencontre auteur', points_required: 700, type: 'free_service', value: 'signature' },
      { id: 4, name: '50$ de crédit librairie', points_required: 1200, type: 'free_service', value: 'credit50' },
    ],
    referralMessage: 'Rejoins Librairie Pantoute et obtiens 75 points gratuits!',
    phone: '', address: '286 rue Saint-Joseph Est, Saint-Roch',
  },

  // ====== BATCH SALONS/BARBIERS/BEAUTE — 2026-04-22 ======

  'menz-club': {
    businessName: 'Menz Club', slug: 'menz-club', tagline: 'Le barbier de référence pour l\'homme québécois moderne',
    logo: './images/menz-club/logo.png', logoLight: './images/menz-club/logo.png', favicon: '💈',
    heroImage: './images/menz-club/hero.jpg',
    galleryImages: ['./images/menz-club/gallery1.jpg', './images/menz-club/gallery2.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Menz',
    theme: { primary: '#1A1A1A', primaryLight: '#333333', accent: '#B8935A', accentLight: '#CFAE7C', accentDark: '#96743F', bg: '#F5F1EA', font: '"Inter", system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Coupe classique homme', points_required: 180, type: 'free_service', value: 'coupe' },
      { id: 2, name: '15% rabais sur produits barbe', points_required: 350, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Combo coupe + barbe', points_required: 700, type: 'free_service', value: 'combo' },
      { id: 4, name: 'Head Spa signature Menz Club', points_required: 1600, type: 'free_service', value: 'headspa' },
    ],
    referralMessage: 'Rejoins Menz Club et obtiens 75 points gratuits!',
    phone: '581-742-2900', address: '1130 boul Lebourgneuf, Québec',
  },

  'm-coupe': {
    businessName: 'M Coupe', slug: 'm-coupe', tagline: 'Quand on a de beaux cheveux, on se sent belle, toujours',
    logo: './images/m-coupe/logo.svg', logoLight: './images/m-coupe/logo.svg', favicon: '✂️',
    heroImage: './images/m-coupe/hero.jpg',
    galleryImages: ['./images/m-coupe/gallery1.jpg', './images/m-coupe/gallery2.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points M',
    theme: { primary: '#1C1C1C', primaryLight: '#363636', accent: '#B89968', accentLight: '#CFB387', accentDark: '#977949', bg: '#FAFAF8', font: '"Playfair Display", Georgia, serif' },
    rewards: [
      { id: 1, name: 'Coupe et stylisme femme', points_required: 200, type: 'free_service', value: 'coupe' },
      { id: 2, name: '20% rabais sur produits Kérastase', points_required: 400, type: 'discount_percent', value: 20 },
      { id: 3, name: 'Retouche de racines incluse', points_required: 750, type: 'free_service', value: 'retouche' },
      { id: 4, name: 'Balayage ou mèches complètes', points_required: 1800, type: 'free_service', value: 'balayage' },
    ],
    referralMessage: 'Rejoins M Coupe et obtiens 75 points gratuits!',
    phone: '', address: 'Sainte-Foy, Québec',
  },

  'la-belle-et-la-tete': {
    businessName: 'La Belle et la Tête', slug: 'la-belle-et-la-tete', tagline: 'Le bien-être passe aussi par vos cheveux',
    logo: './images/la-belle-et-la-tete/logo.png', logoLight: './images/la-belle-et-la-tete/logo.png', favicon: '💇‍♀️',
    heroImage: './images/la-belle-et-la-tete/hero.jpg',
    galleryImages: ['./images/la-belle-et-la-tete/gallery1.jpg', './images/la-belle-et-la-tete/gallery2.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Belle',
    theme: { primary: '#8B6F47', primaryLight: '#A48860', accent: '#D4A574', accentLight: '#E4BE95', accentDark: '#B88A5C', bg: '#FAF6F0', font: '"Lora", Georgia, serif' },
    rewards: [
      { id: 1, name: 'Mise en plis ou brushing', points_required: 150, type: 'free_service', value: 'brushing' },
      { id: 2, name: '15% rabais sur soin Olaplex', points_required: 350, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Coupe + couleur racine', points_required: 750, type: 'free_service', value: 'racine' },
      { id: 4, name: 'Nanoplastie ou botox capillaire', points_required: 1800, type: 'free_service', value: 'nanoplastie' },
    ],
    referralMessage: 'Rejoins La Belle et la Tête et obtiens 75 points gratuits!',
    phone: '418-977-8815', address: '192 av. Eugène-Lamontagne, Limoilou + 710 rue Bouvier, Lebourgneuf',
  },

  'coiffure-distinctive': {
    businessName: 'Coiffure Distinctive', slug: 'coiffure-distinctive', tagline: 'Le salon de coiffure complet de Charlesbourg, pour toute la famille',
    favicon: '✂️',
    heroImage: './images/coiffure-distinctive/hero.jpg',
    galleryImages: ['./images/coiffure-distinctive/gallery1.jpg', './images/coiffure-distinctive/gallery2.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Distinctive',
    theme: { primary: '#2B2B2B', primaryLight: '#454545', accent: '#C9A96E', accentLight: '#DDC08E', accentDark: '#A88B52', bg: '#FAFAF8', font: 'system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Coupe femme, homme ou enfant', points_required: 180, type: 'free_service', value: 'coupe' },
      { id: 2, name: '15$ rabais sur lissage brésilien', points_required: 400, type: 'discount_fixed', value: 15 },
      { id: 3, name: 'Balayage ou gloss capillaire', points_required: 750, type: 'free_service', value: 'balayage' },
      { id: 4, name: 'Coiffure mariage ou bal complète', points_required: 1700, type: 'free_service', value: 'mariage' },
    ],
    referralMessage: 'Rejoins Coiffure Distinctive et obtiens 75 points gratuits!',
    phone: '418-614-4430', address: '8525 1re Avenue, Charlesbourg, Québec',
  },

  'atelier-maitres-coloristes': {
    businessName: 'L\'Atelier des Maîtres Coloristes', slug: 'atelier-maitres-coloristes', tagline: 'Enfin la tête dont vous rêviez, signée par nos maîtres coloristes',
    logo: './images/atelier-maitres-coloristes/logo.svg', logoLight: './images/atelier-maitres-coloristes/logo.svg', favicon: '🎨',
    heroImage: './images/atelier-maitres-coloristes/hero.png',
    galleryImages: ['./images/atelier-maitres-coloristes/gallery1.jpg', './images/atelier-maitres-coloristes/gallery2.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Atelier',
    theme: { primary: '#2D2823', primaryLight: '#47403A', accent: '#A8804C', accentLight: '#C19A6C', accentDark: '#876537', bg: '#F8F4EE', font: '"Cormorant Garamond", Georgia, serif' },
    rewards: [
      { id: 1, name: 'Brushing ou mise en plis', points_required: 150, type: 'free_service', value: 'brushing' },
      { id: 2, name: '20% rabais sur produits capillaires', points_required: 350, type: 'discount_percent', value: 20 },
      { id: 3, name: 'Retouche de coloration racines', points_required: 700, type: 'free_service', value: 'retouche' },
      { id: 4, name: 'Balayage signature ou ombré complet', points_required: 1800, type: 'free_service', value: 'balayage' },
    ],
    referralMessage: 'Rejoins L\'Atelier des Maîtres Coloristes et obtiens 75 points gratuits!',
    phone: '418-624-0781', address: '6680 1re Avenue, Charlesbourg, Québec',
  },

  'salon-brooklyn': {
    businessName: 'Salon Brooklyn', slug: 'salon-brooklyn', tagline: 'Coiffure et head spa, experts en balayage et extensions',
    favicon: '💇‍♀️',
    heroImage: './images/salon-brooklyn/hero.jpg',
    galleryImages: ['./images/salon-brooklyn/gallery1.jpg', './images/salon-brooklyn/gallery2.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Brooklyn',
    theme: { primary: '#2C2825', primaryLight: '#47413C', accent: '#C9A77D', accentLight: '#DEBF9B', accentDark: '#A7885F', bg: '#F5F0EA', font: '"Inter", system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Shampoing head spa relaxant', points_required: 200, type: 'free_service', value: 'headspa' },
      { id: 2, name: '15% rabais sur coloration ou balayage', points_required: 350, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Soin capillaire profond avec coupe', points_required: 700, type: 'free_service', value: 'soin' },
      { id: 4, name: 'Head spa signature complet', points_required: 1500, type: 'free_service', value: 'signature' },
    ],
    referralMessage: 'Rejoins Salon Brooklyn et obtiens 75 points gratuits!',
    phone: '418-446-9997', address: '4890 boul de l\'Ormière, Suite 201, Québec',
  },

  'salon-no1': {
    businessName: 'Salon NO:1 Coiffure (La Porte 305)', slug: 'salon-no1', tagline: 'Coffee-shop de coiffure au cœur de Saint-Roch, 9 artistes indépendants',
    favicon: '✂️',
    heroImage: './images/salon-no1/hero.jpg',
    galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points NO:1',
    theme: { primary: '#1A1A1A', primaryLight: '#333333', accent: '#D4AF37', accentLight: '#E5C75E', accentDark: '#B08F1C', bg: '#FAFAF7', font: '"Cormorant Garamond", Georgia, serif' },
    rewards: [
      { id: 1, name: 'Mise en plis brushing', points_required: 180, type: 'free_service', value: 'brushing' },
      { id: 2, name: '20% rabais sur prochain service', points_required: 350, type: 'discount_percent', value: 20 },
      { id: 3, name: 'Coupe gentleman ou dame', points_required: 700, type: 'free_service', value: 'coupe' },
      { id: 4, name: 'Transformation couleur complète', points_required: 1800, type: 'free_service', value: 'transformation' },
    ],
    referralMessage: 'Rejoins Salon NO:1 et obtiens 75 points gratuits!',
    phone: '581-981-2319', address: '305 rue du Pont, Saint-Roch, Québec',
  },

  'salon-maet': {
    businessName: 'MAÉT Salon', slug: 'salon-maet', tagline: 'Salon urbain inclusif, tendances en coloration, coupe et finition',
    favicon: '💇',
    heroImage: null,
    galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points MAÉT',
    theme: { primary: '#0F0F0F', primaryLight: '#2A2A2A', accent: '#BFA78A', accentLight: '#D3C0A8', accentDark: '#9D886B', bg: '#FFFFFF', font: '"Inter", system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Traitement Olaplex', points_required: 200, type: 'free_service', value: 'olaplex' },
      { id: 2, name: '15% rabais sur coloration', points_required: 400, type: 'discount_percent', value: 15 },
      { id: 3, name: 'Coupe et brushing', points_required: 800, type: 'free_service', value: 'coupe' },
      { id: 4, name: 'Balayage complet signature MAÉT', points_required: 2000, type: 'free_service', value: 'signature' },
    ],
    referralMessage: 'Rejoins MAÉT Salon et obtiens 75 points gratuits!',
    phone: '418-624-4222', address: '1255 boul Lebourgneuf, Suite 130, Québec',
  },

  'chaise-a-gustave': {
    businessName: 'La Chaise à Gustave', slug: 'chaise-a-gustave', tagline: 'Salon de coiffure et barbershop chaleureux de Lebourgneuf',
    logo: './images/chaise-a-gustave/logo.png', logoLight: './images/chaise-a-gustave/logo.png', favicon: '💺',
    heroImage: './images/chaise-a-gustave/hero.jpg',
    galleryImages: [],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Gustave',
    theme: { primary: '#2B2118', primaryLight: '#453930', accent: '#9B804A', accentLight: '#B6986A', accentDark: '#7D6538', bg: '#F4EDE3', font: '"Lora", Georgia, serif' },
    rewards: [
      { id: 1, name: 'Shampoing-mise en plis', points_required: 180, type: 'free_service', value: 'brushing' },
      { id: 2, name: 'Coupe homme ou barbe', points_required: 350, type: 'free_service', value: 'coupe' },
      { id: 3, name: '15$ rabais sur coloration', points_required: 700, type: 'discount_fixed', value: 15 },
      { id: 4, name: 'Balayage complet + soin', points_required: 1800, type: 'free_service', value: 'balayage' },
    ],
    referralMessage: 'Rejoins La Chaise à Gustave et obtiens 75 points gratuits!',
    phone: '418-626-7000', address: '675 rue des Rocailles, Lebourgneuf, Québec',
  },

  'ukcut': {
    businessName: 'Chez UKCUT Barbershop', slug: 'ukcut', tagline: 'Barbershop urbain Saint-Joseph, coupes et tresses avec ou sans rendez-vous',
    favicon: '💈',
    heroImage: './images/ukcut/hero.jpg',
    galleryImages: ['./images/ukcut/gallery1.jpg', './images/ukcut/gallery2.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points UKCUT',
    theme: { primary: '#111111', primaryLight: '#2C2C2C', accent: '#C8A464', accentLight: '#DCBE85', accentDark: '#A68547', bg: '#F2EFE9', font: '"Inter", system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Taille de barbe', points_required: 150, type: 'free_service', value: 'barbe' },
      { id: 2, name: '10% sur service de tresses', points_required: 350, type: 'discount_percent', value: 10 },
      { id: 3, name: 'Coupe homme junior', points_required: 700, type: 'free_service', value: 'coupe' },
      { id: 4, name: 'Coupe master + barbe + soin', points_required: 1500, type: 'free_service', value: 'master' },
    ],
    referralMessage: 'Rejoins UKCUT et obtiens 75 points gratuits!',
    phone: '418-476-1804', address: '786 rue Saint-Joseph Est, Saint-Roch, Québec',
  },

  'fauve': {
    businessName: 'Fauve Barbershop', slug: 'fauve', tagline: 'Le barbier premium où chaque coupe raconte ton histoire',
    logo: './images/fauve/logo.svg', logoLight: './images/fauve/logo.svg', favicon: '🦁',
    heroImage: './images/fauve/hero.jpg',
    galleryImages: ['./images/fauve/gallery1.jpg', './images/fauve/gallery2.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Fauve',
    theme: { primary: '#2C332F', primaryLight: '#474E4A', accent: '#733B2C', accentLight: '#945544', accentDark: '#5B2C1F', bg: '#F2E6D2', font: '"Inter", system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Shampoing premium', points_required: 150, type: 'free_service', value: 'shampoing' },
      { id: 2, name: 'Taille de barbe signature', points_required: 350, type: 'free_service', value: 'barbe' },
      { id: 3, name: 'Coupe classique Fauve', points_required: 700, type: 'free_service', value: 'coupe' },
      { id: 4, name: 'Expérience complète coupe + barbe + rasage', points_required: 1800, type: 'free_service', value: 'complete' },
    ],
    referralMessage: 'Rejoins Fauve Barbershop et obtiens 75 points gratuits!',
    phone: '418-619-6169', address: '477 chemin Vire-Crêpes, Saint-Nicolas, Lévis',
  },

  'beaute-integrale': {
    businessName: 'Beauté Intégrale', slug: 'beaute-integrale', tagline: '35 ans d\'expertise esthétique pour révéler votre beauté authentique',
    logo: './images/beaute-integrale/logo.png', logoLight: './images/beaute-integrale/logo.png', favicon: '✨',
    heroImage: './images/beaute-integrale/hero.jpg',
    galleryImages: ['./images/beaute-integrale/gallery1.jpg', './images/beaute-integrale/gallery2.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Beauté',
    theme: { primary: '#1A1A1A', primaryLight: '#333333', accent: '#C9A87C', accentLight: '#DEC099', accentDark: '#A8895F', bg: '#F5F2EC', font: '"Playfair Display", Georgia, serif' },
    rewards: [
      { id: 1, name: 'Consultation personnalisée', points_required: 200, type: 'free_service', value: 'consultation' },
      { id: 2, name: 'Soin visage signature Beauté Intégrale', points_required: 400, type: 'free_service', value: 'facial' },
      { id: 3, name: 'Protocole anti-âge avancé', points_required: 800, type: 'free_service', value: 'antiage' },
      { id: 4, name: 'Carte-cadeau 100$ sur soin au choix', points_required: 2000, type: 'discount_fixed', value: 100 },
    ],
    referralMessage: 'Rejoins Beauté Intégrale et obtiens 75 points gratuits!',
    phone: '418-626-8359', address: '8335 boul Henri-Bourassa, Québec',
  },

  'studio-n20': {
    businessName: 'Le Studio N°20', slug: 'studio-n20', tagline: 'Studio lash & sourcils + académie, pour un regard qui parle',
    logo: './images/studio-n20/logo.png', logoLight: './images/studio-n20/logo.png', favicon: '✨',
    heroImage: './images/studio-n20/hero.png',
    galleryImages: ['./images/studio-n20/gallery1.png', './images/studio-n20/gallery2.png'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points N°20',
    theme: { primary: '#2B2B2B', primaryLight: '#454545', accent: '#CBAD77', accentLight: '#DFC497', accentDark: '#A98D5A', bg: '#F8F4ED', font: '"Cormorant Garamond", Georgia, serif' },
    rewards: [
      { id: 1, name: 'Teinture de sourcils', points_required: 180, type: 'free_service', value: 'teinture' },
      { id: 2, name: 'Pose de cils classique', points_required: 400, type: 'free_service', value: 'cils' },
      { id: 3, name: 'Lash lift + teinture signature', points_required: 700, type: 'free_service', value: 'lashlift' },
      { id: 4, name: 'Formation découverte à l\'académie N°20', points_required: 2000, type: 'free_service', value: 'academie' },
    ],
    referralMessage: 'Rejoins Le Studio N°20 et obtiens 75 points gratuits!',
    phone: '581-741-8981', address: '79 chemin Sainte-Foy, Québec',
  },

  'manon-simard': {
    businessName: 'Institut de Beauté Manon Simard', slug: 'manon-simard', tagline: 'Votre institut de beauté technologique au cœur de Beauport',
    logo: './images/manon-simard/logo.png', logoLight: './images/manon-simard/logo.png', favicon: '💎',
    heroImage: './images/manon-simard/hero.jpg',
    galleryImages: ['./images/manon-simard/gallery1.jpg', './images/manon-simard/gallery2.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Manon Simard',
    theme: { primary: '#15779B', primaryLight: '#3A97BB', accent: '#0D4E66', accentLight: '#1F6E8C', accentDark: '#083749', bg: '#F4F4F4', font: '"Inter", system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Manucure classique', points_required: 180, type: 'free_service', value: 'manucure' },
      { id: 2, name: 'Soin visage GM Collin ou Yon-Ka', points_required: 400, type: 'free_service', value: 'facial' },
      { id: 3, name: 'Photorajeunissement ou microdermabrasion', points_required: 800, type: 'free_service', value: 'photo' },
      { id: 4, name: 'Forfait visage + massothérapie complet', points_required: 1800, type: 'free_service', value: 'forfait' },
    ],
    referralMessage: 'Rejoins l\'Institut Manon Simard et obtiens 75 points gratuits!',
    phone: '418-661-0994', address: 'Promenades Beauport, Québec',
  },

  'le-milorde': {
    businessName: 'Le Milorde', slug: 'le-milorde', tagline: 'Nail bar premium à Saint-Roch, là où le soin devient rituel',
    logo: './images/le-milorde/logo.png', logoLight: './images/le-milorde/logo.png', favicon: '💅',
    heroImage: './images/le-milorde/hero.jpg',
    galleryImages: ['./images/le-milorde/gallery1.jpg', './images/le-milorde/gallery2.jpg'],
    pointsPerDollar: 10, referralBonus: 75, visitBonus: 25, pointsLabel: 'Points Milorde',
    theme: { primary: '#121212', primaryLight: '#2C2C2C', accent: '#334FB4', accentLight: '#556FC8', accentDark: '#24388C', bg: '#F3F0E8', font: '"Inter", system-ui, sans-serif' },
    rewards: [
      { id: 1, name: 'Huile à cuticules Gelcare', points_required: 150, type: 'free_service', value: 'huile' },
      { id: 2, name: 'Manucure gel Gelcare signature', points_required: 350, type: 'free_service', value: 'manucure' },
      { id: 3, name: 'Lash lift classique ou coréen', points_required: 700, type: 'free_service', value: 'lashlift' },
      { id: 4, name: 'Forfait ongles + rehaussement cils', points_required: 1800, type: 'free_service', value: 'forfait' },
    ],
    referralMessage: 'Rejoins Le Milorde et obtiens 75 points gratuits!',
    phone: '418-614-4154', address: '539 rue Saint-Joseph Est, Saint-Roch, Québec',
  },
};

// Detect tenant from URL: ?tenant=slug or subdomain
function detectTenant() {
  const params = new URLSearchParams(window.location.search);
  const tenantParam = params.get('tenant');
  if (tenantParam && configs[tenantParam]) return tenantParam;

  // Check subdomain
  const host = window.location.hostname;
  const sub = host.split('.')[0];
  if (configs[sub]) return sub;

  // Default
  return 'institut-epilation';
}

const currentTenant = detectTenant();
export const config = configs[currentTenant];

// Apply theme CSS variables
export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme.primary) root.style.setProperty('--primary', theme.primary);
  if (theme.primaryLight) root.style.setProperty('--primary-light', theme.primaryLight);
  if (theme.accent) root.style.setProperty('--accent', theme.accent);
  if (theme.accentLight) root.style.setProperty('--accent-light', theme.accentLight);
  if (theme.accentDark) root.style.setProperty('--accent-dark', theme.accentDark);
  if (theme.bg) root.style.setProperty('--bg', theme.bg);
  if (theme.font) root.style.setProperty('--font', theme.font);
}

export default config;
