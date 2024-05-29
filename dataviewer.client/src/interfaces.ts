export interface Column<T> {
    title: string;
    field: keyof T;
    type?: 'image' | 'images';
}

export interface Image {
    id: number;
    url: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    imagesCollection: Image[];
}

export interface AppCarouselItem {
    src: string,
    altText?: string,
    captionHeader?: string,
    captionText?: string
}