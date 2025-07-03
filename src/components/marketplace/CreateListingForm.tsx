'use client';

import { useState, ChangeEvent } from 'react';
import Button from '@/components/ui/Button';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';


const defaultPreviewImg =
  'data:image/svg+xml;utf8,<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg"><rect fill="%23e0e7ef" width="600" height="400"/><path d="M0 0L600 400M600 0L0 400" stroke="%2399b6e7" stroke-width="6" stroke-dasharray="12,12"/></svg>';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function CreateListingForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>(defaultPreviewImg);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);


  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoUrl(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoUrl(defaultPreviewImg);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!title) newErrors.title = 'Title is required.';
    if (!category) newErrors.category = 'Category is required.';
    if (!price) newErrors.price = 'Price is required.';
    else {
      const priceNum = Number(price);
      if (isNaN(priceNum) || priceNum < 0) newErrors.price = 'Price must be a positive number.';
      if (priceNum > Number.MAX_SAFE_INTEGER) newErrors.price = 'Price is too large.';
    }
    if (!location) newErrors.location = 'Location is required.';
    if (!email) newErrors.email = 'Email is required.';
    else if (!isValidEmail(email)) newErrors.email = 'Enter a valid email address.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
  let imageUrl = '';
  try {
    if (photo) {
      const fileExt = photo.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { error } = await supabase.storage
        .from('listing-images')
        .upload(fileName, photo, { cacheControl: '3600', upsert: false });
      if (error) {
        setErrors({ photo: 'Failed to upload image.' });
        setLoading(false);
        return;
      }
      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/listing-images/${fileName}`;
    }

    const { error: insertError } = await supabase.from('listings').insert([
      {
        title,
        description,
        price: Number(price),
        category,
        seller_email: email,
        image_url: imageUrl,
        location,
      },
    ]);
    if (insertError) {
      toast.error('Failed to create listing.');
      setLoading(false);
      return;
    }
    toast.success('Listing created!');
    // Optionally reset form here
    } catch (error: any) {
    console.error('Error creating listing:', error);
    toast.error(error.message || 'Something went wrong. Please try again.');
    }
  setLoading(false);
};

  return (
   <div className="flex flex-col md:flex-row gap-6 w-full max-w-full min-w-0 overflow-x-auto">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 rounded-xl p-6 flex-1 max-w-md w-full border border-gray-200 min-w-0"
      >
        <div className="mb-4">
          <label className="block font-semibold text-gray-800 mb-2">Photos</label>
          {photo ? (
            <div className="relative w-full h-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
              <img
                src={photoUrl}
                alt="Preview"
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-red-100 transition-colors"
                aria-label="Remove photo"
              >
                <span className="text-lg text-gray-700 font-bold">&times;</span>
              </button>
            </div>
          ) : (
            <label
              htmlFor="photo-upload"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-36 cursor-pointer hover:border-blue-400 transition-colors"
            >
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <span className="text-3xl text-gray-400 mb-1">&#8682;</span>
              <span className="text-gray-700 font-medium">Add photo</span>
              <span className="text-xs text-gray-500">JPEG, PNG, or WebP (max 5MB)</span>
            </label>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-400' : ''}`}
            placeholder="What are you selling?"
            required
          />
          {errors.title && <div className="text-xs text-red-500 mt-1">{errors.title}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-400' : ''}`}
            required
          >
            <option value="">Select a category</option>
            <option value="vehicles">Vehicles</option>
            <option value="property-rentals">Property Rentals</option>
            <option value="apparel">Apparel</option>
            <option value="classifieds">Classifieds</option>
            <option value="electronics">Electronics</option>
            <option value="entertainment">Entertainment</option>
            <option value="family">Family</option>
            <option value="free-stuff">Free Stuff</option>
            <option value="garden-outdoor">Garden & Outdoor</option>
            <option value="hobbies">Hobbies</option>
            <option value="home-sales">Home Sales</option>
            <option value="home-improvement">Home Improvement</option>
            <option value="musical-instruments">Musical Instruments</option>
            <option value="office-supplies">Office Supplies</option>
            <option value="pets">Pets</option>
            <option value="sporting-goods">Sporting Goods</option>
          </select>
          {errors.category && <div className="text-xs text-red-500 mt-1">{errors.category}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price *
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? 'border-red-400' : ''}`}
            placeholder="0.00"
            min={0}
            max={Number.MAX_SAFE_INTEGER}
            required
          />
          {errors.price && <div className="text-xs text-red-500 mt-1">{errors.price}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.location ? 'border-red-400' : ''}`}
            placeholder="Palo Alto, CA"
            required
          />
          {errors.location && <div className="text-xs text-red-500 mt-1">{errors.location}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Email *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-400' : ''}`}
            placeholder="your@email.com"
            required
          />
          {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your item..."
          />
        </div>
        <Button type="submit" className="w-full mt-2" loading={loading}>
        {loading ? 'Creating...' : 'Create Listing'}
      </Button>
      </form>

      {/* Preview */}
      <div className="flex-1 bg-gray-50 rounded-xl p-6 border border-gray-200 flex flex-col items-center min-w-[320px] max-w-full">
        <div className="w-full aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <img
            src={photoUrl}
            alt="Preview"
            className="object-cover w-full h-full"
            style={{ maxHeight: 320 }}
          />
        </div>
        <div className="w-full">
          <div className="font-bold text-xl text-gray-900 mb-1">{title || 'Title'}</div>
          <div className="text-lg text-gray-800 font-semibold mb-2">
            {price ? `$${parseFloat(price).toLocaleString()}` : 'Price'}
          </div>
          <div className="text-xs text-gray-500 mb-2">
            Listed just now
            {location && (
              <>
                {' '}
                <span className="text-gray-700">in {location}</span>
              </>
            )}
          </div>
          <div className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Seller Information</span>
            <br />
            <span>{email || 'seller@email.com'}</span>
          </div>
          <div className="text-sm text-gray-600">{description}</div>
        </div>
      </div>
    </div>
  );
}