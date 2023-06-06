import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CardMedia from '@mui/material/CardMedia';
import ButtonAppBar from '../Header';
import { textAlign } from '@mui/system';

import ItemsVariations from './ItemsVariations.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    var { handleCloseItem, openItem, dataItem, onAdd, openVariations, handleClickCloseVariations, handleClickOpenVariations } = props;
  return (
    <div>
      <Dialog
        fullScreen
        open={openItem}
        onClose={handleCloseItem}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: "#78BCC4" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseItem}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              { dataItem.name }
            </Typography>
          </Toolbar>
          <CardMedia
            component="img"
            height="400"
            width={300}
            image={ dataItem.image }
            alt="lol"
            />
        </AppBar>
        <Typography variant="h6" component="div" sx={{ paddingTop: "20px", paddingBottom: "20px", textAlign: 'center'}}>
        { dataItem.description }
        </Typography>
        <Divider></Divider>
        <Typography variant="h6" component="div" sx={{ paddingTop: "10px", paddingBottom: "20px", textAlign: 'center' }}>
        { dataItem.price }€
        </Typography>
        { dataItem.variations && dataItem.variations.length > 0 ? <ItemsVariations openVariations={openVariations} handleClickCloseVariations={handleClickCloseVariations} onAdd={onAdd} dataItem={dataItem}/> : null }
        <Button variant='contained' sx={{ paddingTop: "10px", backgroundColor: "#78BCC4" }} onClick={ dataItem.variations && dataItem.variations.length > 0 ? () => { handleCloseItem(); handleClickOpenVariations() } : () => { onAdd(dataItem); handleCloseItem();}} >ADD TO CART</Button>
      </Dialog>
    </div>
  );
}