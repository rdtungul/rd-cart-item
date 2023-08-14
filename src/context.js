import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  //   const [cart, setCart] = useState(cartItems)

  // useReducer codes
  const initialState = {
    loading: false,
    cart: cartItems,
    total: 0,
    amount: 0,
  }
  // reduces.js code implementation
  const [state, dispatch] = useReducer(reducer, initialState)

  //   clear cart functionality
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  //   remove single item in the cart
  const removeCart = (id) => {
    dispatch({ type: 'REMOVE_CART', payload: id })
  }

  //   increase cart functionality
  const increaseCart = (id) => {
    dispatch({ type: 'INCREASE_CART', payload: id })
  }

  //   decrease cart functionality
  const decreaseCart = (id) => {
    dispatch({ type: 'DECREASE_CART', payload: id })
  }

  // fetching data using url(instead of manually inputted data in the local files) --- via useReducer hook
  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    const res = await fetch(url)
    const cart = await res.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  }
  useEffect(() => {
    fetchData()
  }, [])

  // cart toggle amount
  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } })
  }

  // get cart total items in the notification using useEffect() hook
  useEffect(() => {
    // console.log('hello!')
    dispatch({ type: 'TOTAL_ITEMS' }) // total items in the cart
    // dispatch({ type: 'Random' }) // no matching action type error here
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeCart,
        increaseCart,
        decreaseCart,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// Global Context main syntax
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
