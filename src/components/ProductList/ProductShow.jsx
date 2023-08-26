import * as React from 'react';
import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useParams } from 'react-router-dom';
import { URL_PRODUCT } from '../../common/constants';

export default function ProductShow({ sort, filter }) {
    const [products, setProducts] = useState([]);

    const { categoryitem } = useParams();
    const fetchInfo = () => {
        return fetch(URL_PRODUCT)
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
                .filter(item => {
                    if (filter === undefined || filter===null)
                        return true;
                    return item.name.toUpperCase().includes(filter.toUpperCase());
                })
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