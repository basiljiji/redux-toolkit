const redux = require('redux')
const produce = require('immer').produce

const initialState = {
  name: 'Basil Jiji',
  address: {
    street: '123 Main St',
    city: 'Kozhikkode',
    state: 'kerala',
  },
}

const STREET_UPDATED = 'STREET_UPDATED'

const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,  //nested state
      //       street: action.payload,
      //     },
      //   }
      return produce(state, (draft) => {
        draft.address.street = action.payload
      })
    default: {
      return state
    }
  }
}

const store = redux.createStore(reducer)
console.log('InitialState ', store.getState())
const unsubscribe = store.subscribe(() => {
  console.log('Updated state ', store.getState())
})
store.dispatch(updateStreet('456 Main St'))
unsubscribe()
