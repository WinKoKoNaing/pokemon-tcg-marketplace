export default interface Card {
  id: string;
  qty?: number;
  types: string[];
  name: string;
  images: {
    small: string;
    large: string;
  };
  set: {
    total: number;
  };
  cardmarket: {
    prices: {
      lowPrice: number;
    };
  };
}
