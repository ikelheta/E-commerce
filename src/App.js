import React ,{useState, useEffect} from "react";
import { Products, Cart, Navbar , Checkout} from "./components";
import {commerce} from "./hemazjs/hemaz"
import {BrowserRouter as Router , Route, Switch } from "react-router-dom"
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder]= useState({});
  
  const fetchProducts = async () =>{
    const {data} = await commerce.products.list();
    setProducts(data);

  }

  const fetchCart = async () =>{
   setCart(await commerce.cart.retrieve());
  }

  const handleAddCart = async (productId, quantity) =>{
    const {cart} = await commerce.cart.add(productId, quantity);
    setCart(cart);
  }

  const handleIncrease = async (lineItemId, quantity) =>{
    const {cart} = await commerce.cart.update(lineItemId, { quantity });
    setCart(cart);
  }

  const handleRemove = async (lineItemId) =>{
    const {cart} = await commerce.cart.remove(lineItemId);
    setCart(cart)
  }

  const handleEmpty = async () =>{
    const {cart} = await commerce.cart.empty()
    setCart(cart)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
     console.log("error")
    }
  };

  


  
  useEffect (()=>{
    fetchProducts();
    fetchCart();
  
  } 
  ,[])




  return (
    <Router>
      <div className="App">
      <Navbar totalItems= {cart.total_items}/>
        <Switch>
          <Route exact path="/">
            <Products products= {products} onAddToCart={handleAddCart} />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} onUpdate={handleIncrease} onRemove = {handleRemove} onEmpty = {handleEmpty} />
          </Route>
          <Route exact path="/checkout">
            <Checkout cart = {cart} onCaptureCheckout= {handleCaptureCheckout}
            order={order} 
            />
          </Route>
        </Switch>

     </div>
    </Router>
  );
}

export default App;
