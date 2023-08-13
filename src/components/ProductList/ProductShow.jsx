import * as React from 'react';
import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useParams } from 'react-router-dom';

export default function ProductShow({ sort }) {

    const [products, setProducts] = useState([]);

    const { categoryitem } = useParams();
    const fetchInfo = () => {
        return fetch('http://localhost:8080/api/products')
            .then((res) => res.json())
            .then((d) => setProducts(d));
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <>
            {products
                .filter(item => (item.category === categoryitem || categoryitem === "ALL"))
                .sort((a, b) => {
                    if (sort === 1) {
                        return 0;
                    } else if (sort === 2 && a.price <= b.price) {
                        return 1;
                    } else if (sort === 3 && a.price >= b.price) {
                        return 1;
                    } else if (sort === 4 && a.creation < b.creation) {
                        return 1;
                    }
                    return -1;
                })
                .map((item) => (
                    <ProductCard key={item.id} id={item.id} name={item.name} price={item.price} details={item.description} icon={item.imageUrl} />
                ))}
        </>
    );
};
