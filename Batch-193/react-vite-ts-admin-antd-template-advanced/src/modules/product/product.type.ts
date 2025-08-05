
export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string
  };
  images: string[];
}

export interface CategoryType {
  id: number;
  name: string;
  image: string;
}
