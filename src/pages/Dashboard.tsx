import { BitcoinPriceTracker } from "@/components/BitcoinPriceTracker";
import TradingViewWidget from "@/components/chart";
export default function Dashboard() {
  return (
    <div className="py-10 flex flex-col sm:flex-row justify-center h-full">
      <BitcoinPriceTracker />
      <TradingViewWidget type="BTCUSDT" />
    </div>
  );
}
