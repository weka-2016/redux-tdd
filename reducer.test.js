const test = require('tape')
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

  // add a banana to our cart
  //
  const action = {
    type: 'ADD_PRODUCT_TO_CART',  // magic string
    payload: 1
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


  // add another banana 
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
  //
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

  // redux.createStore(reducer)
  // store.dispatch(action)
  // const newState = store.getState()

  t.deepEqual(newState, expectedState, 'should update the quantity, stock, totals')

  t.end()
})


