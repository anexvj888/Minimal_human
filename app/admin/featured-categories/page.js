'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Upload, CheckCircle, AlertCircle, Plus, Trash2, LayoutGrid } from 'lucide-react';
import AdminSidebar from '@/components/layouts/admin-sidebar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

const DEFAULT_CATEGORIES = [
  { id: 'men',          name: 'Men',          image: '/mens.webp' },
  { id: 'women',        name: 'Women',        image: '/womens.webp' },
  { id: 'new_arrivals', name: 'New Arrivals', image: '/new arrival.webp' },
];

export default function FeaturedCategoriesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [catSaved, setCatSaved] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [uploading, setUploading] = useState({});
  const [uploadStatus, setUploadStatus] = useState({});
  const [loadingCats, setLoadingCats] = useState(true);
  const fileRefs = useRef({});;

  // Load from DB on mount
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/featured-categories');
        const data = await res.json();
        if (Array.isArray(data.categories) && data.categories.length > 0) {
          setCategories(data.categories);
        }
      } catch {
        // silently fall back to defaults
      } finally {
        setLoadingCats(false);
      }
    }
    load();
  }, []);

  const addCategory = () => {
    const newId = `cat_${Date.now()}`;
    setCategories((prev) => [...prev, { id: newId, name: '', image: '' }]);
  };

  const removeCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCatName = (id, name) => {
    setCategories((prev) => prev.map((c) => c.id === id ? { ...c, name } : c));
  };

  const handleImageUpload = async (id, file) => {
    if (!file) return;
    setUploading((p) => ({ ...p, [id]: true }));
    setUploadStatus((p) => ({ ...p, [id]: null }));
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        setCategories((prev) => prev.map((c) => c.id === id ? { ...c, image: data.url } : c));
        setUploadStatus((p) => ({ ...p, [id]: 'success' }));
      } else throw new Error('Upload failed');
    } catch {
      setUploadStatus((p) => ({ ...p, [id]: 'error' }));
    } finally {
      setUploading((p) => ({ ...p, [id]: false }));
    }
  };

  const saveCategories = async () => {
    const valid = categories.filter((c) => c.name.trim() && c.image);
    setSaveError(null);
    try {
      const res = await fetch('/api/featured-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: valid }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setCatSaved(true);
      setTimeout(() => setCatSaved(false), 3000);
    } catch (err) {
      setSaveError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-3">
              <LayoutGrid size={22} className="text-red-600" />
              <h1 className="text-2xl font-bold text-black">Featured Categories</h1>
            </div>
            <div className="w-24" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-black">Manage Featured Categories</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Each slot needs a <strong>name</strong> and an <strong>image</strong>.
                      Only slots with both will appear on the homepage.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addCategory}
                    className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Plus size={15} />
                    Add
                  </button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Success / error messages */}
                <AnimatePresence>
                  {catSaved && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-green-50 border border-green-200 rounded text-green-600 text-sm flex items-center gap-2"
                    >
                      <CheckCircle size={14} />
                      Categories saved to database! All devices will now see the updated categories.
                    </motion.div>
                  )}
                  {saveError && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm flex items-center gap-2"
                    >
                      <AlertCircle size={14} />
                      Failed to save: {saveError}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Category slots */}
                <AnimatePresence>
                  {categories.map((cat, i) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50"
                    >
                      {/* Image preview + upload */}
                      <div className="flex-shrink-0 w-28 flex flex-col gap-2">
                        <div className="relative h-28 w-28 rounded-xl overflow-hidden border-2 border-gray-200 bg-white shadow-sm">
                          {cat.image ? (
                            <Image
                              src={cat.image}
                              alt={cat.name || `Slot ${i + 1}`}
                              fill
                              className="object-cover object-top"
                              unoptimized={cat.image.startsWith('http')}
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-1">
                              <Upload size={18} />
                              <span className="text-[10px]">No image</span>
                            </div>
                          )}
                          {uploading[cat.id] && (
                            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                              <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            </div>
                          )}
                        </div>

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={(el) => { fileRefs.current[cat.id] = el; }}
                          onChange={(e) => handleImageUpload(cat.id, e.target.files?.[0])}
                        />
                        <button
                          type="button"
                          disabled={uploading[cat.id]}
                          onClick={() => fileRefs.current[cat.id]?.click()}
                          className="flex items-center justify-center gap-1 w-full py-2 border border-dashed border-gray-300 rounded-lg text-xs font-semibold text-gray-600 hover:border-red-600 hover:text-red-600 transition-colors disabled:opacity-50"
                        >
                          <Upload size={12} />
                          {uploading[cat.id] ? 'Uploading…' : 'Upload Image'}
                        </button>

                        {uploadStatus[cat.id] === 'success' && (
                          <p className="flex items-center gap-1 text-green-600 text-[10px] font-semibold">
                            <CheckCircle size={10} /> Uploaded
                          </p>
                        )}
                        {uploadStatus[cat.id] === 'error' && (
                          <p className="flex items-center gap-1 text-red-600 text-[10px] font-semibold">
                            <AlertCircle size={10} /> Failed
                          </p>
                        )}
                      </div>

                      {/* Name + slot info + remove */}
                      <div className="flex-1 flex flex-col justify-between gap-3">
                        <div>
                          <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                            Category Name
                          </label>
                          <input
                            type="text"
                            value={cat.name}
                            onChange={(e) => updateCatName(cat.id, e.target.value)}
                            placeholder="e.g. Men, Women, New Arrivals…"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition bg-white"
                          />
                          {!cat.name.trim() && (
                            <p className="text-[11px] text-amber-500 mt-1">Name required to show on homepage</p>
                          )}
                          {!cat.image && cat.name.trim() && (
                            <p className="text-[11px] text-amber-500 mt-1">Image required to show on homepage</p>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 font-medium">Slot #{i + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeCategory(cat.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 text-xs font-semibold transition-colors"
                          >
                            <Trash2 size={12} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {categories.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <LayoutGrid size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No categories yet.</p>
                    <p className="text-xs mt-1">Click <strong>Add</strong> to create one.</p>
                  </div>
                )}

                {/* Save */}
                <button
                  type="button"
                  onClick={saveCategories}
                  className="w-full py-3.5 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors text-sm tracking-wide"
                >
                  Save Category Changes
                </button>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
