export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: {
    id: number;
  };
  images: string[];
}


export interface ICategory {
  id: number;
  name: string;
}

