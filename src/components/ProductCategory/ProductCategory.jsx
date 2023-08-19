import * as React from 'react';
import { useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Link, useRouteMatch } from 'react-router-dom';
import { URL_PRODUCT } from '../../common/constants';

export default function ProductCategory() {
    const [categories, setCategories] = useState([]);
    const { url } = useRouteMatch();
    const [category, setCategory] = useState('ALL');

    const fetchInfo = () => {
        return fetch(URL_PRODUCT + '/categories')
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