// Firebase Console में जाकर Firestore में 'products' collection में ये डेटा एड करें
// या फिर इस कोड को चलाएँ (बटन बनाकर)

const demoProducts = [
  {
    name: "स्मार्टफोन",
    description: "लैटेस्ट स्मार्टफोन 128GB स्टोरेज के साथ",
    price: 19999,
    category: "इलेक्ट्रॉनिक्स",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "लैपटॉप",
    description: "हाई परफॉर्मेंस लैपटॉप 8GB RAM",
    price: 45999,
    category: "इलेक्ट्रॉनिक्स",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "टी-शर्ट",
    description: "कॉटन टी-शर्ट मल्टीपल कलर्स में",
    price: 599,
    category: "कपड़े",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "किताब",
    description: "बेस्टसेलर बुक",
    price: 299,
    category: "किताबें",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "हेडफोन",
    description: "वायरलेस हेडफोन नॉइस कैंसलेशन के साथ",
    price: 2499,
    category: "इलेक्ट्रॉनिक्स",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "स्पोर्ट्स शू",
    description: "कम्फर्टेबल स्पोर्ट्स शूज",
    price: 3499,
    category: "खेल",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
  }
];

// इस फंक्शन को कहीं से कॉल करें (जैसे Admin पेज में बटन बनाकर)
async function addDemoProducts() {
  const { db } = require('../services/firebase');
  const { collection, addDoc } = require('firebase/firestore');
  
  try {
    for (const product of demoProducts) {
      await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: new Date().toISOString()
      });
    }
    alert('डेमो उत्पाद जोड़े गए!');
  } catch (error) {
    console.error('Error adding demo products:', error);
    alert('त्रुटि हुई!');
  }
}
