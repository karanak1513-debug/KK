// app/admin/enquiries/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getEnquiries, markEnquiryRead, deleteEnquiry } from '@/lib/firestore';
import { Enquiry } from '@/lib/types';
import toast from 'react-hot-toast';
import ConfirmModal from '@/components/ConfirmModal';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string }>({ isOpen: false, id: '' });

  const load = () => {
    setLoading(true);
    getEnquiries()
      .then(setEnquiries)
      .catch(() => toast.error('Failed to load enquiries.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleMarkRead = async (id: string) => {
    try {
      await markEnquiryRead(id);
      setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, read: true } : e));
      if (selected?.id === id) setSelected((prev) => prev ? { ...prev, read: true } : null);
    } catch {
      toast.error('Failed to mark as read.');
    }
  };

  const handleDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    const { id } = deleteConfirm;
    setDeleteConfirm({ isOpen: false, id: '' });

    try {
      await deleteEnquiry(id);
      toast.success('Enquiry deleted.');
      setSelected(null);
      load();
    } catch {
      toast.error('Failed to delete.');
    }
  };

  const formatDate = (ts: any) => {
    if (!ts) return '—';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const unread = enquiries.filter((e) => !e.read).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-[#3E2723]">Enquiries</h1>
        <p className="font-sans text-sm mt-2 text-[#8C6239]">
          {enquiries.length} total &middot; {unread} unread
        </p>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto border-[#8C6239]" />
        </div>
      ) : enquiries.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#E6D5C3] rounded-lg shadow-sm p-12 text-center">
          <p className="font-serif text-xl text-[#8C6239]">No enquiries received yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-1 space-y-3">
            {enquiries.map((enq) => (
              <button
                key={enq.id}
                className={`w-full text-left p-5 transition-colors rounded-lg shadow-sm border ${
                  selected?.id === enq.id
                    ? 'bg-[#F5EFE9] border-[#8C6239]'
                    : 'bg-[#FFFFFF] border-[#E6D5C3] hover:border-[#8C6239]/50'
                }`}
                onClick={() => {
                  setSelected(enq);
                  if (!enq.read && enq.id) handleMarkRead(enq.id);
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-sans text-base font-semibold text-[#3E2723]">{enq.name}</p>
                  {!enq.read && (
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-[#8C6239]" />
                  )}
                </div>
                <p className="font-sans text-sm text-[#8C6239] font-medium">{enq.phone}</p>
                <p className="font-sans text-sm mt-2 line-clamp-2 text-[#3E2723]/70">
                  {enq.message}
                </p>
                <p className="font-sans text-xs mt-3 text-[#3E2723]/50 font-medium tracking-wider">
                  {formatDate(enq.createdAt)}
                </p>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-[#FFFFFF] border border-[#E6D5C3] rounded-lg shadow-sm overflow-hidden sticky top-6">
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#E6D5C3] bg-[#FAFAFA]">
                  <h2 className="font-serif font-semibold text-xl text-[#3E2723]">Enquiry Detail</h2>
                  <div className="flex gap-3">
                    {!selected.read && (
                      <button
                        onClick={() => selected.id && handleMarkRead(selected.id)}
                        className="font-sans text-xs uppercase tracking-wider font-medium px-4 py-2 transition-colors bg-[#FAFAFA] text-[#8C6239] border border-[#E6D5C3] rounded hover:bg-[#F5EFE9]"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => selected.id && handleDelete(selected.id)}
                      className="font-sans text-xs uppercase tracking-wider font-medium px-4 py-2 transition-colors bg-[#FFF0F0] text-[#D32F2F] border border-[#FFD6D6] rounded hover:bg-[#FFE5E5]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-[#FAFAFA] p-4 rounded border border-[#E6D5C3]/50">
                      <p className="font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium mb-1.5">Name</p>
                      <p className="font-sans text-base font-semibold text-[#3E2723]">{selected.name}</p>
                    </div>
                    <div className="bg-[#FAFAFA] p-4 rounded border border-[#E6D5C3]/50">
                      <p className="font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium mb-1.5">Phone</p>
                      <a href={`tel:${selected.phone}`} className="font-sans text-base font-semibold text-[#8C6239] hover:underline">
                        {selected.phone}
                      </a>
                    </div>
                    {selected.email && (
                      <div className="bg-[#FAFAFA] p-4 rounded border border-[#E6D5C3]/50">
                        <p className="font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium mb-1.5">Email</p>
                        <a href={`mailto:${selected.email}`} className="font-sans text-base font-semibold text-[#8C6239] hover:underline">
                          {selected.email}
                        </a>
                      </div>
                    )}
                    {selected.product && (
                      <div className="bg-[#FAFAFA] p-4 rounded border border-[#E6D5C3]/50">
                        <p className="font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium mb-1.5">Product Enquiry</p>
                        <p className="font-sans text-base font-semibold text-[#3E2723]">{selected.product}</p>
                      </div>
                    )}
                    <div className="bg-[#FAFAFA] p-4 rounded border border-[#E6D5C3]/50">
                      <p className="font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium mb-1.5">Date</p>
                      <p className="font-sans text-base font-semibold text-[#3E2723]">{formatDate(selected.createdAt)}</p>
                    </div>
                    <div className="bg-[#FAFAFA] p-4 rounded border border-[#E6D5C3]/50">
                      <p className="font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium mb-1.5">Status</p>
                      <span
                        className={`font-sans text-xs px-2.5 py-1 rounded font-semibold inline-block mt-0.5 ${
                          selected.read ? 'bg-[#F5EFE9] text-[#8C6239]' : 'bg-[#E8F5E9] text-[#2E7D32]'
                        }`}
                      >
                        {selected.read ? 'Read' : 'New / Unread'}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium mb-3">Message</p>
                    <div className="p-5 font-sans text-base leading-relaxed bg-[#FAFAFA] border border-[#E6D5C3] rounded text-[#3E2723]">
                      {selected.message}
                    </div>
                  </div>

                  {/* Quick reply actions */}
                  <div className="flex gap-4 pt-4 border-t border-[#E6D5C3]">
                    <a
                      href={`https://wa.me/${selected.phone.replace(/[^0-9]/g, '')}?text=Hi ${selected.name}, thank you for your enquiry about${selected.product ? ' ' + selected.product : ' our products'}. `}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-[#25D366] text-[#FFFFFF] px-6 py-3 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#1DA851] transition-colors shadow-sm"
                    >
                      Reply via WhatsApp
                    </a>
                    {selected.email && (
                      <a
                        href={`mailto:${selected.email}?subject=RE: Your Enquiry - K K Moulding`}
                        className="flex-1 text-center bg-[#FFFFFF] text-[#8C6239] border border-[#E6D5C3] px-6 py-3 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#F5EFE9] transition-colors shadow-sm"
                      >
                        Reply via Email
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center bg-[#FAFAFA] border border-[#E6D5C3] border-dashed rounded-lg">
                <p className="font-sans text-base text-[#8C6239] font-medium">Select an enquiry to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Enquiry"
        message="Delete this enquiry? This cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, id: '' })}
      />
    </div>
  );
}
