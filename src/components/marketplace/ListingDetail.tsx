'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';

type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  seller_email: string;
  image_url?: string;
  location: string;
  created_at: string;
  // add other fields as needed
};


function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ListingDetail() {
  const { id } = useParams() as { id: string };
  const [listing, setListing] = useState<Listing | null>(null);
  const [buyerEmail, setBuyerEmail] = useState('');
  const [message, setMessage] = useState("I'm interested in your item!");
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setLoading(true);
    supabase.from('listings').select('*').eq('id', id).single().then(({ data }) => {
      setListing(data);
      setLoading(false);
    });
  }, [id]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listing) {
      toast.error('Listing not loaded.');
      return;
    }
    const newErrors: typeof errors = {};
    if (!buyerEmail) newErrors.email = 'Your email is required.';
    else if (!isValidEmail(buyerEmail)) newErrors.email = 'Enter a valid email address.';
    if (!message.trim()) newErrors.message = 'Message cannot be empty.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
  
    setSending(true);
    try {
      // Store message in Supabase
      const { error: msgError } = await supabase.from('messages').insert([
        {
          listing_id: id,
          buyer_email: buyerEmail,
          seller_email: listing.seller_email,
          message,
        },
      ]);
      if (msgError) throw new Error('Failed to send message.');
  
      // Trigger email to seller via Supabase Edge Function
      const { error: fnError } = await supabase.functions.invoke('send-email', {
        body: {
          to: listing.seller_email,
          subject: `New message about your listing: ${listing.title}`,
          message,
          listingTitle: listing.title,
          fromEmail: buyerEmail,
          fromName: buyerEmail,
        }
      });
      if (fnError) throw new Error('Failed to send email.');
  
      toast.success('Message sent to seller!');
      setSent(true);
      setBuyerEmail('');
      setMessage("I'm interested in your item!");
      setTimeout(() => setSent(false), 2000);
    } catch (err: unknown) {
      const errorMsg =
        typeof err === 'object' && err && 'message' in err
          ? String((err as { message?: string }).message)
          : 'Failed to send message.';
      toast.error(errorMsg);
    }
    setSending(false);
  };

  if (loading) {
    // Skeleton for detail page
    return (
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto mt-2 p-2 md:p-4 items-start">
        <div className="flex-1 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center p-2 md:p-4 animate-pulse min-h-[380px]" />
        <div className="w-full md:w-[370px] flex flex-col gap-4">
          <div className="h-8 bg-gray-100 rounded w-2/3 mb-2 animate-pulse" />
          <div className="h-6 bg-gray-100 rounded w-1/3 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-1/2 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-1/2 mb-2 animate-pulse" />
          <div className="h-20 bg-gray-100 rounded w-full mb-2 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!listing) return (
    <div className="flex flex-col items-center justify-center py-24 w-full">
      <div className="text-2xl font-semibold mb-2">Listing not found</div>
      <div className="text-gray-500 mb-4">This item may have been removed.</div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto mt-2 p-2 md:p-4 items-start">
      {/* Image Preview */}
      <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center p-2 md:p-4 min-h-[380px]">
        {listing.image_url ? (
          <img
            src={listing.image_url}
            alt={listing.title}
            className="object-cover w-full h-full rounded-lg max-h-[380px]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>No image</span>
          </div>
        )}
      </div>
      {/* Details and Message */}
      <div className="w-full md:w-[370px] flex flex-col gap-4">
        <div>
          <div className="font-bold text-xl md:text-2xl mb-0.5">{listing.title}</div>
          <div className="text-lg text-gray-900 font-semibold mb-1">${listing.price}</div>
          <div className="text-xs text-gray-500 mb-0.5">
            Listed {new Date(listing.created_at).toLocaleString()}
            <span className="text-gray-700"> in {listing.location}</span>
          </div>
          <div className="text-xs text-gray-500 mb-1">
            Category: <span className="text-gray-700">{listing.category}</span>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-0.5 text-sm">Description</div>
          <div className="text-gray-700 text-sm">{listing.description}</div>
        </div>
        <div>
          <div className="font-semibold mb-0.5 text-sm">Seller Information</div>
          <div className="text-gray-800 text-sm">{listing.seller_email}</div>
        </div>
        <form
          onSubmit={handleSend}
          className="flex flex-col gap-2 bg-gray-50 rounded-lg p-3 border border-gray-200"
        >
          <div className="font-semibold mb-1 text-sm">Message Seller</div>
          <label htmlFor="buyer-email" className="text-xs font-medium mb-0.5">
            Your Email
          </label>
          <input
            id="buyer-email"
            type="email"
            placeholder="your@email.com"
            value={buyerEmail}
            onChange={e => setBuyerEmail(e.target.value)}
            className={`w-full px-3 py-1.5 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm ${errors.email ? 'border-red-400' : ''}`}
            required
            disabled={sending}
          />
          {errors.email && <div className="text-xs text-red-500">{errors.email}</div>}
          <label htmlFor="buyer-message" className="text-xs font-medium mt-1 mb-0.5">
            Message
          </label>
          <textarea
            id="buyer-message"
            className={`w-full border rounded p-2 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm ${errors.message ? 'border-red-400' : ''}`}
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            disabled={sending}
          />
          {errors.message && <div className="text-xs text-red-500">{errors.message}</div>}
          <Button
            type="submit"
            className="w-full mt-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-colors text-sm"
            disabled={sent || sending}
            loading={sending}
          >
            {sent ? 'Message Sent!' : 'Send Message'}
          </Button>
        </form>
      </div>
    </div>
  );
}