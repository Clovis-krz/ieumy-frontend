const IsEmailvalid = (email) => {
    if (emailValidator(email) || email == "") {
      return true;
    } else {
      return false;
    }
}

const IsPasswordConfirmed = (password, confirm) => {
    if ((password == confirm || (password == "" && confirm == "") || (password != "" && confirm == "")) && (password.length >= 8)){
        return true;
    }
    else{
        return false;
    }
}

const emailValidator = value => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

function ComputeTotalCart(cart){
    var total = 0;
    cart.forEach(item => {
      total += item.price*item.qty
    })
    return total;
  }

function CountCartItems(cart){
  var items_nb = 0;
  cart.forEach(item => {
    items_nb += item.qty;
  })
  return items_nb;
}

export default{
    IsEmailvalid,
    IsPasswordConfirmed,
    emailValidator,
    ComputeTotalCart,
    CountCartItems,
}