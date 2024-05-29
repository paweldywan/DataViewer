export interface Column<T> {
    title: string;
    field: keyof T;
    type?: 'image' | 'images';
}

export interface Image {
    id: number;
    url: string;
}

export interface AppCarouselItem {
    src: string,
    altText?: string,
    captionHeader?: string,
    captionText?: string
}