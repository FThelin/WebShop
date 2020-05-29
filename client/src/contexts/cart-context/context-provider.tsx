import React, { FC, useState, useEffect } from "react";
import axios from "axios"

import CartContext from "./context";

import { CollectionItem } from "../../shop.data";

interface IProps {

}


export type ShippingMethod = [] | any
export type PaymentMethod = "card" | "invoice" | "swish";

const CartContextProvider: FC<IProps> = props => {
  const [cart, setCart] = useState<CollectionItem[]>([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  //const [freights, setFreight] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/api/freight')
    .then(res => {
    console.log('res.data', res.data)
    setShippingMethod(res.data)    
    })
    .catch(err => {
    console.log(err)
    })
   }, [])



/*   useEffect(() => {
    let cost = 0;
    switch (shippingMethod) {
      case "dhl":
        cost = 10;
        break;
      case "schenker":
        cost = 5;
        break;
      default:
        cost = 2;
    }
    setShippingCost(cost);
  }, [shippingMethod]); */

  const addItemToCart = (item: CollectionItem) => {
    const existing = cart.find(cartItem => cartItem.id === item.id);

    if (existing) {
      const newCart = cart.map(cartItem => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity ? cartItem.quantity + 1 : 1
          };
        } else return cartItem;
      });
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (itemId: number) => {
    const existing = cart.find(cartItem => cartItem.id === itemId);

    if (existing) {
      if (existing.quantity === 1) {
        const newCart = cart.filter(item => item.id !== itemId);
        setCart(newCart);
      } else {
        const newCart = cart.map(cartItem => {
          if (cartItem.id === itemId) {
            return {
              ...cartItem,
              quantity: cartItem.quantity ? cartItem.quantity - 1 : 1
            };
          } else return cartItem;
        });
        setCart(newCart);
      }
    }
  };

  const clearItemFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const setShipping = (method: ShippingMethod) => setShippingMethod(method);

  const setPayment = (method: PaymentMethod) => setPaymentMethod(method);

  return (
    <div>
    <CartContext.Provider
      {...props}
      value={{
        cart,
        shippingMethod,
        setShippingMethod: setShipping,
        paymentMethod,
        setPaymentMethod: setPayment,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        clearCart,
        shippingCost: shippingCost
      }}
    />
    </div>
  );
};

export default CartContextProvider;
