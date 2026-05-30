// app/admin/settings/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getSiteSettings, updateSiteSettings } from '@/lib/firestore';
import { SiteSettings } from '@/lib/types';
import { uploadImage } from '@/lib/storage';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    getSiteSettings()
      .then(setSettings)
      .catch(() => toast.error('Failed to load settings.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await updateSiteSettings(settings);
      toast.success('Settings saved. Changes are live immediately.');
    } catch {
      toast.error('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const update = (key: keyof SiteSettings, value: any) => {
    setSettings((prev) => prev ? { ...prev, [key]: value } : null);
  };

  const handleImageUpload = async (file: File, key: keyof SiteSettings) => {
    setUploading(key);
    try {
      const path = `settings/${key}_${Date.now()}_${file.name}`;
      const url = await uploadImage(file, path);
      update(key, url);
      toast.success('Image uploaded successfully');
    } catch {
      toast.error('Failed to upload image');
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto border-[#8C6239]" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#FFF0F0] border border-[#FFD6D6] rounded-lg shadow-sm p-12 text-center">
          <p className="font-serif text-xl text-[#D32F2F]">Failed to load settings from database.</p>
          <p className="font-sans text-sm mt-2 text-[#D32F2F]/80">Please check your Firebase configuration or connection.</p>
          <button onClick={() => window.location.reload()} className="mt-4 bg-[#FFFFFF] text-[#D32F2F] border border-[#FFD6D6] px-6 py-2.5 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#FFE5E5] transition-colors shadow-sm">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    {
      title: 'Homepage Content',
      fields: [
        { key: 'heroHeading', label: 'Hero Heading', placeholder: 'Handcrafted Wooden Mouldings' },
        { key: 'heroSubheading', label: 'Hero Subheading', placeholder: 'Crafted for timeless interiors…' },
        { key: 'aboutTitle', label: 'About Section Title', placeholder: 'Why We Love the Grain' },
        { key: 'aboutText', label: 'About Text', placeholder: 'Brand story…', multiline: true },
      ],
    },
    {
      title: 'SEO & Metadata',
      fields: [
        { key: 'seoTitle', label: 'SEO Title (Meta Title)', placeholder: 'K K Moulding — Premium Wooden Mouldings' },
        { key: 'seoDescription', label: 'Meta Description', placeholder: '155 character description…', multiline: true },
      ],
    },
    {
      title: 'Business Contact',
      fields: [
        { key: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210' },
        { key: 'whatsapp', label: 'WhatsApp Number (digits only)', placeholder: '919876543210' },
        { key: 'email', label: 'Email Address', placeholder: 'info@kkmoulding.com' },
        { key: 'address', label: 'Business Address', placeholder: 'Full address…', multiline: true },
        { key: 'showMap', label: 'Show Map on Contact Page', isBoolean: true },
        { key: 'mapEmbedUrl', label: 'Google Maps Embed URL', placeholder: 'https://www.google.com/maps/embed?…', multiline: true },
      ],
    },
    {
      title: 'Website Images',
      fields: [
        { key: 'heroImage', label: 'Homepage Hero Banner', placeholder: 'Upload hero image', isImage: true },
        { key: 'aboutImage', label: 'About Us Page Image', placeholder: 'Upload about image', isImage: true },
        { key: 'productBannerImage', label: 'Product Page Banner', placeholder: 'Upload banner', isImage: true },
        { key: 'homeGalleryImage', label: 'Homepage Gallery Image', placeholder: 'Upload image', isImage: true },
        { key: 'craftLeftImage', label: 'Craftsmanship Section (Left Image)', placeholder: 'Upload image', isImage: true },
        { key: 'craftRightImage', label: 'Craftsmanship Section (Right Image)', placeholder: 'Upload image', isImage: true },
        { key: 'enquiryImage', label: 'Enquiry Section Image', placeholder: 'Upload image', isImage: true },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[#3E2723]">Settings & SEO</h1>
          <p className="font-sans text-sm mt-2 text-[#8C6239]">
            All changes take effect immediately on the live site.
          </p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving} 
          className="bg-[#8C6239] text-[#FFFFFF] px-6 py-2.5 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#7A5330] transition-colors shadow-sm disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="bg-[#FFFFFF] border border-[#E6D5C3] rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E6D5C3] bg-[#FAFAFA]">
              <h2 className="font-sans text-sm uppercase tracking-widest font-semibold text-[#3E2723]">
                {section.title}
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label
                    className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium"
                    htmlFor={`setting-${field.key}`}
                  >
                    {field.label}
                  </label>
                  {(field as any).isImage ? (
                    <div className="flex items-center gap-4">
                      {(settings as any)[field.key] ? (
                        <div className="relative group w-32 h-32 border border-[#E6D5C3] rounded overflow-hidden">
                          <img src={(settings as any)[field.key]} alt="" className="w-full h-full object-cover" />
                          <button
                            onClick={() => update(field.key as keyof SiteSettings, '')}
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#00000080] text-[#FFFFFF] text-2xl"
                          >
                            &times;
                          </button>
                        </div>
                      ) : null}
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#E6D5C3] bg-[#FAFAFA] rounded px-6 py-8 cursor-pointer hover:bg-[#F5EFE9] transition-colors flex-1 text-center h-32">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleImageUpload(e.target.files[0], field.key as keyof SiteSettings);
                          }}
                          disabled={uploading === field.key}
                        />
                        <p className="font-sans text-sm font-medium text-[#8C6239]">
                          {uploading === field.key ? 'Uploading…' : 'Click to upload image'}
                        </p>
                      </label>
                    </div>
                  ) : (field as any).isBoolean ? (
                    <div className="flex items-center gap-3 py-1">
                      <input
                        id={`setting-${field.key}`}
                        type="checkbox"
                        className="w-5 h-5 text-[#8C6239] border-[#E6D5C3] rounded focus:ring-[#8C6239] focus:ring-opacity-50 cursor-pointer accent-[#8C6239]"
                        checked={!!(settings as any)[field.key]}
                        onChange={(e) => update(field.key as keyof SiteSettings, e.target.checked)}
                      />
                      <span className="font-sans text-sm text-[#8C6239]">Active</span>
                    </div>
                  ) : (field as any).multiline ? (
                    <textarea
                      id={`setting-${field.key}`}
                      className="w-full bg-[#FAFAFA] border border-[#E6D5C3] p-3 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all"
                      rows={4}
                      placeholder={field.placeholder}
                      value={(settings as any)[field.key] || ''}
                      onChange={(e) => update(field.key as keyof SiteSettings, e.target.value)}
                    />
                  ) : (
                    <input
                      id={`setting-${field.key}`}
                      type="text"
                      className="w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all"
                      placeholder={field.placeholder}
                      value={(settings as any)[field.key] || ''}
                      onChange={(e) => update(field.key as keyof SiteSettings, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleSave} 
          disabled={saving} 
          className="bg-[#8C6239] text-[#FFFFFF] px-8 py-3 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#7A5330] transition-colors shadow-sm disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save All Settings'}
        </button>
      </div>
    </div>
  );
}
