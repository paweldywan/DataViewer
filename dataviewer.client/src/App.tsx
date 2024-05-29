import {
    useEffect,
    useState
} from 'react';

import AppTable from './components/AppTable';

import { Product } from './interfaces';

import { Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css'

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
            <h1>Products</h1>

            {contents}
        </Container>
    );
}

export default App;