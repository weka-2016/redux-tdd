const test = require('tape')
const reducer = require('./reducer')
const freeze = require('deep-freeze')

//the original state
test('adding fruit to cart', t => {
  const state = {
    products: {
      1:{
        name:'banana',
        stock: 12,
        quantity: 0,
        price: 1.05,
        subtotal: 0
      }
    },
    total: 0
  }
  freeze(state) //makes it impossible to mutate the state

  //the modified state
  const expectedState = {
    products: {
      1:{
        name:'banana',
        stock: 11,
        quantity: 1,
        price: 1.05,
        subtotal: 1.05
      }
    },
    total: 1.05
  }


  const action = {
    type: 'ADD_PRODUCT_TO_CART', //a magic string(all caps)
    payload: 1 //this is the id of banana
  }

const newState = reducer(state, action) //the modified state

t.deepEqual(newState, expectedState, 'should update the quantity, stock and totals')
//the end of the first test

const aNewerBetterState = reducer(newState, action) //the newer modified state

const aNewerExpectedState = {
  products: {
    1:{
      name:'banana',
      stock: 10,
      quantity: 2,
      price: 1.05,
      subtotal: 2.10
    }
  },
  total: 2.10
}

//the action used to update the state

t.deepEqual(aNewerBetterState, aNewerExpectedState, 'should update the quantity, stock and totals by 2 bananas')
t.end})

test('trying to add fruit when there is none', t => {
  const state = {
    products: {
      1: {
        name:'banana',
        stock: 0,
        quantity: 0,
        price: 1.05,
        subtotal: 0
    }
  },
  total: 0
}

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
