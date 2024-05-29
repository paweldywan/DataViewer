import { useEffect, useState } from 'react';
import AppTable from './components/AppTable';
import { Image } from './interfaces';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css'

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

function App() {
    const [data, setData] = useState<Product[]>();

    useEffect(() => {
        const populateData = async () => {
            const response = await fetch('api/product');

            const data = await response.json();

            setData(data);
        }

        populateData();
    }, []);

    const contents = data === undefined
        ? <p><em>Loading...</em></p>
        : <AppTable
            columns={[
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
            ]}
            data={data}
            keyField="id"
            titleField="title"
        />;

    return (
        <Container fluid>
            <h1 id="tableLabel">Products</h1>

            {contents}
        </Container>
    );
}

export default App;