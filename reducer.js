const clone = require('clone')

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

