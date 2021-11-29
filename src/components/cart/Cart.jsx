import React from 'react'
import {Container, Grid, Typography, Button} from "@material-ui/core"
import useStyles from "./style"
import CartItem from './cartitem/CartItem';
import {Link} from 'react-router-dom'

function Cart({cart, onUpdate, onRemove, onEmpty }) {
  const classes = useStyles();


  const EmptyCart = ()=>{
    return (
    <Typography variant="subtitle1"> your cart is empty pleaese Buy some</Typography>
    )
  }

  const FilledCart = ()=>{
    return(
    <>
    <Grid  container spacing={3} >
        {cart.line_items.map((item)=>{
          return (
          <Grid item key={item.id} xs={12} sm= {6} lg={4} >
            <CartItem  item = {item} onUpdate = {onUpdate}  onRemove={onRemove}/>
          </Grid>)
        })}
  </Grid>
  <div className={classes.cardDetails}>
  <Typography variant="h3">Subtotal : {cart.subtotal.formatted_with_symbol}</Typography>
  <div>
    <Button className= {classes.emptyButton} size="large" variant="contained" color = "secondary" type="button"  onClick={onEmpty}   >Empty Cart</Button>
    <Button className= {classes.checkoutButton} size="large" variant="contained" color = "primary" type="button" component={Link} to ="/checkout">Check out</Button>
  </div>
  </div>
  </>
    )
  }

  if (!cart.line_items) return "loading..."

  return (
    <Container>
      <div className={classes.toolbar}/>
      <Typography variant="h3" className= {classes.title}>Your shopping Cart</Typography>
      {!cart.line_items.length ? <EmptyCart/>: <FilledCart/>}
    </Container>
  )
}

export default Cart
