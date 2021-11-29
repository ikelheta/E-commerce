import React from "react";
import {Card , CardMedia, CardContent, CardActions, Typography, IconButton} from "@material-ui/core"
import useStyles from "./style"
import {AddShoppingCart} from "@material-ui/icons"



function Product({product,onAddToCart}) {
  const classes = useStyles();
 
 
  return (
    <Card className={classes.root} >
      <CardMedia className={classes.media} title = {product.name} image= {product.image.url} />
        <CardContent>
          <div className={classes.cardContent}>
            <Typography variant="h5" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5" >
              {product.price.formatted_with_sympol}
            </Typography>
          </div>
          <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary"></Typography>
        </CardContent>
        <CardActions  className={classes.cardActions}>
          <IconButton aria-label="Add to Cart" onClick={()=>onAddToCart(product.id, 1)}>
            <AddShoppingCart/>
          </IconButton>
        </CardActions>
        

    </Card>
  )
}

export default Product
