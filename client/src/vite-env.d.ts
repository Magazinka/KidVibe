/// <reference types="vite/client" />
declare namespace ymaps {
    function ready(init: () => void): void;
  
    class Map {
      constructor(element: HTMLElement | string, options: { center: [number, number]; zoom: number });
      geoObjects: {
        add(object: Placemark): void;
      };
    }
  
    class Placemark {
      constructor(center: [number, number], properties: { hintContent: string; balloonContent: string });
    }
  }
  
  declare global {
    interface Window {
      ymaps: typeof ymaps;
    }
  }