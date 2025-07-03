'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Button from '@/components/ui/Button';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ListingDetail() {
  const { id } = useParams() as { id: string };
  const [listing, setListing] = useState<any>(null);
  const [buyerEmail, setBuyerEmail] = useState('');
  const [message, setMessage] = useState("I'm interested in your item!");
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    supabase.from('listings').select('*').eq('id', id).single().then(({ data }) => {
      setListing(data);
    });
  }, [id]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!buyerEmail) newErrors.email = 'Your email is required.';
    else if (!isValidEmail(buyerEmail)) newErrors.email = 'Enter a valid email address.';
    if (!message.trim()) newErrors.message = 'Message cannot be empty.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
  
    // Store message in Supabase
    await supabase.from('messages').insert([
      {
        listing_id: id,
        buyer_email: buyerEmail,
        seller_email: listing.seller_email,
        message,
      },
    ]);
  
    // Trigger email to seller via Supabase Edge Function
    await supabase.functions.invoke('send-email', {
      body: {
        to: listing.seller_email,
        subject: `New message about your listing: ${listing.title}`,
        message,
        listingTitle: listing.title,
        fromEmail: buyerEmail,
        fromName: buyerEmail,
      }
    });
  
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  if (!listing) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto mt-2 p-2 md:p-4 items-start">
      {/* Image Preview */}
      <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center p-2 md:p-4">
        <img
          src={listing.image_url}
          alt={listing.title}
          className="object-cover w-full h-full rounded-lg max-h-[380px]"
        />
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
          />
          {errors.message && <div className="text-xs text-red-500">{errors.message}</div>}
          <Button
            type="submit"
            className="w-full mt-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-colors text-sm"
            disabled={sent}
          >
            {sent ? 'Message Sent!' : 'Send Message'}
          </Button>
        </form>
      </div>
    </div>
  );
}