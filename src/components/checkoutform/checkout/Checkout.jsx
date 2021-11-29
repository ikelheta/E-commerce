import  React, { useState, useEffect } from 'react'
import {Paper, Typography, Stepper, Step, CircularProgress, Divider, Button, StepLabel} from "@material-ui/core"
import useStyles from "./style"
import AddresForm from "../AddresForm"
import Payment from "../Payment"
import {commerce} from "../../../hemazjs/hemaz"

function Checkout({cart,onCaptureCheckout}) {
  const [activeStep, setActiveStep] = useState(0);

  const [checkOutToken, setCheckOutToken]= useState("");
  const [shippingData, setShippingData] = useState({});

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);


  const classes = useStyles();
  const steps = ["shipping addres", "payment details"]


  const next = (data) => {
    setShippingData(data);

    nextStep();
  };

  useEffect(()=>{
      const generateToken = async () => {
        try {
            const token = await commerce.checkout.generateToken(cart.id, {type: "cart"})
            setCheckOutToken(token)
        } catch (error) {
          
        }
      }
      generateToken()
  },[cart])

  const Form = ()=> (activeStep === 0 ?
    <AddresForm checkOutToken = {checkOutToken} next= {next} /> 
    : <Payment shippingData={shippingData}  checkOutToken = {checkOutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep}/>
  )

  const Confirmation = ()=> (
    <div>confirmation</div>
  )
  return (
    <>
    <div className={classes.toolbar}/>
    <main className={classes.layout}>
      <Paper className={classes.papper}>
        <Typography variant="h4" align="center">Check out </Typography>
        <Stepper activeStep= {activeStep} className={classes.stepper}>
            {steps.map((step)=>(
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
            ))}
        </Stepper>
        {activeStep===steps.length ?<Confirmation/>:checkOutToken && <Form/>}
      </Paper>

    </main>
    </>
  )
}

export default Checkout
