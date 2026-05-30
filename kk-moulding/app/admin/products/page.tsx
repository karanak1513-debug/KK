// app/admin/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/lib/firestore';
import { uploadImage } from '@/lib/storage';
import { Product, CATEGORIES } from '@/lib/types';
import toast from 'react-hot-toast';
import { generateSlug } from '@/lib/storage';
import ConfirmModal from '@/components/ConfirmModal';

const emptyProduct = (): Omit<Product, 'id' | 'createdAt'> => ({
  title: '',
  slug: '',
  description: '',
  category: '',
  woodType: '',
  finish: '',
  dimensions: '',
  usage: '',
  customization: '',
  images: [],
  featured: false,
});

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct());
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string; title: string }>({ isOpen: false, id: '', title: '' });

  const loadProducts = () => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => toast.error('Failed to load products.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadProducts(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm(emptyProduct());
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      title: p.title,
      slug: p.slug,
      description: p.description,
      category: p.category,
      woodType: p.woodType,
      finish: p.finish,
      dimensions: p.dimensions,
      usage: p.usage,
      customization: p.customization,
      images: p.images || [],
      featured: p.featured,
    });
    setShowForm(true);
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const maxImages = 8;
    const remaining = maxImages - form.images.length;
    if (remaining <= 0) { toast.error('Maximum 8 images per product.'); return; }

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (let i = 0; i < Math.min(files.length, remaining); i++) {
      const file = files[i];
      const path = `products/${Date.now()}_${i}_${file.name}`;
      try {
        const url = await uploadImage(file, path, (pct) => {
          setUploadProgress((prev) => ({ ...prev, [i]: pct }));
        });
        uploadedUrls.push(url);
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setForm((f) => ({ ...f, images: [...f.images, ...uploadedUrls] }));
    setUploadProgress({});
    setUploading(false);
    if (uploadedUrls.length > 0) toast.success(`${uploadedUrls.length} image(s) uploaded`);
  };

  const removeImage = (idx: number) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  };

  const handleSave = async () => {
    if (!form.title || !form.description || !form.category) {
      toast.error('Title, description and category are required.');
      return;
    }
    setSaving(true);
    const slug = form.slug || generateSlug(form.title);
    try {
      if (editing?.id) {
        await updateProduct(editing.id, { ...form, slug });
        toast.success('Product updated.');
      } else {
        await addProduct({ ...form, slug });
        toast.success('Product added.');
      }
      loadProducts();
      setShowForm(false);
    } catch {
      toast.error('Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string, title: string) => {
    setDeleteConfirm({ isOpen: true, id, title });
  };

  const confirmDelete = async () => {
    const { id } = deleteConfirm;
    setDeleteConfirm({ isOpen: false, id: '', title: '' });

    try {
      await deleteProduct(id);
      toast.success('Product deleted.');
      loadProducts();
    } catch {
      toast.error('Failed to delete product.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[#3E2723]">Products</h1>
          <p className="font-sans text-sm mt-2 text-[#8C6239]">{products.length} products</p>
        </div>
        <button onClick={openNew} className="bg-[#8C6239] text-[#FFFFFF] px-6 py-2.5 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#7A5330] transition-colors shadow-sm disabled:opacity-50">+ Add Product</button>
      </div>

      {/* Product Table */}
      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto border-[#8C6239]" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-[#FFFFFF] border border-[#E6D5C3] rounded-lg shadow-sm">
          <p className="font-serif text-xl mb-4 text-[#8C6239]">No products yet.</p>
          <button onClick={openNew} className="bg-[#FFFFFF] text-[#8C6239] border border-[#E6D5C3] px-6 py-2.5 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#F5EFE9] transition-colors shadow-sm">Add First Product</button>
        </div>
      ) : (
        <div className="bg-[#FFFFFF] border border-[#E6D5C3] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FAFAFA] border-b border-[#E6D5C3]">
                <tr>
                  <th className="text-left px-6 py-4 font-sans text-xs font-semibold tracking-widest uppercase text-[#8C6239]">Product</th>
                  <th className="text-left px-6 py-4 font-sans text-xs font-semibold tracking-widest uppercase text-[#8C6239] hidden md:table-cell">Category</th>
                  <th className="text-left px-6 py-4 font-sans text-xs font-semibold tracking-widest uppercase text-[#8C6239] hidden lg:table-cell">Images</th>
                  <th className="text-left px-6 py-4 font-sans text-xs font-semibold tracking-widest uppercase text-[#8C6239]">Featured</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="bg-[#FFFFFF]">
                {products.map((p, idx) => (
                  <tr
                    key={p.id}
                    className={idx < products.length - 1 ? "border-b border-[#E6D5C3]" : ""}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {p.images?.[0] && (
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-12 h-12 object-cover flex-shrink-0 rounded border border-[#E6D5C3]"
                          />
                        )}
                        <div>
                          <p className="font-sans text-sm font-medium text-[#3E2723]">{p.title}</p>
                          <p className="font-sans text-xs text-[#8C6239] mt-0.5">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="font-sans text-sm text-[#8C6239]">{p.category}</span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="font-sans text-sm text-[#8C6239]">{p.images?.length || 0} / 8</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-sans text-xs px-3 py-1 rounded-full font-medium ${
                          p.featured ? 'bg-[#8C6239] text-[#FFFFFF]' : 'bg-[#FAFAFA] border border-[#E6D5C3] text-[#8C6239]'
                        }`}
                      >
                        {p.featured ? 'Featured' : 'Standard'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => openEdit(p)}
                          className="font-sans text-xs uppercase tracking-wider font-medium px-4 py-2 transition-colors bg-[#FAFAFA] text-[#8C6239] border border-[#E6D5C3] rounded hover:bg-[#F5EFE9]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id!, p.title)}
                          className="font-sans text-xs uppercase tracking-wider font-medium px-4 py-2 transition-colors bg-[#FFF0F0] text-[#D32F2F] border border-[#FFD6D6] rounded hover:bg-[#FFE5E5]"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 bg-[#00000080] backdrop-blur-sm">
          <div className="w-full max-w-3xl my-8 bg-[#FFFFFF] border border-[#E6D5C3] shadow-xl rounded-lg">
            <div className="flex items-center justify-between px-8 py-5 border-b border-[#E6D5C3] bg-[#FAFAFA] rounded-t-lg">
              <h2 className="font-serif font-semibold text-xl text-[#3E2723]">
                {editing ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-3xl text-[#8C6239] hover:text-[#3E2723] leading-none">&times;</button>
            </div>

            <div className="p-8 space-y-6">
              {/* Title + Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">Title *</label>
                  <input
                    type="text"
                    className="w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all"
                    placeholder="Product title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">Slug (auto)</label>
                  <input
                    type="text"
                    className="w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all"
                    placeholder="product-slug"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">Category *</label>
                <input
                  type="text"
                  placeholder="e.g. Wooden Mouldings"
                  className="w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">Description *</label>
                <textarea
                  className="w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all"
                  rows={4}
                  placeholder="Describe the product…"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              {/* Wood / Finish / Dimensions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">Wood Type</label>
                  <input type="text" className="w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all" placeholder="e.g. Teak" value={form.woodType} onChange={(e) => setForm({ ...form, woodType: e.target.value })} />
                </div>
                <div>
                  <label className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">Finish</label>
                  <input type="text" className="w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all" placeholder="e.g. Raw / Sanded" value={form.finish} onChange={(e) => setForm({ ...form, finish: e.target.value })} />
                </div>
                <div>
                  <label className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">Dimensions</label>
                  <input type="text" className="w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all" placeholder="e.g. 75mm × 18mm" value={form.dimensions} onChange={(e) => setForm({ ...form, dimensions: e.target.value })} />
                </div>
              </div>

              {/* Usage / Customization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">Usage</label>
                  <input type="text" className="w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all" placeholder="Where is it used?" value={form.usage} onChange={(e) => setForm({ ...form, usage: e.target.value })} />
                </div>
                <div>
                  <label className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">Customization</label>
                  <input type="text" className="w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all" placeholder="Custom options available" value={form.customization} onChange={(e) => setForm({ ...form, customization: e.target.value })} />
                </div>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3 bg-[#FAFAFA] border border-[#E6D5C3] p-4 rounded">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-5 h-5 accent-[#8C6239] cursor-pointer"
                />
                <label htmlFor="featured-check" className="font-sans text-sm font-medium text-[#3E2723] cursor-pointer">
                  Show as Featured Product on homepage
                </label>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">
                  Product Images ({form.images.length}/8)
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#E6D5C3] bg-[#FAFAFA] rounded py-10 cursor-pointer hover:bg-[#F5EFE9] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    disabled={uploading || form.images.length >= 8}
                  />
                  <p className="font-sans text-sm font-medium text-[#8C6239]">
                    {uploading ? 'Uploading…' : form.images.length >= 8 ? 'Maximum images reached' : 'Click to upload images (max 8)'}
                  </p>
                  <p className="font-sans text-xs mt-2 text-[#999999]">
                    JPG, PNG, WEBP — multiple files supported
                  </p>
                </label>

                {/* Upload progress */}
                {Object.entries(uploadProgress).map(([i, pct]) => (
                  <div key={i} className="mt-4">
                    <div className="flex justify-between mb-1.5">
                      <span className="font-sans text-xs font-medium text-[#8C6239]">File {parseInt(i) + 1}</span>
                      <span className="font-sans text-xs font-medium text-[#8C6239]">{pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#E6D5C3] rounded-full overflow-hidden">
                      <div className="h-full bg-[#8C6239] transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}

                {/* Image Previews */}
                {form.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                    {form.images.map((url, i) => (
                      <div key={i} className="relative group rounded overflow-hidden border border-[#E6D5C3]">
                        <img src={url} alt="" className="w-full aspect-square object-cover" />
                        <button
                          onClick={() => removeImage(i)}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#00000080] text-[#FFFFFF] text-2xl"
                        >
                          &times;
                        </button>
                        {i === 0 && (
                          <span className="absolute bottom-0 left-0 right-0 text-center font-sans text-xs py-1 bg-[#8C6239] text-[#FFFFFF] font-medium">
                            Main Image
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 px-8 py-5 border-t border-[#E6D5C3] bg-[#FAFAFA] rounded-b-lg">
              <button 
                onClick={() => setShowForm(false)} 
                className="font-sans text-sm tracking-widest uppercase font-medium text-[#8C6239] hover:text-[#3E2723] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="bg-[#8C6239] text-[#FFFFFF] px-8 py-3 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#7A5330] transition-colors shadow-sm disabled:opacity-50"
              >
                {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Product"
        message={`Delete "${deleteConfirm.title}"? This cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, id: '', title: '' })}
      />
    </div>
  );
}
