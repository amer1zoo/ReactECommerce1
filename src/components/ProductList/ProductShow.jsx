import * as React from 'react';
import Box from '@mui/material/Box';
import ProductCard from '../ProductCard/ProductCard';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { Link, useRouteMatch, Switch, Route, useParams } from 'react-router-dom';

const ProductItems = [
    {
        id: 1,
        name: "Product 1",
        category: "APPAREL",
        manufacturer: "Reebok",
        qty: 120,
        price: 9000,
        icon: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
        details: "Details about the product",
        creation: new Date("2022-03-31"),
    }, {
        id: 2,
        name: "Product 2",
        category: "APPAREL",
        manufacturer: "Reebok",
        qty: 0,
        price: 8000,
        icon: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
        details: "Detail 1",
        creation: new Date("2022-04-01"),
    }, {
        id: 3,
        name: "Product 3",
        category: "PERSONAL CARE",
        manufacturer: "Reebok",
        qty: 0,
        price: 7000,
        icon: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
        details: "Detail 2",
        creation: new Date("2022-04-02"),
    }, {
        id: 4,
        name: "Product 4",
        category: "PERSONAL CARE",
        manufacturer: "Reebok",
        qty: 0,
        price: 6000,
        icon: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
        details: "Detail 3",
        creation: new Date("2022-04-03"),
    }, {
        id: 5,
        name: "Product 5",
        category: "APPAREL",
        manufacturer: "Reebok",
        qty: 0,
        price: 5000,
        icon: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
        details: "Detail 4",
        creation: new Date("2022-04-04"),
    }, {
        id: 6,
        name: "Product 6",
        category: "APPAREL",
        manufacturer: "Reebok",
        qty: 0,
        price: 4000,
        icon: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
        details: "Detail 5",
        creation: new Date("2022-04-05"),
    }, {
        id: 7,
        name: "Product 7",
        category: "APPAREL",
        manufacturer: "Reebok",
        qty: 0,
        price: 3000,
        icon: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
        details: "Detail 6",
        creation: new Date("2022-04-06"),
    }, {
        id: 8,
        name: "Product 8",
        category: "ELECTRONICS",
        manufacturer: "Reebok",
        qty: 0,
        price: 10000,
        icon: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
        details: "Detail 7",
        creation: new Date("2022-04-07"),
    }, {
        id: 9,
        name: "Product 9",
        category: "ELECTRONICS",
        manufacturer: "Reebok",
        qty: 0,
        price: 2000,
        icon: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
        details: "Detail 8",
        creation: new Date("2022-04-08"),
    },
];

export default function ProductShow({ sort }) {
    const { url, path } = useRouteMatch();
    const [category, setCategory] = React.useState('ALL');
    //const [sort, setSort] = React.useState('');
    const { categoryitem } = useParams();

    const handleAlignment = (event, newCategory) => {
        setCategory(newCategory);
    };

    return (
        <>
            {ProductItems
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
                    <ProductCard key={item.id} id={item.id} name={item.name} price={item.price} details={item.details} icon={item.icon} />
                ))}
        </>


    );
};