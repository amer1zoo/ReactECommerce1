import * as React from 'react';
import { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link, useRouteMatch, Switch, Route, useParams } from 'react-router-dom';

export default function ProductCategory() {
    const [categories, setCategories] = useState([]);
    const { url } = useRouteMatch();
    const [category, setCategory] = useState('ALL');

    const fetchInfo = () => {
        return fetch('http://localhost:8080/api/products/categories')
            .then((res) => res.json())
            .then((d) => { setCategories(d); d.unshift('ALL'); });
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    const handleAlignment = (event, newCategory) => {
        setCategory(newCategory);
    };

    return (
        <>
            <ToggleButtonGroup value={category} exclusive onChange={handleAlignment}>
                {categories.map((item) => (
                    <Link key={item} to={`${url}/${item}`}><ToggleButton value={item}>{item}</ToggleButton></Link>
                ))}
            </ToggleButtonGroup>
        </>
    );
}