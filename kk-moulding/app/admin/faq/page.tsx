// app/admin/faq/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getFAQs, addFAQ, updateFAQ, deleteFAQ } from '@/lib/firestore';
import { FAQItem } from '@/lib/types';
import toast from 'react-hot-toast';
import ConfirmModal from '@/components/ConfirmModal';

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<FAQItem | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string }>({ isOpen: false, id: '' });

  const load = () => {
    setLoading(true);
    getFAQs().then(setFaqs).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setQuestion(''); setAnswer(''); setShowForm(true); };
  const openEdit = (f: FAQItem) => { setEditing(f); setQuestion(f.question); setAnswer(f.answer); setShowForm(true); };

  const handleSave = async () => {
    if (!question || !answer) { toast.error('Both question and answer required.'); return; }
    setSaving(true);
    try {
      if (editing?.id) {
        await updateFAQ(editing.id, { question, answer });
        toast.success('FAQ updated.');
      } else {
        await addFAQ({ question, answer, order: faqs.length + 1 });
        toast.success('FAQ added.');
      }
      setShowForm(false);
      load();
    } catch {
      toast.error('Failed to save FAQ.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    const { id } = deleteConfirm;
    setDeleteConfirm({ isOpen: false, id: '' });

    try {
      await deleteFAQ(id);
      toast.success('FAQ deleted.');
      load();
    } catch {
      toast.error('Failed to delete.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-[#3E2723]">FAQ Manager</h1>
          <p className="font-sans text-sm mt-2 text-[#8C6239]">{faqs.length} questions</p>
        </div>
        <button onClick={openNew} className="bg-[#8C6239] text-[#FFFFFF] px-6 py-2.5 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#7A5330] transition-colors shadow-sm disabled:opacity-50">+ Add FAQ</button>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto border-[#8C6239]" />
        </div>
      ) : faqs.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#E6D5C3] rounded-lg shadow-sm p-12 text-center">
          <p className="font-serif text-xl mb-4 text-[#8C6239]">No FAQ items yet.</p>
          <button onClick={openNew} className="bg-[#FFFFFF] text-[#8C6239] border border-[#E6D5C3] px-6 py-2.5 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#F5EFE9] transition-colors shadow-sm">Add First FAQ</button>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={faq.id}
              className="bg-[#FFFFFF] border border-[#E6D5C3] rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-sans text-xs px-2.5 py-1 bg-[#F5EFE9] text-[#8C6239] rounded font-semibold">
                      {idx + 1}
                    </span>
                    <p className="font-sans text-base font-semibold text-[#3E2723]">{faq.question}</p>
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-[#8C6239] pl-10">
                    {faq.answer}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => openEdit(faq)}
                    className="font-sans text-xs uppercase tracking-wider font-medium px-4 py-2 transition-colors bg-[#FAFAFA] text-[#8C6239] border border-[#E6D5C3] rounded hover:bg-[#F5EFE9]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id!)}
                    className="font-sans text-xs uppercase tracking-wider font-medium px-4 py-2 transition-colors bg-[#FFF0F0] text-[#D32F2F] border border-[#FFD6D6] rounded hover:bg-[#FFE5E5]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00000080] backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#FFFFFF] border border-[#E6D5C3] shadow-xl rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6D5C3] bg-[#FAFAFA]">
              <h2 className="font-serif font-semibold text-xl text-[#3E2723]">
                {editing ? 'Edit FAQ' : 'Add FAQ'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-3xl text-[#8C6239] hover:text-[#3E2723] leading-none">&times;</button>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">Question</label>
                <input
                  type="text"
                  className="w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all"
                  placeholder="Type the question…"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 font-sans text-xs uppercase tracking-widest text-[#8C6239] font-medium">Answer</label>
                <textarea
                  className="w-full bg-[#FAFAFA] border border-[#E6D5C3] px-3 py-2.5 text-sm text-[#3E2723] rounded focus:outline-none focus:border-[#8C6239] focus:ring-1 focus:ring-[#8C6239] transition-all"
                  rows={5}
                  placeholder="Type the answer…"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#E6D5C3] bg-[#FAFAFA]">
              <button 
                onClick={() => setShowForm(false)} 
                className="font-sans text-sm tracking-widest uppercase font-medium text-[#8C6239] hover:text-[#3E2723] transition-colors px-4 py-2"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                disabled={saving} 
                className="bg-[#8C6239] text-[#FFFFFF] px-6 py-2.5 rounded-md text-sm tracking-widest uppercase font-medium hover:bg-[#7A5330] transition-colors shadow-sm disabled:opacity-50"
              >
                {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add FAQ'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete FAQ"
        message="Delete this FAQ? This cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, id: '' })}
      />
    </div>
  );
}
