// app/admin/gallery/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getGallery, addGalleryItem, deleteGalleryItem } from '@/lib/firestore';
import { uploadImage } from '@/lib/storage';
import { GalleryItem } from '@/lib/types';
import toast from 'react-hot-toast';
import ConfirmModal from '@/components/ConfirmModal';

const galleryCategories = ['Installations', 'Workshop', 'Products', 'Textures', 'Other'];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string }>({ isOpen: false, id: '' });

  const loadGallery = () => {
    setLoading(true);
    getGallery()
      .then(setItems)
      .catch(() => toast.error('Failed to load gallery.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadGallery(); }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file || !title) { toast.error('Title and image required.'); return; }
    setUploading(true);
    try {
      const path = `gallery/${Date.now()}_${file.name}`;
      const url = await uploadImage(file, path, setUploadPct);
      await addGalleryItem({ image: url, title, category });
      toast.success('Image added to gallery.');
      setShowForm(false);
      setFile(null);
      setPreview(null);
      setTitle('');
      setUploadPct(0);
      loadGallery();
    } catch {
      toast.error('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    const { id } = deleteConfirm;
    setDeleteConfirm({ isOpen: false, id: '' });

    try {
      await deleteGalleryItem(id);
      toast.success('Removed from gallery.');
      loadGallery();
    } catch {
      toast.error('Failed to delete.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[#3E2723]">Gallery</h1>
          <p className="font-sans text-sm mt-2 text-[#8C6239]">{items.length} images</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-[#8C6239] text-[#FFFFFF] px-6 py-2.5 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#7A5330] transition-colors shadow-sm disabled:opacity-50">+ Add Image</button>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto border-[#8C6239]" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#E6D5C3] rounded-lg shadow-sm p-12 text-center">
          <p className="font-serif text-xl mb-4 text-[#8C6239]">No gallery images yet.</p>
          <button onClick={() => setShowForm(true)} className="bg-[#FFFFFF] text-[#8C6239] border border-[#E6D5C3] px-6 py-2.5 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#F5EFE9] transition-colors shadow-sm">Upload First Image</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg border border-[#E6D5C3] shadow-sm">
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover aspect-square"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#3E2723]/80 backdrop-blur-sm">
                <p className="font-sans text-sm text-[#FFFFFF] font-medium text-center px-4 mb-2">{item.title}</p>
                <p className="font-sans text-xs uppercase tracking-widest text-[#E6D5C3] font-medium mb-4">{item.category}</p>
                <button
                  onClick={() => handleDelete(item.id!)}
                  className="font-sans text-xs uppercase tracking-wider font-medium px-4 py-2 transition-colors bg-[#D32F2F] text-[#FFFFFF] rounded hover:bg-[#B71C1C]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00000080] backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#FFFFFF] border border-[#E6D5C3] shadow-xl rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6D5C3] bg-[#FAFAFA]">
              <h2 className="font-serif font-semibold text-xl text-[#3E2723]">Add Gallery Image</h2>
              <button onClick={() => setShowForm(false)} className="text-3xl text-[#8C6239] hover:text-[#3E2723] leading-none">&times;</button>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">Title</label>
                <input
                  type="text"
                  className="w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all"
                  placeholder="e.g. Installed teak moulding"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Wooden Mouldings"
                  className="w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">Image</label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#E6D5C3] bg-[#FAFAFA] rounded py-8 cursor-pointer hover:bg-[#F5EFE9] transition-colors">
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                  {preview ? (
                    <img src={preview} alt="Preview" className="max-h-40 object-contain rounded shadow-sm" />
                  ) : (
                    <p className="font-sans text-sm font-medium text-[#8C6239]">Click to select image</p>
                  )}
                </label>
              </div>

              {uploading && (
                <div className="mt-4">
                  <div className="flex justify-between mb-1.5">
                    <span className="font-sans text-xs font-medium text-[#8C6239]">Uploading…</span>
                    <span className="font-sans text-xs font-medium text-[#8C6239]">{uploadPct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E6D5C3] rounded-full overflow-hidden">
                    <div className="h-full bg-[#8C6239] transition-all" style={{ width: `${uploadPct}%` }} />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#E6D5C3] bg-[#FAFAFA]">
              <button 
                onClick={() => setShowForm(false)} 
                className="font-sans text-sm tracking-widest uppercase font-medium text-[#8C6239] hover:text-[#3E2723] transition-colors px-4 py-2"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpload} 
                disabled={uploading || !file || !title} 
                className="bg-[#8C6239] text-[#FFFFFF] px-6 py-2.5 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#7A5330] transition-colors shadow-sm disabled:opacity-50"
              >
                {uploading ? 'Uploading…' : 'Upload Image'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Image"
        message="Remove this image from gallery? This cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, id: '' })}
      />
    </div>
  );
}
