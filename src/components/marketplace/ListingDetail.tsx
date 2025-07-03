import Button from '@/components/ui/Button';

export default function ListingDetail() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-blue-100 rounded-xl w-full h-[32rem] flex items-center justify-center border-2 border-dashed">
          {/* Product image placeholder */}
        </div>
      </div>
      <div className="w-80 flex flex-col gap-4">
        <div className="font-bold text-xl">Bike 24 inch</div>
        <div className="font-bold text-lg">$99</div>
        <div>Listed 1 hour ago<br/>in Palo Alto, CA</div>
        <div>Seller Information<br/>Wei Gu</div>
        <div className="mt-4">
          <div className="mb-2">Send seller a message</div>
          <textarea className="w-full border rounded p-2 mb-2" defaultValue="Hi, is this available?" />
          <Button className="w-full">Send</Button>
        </div>
      </div>
    </div>
  );
} 