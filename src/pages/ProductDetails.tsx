import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const ProductDetailsPage: React.FC = () => {
  const { productId, id } = useParams<{ productId?: string; id?: string }>();
  const targetId = productId || id || 'my-growth-journal';

  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();

  const product = products.find((p) => p.id === targetId) || products[0];

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');

  const bookmarked = isInWishlist(product.id);

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 3);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-slate-900 font-sans flex flex-col justify-between selection:bg-sky-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Link to="/dashboard" className="hover:text-sky-600">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-sky-600">Shop</Link>
          <span>/</span>
          <span className="text-slate-700 truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* MAIN PRODUCT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: GALLERY IMAGES */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-md">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-sm cursor-pointer ${
                  bookmarked ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
                }`}
                title={bookmarked ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <svg className="w-5 h-5" fill={bookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                </svg>
              </button>
            </div>

            {/* Thumbnails */}
            {product.secondaryImages && product.secondaryImages.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedImage(product.image)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === product.image ? 'border-sky-500 ring-2 ring-sky-300/40' : 'border-slate-200'
                  }`}
                >
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </button>
                {product.secondaryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImage === img ? 'border-sky-500 ring-2 ring-sky-300/40' : 'border-slate-200'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS & ACTIONS */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-sky-100/80 text-sky-700 text-xs font-bold uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-slate-500 italic">
                {product.tagline}
              </p>
            </div>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <span>★ {product.rating}</span>
                <span className="text-slate-400">({product.reviewCount} verified reviews)</span>
              </div>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                In Stock & Ready to Ship
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-extrabold text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description highlight */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 text-xs text-slate-700 leading-relaxed font-serif">
              "{product.description}"
            </div>

            {/* QUANTITY SELECTOR & BUY BUTTONS */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center bg-white border border-slate-200 rounded-2xl px-3 py-1.5 shadow-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-900 font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-900 font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-sky-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Buy Now 🤍</span>
                </button>
              </div>
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-500">
              <div className="p-3 rounded-2xl bg-white border border-slate-200/60 space-y-1">
                <p className="font-bold text-slate-800">🚚 Fast Shipping</p>
                <p className="text-[10px]">Ships in 24 hours</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200/60 space-y-1">
                <p className="font-bold text-slate-800">🤍 100% Intentional</p>
                <p className="text-[10px]">Faith-crafted quality</p>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200/60 space-y-1">
                <p className="font-bold text-slate-800">🔒 Secure Checkout</p>
                <p className="text-[10px]">Encrypted & safe</p>
              </div>
            </div>

          </div>

        </div>

        {/* DETAILED TABS: DESCRIPTION, SPECIFICATIONS, REVIEWS */}
        <section className="space-y-6 pt-8 border-t border-sky-100">
          <div className="flex items-center gap-4 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                activeTab === 'description'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Product Description
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                activeTab === 'details'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Product Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Customer Reviews ({product.reviews.length})
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <p className="text-slate-700 text-sm leading-relaxed">
                  {product.longDescription}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Key Features:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-sky-500 font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {product.details.format && (
                  <div className="p-3 rounded-xl bg-slate-50 flex justify-between">
                    <span className="text-slate-500">Format:</span>
                    <span className="font-bold text-slate-800">{product.details.format}</span>
                  </div>
                )}
                {product.details.pages && (
                  <div className="p-3 rounded-xl bg-slate-50 flex justify-between">
                    <span className="text-slate-500">Page Count:</span>
                    <span className="font-bold text-slate-800">{product.details.pages} pages</span>
                  </div>
                )}
                {product.details.dimensions && (
                  <div className="p-3 rounded-xl bg-slate-50 flex justify-between">
                    <span className="text-slate-500">Dimensions:</span>
                    <span className="font-bold text-slate-800">{product.details.dimensions}</span>
                  </div>
                )}
                {product.details.isbn && (
                  <div className="p-3 rounded-xl bg-slate-50 flex justify-between">
                    <span className="text-slate-500">ISBN:</span>
                    <span className="font-bold text-slate-800">{product.details.isbn}</span>
                  </div>
                )}
                {product.details.language && (
                  <div className="p-3 rounded-xl bg-slate-50 flex justify-between">
                    <span className="text-slate-500">Language:</span>
                    <span className="font-bold text-slate-800">{product.details.language}</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {product.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {product.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl bg-sky-50/40 border border-sky-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-900">{rev.userName}</span>
                            {rev.verified && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400">{rev.date}</span>
                        </div>
                        <div className="text-amber-500 text-xs font-bold">
                          {'★'.repeat(rev.rating)}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-serif">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No reviews yet for this product. Be the first to leave one!</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6 pt-8">
            <h3 className="font-editorial text-2xl font-bold text-slate-900">
              You May Also Love 🤍
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="group rounded-3xl bg-white border border-slate-200/80 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100">
                      <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <Link to={`/shop/${rel.id}`} className="block">
                      <h4 className="font-editorial text-base font-bold text-slate-900 hover:text-sky-600 line-clamp-1">
                        {rel.name}
                      </h4>
                    </Link>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-slate-900">${rel.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(rel)}
                      className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
