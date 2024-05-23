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

function App() {
    const [products, setProducts] = useState<Product[]>();

    useEffect(() => {
        const populateProductData = async () => {
            const response = await fetch('api/product');

            const data = await response.json();

            setProducts(data);
        }

        populateProductData();
    }, []);

    const contents = products === undefined
        ? <p><em>Loading...</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Discount percentage</th>
                    <th>Rating</th>
                    <th>Stock</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Thumbnail</th>
                    <th>Images</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product =>
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.title}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.discountPercentage}</td>
                        <td>{product.rating}</td>
                        <td>{product.stock}</td>
                        <td>{product.brand}</td>
                        <td>{product.category}</td>
                        <td>
                            <img src={product.thumbnail} />
                        </td>
                        <td>
                            <div style={{ display: 'flex' }}>
                                {product.imagesCollection.map(image => <img key={image.id} src={image.url} />)}
                            </div>
                        </td>
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