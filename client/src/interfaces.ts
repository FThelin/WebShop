export interface CollectionItem {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  season: string[];
  inventory: {
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
  description: string;
}

// behåll till kategorier
export interface Collection {
  id: number;
  title: string;
  routeName: string;
  items: CollectionItem[];
}
