import React, { useEffect } from 'react';
import { useState } from 'react';

import HeaderCustomer from '../components/customer/Header.js';
import Menu from '../components/customer/menu/Menu.js';
import Checkout from '../components/customer/checkout/Checkout.js';
import Register from '../components/customer/account/Register.js';
import Login from '../components/customer/account/Login.js';
import Profile from '../components/customer/account/Profile.js';

import Api from '../api/customer.js';

import theme from '../components/Theme.js';
import { ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';

export default function Main() {

  //URL PARAMS
  const queryParams = new URLSearchParams(window.location.search);
  const resto_id = queryParams.get('resto_id');
  const api_url = "https://api.ieumy.com/api/";

  //RESTAURANT
  var [restaurant, setRestaurant] = useState(getInitialRestaurant());
  useEffect(() => {
      var get_resto_params = { api_url, resto_id, setRestaurant };
      Api.getRestaurant(get_resto_params);
  });
  
  //ACCOUNT
  var [account, setAccount] = useState(JSON.parse(sessionStorage.getItem('account-user')) || {status: 0});
  const logInUser = (account) => {
    setAccount(
      {
        status: 1,
        token: account.token,
        email: account.email,
        firstname: account.firstname,
        lastname: account.lastname,
      }
    )
  };
  const logOutUser = () => {
    setAccount(
      {
        status: 0
      }
    )
  };
  useEffect( () => {
    sessionStorage.setItem('account-user', JSON.stringify(account));
  }, [account]);

  //open register page
  const [openRegister, setOpenRegister] = React.useState(false);
  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };
  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  //open login page
  const [openLogin, setOpenLogin] = React.useState(false);
  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  //open profile page
  const [openProfile, setOpenProfile] = React.useState(false);
  const handleClickOpenProfile = () => {
    setOpenProfile(true);
  };
  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  //CART
    var [cartItems, setCartItems] = useState(JSON.parse(sessionStorage.getItem('cart-user')) || []);
    const onAdd = (product) => {
      const exist = cartItems.find((x) => x.id === product.id && x.variation === product.variation);
        if (exist) {
          setCartItems(
            cartItems.map((x) =>
              x.id === product.id && x.variation === product.variation ? { ...exist, qty: exist.qty + 1 } : x
            )
          );
        } else {
          setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
   };

    const onRemove = (product) => {
      const exist = cartItems.find((x) => x.id === product.id && x.variation === product.variation);
        if (exist.qty === 1) {
          setCartItems(cartItems.filter((x) => x.id !== product.id || x.variation !== product.variation));
        } else {
          setCartItems(
            cartItems.map((x) =>
              x.id === product.id && x.variation === product.variation ? { ...exist, qty: exist.qty - 1 } : x
            )
          );
        }
    };
    
    useEffect( () => {
      sessionStorage.setItem('cart-user', JSON.stringify(cartItems));
     }, [cartItems])

  //CATEGORY OF FOOD
    var [category, setCategory] = useState(null);
    var editCategory = (cat) => {
        setCategory( category = cat );
    }
  
  //CHECKOUT
  const [openCheckout, setOpenCheckout] = React.useState(false);

  const handleClickOpenCheckout = () => {
    setOpenCheckout(true);
  };

  const handleCloseCheckout = () => {
    setOpenCheckout(false);
  };


    return (
        <>
            <ThemeProvider theme={theme}>
            <HeaderCustomer account={account} logInUser={logInUser} logOutUser={logOutUser} handleClickOpenLogin={handleClickOpenLogin} handleClickOpenRegister={handleClickOpenRegister} handleClickOpenProfile={handleClickOpenProfile} cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} editCategory={editCategory} handleClickOpenCheckout={handleClickOpenCheckout} handleCloseCheckout={handleCloseCheckout}/>
            <Login openLogin={openLogin} handleCloseLogin={handleCloseLogin} logInUser={logInUser}/>
            <Register openRegister={openRegister} handleCloseRegister={handleCloseRegister} />
            <Profile openProfile={openProfile} handleCloseProfile={handleCloseProfile} account={account} logOutUser={logOutUser} handleClickOpenLogin={handleClickOpenLogin}/>
            <Checkout account={account} handleCloseCheckout={handleCloseCheckout} openCheckout={openCheckout} cartItems={cartItems}/>
            <Menu restaurant={restaurant} onAdd={onAdd} editCategory={editCategory} category={category}/>
            </ThemeProvider>
        </>
    );
}
function getInitialRestaurant(){
  var restaurant = {
      name: "",
      description: "",
      image: "",
      table: "",
      categories: {
      }
  }
  return restaurant;
}