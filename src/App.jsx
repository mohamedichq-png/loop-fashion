import React, { useEffect } from 'react';
import { useStore } from './context/StoreContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import CookieBanner from './components/CookieBanner';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import SearchPage from './pages/SearchPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import OurStoryPage from './pages/OurStoryPage';
import EngagementsPage from './pages/EngagementsPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import ShippingPage from './pages/ShippingPage';
import ReturnsPage from './pages/ReturnsPage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminRoute from './pages/AdminRoute';

export default function App() {
  const { currentPath } = useStore();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  const cleanPath = currentPath.split('?')[0].replace(/\/+$/, '') || '/';

  // Dedicated Private Admin Area (Isolated from public header/footer)
  if (cleanPath === '/admin') {
    return (
      <div className="site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AdminRoute />
        <Toast />
      </div>
    );
  }

  // Route Resolver for the 29 specified routes
  const renderRoute = () => {
    const path = cleanPath;

    // 1. Homepage
    if (path === '/') return <Home />;

    // 2. Shop All
    if (path === '/boutique') return <Shop categorySlug="boutique" />;

    // 3. New arrivals
    if (path === '/nouveautes') return <Shop categorySlug="nouveautes" />;

    // 4. Clothing
    if (path === '/vetements') return <Shop categorySlug="vetements" />;

    // 5. Dresses
    if (path === '/robes') return <Shop categorySlug="robes" />;

    // 6. Tops & Shirts
    if (path === '/hauts') return <Shop categorySlug="hauts" />;

    // 7. Jackets & Blazers
    if (path === '/vestes-blazers') return <Shop categorySlug="vestes-blazers" />;

    // 8. Trousers & Jeans
    if (path === '/pantalons-jeans') return <Shop categorySlug="pantalons-jeans" />;

    // 9. Knitwear
    if (path === '/maille') return <Shop categorySlug="maille" />;

    // 10. Vintage collection
    if (path === '/vintage') return <Shop categorySlug="vintage" />;

    // 11. Handbags
    if (path === '/sacs') return <Shop categorySlug="sacs" />;

    // 12. Accessories
    if (path === '/accessoires') return <Shop categorySlug="accessoires" />;

    // 13. Product Details: /produit/[slug]
    if (path.startsWith('/produit/')) {
      const slug = path.replace('/produit/', '');
      return <ProductDetail slug={slug} />;
    }

    // 14. Search results
    if (path === '/recherche') return <SearchPage />;

    // 15. Wishlist
    if (path === '/favoris') return <WishlistPage />;

    // 16. Shopping cart
    if (path === '/panier') return <CartPage />;

    // 17. Checkout
    if (path === '/commande') return <CheckoutPage />;

    // 18. Customer account
    if (path === '/compte') return <AccountPage />;

    // 19. Our story
    if (path === '/notre-histoire') return <OurStoryPage />;

    // 20. Sustainability & Second-Hand Commitments
    if (path === '/engagements') return <EngagementsPage />;

    // 21. Contact
    if (path === '/contact') return <ContactPage />;

    // 22. FAQ
    if (path === '/faq') return <FaqPage />;

    // 23. Shipping & Delivery
    if (path === '/livraison') return <ShippingPage />;

    // 24. Returns & Refunds
    if (path === '/retours') return <ReturnsPage />;

    // 25. Privacy Policy
    if (path === '/confidentialite') return <LegalPage type="confidentialite" />;

    // 26. Terms & Conditions
    if (path === '/conditions-generales') return <LegalPage type="conditions-generales" />;

    // 27. Legal Notices
    if (path === '/mentions-legales') return <LegalPage type="mentions-legales" />;

    // 28. Cookie Preferences
    if (path === '/cookies') return <LegalPage type="cookies" />;

    // 29. Custom 404 Page
    return <NotFoundPage />;
  };

  return (
    <div className="site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flexGrow: 1 }}>
        {renderRoute()}
      </main>
      <Footer />

      {/* Global Elements */}
      <CartDrawer />
      <QuickViewModal />
      <CookieBanner />
      <Toast />
    </div>
  );
}
