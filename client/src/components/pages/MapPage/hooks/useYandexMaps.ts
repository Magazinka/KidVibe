import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ymaps: any;
  }
}

export const useYandexMaps = (apiKey: string) => {
  const [ymaps, setYmaps] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (window.ymaps) {
      window.ymaps.ready(() => {
        setYmaps(window.ymaps);
        setLoading(false);
      });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU&load=package.full`;
    script.async = true;

    script.onload = () => {
      window.ymaps.ready(() => {
        setYmaps(window.ymaps);
        setLoading(false);
      });
    };

    script.onerror = () => {
      setError('Failed to load Yandex Maps');
      setLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  return { ymaps, loading, error };
};