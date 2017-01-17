

// called like 
// <ProductRow name={'banana'} price={2.33} id={12} key={12} store={store} />
//
// state something like : 
// const state = { 
//   products: {
//     1: {
//       name: 'banana',
//       stock: 12,
//       quantity: 0,
//       price: 1.05,
//       subtotal: 0,
//       attemptingPurchase: false
//     }
//   },
//   total: 0
//   errors: { 
//     products: []
//   }
// }


// imagine we are in react component
//
//
const request = require('xhr')

function ProductRow (props) {
  const { name, price, id, store } = props

  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        {price}
      </td>
      <td>
        <button
          onClick={() => {
            store.dispatch({type: 'ATTEMPTING_PURCHASE', payload: id})

            request.get(`/api/v1/products/${id}/buy`, (err, data) => {
              if (err) store.dispatch({type: 'BUYING_ERROR'})

              store.dispatch({action: 'PURCHASE_SUCCESS', payload: { id: id, data: data }})
            })
          }}
        >
          BUY
        </button>
      </td>

    </tr>
  )
}

