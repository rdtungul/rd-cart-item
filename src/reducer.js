const reducer = (state, action) => {
  //   clear cart functionality
  if (action.type === 'CLEAR_CART') {
    // clear cart function
    return { ...state, cart: [] }
  }
  if (action.type === 'REMOVE_CART') {
    // remove single item in the cart
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    }
  }

  // increase functionality
  if (action.type === 'INCREASE_CART') {
    // increase cart item function
    let tempCart = state.cart.map((cartItem) => {
      // increase functionality
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 }
      }
      return cartItem
    })
    return { ...state, cart: tempCart }
  }

  // decrease functionality
  if (action.type === 'DECREASE_CART') {
    // decrease cart item function
    let tempCart = state.cart
      .map((cartItem) => {
        // decrease functionality
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 }
        }
        return cartItem
      })
      .filter((cartItem) => cartItem.amount !== 0) // if the quantity is less than 1, it will automatically removed in the cart items
    return { ...state, cart: tempCart }
  }

  // getting the cart subtotal in the price and total number of items in the cart
  if (action.type === 'TOTAL_ITEMS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem
        const itemTotal = price * amount
        // console.log(price, amount)
        cartTotal.amount += amount
        cartTotal.total += itemTotal
        return cartTotal
      },
      {
        total: 0,
        amount: 0,
      }
    )
    total = parseFloat(total.toFixed(2))
    return { ...state, total, amount }
  }

  // fetching data from the url loading screen
  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }
  // fetching data from the url displaying data
  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload, loading: false }
  }

  // toggle amount increase/decrease functionalities
  if (action.type === 'TOGGLE_AMOUNT') {
    let tempCart = state.cart
      .map((cartItem) => {
        // mapping the context TOGGLE_AMOUNT
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === 'inc') {
            // increase function
            return { ...cartItem, amount: cartItem.amount + 1 }
          }
          if (action.payload.type === 'dec') {
            // decrease function
            return { ...cartItem, amount: cartItem.amount - 1 }
          }
        }
        return cartItem
      })
      .filter((cartItem) => cartItem.amount !== 0) // if the quantity is less than 1, it will automatically removed in the cart items
    return { ...state, cart: tempCart }
  }
  throw new Error('no matching action type!')
}

export default reducer
