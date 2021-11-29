import React from 'react'
import {Typography, Button, Card, CardMedia, CardActions, CardContent,} from "@material-ui/core"
import useStyle from "./style"

function CartItem({item ,onUpdate, onRemove}) {
  const classes = useStyle();
  return (
    <Card className={classes.card}>
      <CardMedia image = {item.image.url} className={classes.media} />
      <CardContent className= {classes.cardContent}>
        <Typography variant = "h4" >{item.name}</Typography>
        <Typography variant = "h5" >{item.line_total.formatted_with_symbol}</Typography> 
      </CardContent>
      <CardActions className={classes.cardActions}>
          <div className={classes.cardContent}>
              <Button type="button" size = "large" onClick={()=>onUpdate(item.id, item.quantity-1)}>-</Button>
              <Typography variant="h4">{item.quantity} </Typography>
              <Button type="button" size = "large" onClick={()=>onUpdate(item.id, item.quantity+1)}>+</Button>
          </div>
          <Button type="button" variant = "contained" color= "secondary" onClick= {()=>onRemove(item.id)} >Remove</Button>
        </CardActions>
    </Card>
  )
}

export default CartItem
