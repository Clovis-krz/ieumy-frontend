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
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Logout } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    var { openProfile, handleCloseProfile, account, logOutUser, handleClickOpenLogin } = props;
  return (
    <div>
      <Dialog
        fullScreen
        open={openProfile}
        onClose={handleCloseProfile}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseProfile}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Profile
            </Typography>
          </Toolbar>
        </AppBar>
        <RenderProfile account={account} logOutUser={logOutUser} handleCloseProfile={handleCloseProfile} handleClickOpenLogin={handleClickOpenLogin}/>
      </Dialog>
    </div>
  );
}

function RenderProfile(props){
    var { account, logOutUser, handleCloseProfile, handleClickOpenLogin } = props;
    const [lastname, setLastName] = React.useState(account.lastname);
    const handleChangeLastName = (event) => {
      setLastName(event.target.value);
    };
    const [firstname, setFirstname] = React.useState(account.firstname);
    const handleChangeFirstname = (event) => {
      setFirstname(event.target.value);
    };
    const [email, setEmail] = React.useState(account.email);
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
      <h2>Your personal information :</h2><br></br>
      <TextField
        id="outlined-name"
        label="Name"
        value={lastname}
        onChange={handleChangeLastName}
        width="100%"
      />
      <TextField
        id="outlined-firstname"
        label="Firstname"
        value={firstname}
        onChange={handleChangeFirstname}
        type="name"
        width="100%"
      />
      <div>
        <TextField
        id="outlined-email"
        label="Email"
        value={email}
        onChange={handleChangeEmail}
        type="email"
        autoFocus="false"
        width="100%"
        />
        </div>
      <div>
        <TextField
            id="outlined-password"
            label="Password"
            value={password}
            onChange={handleChangePassword}
            type="password"
            width="100%"
        />
        <p>password must be at least 8 characters</p>
        </div>
        <TextField
            id="outlined-password-confirm"
            label="Confirm Password"
            value={passwordconfirm}
            onChange={handleChangePasswordConfirm}
            type="password"
            width="100%"
        />
      <Button variant="contained" onClick={ () => UpdateInfo(account, logOutUser, handleCloseProfile, handleClickOpenLogin) }>Submit</Button>
     
    </Box>
  );
}

function UpdateInfo(account, logOutUser, handleCloseProfile, handleClickOpenLogin){
    if (CheckForm() && !NeedLogOut()) {
        handleCloseProfile();
    }
    else if (CheckForm() && NeedLogOut()){
        handleCloseProfile();
        logOutUser();
        handleClickOpenLogin();
    }
    else{
        console.log("error in form");
    }
}

function CheckForm(){
    return true;
}

function NeedLogOut(){
    return true;
}
