require('dotenv').config();
const mongoose = require('mongoose');
const RequestType = require('../src/models/RequestType');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/support-api';

const seed = async () => {
  try {
    await mongoose.connect(uri);
    console.log('✅ Connecté à MongoDB pour seed');

    await RequestType.deleteMany({});

    const data = [
      {
        code: 'TECH_ISSUE',
        name: 'Problème technique',
        description: 'Incident ou panne technique sur le produit ou service.',
        priority: 'high',
        category: 'support',
        estimatedResponseTime: 4,
      },
      {
        code: 'BILLING_QUESTION',
        name: 'Question de facturation',
        description: 'Question sur une facture, un paiement ou un remboursement.',
        priority: 'medium',
        category: 'billing',
        estimatedResponseTime: 24,
      },
      {
        code: 'ACCOUNT_CHANGE',
        name: 'Demande de modification de compte',
        description: 'Modification des informations liées au compte utilisateur.',
        priority: 'medium',
        category: 'account',
        estimatedResponseTime: 12,
      },
      {
        code: 'FEATURE_REQUEST',
        name: 'Demande de fonctionnalité',
        description: 'Suggestion ou demande pour une nouvelle fonctionnalité.',
        priority: 'low',
        category: 'product',
        estimatedResponseTime: 72,
      },
      {
        code: 'COMPLAINT',
        name: 'Réclamation',
        description: 'Réclamation client concernant le service ou le produit.',
        priority: 'critical',
        category: 'customer-care',
        estimatedResponseTime: 24,
      },
    ];

    await RequestType.insertMany(data);
    console.log('✅ Données initiales insérées');

    await mongoose.disconnect();
    console.log('🔌 Déconnecté de MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed', error);
    process.exit(1);
  }
};

seed();
