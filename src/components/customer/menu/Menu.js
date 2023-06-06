import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Divider, ListItemSecondaryAction } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Grid from '@mui/material/Grid';
import MuiAlert from '@mui/material/Alert';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import FullViewItem from './FullViewItems.js';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import ItemsVariations from './ItemsVariations.js';

import './Menu.css';

export default function ActionAreaCard(props) {
    var { restaurant, onAdd, editCategory, category } = props;
    //const restaurant = getRestaurant();

    return (
        <div class="menu-nav-space">
        { category == null && <RenderRestaurantInfo restaurant={restaurant} />}
        <Grid container spacing={1} sx={{ paddingTop: "20px", paddingBottom: "20px"}}>
            <Grid container item spacing={1}  >
            { category == null && <RenderCategories restaurant={restaurant} editCategory={editCategory}/>}
            { category != null && <> <RenderBackButton editCategory={editCategory} /> <RenderItems restaurant={restaurant} category={category} onAdd={onAdd} editCategory={editCategory}/></> }
            </Grid>
        </Grid>
        </div>
  );
}

function RenderBackButton(props){
    var { editCategory } = props;
    return(
        <Button variant='' sx={{ paddingLeft: "10px" }}>
            <ArrowBackIcon onClick={ () => editCategory(null)}/>
        </Button>
    )
}

function RenderRestaurantInfo(props){
    const {restaurant} = props;
    return(
        <>
            <Typography variant="h4" component="div" sx={{ textAlign: "center", color: "#F7444E", paddingTop: "10px" }}>
                {restaurant.name}
            </Typography>
            <CardMedia
                component="img"
                height="140"
                width={140}
                image={ restaurant.image }
                alt="green iguana"
            />
            <Button disabled={true}>
                <TableRestaurantIcon sx={{ width: "45px", height: "45px" }}/>
                <Typography variant="h5" sx={{ color: "#78BCC4" }}>NB: {restaurant.table}</Typography>
            </Button>
            <Typography variant="h5" component="div" sx={{ textAlign: "left", color: "#78BCC4", paddingTop: "10px", paddingLeft: "5px" }}>Select a category :</Typography>
        </>
    )
}

function RenderItems(props){
    const { restaurant, category, onAdd } = props;

    //OPEN FULL VIEW ITEM
    const [openItem, setOpenItem] = React.useState(false);
    const handleClickOpenItem = () => {
        setOpenItem(true);
    };
    const handleCloseItem = () => {
        setOpenItem(false);
    };
    const [dataItem, setDataItem] = React.useState('');
    const updateDataItem = (item) => {
        setDataItem(item);
    };

    // Variations Usestate dialog opening 
    const [openVariations, setOpenVariations] = React.useState(false);
    const handleClickOpenVariations = () => {
        setOpenVariations(true);
    };
    const handleClickCloseVariations = () => {
        setOpenVariations(false);
    };
    if (category) {
        return restaurant.categories[category].map(function(item){
            return (
                <>
                    <Card sx={{ maxHeight: 360, width: "100%" }}>
                    <CardActionArea onClick={ () => { updateDataItem(item); handleClickOpenItem(); }}>
                    <CardMedia
                        component="img"
                        height="140"
                        width={140}
                        image={ item.image }
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        { item.name }
                        </Typography>
                        <Typography variant="body2" color="text.secondary" whiteSpace= "nowrap" overflow= "hidden" textOverflow= "ellipsis">
                        { item.description }
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        { item.price }€
                        <IconButton
                            onClick={ item.variations.length > 0 ? () => { updateDataItem(item); handleClickOpenVariations(); } : () => { onAdd(item); }}
                            size="small"
                            sx={{ ml: 2 }}
                        >
                            <AddShoppingCartIcon sx={{ width: 25, height: 25 }}></AddShoppingCartIcon>
                        </IconButton>
                    </Typography>
                    </CardContent>
                    </Card>
                    { item.variations && item.variations.length > 0 && <ItemsVariations openVariations={openVariations} handleClickCloseVariations={handleClickCloseVariations} onAdd={onAdd} dataItem={dataItem}/>}
                    <FullViewItem handleCloseItem={handleCloseItem} openVariations={openVariations} handleClickCloseVariations={handleClickCloseVariations} handleClickOpenVariations={handleClickOpenVariations} openItem={openItem} dataItem={dataItem} onAdd={onAdd}/>
                </>
            )
        });
    }
}

function RenderCategories(props){
    const { restaurant, editCategory } = props;
    const categories =  Object.keys(restaurant.categories);
    return categories.map(function(category){
        return (
            <>
                <Card sx={{ width: "100%", backgroundColor: "white", color: "#78BCC4" }}>
                    <CardActionArea onClick={ () => editCategory(category)}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: "center" }}>
                            { category }
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Divider sx={{paddingBottom: "100px"}}></Divider>
            </>
        )
    });
}