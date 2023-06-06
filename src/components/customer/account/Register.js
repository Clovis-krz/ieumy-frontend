import './Register.css';

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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

import tools from '../../tools.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Register(props) {
  var { openRegister, handleCloseRegister } = props;

  return (
    <>
      <Dialog
        fullScreen
        open={openRegister}
        onClose={handleCloseRegister}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseRegister}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Register
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <RenderRegisterForm handleCloseRegister={handleCloseRegister} />
        </List>
      </Dialog>
    </>
  )

  

  
}

function RenderRegisterForm(props){
  var { handleCloseRegister } = props;

  const [name, setName] = React.useState('');
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const [firstname, setFirstname] = React.useState('');
  const handleChangeFirstname = (event) => {
    setFirstname(event.target.value);
  };
  const [email, setEmail] = React.useState('');
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  
  const [password, setPassword] = React.useState('');
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const [passwordconfirm, setPasswordConfirm] = React.useState('');
  const handleChangePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h2>Register</h2>
      <TextField
        id="outlined-name"
        label="Name"
        value={name}
        onChange={handleChangeName}
      />
      <TextField
        id="outlined-firstname"
        label="Firstname"
        value={firstname}
        onChange={handleChangeFirstname}
        type="name"
      />
      <div>
        <TextField
        id="outlined-email"
        label="Email"
        value={email}
        onChange={handleChangeEmail}
        type="email"
        error={!tools.IsEmailvalid(email)}
        autoFocus="false"
        />
        </div>
      <div>
        <TextField
            id="outlined-password"
            label="Password"
            value={password}
            onChange={handleChangePassword}
            type="password"
            error={ !tools.IsPasswordConfirmed(password, passwordconfirm) }
        />
        <p>password must be at least 8 characters</p>
        </div>
        <TextField
            id="outlined-password-confirm"
            label="Confirm Password"
            value={passwordconfirm}
            onChange={handleChangePasswordConfirm}
            type="password"
            error={ !tools.IsPasswordConfirmed(password, passwordconfirm) }
        />
      <Button variant="contained" onClick={ () => handleRegister(name, firstname, email, password, passwordconfirm, handleCloseRegister) }>Register</Button>
     
    </Box>
  );
}

function handleRegister(name, firstname, email, password, passwordconfirm, handleCloseRegister){
  if (tools.IsPasswordConfirmed(password, passwordconfirm) && tools.IsEmailvalid(email) && name.length >= 2 && firstname.length >= 2) {
    if (postRegister()) {
      handleCloseRegister();
    }
    else{
      console.log("not valid server")
    }
  }
  else{
    console.log("not valid frontend")
  }
}

function postRegister(){
  return true;
}

export default Register;