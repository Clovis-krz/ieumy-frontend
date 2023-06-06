import './Header.css';
import ieumy_logo from '../../assets/ieumy-logo.png'
//import { Link } from "react-router-dom";

import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';


import tools from '../tools.js';


function ButtonAppBar(props) {
  const { account, logInUser, logOutUser, handleClickOpenLogin, handleClickOpenRegister, handleClickOpenProfile, cartItems, onAdd, onRemove, editCategory, handleClickOpenCheckout, handleCloseCheckout } = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="secondary" position="fixed" sx={{ top: 0, bottom: 'auto' }}>
        <Toolbar position="sticky">
          <Button href="/"><Logo/></Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          <Button color="inherit" onClick={ () => editCategory(null) }>Menu</Button>
          <CustomerMenu account={account} logInUser={logInUser} logOutUser={logOutUser} handleClickOpenLogin={handleClickOpenLogin} handleClickOpenRegister={handleClickOpenRegister} handleClickOpenProfile={handleClickOpenProfile} cartItems={ cartItems } onAdd={onAdd} onRemove={onRemove} handleClickOpenCheckout={handleClickOpenCheckout} handleCloseCheckout={handleCloseCheckout}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function CustomerMenu(props) {
  const { account, logInUser, logOutUser, handleClickOpenLogin, handleClickOpenRegister, handleClickOpenProfile, cartItems, onAdd, onRemove, handleClickOpenCheckout, handleCloseCheckout } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl_cart, setAnchorEl_cart] = React.useState(null);
  const open_cart = Boolean(anchorEl_cart);
  const handleClick_cart = (event) => {
    setAnchorEl_cart(event.currentTarget);
  };
  const handleClose_cart = () => {
    setAnchorEl_cart(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

        <Tooltip title="Cart">
          <IconButton
            onClick={handleClick_cart}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open_cart ? 'cart-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open_cart ? 'true' : undefined}
          >
            <Badge badgeContent={tools.CountCartItems(cartItems)} color="error">
            <ShoppingCartIcon sx={{ width: 32, height: 32 }}></ShoppingCartIcon>
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
        
      </Box>
      {account.status == 1 ? <LogInCustomerMenu anchorEl={anchorEl} open={open} handleClose={handleClose} logOutUser={logOutUser} handleClickOpenProfile={handleClickOpenProfile} />: <LogOutCustomerMenu anchorEl={anchorEl} open={open} handleClose={handleClose} handleClickOpenLogin={handleClickOpenLogin} handleClickOpenRegister={handleClickOpenRegister}/>}

      <Menu
        anchorEl={anchorEl_cart}
        id="cart-menu"
        open={open_cart}
        onClose={handleClose_cart}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        { cartItems.length > 0 && <Typography variant="h5" sx={{ paddingLeft: "5px" }}>In your cart :</Typography>}
        <Divider></Divider>
        { RenderCartItems(cartItems, onAdd, onRemove) }
        <Divider></Divider>
        { cartItems.length > 0 && <Typography variant="h6" sx={{ paddingLeft: "5px" }}>Total : {tools.ComputeTotalCart(cartItems)}€ </Typography>}
        <Divider></Divider>
        { cartItems.length > 0 && <Button variant="contained" sx={{ backgroundColor: "#78BCC4", width: "100%" }} onClick={handleClickOpenCheckout}>Checkout</Button>}
      </Menu>
    </React.Fragment>
  );
}

function Logo(){
    return (
        <img src={ieumy_logo} alt="Logo" className="Logo"/>
    );
}

function RenderCartItems(items, onAdd, onRemove){
  if (items.length == 0) {
    return(
    <Typography variant="h6">
      Your cart is empty        
    </Typography>
    )
  }
  else{
    return items.map(function(item){
        return (
          <Typography variant="h6" sx={{ paddingRight: "5px" }}>
              <Button onClick={ () => {onRemove(item)} }>-</Button>{item.qty}<Button onClick={ () => { onAdd(item) }}>+</Button> { item.name } { item.variation? item.variation : null}<br></br>
          </Typography>
        )
    })
  }
}

function LogInCustomerMenu(props){
  var {anchorEl, open, handleClose, logOutUser, handleClickOpenProfile} = props;
  return (
    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Button onClick={ () => handleClickOpenProfile()}>
          <MenuItem>
            <Avatar/> Profile
          </MenuItem>
        </Button>
        <Divider />
        <Button href="/settings">
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Button>
        <Button onClick={ () => logOutUser() }>
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Button>
      </Menu>
  )
}

function LogOutCustomerMenu(props){
  var {anchorEl, open, handleClose, handleClickOpenLogin, handleClickOpenRegister} = props;
  return (
    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Button onClick={ () => handleClickOpenLogin()}>
          <MenuItem>
            <Avatar/> logIn
          </MenuItem>
        </Button>
        <Divider />
        <Button onClick={ () => handleClickOpenRegister()}>
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Create an account
          </MenuItem>
        </Button>
      </Menu>
  )
}

export default ButtonAppBar;