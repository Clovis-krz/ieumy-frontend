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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';

import tools from '../../tools.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    var { account, handleCloseCheckout, openCheckout, cartItems} = props;

    //User Form Info
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

    //Stepper
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
      setActiveStep(0);
    };
    const steps = [
      {
        label: 'Confirm Your Cart',
        description: `Please confirm your cart to proceed`,
        content: <DisplayCart cartItems={cartItems}/> ,
      },
      {
        label: 'Submit your personal information',
        description:
          '',
        content: account.status == 1 ? <FormPayWithLogin account={account} /> : <FormPayWithoutLogin name={name} firstname={firstname} email={email} handleChangeName={handleChangeName} handleChangeFirstname={handleChangeFirstname} handleChangeEmail={handleChangeEmail}/> ,
      },
      {
        label: 'Pay',
        description: `To complete the order, enter your card number (the digits of your card are not stored on our server, stripe is handling it)`,
      },
    ];    

  return (
    <div>
      <Dialog
        fullScreen
        open={openCheckout}
        onClose={ handleCloseCheckout }
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: "#78BCC4" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={ () => {handleCloseCheckout(); handleReset(); }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Checkout
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseCheckout}>
              login
            </Button>
          </Toolbar>
        </AppBar>
        <RenderStepper activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} handleReset={handleReset} steps={steps}/>
      </Dialog>
    </div>
  );
}

function RenderStepper(props){
  var { activeStep, handleNext, handleBack, handleReset, steps } = props;
  return (
    <>
    <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {step.content}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </>
  )
}

function DisplayCart(props){
  var { cartItems } = props;
  return (
    <>
    <DisplayCartItems cartItems={cartItems}/>
    <Typography variant="h5" component="div" sx={{ paddingTop: "10px"}}>Total: {tools.ComputeTotalCart(cartItems)}€</Typography>
    </>
  )
}

function DisplayCartItems(props){
  var {cartItems} = props;
  return cartItems.map(function(item){
    return (
      <>
        <ListItem>
              <Typography variant="h6" component="div">
                    { item.qty } <CloseIcon sx={{ width: 14, height: 14 }}></CloseIcon> { item.name } { item.variation? item.variation : null} - {item.price}€
              </Typography>
        </ListItem>
        <Divider></Divider>
      </>
    )
  })
}

function FormPayWithLogin(props){
  var { account } = props;
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '95%' },
      }}
      noValidate
      autoComplete="off"
    >
      Your are already Login as {account.firstname} :
      <Typography>Firstname: { account.firstname }</Typography>
      <Typography>Lastname: { account.lastname }</Typography>
      <Typography>Email: { account.email }</Typography>
    </Box>
  )
}

function FormPayWithoutLogin(props){
  var { name, firstname, email, handleChangeName, handleChangeFirstname, handleChangeEmail } = props;

  return (
    <>
    <Typography>Your information are only used to manage your order</Typography>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '95%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-name"
        label="Name"
        value={name}
        onChange={handleChangeName}
        required={true}
        error={name.length < 2}
      />
      <TextField
        id="outlined-firstname"
        label="First Name"
        value={firstname}
        onChange={handleChangeFirstname}
        required={true}
        error={firstname.length < 2}
      />
      <TextField
        id="outlined-email"
        label="Email"
        value={email}
        onChange={handleChangeEmail}
        required={true}
        error={!tools.emailValidator(email)}
      />
    </Box>
    </>
  )
}

function CheckFormInfo(){

}

