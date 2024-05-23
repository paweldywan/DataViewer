export interface Column<T> {
    title: string;
    field: keyof T;
    type?: 'image' | 'images';
}

export interface Image {
    id: number;
    url: string;
}