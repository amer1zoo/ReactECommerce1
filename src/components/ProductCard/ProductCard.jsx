import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

export default function ProductCard({ id, name, icon, price, details }) {
    return (
        <Card style={{ display: "flex", flexDirection: "column" }} sx={{ minWidth: 400, m: 3, height: { xs: 150, sm: 400 }, }} >
            <CardMedia component="img" height="160" image={icon} alt="Paella dish" />
            <CardContent>
                <Grid row container>
                    <Grid item xs={6} align="left">
                        <Typography variant="h6" color="text.secondary">
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} align="right">
                        <Typography variant="h6" color="text.secondary">
                            ₹ {price}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent>
                <Typography variant="subtitle1" color="text.secondary">
                    {details}
                </Typography>
            </CardContent>
            <CardActions style={{ marginTop: "auto" }}>
                <Grid row container>
                    <Grid item xs={6} align="left">
                        <Button variant="contained" color="primary" size="small" component={Link} to={"/products/" + id}>Buy</Button>
                    </Grid>
                    <Grid item xs={6} align="right">
                        <IconButton aria-label="edit">
                            <CreateIcon />
                        </IconButton>
                        <IconButton aria-label="remove">
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>

    );
}