import './Login.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import tools from '../../tools.js';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Login(props) {
  var { openLogin, handleCloseLogin, logInUser } = props;
  const [email, setEmail] = React.useState('');
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = React.useState('');
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const resetInfo = () => {
    setEmail('');
    setPassword('');
  }

  return (
    <Dialog
        fullScreen
        open={openLogin}
        onClose={handleCloseLogin}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseLogin}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Login
            </Typography>
          </Toolbar>
        </AppBar>
        <FormRender email={email} handleChangeEmail={handleChangeEmail} password={password} handleChangePassword={handleChangePassword} handleCloseLogin={handleCloseLogin} logInUser={logInUser} resetInfo={resetInfo}/>
      </Dialog>
  );
}

function FormRender(props){
  var {email, handleChangeEmail, password, handleChangePassword, handleCloseLogin, logInUser, resetInfo} = props;
  return(
    <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <h3>Please submit your information to Login :</h3>
        <TextField
          id="outlined-name"
          label="Email"
          value={email}
          onChange={handleChangeEmail}
          required="true"
          error={ !tools.IsEmailvalid(email) }
        />
        <TextField
          id="outlined-password"
          label="Password"
          value={password}
          onChange={handleChangePassword}
          required="true"
          error = { !Ispassword(password)}
          type="password"
        />
        <div>
        <Button variant="contained" fullWidth="true" onClick={ () => Submit(email, password, logInUser, handleCloseLogin, resetInfo) }>Submit</Button>
        </div>
      </Box>
  )
}

function Submit(email, password, logInUser, handleCloseLogin, resetInfo){
  if (tools.IsEmailvalid(email) && Ispassword(password)) {
    logInUser(CheckLogin(email, password));
    resetInfo();
    handleCloseLogin();
  }
  else{
    console.log("error")
  }
}

// SHOULD CALL API TO LOGIN RETURN USER INFO OR FALSE
function CheckLogin(email, password){
  return {
    token: "dnfebbui726",
    email: "cloclo@gmail.com",
    firstname: "clovis",
    lastname: "lolipop",
  };
}

function Ispassword(password){
  if (password.length > 3) {
    return true;
  }
  else{
    return false;
  }
}

export default Login;