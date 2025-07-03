'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

const defaultPreviewImg =
  'data:image/svg+xml;utf8,<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg"><rect fill="%23e0e7ef" width="600" height="400"/><path d="M0 0L600 400M600 0L0 400" stroke="%2399b6e7" stroke-width="6" stroke-dasharray="12,12"/></svg>';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const mockListing = {
  photoUrl: defaultPreviewImg,
  title: 'abcd',
  price: 200,
  location: 'Palo Alto, CA',
  description: 'esrdtfyguhisrtdyfugihtrdyfui67t8yihhsfdxgchvj76rtyfgh',
  sellerEmail: 'avich710@gmail.com',
  sellerName: 'Wei Gu',
  listedAgo: '1 hour ago',
  category: 'Electronics',
};

export default function ListingDetail() {
  const [buyerEmail, setBuyerEmail] = useState('');
  const [message, setMessage] = useState("I'm interested in your item!");
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!buyerEmail) newErrors.email = 'Your email is required.';
    else if (!isValidEmail(buyerEmail)) newErrors.email = 'Enter a valid email address.';
    if (!message.trim()) newErrors.message = 'Message cannot be empty.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto mt-2 p-2 md:p-4">
      {/* Image Preview */}
      <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center p-2 md:p-4">
        <img
          src={mockListing.photoUrl}
          alt={mockListing.title}
          className="object-cover w-full h-full rounded-lg max-h-[380px]"
        />
      </div>
      {/* Details and Message */}
      <div className="w-full md:w-[370px] flex flex-col gap-4">
        <div>
          <div className="font-bold text-xl md:text-2xl mb-0.5">{mockListing.title}</div>
          <div className="text-lg text-gray-900 font-semibold mb-1">${mockListing.price}</div>
          <div className="text-xs text-gray-500 mb-0.5">
            Listed {mockListing.listedAgo}
            <span className="text-gray-700"> in {mockListing.location}</span>
          </div>
          <div className="text-xs text-gray-500 mb-1">
            Category: <span className="text-gray-700">{mockListing.category}</span>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-0.5 text-sm">Description</div>
          <div className="text-gray-700 text-sm">{mockListing.description}</div>
        </div>
        <div>
          <div className="font-semibold mb-0.5 text-sm">Seller Information</div>
          <div className="text-gray-800 text-sm">{mockListing.sellerEmail}</div>
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