const clone = require('clone')
const mapObj = require('map-obj')

module.exports = reducer

// there is only one state

// reducer is pure function
//  => no side-effects

// copy the state before you modify it
// (DO NOT mutate the state)

function reducer (state, action) {
  const newState = clone(state)

  switch (action.type) {

    case 'ADD_PRODUCT_TO_CART':
      var productId = action.payload
      var product = newState.products[productId]
      if (!product || product.stock === 0) return newState
      product.quantity += 1
      product.stock -= 1
      product.subtotal += product.price
      newState.total += product.price
      return newState

    case 'REMOVE_PRODUCT':
      var productId = action.payload
      var product = newState.products[productId]
      if (!product || product.quantity === 0) return newState
      product.quantity -= 1
      product.stock += 1
      product.subtotal -= product.price
      newState.total -= product.price
      return newState

    case 'EDIT':
      const { productToEdit, name, stock, price } = action.payload
      newState.products[productToEdit].name = name
      newState.products[productToEdit].stock = stock
      newState.products[productToEdit].price = price
      return newState

    case 'EMPTY_CART':
      const products = action.payload.products
      const emptyCart = mapObj(products, (key, value) => [key, ])
      console.log(emptyCart);


    default :
      return newState
  }
}
