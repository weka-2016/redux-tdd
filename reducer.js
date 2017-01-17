const clone = require('clone')

module.exports = reducer

function reducer (state, action) {
  const newState = clone(state)

  switch (action.type) {

    case 'ADD_PRODUCT_TO_CART':
      const productId = action.payload
      const product = newState.products[productId]

      if (product.stock === 0) return newState
      // early return

      product.quantity +=1
      product.stock -=1

      product.subtotal += product.price
      newState.total += product.price

      return newState
  }

}
