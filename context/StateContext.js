import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item?._id === product?._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product?.price * quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities + quantity
    );
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct?._id === product?._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} a été ajouté au panier. `);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item.id === product.id);
    const newCartItems = cartItems.filter(
      (item) => item._id !== product._id
    );
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) =>
        prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);
    if (value === "inc") {
      let newCardQuantity = [
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ...newCartItems,
      ];
      setCartItems(newCardQuantity);
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + foundProduct.price
      );
      setTotalQuantities(
        (prevTotalQuantites) => prevTotalQuantites + 1
      );
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        let newCardQuantity = [
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ];
        setCartItems(newCardQuantity);
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice - foundProduct.price
        );
        setTotalQuantities(
          (prevTotalQuantites) => prevTotalQuantites - 1
        );
      }
    }
  };

  const incQuantity = () => {
    setQty((prevQuantity) => prevQuantity + 1);
  };
  const decQuantity = () => {
    setQty((prevQuantity) => {
      if (prevQuantity - 1 < 1) return 1;
      return prevQuantity - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQuantity,
        decQuantity,
        incQuantity,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
