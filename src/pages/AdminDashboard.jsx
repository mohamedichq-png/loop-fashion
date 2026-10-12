import React, { useState, useEffect } from 'react';
import { 
  Package, 
  ShoppingBag, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Upload, 
  CheckCircle2, 
  Clock, 
  X, 
  Save, 
  LogOut, 
  RefreshCw, 
  AlertTriangle,
  Sliders,
  DollarSign,
  TrendingUp,
  Box,
  Layers,
  Sparkles
} from 'lucide-react';
import Logo from '../components/Logo';
import { useStore } from '../context/StoreContext';

export default function AdminDashboard({ adminUser, token, onLogout, onProductsUpdated }) {
  const { navigate } = useStore();
  // Navigation tabs: 'products' | 'orders' | 'inventory'
  const [activeTab, setActiveTab] = useState('products');

  // Products state
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productSearch, setProductSearch] = useState('');
  const [productFilter, setProductFilter] = useState('all'); // all | published | drafts | in-stock | out-of-stock
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Orders state
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Modal State for Product Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null = new product
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'vestes-blazers',
    categoryLabel: 'Vestes & Blazers',
    collections: ['nouveautes'],
    price: '',
    comparePrice: '',
    sizes: ['38 (FR)'],
    sizeInput: '38 (FR)',
    condition: 'Excellent état',
    conditionDetails: '',
    material: '',
    color: '',
    stock: 1,
    isUnique: true,
    sku: '',
    status: 'Disponible',
    isPublished: true,
    era: '',
    origin: 'Fabriqué en France',
    weight: '650g',
    stylingTip: '',
    description: '',
    images: ['']
  });

  // Fetch products from server
  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const res = await fetch('/api/admin/products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts(data.products || []);
        if (onProductsUpdated) onProductsUpdated();
      } else if (res.status === 401) {
        onLogout();
      }
    } catch (err) {
      console.error('Error fetching admin products', err);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // Fetch orders from server
  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.orders || []);
      } else if (res.status === 401) {
        onLogout();
      }
    } catch (err) {
      console.error('Error fetching admin orders', err);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [token]);

  // Handle open create modal
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      brand: '',
      category: 'vestes-blazers',
      categoryLabel: 'Vestes & Blazers',
      collections: ['nouveautes'],
      price: '',
      comparePrice: '',
      sizes: ['38 (FR)'],
      sizeInput: '38 (FR)',
      condition: 'Excellent état',
      conditionDetails: 'Nettoyé par des spécialistes, aucune tâche ni altération du tissu.',
      material: '100% Laine Vierge',
      color: 'Brun Miel & Écru',
      stock: 1,
      isUnique: true,
      sku: `LP-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Disponible',
      isPublished: true,
      era: 'Années 1980',
      origin: 'Fabriqué en France',
      weight: '650g',
      stylingTip: 'À porter ceinturé ou avec un denim brut.',
      description: 'Pièce d\'archive sélectionnée pour sa coupe impeccable et son étoffe remarquable.',
      images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80']
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Handle open edit modal
  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      brand: product.brand || '',
      category: product.category || 'vestes-blazers',
      categoryLabel: product.categoryLabel || 'Vestes & Blazers',
      collections: product.collections || ['vintage'],
      price: product.price || '',
      comparePrice: product.comparePrice || '',
      sizes: product.sizes || ['Unique'],
      sizeInput: (product.sizes || []).join(', '),
      condition: product.condition || 'Excellent état',
      conditionDetails: product.conditionDetails || '',
      material: product.material || '',
      color: product.color || '',
      stock: product.stock !== undefined ? product.stock : 1,
      isUnique: product.isUnique !== undefined ? product.isUnique : true,
      sku: product.sku || '',
      status: product.status || 'Disponible',
      isPublished: product.isPublished !== false,
      era: product.era || '',
      origin: product.origin || 'France',
      weight: product.weight || '650g',
      stylingTip: product.stylingTip || '',
      description: product.description || '',
      images: product.images && product.images.length > 0 ? product.images : ['']
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Handle image upload from file picker
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result;
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            base64,
            mimeType: file.type,
            filename: file.name
          })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          // Prepend uploaded image
          setFormData(prev => ({
            ...prev,
            images: [data.url, ...prev.images.filter(Boolean)]
          }));
        } else {
          alert(data.error || 'Erreur lors du téléversement.');
        }
        setUploadLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setUploadLoading(false);
    }
  };

  // Submit product create/edit
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');

    const parsedSizes = formData.sizeInput.split(',').map(s => s.trim()).filter(Boolean);
    const categoryLabels = {
      'vestes-blazers': 'Vestes & Blazers',
      'robes': 'Robes',
      'hauts': 'Hauts & Chemises',
      'pantalons-jeans': 'Pantalons & Jeans',
      'maille': 'Maille & Tricot',
      'sacs': 'Maroquinerie & Sacs',
      'accessoires': 'Accessoires & Carrés'
    };

    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
      stock: parseInt(formData.stock, 10) || 0,
      sizes: parsedSizes.length > 0 ? parsedSizes : ['Unique'],
      categoryLabel: categoryLabels[formData.category] || formData.category,
      images: formData.images.filter(Boolean)
    };

    try {
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}` 
        : '/api/admin/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setFormError(data.error || 'Erreur lors de la sauvegarde du produit.');
        setFormLoading(false);
        return;
      }

      setIsModalOpen(false);
      await fetchProducts();
    } catch (err) {
      console.error(err);
      setFormError('Erreur réseau.');
    } finally {
      setFormLoading(false);
    }
  };

  // Toggle Publish
  const handleTogglePublish = async (productId) => {
    try {
      const res = await fetch(`/api/admin/products/${productId}/publish`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (product) => {
    if (!window.confirm(`Confirmez-vous la suppression définitive de « ${product.name} » ?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    // Search
    if (productSearch) {
      const q = productSearch.toLowerCase();
      const match = (
        p.name.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
      if (!match) return false;
    }
    // Filter status
    if (productFilter === 'published' && p.isPublished === false) return false;
    if (productFilter === 'drafts' && p.isPublished !== false) return false;
    if (productFilter === 'in-stock' && (p.stock <= 0 || p.status === 'Vendu')) return false;
    if (productFilter === 'out-of-stock' && (p.stock > 0 && p.status !== 'Vendu')) return false;
    // Category
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;

    return true;
  });

  // Calculate Quick Stats
  const totalProducts = products.length;
  const publishedCount = products.filter(p => p.isPublished !== false).length;
  const draftCount = totalProducts - publishedCount;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  return (
    <div className="admin-dashboard-view" style={{ minHeight: '100vh', backgroundColor: '#FAF8F4', paddingBottom: '6rem' }}>
      {/* Admin Top Navigation Bar */}
      <header 
        style={{
          backgroundColor: '#242424',
          color: '#F5F1E8',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '1rem 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 60
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Logo variant="light" size="small" showTagline={false} />
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '1rem' }}>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8FA88A', fontWeight: 600 }}>
                Espace Direction
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFF' }}>
                Console d'Administration
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.82rem', color: '#D5CCBE' }}>
              Connecté : <strong>{adminUser?.email || 'admin@loop-fashion.fr'}</strong>
            </span>
            <button
              onClick={() => navigate('/boutique')}
              className="btn btn-secondary"
              style={{
                borderColor: 'rgba(255,255,255,0.25)',
                color: '#FAF8F4',
                padding: '0.45rem 0.95rem',
                fontSize: '0.78rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Eye size={14} />
              <span>Voir la boutique</span>
            </button>
            <button
              onClick={onLogout}
              className="btn btn-secondary"
              style={{
                borderColor: 'rgba(255,255,255,0.25)',
                color: '#FFF',
                padding: '0.45rem 0.95rem',
                fontSize: '0.78rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <LogOut size={14} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="container" style={{ maxWidth: '1440px', paddingTop: '2.5rem' }}>
        {/* KPI Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }} className="admin-kpi-grid">
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '4px', border: '1px solid #E8E2D6', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B6862', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase' }}>
              <span>Pièces au Catalogue</span>
              <Package size={18} style={{ color: '#8FA88A' }} />
            </div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', fontWeight: 600, marginTop: '0.5rem', color: '#242424' }}>
              {totalProducts}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#8FA88A', marginTop: '0.25rem' }}>
              {publishedCount} en ligne &bull; {draftCount} brouillons
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '4px', border: '1px solid #E8E2D6', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B6862', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase' }}>
              <span>Commandes Clients</span>
              <ShoppingBag size={18} style={{ color: '#A65D43' }} />
            </div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', fontWeight: 600, marginTop: '0.5rem', color: '#242424' }}>
              {totalOrders}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#A65D43', marginTop: '0.25rem' }}>
              Historique complet enregistré
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '4px', border: '1px solid #E8E2D6', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B6862', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase' }}>
              <span>Chiffre d'Affaires</span>
              <TrendingUp size={18} style={{ color: '#8FA88A' }} />
            </div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', fontWeight: 600, marginTop: '0.5rem', color: '#242424' }}>
              {totalRevenue.toFixed(2)} €
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6B6862', marginTop: '0.25rem' }}>
              Ventes de pièces vintage TTC
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '4px', border: '1px solid #E8E2D6', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B6862', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase' }}>
              <span>État Base de Données</span>
              <Box size={18} style={{ color: '#5B7256' }} />
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '0.85rem', color: '#5B7256', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={18} />
              <span>Synchronisée</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#8E8A83', marginTop: '0.4rem' }}>
              Mise à jour storefront instantanée
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #E8E2D6', marginBottom: '2rem' }}>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '0.85rem 1.75rem',
              fontSize: '0.92rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'products' ? '#FFFFFF' : 'transparent',
              border: '1px solid',
              borderColor: activeTab === 'products' ? '#E8E2D6 #E8E2D6 #FFFFFF #E8E2D6' : 'transparent',
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              color: activeTab === 'products' ? '#A65D43' : '#6B6862',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '-1px'
            }}
          >
            <Package size={17} />
            <span>Gestion du Vestiaire & Produits ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '0.85rem 1.75rem',
              fontSize: '0.92rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'orders' ? '#FFFFFF' : 'transparent',
              border: '1px solid',
              borderColor: activeTab === 'orders' ? '#E8E2D6 #E8E2D6 #FFFFFF #E8E2D6' : 'transparent',
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              color: activeTab === 'orders' ? '#A65D43' : '#6B6862',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '-1px'
            }}
          >
            <ShoppingBag size={17} />
            <span>Commandes & Expéditions ({orders.length})</span>
          </button>
        </div>

        {/* ========================================================
            TAB 1: PRODUCTS MANAGEMENT
           ======================================================== */}
        {activeTab === 'products' && (
          <div>
            {/* Action Bar: Search, Filters, and New Product Button */}
            <div 
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.25rem 1.5rem',
                borderRadius: '4px',
                border: '1px solid #E8E2D6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}
            >
              {/* Search input */}
              <div style={{ position: 'relative', width: '320px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#8E8A83' }} />
                <input
                  type="text"
                  placeholder="Rechercher par nom, marque, SKU..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="form-input"
                  style={{ padding: '0.5rem 0.75rem 0.5rem 36px', fontSize: '0.82rem' }}
                />
              </div>

              {/* Status & Category Filters */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <select
                  value={productFilter}
                  onChange={(e) => setProductFilter(e.target.value)}
                  className="form-select"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.82rem', width: 'auto' }}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="published">Publiés uniquement</option>
                  <option value="drafts">Brouillons / Masqués</option>
                  <option value="in-stock">En stock disponible</option>
                  <option value="out-of-stock">Épuisés / Vendus</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="form-select"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.82rem', width: 'auto' }}
                >
                  <option value="all">Toutes les catégories</option>
                  <option value="vestes-blazers">Vestes & Blazers</option>
                  <option value="robes">Robes</option>
                  <option value="hauts">Hauts & Chemises</option>
                  <option value="pantalons-jeans">Pantalons & Jeans</option>
                  <option value="maille">Maille & Tricot</option>
                  <option value="sacs">Maroquinerie & Sacs</option>
                  <option value="accessoires">Accessoires</option>
                </select>

                <button 
                  onClick={fetchProducts}
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}
                  title="Rafraîchir"
                >
                  <RefreshCw size={14} />
                </button>
              </div>

              {/* Add Product Button */}
              <button
                onClick={handleOpenCreate}
                className="btn btn-terracotta"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
              >
                <Plus size={16} />
                <span>Ajouter une nouvelle pièce</span>
              </button>
            </div>

            {/* Products Table */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', border: '1px solid #E8E2D6', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              {isLoadingProducts ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: '#6B6862' }}>
                  Chargement des pièces...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: '#6B6862' }}>
                  Aucune pièce ne correspond aux filtres.
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead style={{ backgroundColor: '#FAF8F4', borderBottom: '1px solid #E8E2D6', color: '#6B6862', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.06em' }}>
                    <tr>
                      <th style={{ padding: '1rem 1.25rem' }}>Visuel</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Pièce & Marque</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Rayon</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Prix</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Stock</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Visibilité</th>
                      <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => {
                      const isPub = p.isPublished !== false && p.status !== 'Brouillon';
                      return (
                        <tr key={p.id} style={{ borderBottom: '1px solid #F5F1E8', transition: 'background-color 0.15s ease' }}>
                          <td style={{ padding: '1rem 1.25rem' }}>
                            <img
                              src={p.images?.[0] || 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=200&q=80'}
                              alt=""
                              style={{ width: '48px', height: '62px', objectFit: 'cover', borderRadius: '2px', border: '1px solid #E8E2D6' }}
                            />
                          </td>
                          <td style={{ padding: '1rem 1.25rem' }}>
                            <div style={{ fontSize: '0.72rem', color: '#A65D43', fontWeight: 600, textTransform: 'uppercase' }}>
                              {p.brand || 'Atelier Vintage'}
                            </div>
                            <div style={{ fontWeight: 600, color: '#242424', margin: '2px 0' }}>
                              {p.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#8E8A83' }}>
                              SKU : {p.sku || p.id} &bull; {p.sizes?.join(', ')} &bull; {p.condition}
                            </div>
                          </td>
                          <td style={{ padding: '1rem 1.25rem' }}>
                            <span style={{ backgroundColor: '#FAF8F4', padding: '3px 8px', borderRadius: '2px', border: '1px solid #E8E2D6', fontSize: '0.75rem' }}>
                              {p.categoryLabel || p.category}
                            </span>
                          </td>
                          <td style={{ padding: '1rem 1.25rem' }}>
                            <strong style={{ fontSize: '0.95rem', color: '#242424' }}>{p.price} €</strong>
                            {p.comparePrice && (
                              <div style={{ fontSize: '0.72rem', color: '#8E8A83', textDecoration: 'line-through' }}>
                                {p.comparePrice} €
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '1rem 1.25rem' }}>
                            {p.stock > 0 && p.status !== 'Vendu' ? (
                              <span className="badge badge-sage">
                                En stock ({p.stock})
                              </span>
                            ) : (
                              <span className="badge badge-terracotta">
                                Épuisé / Vendu
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '1rem 1.25rem' }}>
                            <button
                              onClick={() => handleTogglePublish(p.id)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '4px 8px',
                                borderRadius: '2px',
                                border: '1px solid',
                                borderColor: isPub ? '#8FA88A' : '#D5CCBE',
                                backgroundColor: isPub ? '#F0F4EF' : '#FAF8F4',
                                color: isPub ? '#5B7256' : '#8E8A83',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                              title={isPub ? "Cliquez pour dépublier (masquer de la boutique)" : "Cliquez pour publier sur la boutique"}
                            >
                              {isPub ? <Eye size={13} /> : <EyeOff size={13} />}
                              <span>{isPub ? 'En ligne' : 'Masqué / Brouillon'}</span>
                            </button>
                          </td>
                          <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                              <button
                                onClick={() => handleOpenEdit(p)}
                                className="action-btn"
                                style={{ padding: '6px' }}
                                title="Modifier"
                              >
                                <Edit3 size={15} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p)}
                                className="action-btn"
                                style={{ padding: '6px', color: '#A65D43' }}
                                title="Supprimer"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: ORDERS MANAGEMENT
           ======================================================== */}
        {activeTab === 'orders' && (
          <div>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', border: '1px solid #E8E2D6', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              {isLoadingOrders ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: '#6B6862' }}>
                  Chargement des commandes...
                </div>
              ) : orders.length === 0 ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: '#6B6862' }}>
                  Aucune commande enregistrée pour le moment.
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead style={{ backgroundColor: '#FAF8F4', borderBottom: '1px solid #E8E2D6', color: '#6B6862', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.06em' }}>
                    <tr>
                      <th style={{ padding: '1rem 1.25rem' }}>Réf. Commande</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Date</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Cliente</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Articles</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Total TTC</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Transport</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Statut Expédition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} style={{ borderBottom: '1px solid #F5F1E8' }}>
                        <td style={{ padding: '1.25rem', fontWeight: 700, color: '#A65D43' }}>
                          {order.id}
                        </td>
                        <td style={{ padding: '1.25rem', color: '#6B6862' }}>
                          {order.date}
                        </td>
                        <td style={{ padding: '1.25rem' }}>
                          <strong style={{ color: '#242424' }}>
                            {order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : order.shippingAddress?.firstName ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}` : 'Client'}
                          </strong>
                          <div style={{ fontSize: '0.75rem', color: '#8E8A83' }}>
                            {order.customer?.email || 'email@client.fr'}
                          </div>
                        </td>
                        <td style={{ padding: '1.25rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            {(order.items || []).map((it, idx) => (
                              <span key={idx} style={{ fontSize: '0.78rem' }}>
                                &bull; {it.name} ({it.selectedSize || it.size})
                              </span>
                            ))}
                          </div>
                        </td>
                        <td style={{ padding: '1.25rem', fontWeight: 700, fontSize: '0.95rem' }}>
                          {Number(order.total).toFixed(2)} €
                        </td>
                        <td style={{ padding: '1.25rem', textTransform: 'capitalize', color: '#6B6862' }}>
                          {order.shippingMethod === 'colissimo' ? 'Colissimo 48h' : order.shippingMethod === 'relay' ? 'Mondial Relay' : 'Showroom Paris'}
                        </td>
                        <td style={{ padding: '1.25rem' }}>
                          <select
                            value={order.status || 'En préparation'}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className="form-select"
                            style={{
                              padding: '4px 8px',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              borderColor: order.status === 'Livrée' ? '#8FA88A' : order.status === 'Expédiée' ? '#A65D43' : '#D5CCBE',
                              backgroundColor: order.status === 'Livrée' ? '#F0F4EF' : '#FFFFFF'
                            }}
                          >
                            <option value="En attente">En attente</option>
                            <option value="En préparation">En préparation</option>
                            <option value="Expédiée">Expédiée (Numéro suivi)</option>
                            <option value="Livrée">Livrée</option>
                            <option value="Annulée">Annulée</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          MODAL: CREATE / EDIT PRODUCT
         ======================================================== */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '860px', padding: '2.5rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #E8E2D6', paddingBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A65D43', fontWeight: 600 }}>
                  {editingProduct ? 'Édition de vêtement' : 'Nouvelle acquisition'}
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 600, margin: '0.2rem 0' }}>
                  {editingProduct ? `Modifier « ${editingProduct.name} »` : 'Ajouter une pièce d\'archive au vestiaire'}
                </h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="action-btn">
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div style={{ padding: '0.85rem', backgroundColor: '#FDF2F0', color: '#A65D43', borderRadius: '3px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveProduct}>
              {/* Row 1: Nom & Marque */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Nom du vêtement *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex: Blazer en Laine Pied-de-Poule Vintage"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Maison / Marque d'archive</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="ex: Yves Saint Laurent Vintage"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Row 2: Catégorie, Prix, Prix comparatif */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Rayon / Catégorie *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-select"
                  >
                    <option value="vestes-blazers">Vestes & Blazers</option>
                    <option value="robes">Robes</option>
                    <option value="hauts">Hauts & Chemises</option>
                    <option value="pantalons-jeans">Pantalons & Jeans</option>
                    <option value="maille">Maille & Tricot</option>
                    <option value="sacs">Maroquinerie & Sacs</option>
                    <option value="accessoires">Accessoires & Carrés</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Prix de vente (€) *</label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="135"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Prix estimé origine (€)</label>
                  <input
                    type="number"
                    step="1"
                    value={formData.comparePrice}
                    onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value })}
                    placeholder="280"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Row 3: Tailles, État, Stock */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Tailles (séparées par virgules)</label>
                  <input
                    type="text"
                    value={formData.sizeInput}
                    onChange={(e) => setFormData({ ...formData, sizeInput: e.target.value })}
                    placeholder="38 (FR), M"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">État certifié</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="form-select"
                  >
                    <option value="État neuf avec étiquette">État neuf avec étiquette</option>
                    <option value="Excellent état">Excellent état</option>
                    <option value="Très bon état">Très bon état</option>
                    <option value="Bon état (détails documentés)">Bon état (détails documentés)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Quantité stock</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Row 4: Matière, Couleur, Époque */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Composition & Matières</label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="ex: 100% Laine Vierge, doublure soie"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Harmonie couleur</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="ex: Terracotta & Sauge"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Époque d'archive</label>
                  <input
                    type="text"
                    value={formData.era}
                    onChange={(e) => setFormData({ ...formData, era: e.target.value })}
                    placeholder="ex: Années 1980"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Image Upload & URL */}
              <div style={{ backgroundColor: '#FAF8F4', padding: '1.25rem', borderRadius: '4px', border: '1px solid #E8E2D6', marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
                  Photographie principale de la pièce
                </label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <label className="btn btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                    <Upload size={15} />
                    <span>{uploadLoading ? 'Téléversement...' : 'Téléverser une image locale'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      disabled={uploadLoading}
                    />
                  </label>
                  <span style={{ fontSize: '0.78rem', color: '#8E8A83' }}>ou URL directe :</span>
                  <input
                    type="url"
                    value={formData.images[0] || ''}
                    onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                    placeholder="https://..."
                    className="form-input"
                    style={{ flexGrow: 1 }}
                  />
                </div>

                {formData.images[0] && (
                  <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                      src={formData.images[0]}
                      alt="Aperçu"
                      style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '2px', border: '1px solid #E8E2D6' }}
                    />
                    <span style={{ fontSize: '0.75rem', color: '#5B7256' }}>Image configurée ✓</span>
                  </div>
                )}
              </div>

              {/* Description & Diagnostic */}
              <div className="form-group">
                <label className="form-label">Description éditoriale</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Diagnostic précis de l'état (coutures, doublures, boutons)</label>
                <input
                  type="text"
                  value={formData.conditionDetails}
                  onChange={(e) => setFormData({ ...formData, conditionDetails: e.target.value })}
                  className="form-input"
                />
              </div>

              {/* Visibility switch */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 0', borderTop: '1px solid #E8E2D6', marginBottom: '1.5rem' }}>
                <input
                  type="checkbox"
                  id="pub-checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: '#8FA88A' }}
                />
                <label htmlFor="pub-checkbox" style={{ fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
                  Publier immédiatement cette pièce sur la boutique en ligne publique
                </label>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="btn btn-primary"
                  style={{ padding: '0.85rem 2rem' }}
                >
                  <Save size={16} />
                  <span>{formLoading ? 'Enregistrement...' : editingProduct ? 'Enregistrer les modifications' : 'Créer et publier la pièce'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .admin-kpi-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .admin-kpi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
