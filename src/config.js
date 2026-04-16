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
