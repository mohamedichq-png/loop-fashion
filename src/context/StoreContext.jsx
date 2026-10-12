import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';
import { translations } from '../data/translations';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Language & i18n
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('loop_lang') || 'fr';
  });

  const toggleLanguage = () => {
    setLang(prev => {
      const next = prev === 'fr' ? 'en' : 'fr';
      localStorage.setItem('loop_lang', next);
      return next;
    });
  };

  const t = (key) => {
    const dict = translations[lang] || translations.fr;
    return dict[key] || translations.fr[key] || key;
  };

  // Live dynamic product list from server DB (with fallback to default)
  const [productList, setProductList] = useState(products);

  const refreshProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          setProductList(data.products);
        }
      }
    } catch (err) {
      // Fallback gracefully to default catalog
      console.warn('[STORE] Server products fetch failed, using local catalog.', err);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('loop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('loop_wishlist');
      return saved ? JSON.parse(saved) : ["lp-001", "lp-011"];
    } catch {
      return ["lp-001", "lp-011"];
    }
  });

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in percent
  const [promoMessage, setPromoMessage] = useState(null);

  // Cart drawer & Quick view modal
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Search query & mobile menu
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Cookie Consent
  const [cookieConsent, setCookieConsent] = useState(() => {
    try {
      const saved = localStorage.getItem('loop_cookie_consent');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const saveCookieConsent = (preferences) => {
    setCookieConsent(preferences);
    localStorage.setItem('loop_cookie_consent', JSON.stringify(preferences));
  };

  // User Account State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('loop_user');
      return saved ? JSON.parse(saved) : {
        isLoggedIn: true,
        firstName: "Camille",
        lastName: "Laurent",
        email: "camille.laurent@paris-mode.fr",
        phone: "+33 6 12 34 56 78",
        addresses: [
          {
            id: 1,
            isDefault: true,
            title: "Domicile Paris",
            street: "24 Rue de Turenne",
            postalCode: "75003",
            city: "Paris",
            country: "France"
          }
        ],
        orders: [
          {
            id: "LP-2026-9041",
            date: "04 Octobre 2026",
            total: 135,
            status: "Livrée",
            items: [
              {
                id: "lp-001",
                name: "Blazer en Laine Pied-de-Poule Vintage",
                price: 135,
                image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",
                size: "38 (FR)"
              }
            ]
          }
        ]
      };
    } catch {
      return null;
    }
  });

  // Save cart & wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('loop_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('loop_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Cart operations
  const addToCart = (product, size) => {
    const selectedSize = size || (product.sizes ? product.sizes[0] : 'Unique');
    
    // Check if item is already in cart (for unique items)
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      if (product.isUnique) {
        showToast(
          lang === 'fr' 
            ? "Cette pièce unique est déjà dans votre panier !" 
            : "This one-of-a-kind piece is already in your bag!", 
          'info'
        );
        setIsCartOpen(true);
        return;
      }
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart(prev => [
        ...prev,
        {
          ...product,
          selectedSize,
          quantity: 1,
          addedAt: Date.now()
        }
      ]);
    }

    showToast(
      lang === 'fr' 
        ? `« ${product.name} » a été ajouté à votre panier` 
        : `"${product.name}" added to your bag`, 
      'success'
    );
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast(
      lang === 'fr' ? "Pièce retirée du panier" : "Item removed from bag",
      'info'
    );
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        if (item.isUnique && delta > 0) {
          showToast(
            lang === 'fr' 
              ? "Pièce unique d'archive : exemplaire unique disponible." 
              : "Archival piece: only 1 unique unit exists.", 
            'info'
          );
          return item;
        }
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BIENVENUE10' || clean === 'LOOP10') {
      setAppliedDiscount(10);
      setPromoMessage({
        type: 'success',
        text: lang === 'fr' ? "Privilège appliqué : -10% sur votre commande !" : "Privilege applied: -10% on your order!"
      });
      showToast(lang === 'fr' ? "Code BIENVENUE10 appliqué (-10%)" : "Code applied (-10%)", 'success');
      return true;
    } else if (clean === 'ARCHIVE15') {
      setAppliedDiscount(15);
      setPromoMessage({
        type: 'success',
        text: lang === 'fr' ? "Privilège appliqué : -15% sur votre commande !" : "Privilege applied: -15% on your order!"
      });
      showToast(lang === 'fr' ? "Code ARCHIVE15 appliqué (-15%)" : "Code applied (-15%)", 'success');
      return true;
    } else {
      setPromoMessage({
        type: 'error',
        text: lang === 'fr' ? "Ce code privilège n'est pas valide ou a expiré." : "This promo code is invalid or expired."
      });
      return false;
    }
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    const isPresent = wishlist.includes(productId);
    const product = products.find(p => p.id === productId);
    const prodName = product ? product.name : 'Pièce';

    if (isPresent) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast(
        lang === 'fr' ? `« ${prodName} » retiré de vos favoris` : `"${prodName}" removed from saved pieces`,
        'info'
      );
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast(
        lang === 'fr' ? `« ${prodName} » ajouté à vos favoris ♥` : `"${prodName}" saved to your favorites ♥`,
        'success'
      );
    }
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((cartSubtotal * (appliedDiscount / 100)) * 100) / 100;
  const discountedSubtotal = cartSubtotal - discountAmount;
  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - discountedSubtotal);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Router navigation helper
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname || '/';
  });

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <StoreContext.Provider
      value={{
        products: productList,
        refreshProducts,
        lang,
        setLang,
        toggleLanguage,
        t,
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        discountAmount,
        discountedSubtotal,
        appliedDiscount,
        promoCode,
        setPromoCode,
        promoMessage,
        applyPromo,
        freeShippingThreshold,
        remainingForFreeShipping,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        searchQuery,
        setSearchQuery,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toast,
        showToast,
        cookieConsent,
        saveCookieConsent,
        user,
        setUser,
        currentPath,
        navigate
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
