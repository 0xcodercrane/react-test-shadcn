import { BitcoinPriceTracker } from "@/components/BitcoinPriceTracker";

export default function Dashboard() {
  return (
    <div className="py-10 flex justify-center items-center h-full">
      <BitcoinPriceTracker />
    </div>
  );
}
