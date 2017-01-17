module.exports = reducer

function reducer (state, action) {
  switch (action.type) {

    case 'ADD_PRODUCT_TO_CART':
      const productId = action.payload
      const product = state.products[productId]

      if (product.stock === 0) return state
      // early return

      product.quantity +=1
      product.stock -=1

      product.subtotal += product.price
      state.total += product.price

      return state
  }
}

