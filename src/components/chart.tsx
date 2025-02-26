import { useEffect } from 'react';

declare global {
  interface Window {
    TradingView: any;
  }
}

const TradingViewWidget = ({ type = 'BTC' }: { type: string }) => {
  useEffect(() => {
    const symbolType = type?.substring(0, 3) + 'USD';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        autosize: true,
        symbol: symbolType,
        interval: 'D',
        timezone: 'Europe/Zurich',
        theme: 'light',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        hide_side_toolbar: true,
        allow_symbol_change: false,
        studies: ['RSI@tv-basicstudies', 'StochasticRSI@tv-basicstudies'],
        container_id: 'tradingview_74048',
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [type]);

  return (
    <div className="bg-shade-95 p-4 rounded-xl w-full">
      <div id="tradingview_74048" className="h-[26rem] rounded-md"></div>
    </div>
  );
};

export default TradingViewWidget;
