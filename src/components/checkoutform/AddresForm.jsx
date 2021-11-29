import React, {useState, useEffect} from 'react'
import { Grid, Typography, Button, MenuItem, Select, InputLabel } from '@material-ui/core'
import {useForm, FormProvider} from "react-hook-form"
import CustomField from "./CustomField"
import {commerce} from "../../hemazjs/hemaz"
import {Link} from "react-router-dom"


const AddresForm = ({checkOutToken, cart, next}) => {
  const methods = useForm();

  const [shippingCountries, setShippingCountries]= useState([])
  const [shippingCounrty, setShippingCountry]= useState("")

  const [shippingSubdivisions, setShippingSubdivisions]= useState([])
  const [shippingSubdivision, setShippingSubdivision]= useState("")

  const [shippingOptions, setShippingOptions]= useState([])
  const [shippingOption, setShippingOption]= useState("")

  const countries =Object.entries(shippingCountries).map(([code, name])=>({id:code, label:name}))
  const subdivisions =Object.entries(shippingSubdivisions).map(([code, name])=>({id:code, label:name}))
  const options = shippingOptions.map((sO)=>({id: sO.id, label: `${sO.description} - (${sO.formatted_with_sympol})`}))


  const fetchshippingCountries = async (checkOutTokenId)=>{
      const {countries } = await commerce.services.localeListShippingCountries(checkOutTokenId);
      console.log (countries)
      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0])
  }

  const fetchshippingSubdivisions = async (countryCode)=>{
    const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
     setShippingSubdivisions(subdivisions);
     setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const fetchOptions = async(checkOutTokeniD, country, region=null)=>{
    const options = await  commerce.checkout.getShippingOptions(checkOutTokeniD,{country, region} )
    setShippingOptions(options)
    setShippingOption (options[0].id)
  }
  useEffect(() => {
    if (shippingSubdivision) fetchOptions(checkOutToken.id, shippingCounrty, shippingSubdivision);
  }, [shippingSubdivision]);

  useEffect(() => {
    if (shippingCounrty) fetchshippingSubdivisions(shippingCounrty);
  }, [shippingCounrty]);

  useEffect(()=>{
    fetchshippingCountries(checkOutToken.id)
  },[cart])

  


  return (
  <>
    <Typography variant="h6" gutterBottom>Shipping Details</Typography>
    <FormProvider {...methods} >
      <form onSubmit={methods.handleSubmit((data)=>next({...data, shippingCounrty, shippingSubdivision, shippingOption}))}>
        <Grid container spacing={4} gutterBottom>
            <CustomField required name ="firstName" label = "First name"/>
            <CustomField required name ="lastName" label = "Last name"/>
            <CustomField required name ="address" label = "Address"/>
            <CustomField required name ="email" label = "Email"/>
            <CustomField required name ="zip" label = "Zip / pstal code"/>
            <CustomField required name ="city" label = "City"/>

            <Grid item xs = {12} sm ={6}>
              <InputLabel> Shipping Country</InputLabel>
                <Select value = {shippingCounrty} fullwidth onChange={(e)=>setShippingCountry(e.target.value)}>
                    {countries.map((country)=>(
                      <MenuItem key = {country.id} value = {country.id}>
                        {country.label}
                      </MenuItem>
                    ))}                 
                </Select>
            </Grid>
           

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs = {12} sm ={6}>
              <InputLabel> Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
              
            </Grid> 
         </Grid>
         <div fullWidth style= {{display: 'flex' , justifyContent: 'space-between', marginTop: '10px'}}>
         <Button component= {Link} to ="/cart" variant="outlined">Back to Cart</Button>
         <Button variant="contained" color="primary" type="submite">Next</Button>
         </div>
      </form>
     
   </FormProvider>
  </>
  )
}

export default AddresForm
