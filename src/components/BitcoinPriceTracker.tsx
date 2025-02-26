import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInterval } from "@/hooks/useInteral";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Icons } from "./icons";

interface BitcoinData {
  price: number;
  previousPrice?: number;
  lastUpdated: Date;
  priceChange24h: number;
}

export function BitcoinPriceTracker() {
  const [data, setData] = useState<BitcoinData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBitcoinPrice = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Bitcoin price");
      }

      const result = await response.json();

      setData((prevData) => ({
        price: result.bitcoin.usd,
        previousPrice: prevData?.price,
        lastUpdated: new Date(),
        priceChange24h: result.bitcoin.usd_24h_change,
      }));
      setError(null);
    } catch (err) {
      setError("Failed to fetch Bitcoin price. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useInterval(fetchBitcoinPrice, 15000, false);

  useEffect(() => {
    fetchBitcoinPrice();
  }, []);

  const getPriceChangeColor = () => {
    if (!data?.previousPrice || data.price === data.previousPrice)
      return "text-white";
    return data.price > data.previousPrice ? "text-green-500" : "text-red-500";
  };

  return (
    <Card className="w-[350px] shadow-lg border-none ">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icons.bitcoin />
            <div>
              <h3 className="text-sm text-muted-foreground">BTC</h3>
              <h1 className="text-3xl font-bold">Bitcoin</h1>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchBitcoinPrice}
            disabled={loading}
          >
            <ReloadIcon
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="space-y-4">
            <div className="text-3xl font-bold transition-colors duration-300 ease-in-out">
              <span className={getPriceChangeColor()}>
                ${data?.price?.toLocaleString() ?? "---"}
              </span>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <span>24h Change: </span>
              <div
                className={`flex items-center ${
                  data?.priceChange24h && data.priceChange24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {data?.priceChange24h && data.priceChange24h > 0 ? (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path>
                  </svg>
                ) : (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path>
                  </svg>
                )}
                {data?.priceChange24h?.toFixed(2)}%
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Last updated: {data?.lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
