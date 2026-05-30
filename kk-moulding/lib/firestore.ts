

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product, GalleryItem, FAQItem, Enquiry, SiteSettings } from './types';

// ─── Products ────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const q = query(
      collection(db, 'products'),
      where('featured', '==', true)
    );
    const snap = await getDocs(q);
    let products = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
    
    products.sort((a, b) => {
      const aTime = a.createdAt && (a.createdAt as any).toMillis ? (a.createdAt as any).toMillis() : 0;
      const bTime = b.createdAt && (b.createdAt as any).toMillis ? (b.createdAt as any).toMillis() : 0;
      return bTime - aTime;
    });

    products = products.slice(0, 5);
    
    if (products.length === 0) {
      const fallbackQ = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(5));
      const fallbackSnap = await getDocs(fallbackQ);
      products = fallbackSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
    }
    return products;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const q = query(collection(db, 'products'), where('slug', '==', slug), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Product;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const q = query(
    collection(db, 'products'),
    where('category', '==', category),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function addProduct(data: Omit<Product, 'id' | 'createdAt'>): Promise<string> {
  const ref = await addDoc(collection(db, 'products'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  await updateDoc(doc(db, 'products', id), data);
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, 'products', id));
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

export async function getGallery(): Promise<GalleryItem[]> {
  const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem));
}

export async function addGalleryItem(data: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<string> {
  const ref = await addDoc(collection(db, 'gallery'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function deleteGalleryItem(id: string): Promise<void> {
  await deleteDoc(doc(db, 'gallery', id));
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export async function getFAQs(): Promise<FAQItem[]> {
  const q = query(collection(db, 'faq'), orderBy('order', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FAQItem));
}

export async function addFAQ(data: Omit<FAQItem, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'faq'), data);
  return ref.id;
}

export async function updateFAQ(id: string, data: Partial<FAQItem>): Promise<void> {
  await updateDoc(doc(db, 'faq', id), data);
}

export async function deleteFAQ(id: string): Promise<void> {
  await deleteDoc(doc(db, 'faq', id));
}

// ─── Enquiries ───────────────────────────────────────────────────────────────

export async function addEnquiry(data: Omit<Enquiry, 'id' | 'createdAt' | 'read'>): Promise<string> {
  const ref = await addDoc(collection(db, 'enquiries'), {
    ...data,
    read: false,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Enquiry));
}

export async function markEnquiryRead(id: string): Promise<void> {
  await updateDoc(doc(db, 'enquiries', id), { read: true });
}

export async function deleteEnquiry(id: string): Promise<void> {
  await deleteDoc(doc(db, 'enquiries', id));
}

// ─── Settings ────────────────────────────────────────────────────────────────

const SETTINGS_DOC = 'main';

export async function getSiteSettings(): Promise<SiteSettings> {
  const ref = doc(db, 'settings', SETTINGS_DOC);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as SiteSettings;
  return defaultSettings;
}

export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<void> {
  const ref = doc(db, 'settings', SETTINGS_DOC);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, data);
  } else {
    const { setDoc } = await import('firebase/firestore');
    await setDoc(ref, { ...defaultSettings, ...data });
  }
}

export function onSettingsChange(callback: (settings: SiteSettings) => void) {
  const ref = doc(db, 'settings', SETTINGS_DOC);
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) callback(snap.data() as SiteSettings);
    else callback(defaultSettings);
  });
}

const defaultSettings: SiteSettings = {
  heroHeading: 'Handcrafted Wooden Mouldings',
  heroSubheading: 'Crafted for timeless interiors and architectural spaces.',
  aboutTitle: 'Why We Love the Grain',
  aboutText:
    'At K K Moulding, every piece begins with a single question: how can wood serve the spaces people love? For over a decade, our workshop in Gujarat has been a quiet place of careful hands and honest materials — no shortcuts, no compromises.',
  seoTitle: 'K K Moulding — Premium Handcrafted Wooden Mouldings',
  seoDescription:
    'K K Moulding crafts premium wooden mouldings, door chaukats, wall panels and decorative profiles for architects, builders, and discerning homeowners across India.',
  phone: '+91 9718503557',
  whatsapp: '919718503557',
  email: 'K.KMolding5@gmail.com',
  address: 'B-116 Basement, Front Side, W.H.S Timber Market, Kirti Nagar, New Delhi 110015, India',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29732.558454658753!2d70.7512!3d22.3039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca4d0c0f0f0f%3A0x0!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1000000000000!5m2!1sen!2sin',
  showMap: false,
  heroImage: '',
  craftLeftImage: '',
  craftRightImage: '',
  enquiryImage: '',
  aboutImage: '',
};
