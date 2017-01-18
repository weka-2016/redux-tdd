const test = require('tape')
const freeze = require('deep-freeze')
const reducer = require('./reducer')

test('adding fruit to cart', t => {
  const state = {
    products: {
      1: {
        name: 'banana',
        stock: 12,
        quantity: 0,
        price: 1.05,
        subtotal: 0
      }
    },
    total: 0
  }
  freeze(state)

  const action = {
    type: 'ADD_PRODUCT_TO_CART',  // magic string
    payload: 1  // the id of a banana
  }

  const expectedState = {
    products: {
      1: {
        name: 'banana',
        stock: 11,
        quantity: 1,
        price: 1.05,
        subtotal: 1.05
      }
    },
    total: 1.05
  }

  const newState = reducer(state, action)

  // redux.createStore(reducer)
  // store.dispatch(action)
  // const newState = store.getState()

  t.deepEqual(newState, expectedState, 'should update the quantity, stock, totals')
  // first test ends here


  // A new test : add another banana (after the first one)
  //
  const aFurtherNewState = reducer(newState, action)

  const aFurtherExpectedState = {
    products: {
      1: {
        name: 'banana',
        stock: 10,
        quantity: 2,
        price: 1.05,
        subtotal: 2.10
      }
    },
    total: 2.10
  }

  t.deepEqual(aFurtherNewState, aFurtherExpectedState, 'can add two bananas')

  t.end()
})


test('trying to add fruit when there is none', t => {
  const state = {
    products: {
      1: {
        name: 'banana',
        stock: 0,
        quantity: 0,
        price: 1.05,
        subtotal: 0
      }
    },
    total: 0
  }

  // add a banana to our cart

  const action = {
    type: 'ADD_PRODUCT_TO_CART',  // magic string
    payload: 1
  }

  const expectedState = {
    products: {
      1: {
        name: 'banana',
        stock: 0,
        quantity: 0,
        price: 1.05,
        subtotal: 0
      }
    },
    total: 0
  }

  const newState = reducer(state, action)

  t.deepEqual(newState, expectedState, 'should update the quantity, stock, totals')

  t.end()
})

test('trying to add a non-existant product', t => {

  const state = {
    products: {
      1: {
        name: 'banana',
        stock: 12,
        quantity: 1,
        price: 1.05,
        subtotal: 1.05
      }
    },
    total: 1.05
  }
  freeze(state)

  const expectedState = {
    products: {
      1: {
        name: 'banana',
        stock: 12,
        quantity: 1,
        price: 1.05,
        subtotal: 1.05
      }
    },
    total: 1.05
  }

  const action = {
    type: 'ADD_PRODUCT_TO_CART',  // magic string
    payload: 99  // the id of ??
  }

  const newState = reducer(state, action)

  t.deepEqual(newState, expectedState, 'should render the original state')

  t.end()
})

//remove banana from cart

test('remove a banana from the cart (quantity - 1)', t => {

  const state = {
    products: {
      1: {
        name: 'banana',
        stock: 12,
        quantity: 1,
        price: 1.05,
        subtotal: 1.05
      }
    },
    total: 1.05
  }
  freeze(state)

  const action = {
    type: 'REMOVE_PRODUCT',
    payload: 1}



  const expectedState = {
    products: {
      1: {
        name: 'banana',
        stock: 13,
        quantity: 0,
        price: 1.05,
        subtotal: 0
      }
    },
    total: 0
  }

  const newStateRemove = reducer(state, action)

  t.deepEqual(newStateRemove, expectedState, 'should set quantity and totals to 0')

  t.end()
})

// trying to remove non existant products

test('trying to remove a non-existant product', t => {

  const state = {
    products: {
      1: {
        name: 'banana',
        stock: 12,
        quantity: 1,
        price: 1.05,
        subtotal: 1.05
      }
    },
    total: 1.05
  }
  freeze(state)

  const expectedState = {
    products: {
      1: {
        name: 'banana',
        stock: 12,
        quantity: 1,
        price: 1.05,
        subtotal: 1.05
      }
    },
    total: 1.05
  }

  const action = {
    type: 'REMOVE_PRODUCT',  // magic string
    payload: 99  // the id of ??
  }

  const newState = reducer(state, action)

  t.deepEqual(newState, expectedState, 'should render the original state')

  t.end()
})

 //default case

test('default case : render current state', t => {

  const state = {
    products: {
      1: {
        name: 'banana',
        stock: 12,
        quantity: 1,
        price: 1.05,
        subtotal: 1.05
      }
    },
    total: 1.05
  }
  freeze(state)

  const action = {type: 'THIS_IS_NOT_A_CASE', payload: 1}

  const expectedState = {
    products: {
      1: {
        name: 'banana',
        stock: 12,
        quantity: 1,
        price: 1.05,
        subtotal: 1.05
      }
    },
    total: 1.05
  }

  const newState = reducer(state, action)

  t.deepEqual(newState, expectedState, 'should render the original state')

  t.end()

})

//edit a products

test('edit a product', t => {

  const state = {
    products: {
      1: {
        name: 'banana',
        stock: 12,
        quantity: 1,
        price: 1.05,
        subtotal: 1.05
      }
    },
    total: 1.05
  }
  freeze(state)

  const expectedState = {
    products: {
      1: {
        name: 'coconut',
        stock: 13,
        quantity: 1,
        price: 2.05,
        subtotal: 1.05
      }
    },
    total: 1.05
  }

  const action = {type: 'EDIT', payload: {
    productToEdit: 1,
    name: 'coconut',
    stock: 13,
    price: 2.05}}

  const newState = reducer(state, action)

  t.deepEqual(newState, expectedState, 'should change the name, price or stock of product')

  t.end()

})
//empty cart

test('empty the cart', t => {

  const state = {
    products: {
      1: {
        name: 'banana',
        stock: 12,
        quantity: 1,
        price: 1.05,
        subtotal: 1.05
      },
      2: {
        name: 'coconut',
        stock: 13,
        quantity: 1,
        price: 2.05,
        subtotal: 2.05
      }
    },
    total: 3.10
  }
  freeze(state)

  const expectedState = {
    products: {
      1: {
        name: 'banana',
        stock: 13,
        quantity: 0,
        price: 1.05,
        subtotal: 0
      },
      2: {
        name: 'coconut',
        stock: 13,
        quantity: 0,
        price: 2.05,
        subtotal: 0
      }
    },
    total: 0
  }

  const action = {type: 'EMPTY_CART', payload: state}

  const newState = reducer(state, action)

  t.deepEqual(newState, expectedState, 'should empty the cart (set all quantities and totals to 0)')

  t.end()

})
