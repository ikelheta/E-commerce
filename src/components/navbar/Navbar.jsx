import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, Typography} from '@material-ui/core'
import {ShoppingCart} from "@material-ui/icons"
import logo from "../../assets/logo.png"
import useStyles from "./style"
import {Link, useLocation} from "react-router-dom"



function Navbar({totalItems}) {
  const classes = useStyles()
  const location = useLocation();

  return (
    <div>
      <AppBar position="fixed" className= {classes.appBar} color= "inherit">
        <Toolbar>
          <Typography component = {Link} to ="/" variant="h6" className={classes.title} color= "inherit" >
            <img src={logo} alt="logo" height="25px"  className={classes.image}/>
            HemazStore
          </Typography>
          <div className={classes.grow}/>
          <div className={classes.button}>
           {location.pathname==="/" &&  <IconButton component= {Link} to = "/cart" aria-label="show cart items" color="inherit" 
            >
             <Badge badgeContent = {totalItems} color="secondary">
               <ShoppingCart/>
              </Badge>
            </IconButton>}
          </div>
        </Toolbar>
      </AppBar>
      
    </div>
  )
}

export default Navbar
