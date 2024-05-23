import { useEffect, useState } from 'react';
import './App.css';

interface Image {
    id: number;
    url: string;
}

interface Product {
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

interface Column {
    title: string;
    field: keyof Product;
    type?: 'image' | 'images';
}

function App() {
    const [data, setData] = useState<Product[]>();

    useEffect(() => {
        const populateProductData = async () => {
            const response = await fetch('api/product');

            const data = await response.json();

            setData(data);
        }

        populateProductData();
    }, []);

    const columns: Column[] = [
        { title: 'Id', field: 'id' },
        { title: 'Title', field: 'title' },
        { title: 'Description', field: 'description' },
        { title: 'Price', field: 'price' },
        { title: 'Discount percentage', field: 'discountPercentage' },
        { title: 'Rating', field: 'rating' },
        { title: 'Stock', field: 'stock' },
        { title: 'Brand', field: 'brand' },
        { title: 'Category', field: 'category' },
        { title: 'Thumbnail', field: 'thumbnail', type: 'image' },
        { title: 'Images', field: 'imagesCollection', type: 'images' }
    ];

    const contents = data === undefined
        ? <p><em>Loading...</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    {columns.map(column =>
                        <th key={column.field}>{column.title}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map(element =>
                    <tr key={element.id}>
                        {columns.map(column =>
                            <td key={column.field}>
                                {column.type === 'image' && <img src={String(element[column.field])} alt={element.title} />}
                                {column.type === 'images' && (
                                    <div style={{ display: 'flex' }}>
                                        {(element[column.field] as Image[]).map((image: Image) => <img key={image.id} src={image.url} alt={element.title} />)}
                                    </div>
                                )}
                                {column.type !== 'image' && column.type !== 'images' && String(element[column.field])}
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Products</h1>
            {contents}
        </div>
    );
}

export default App;