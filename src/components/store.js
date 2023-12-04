
import { createStore } from 'redux';

const INC_COUNT = 'inc';
const DEC_COUNT = 'dec';
const RESET_CART = 'reset';
const ADD_ITEM = 'add';

const defaultState = [
  { id: 1, title: 'Велосипед', count: 5 },
  { id: 2, title: 'Самокат', count: 4 },
  { id: 3, title: 'Гантели', count: 7 },
  { id: 4, title: 'Ракетки', count: 1 }
];

function shoppingCart(state = defaultState, action) {
  switch (action.type) {

 case INC_COUNT:
      return state.map(item =>
        item.id === action.payload && item.count < 25 ? { ...item, count: item.count + 1 } : item
      );


 case DEC_COUNT:
      return state.reduce((newState, item) => {
        if (item.id === action.payload) {
          if (item.count <= 1) {
            return newState;
          } else {
            return [...newState, { ...item, count: item.count - 1 }];
          }
        }
        return [...newState, item];
      }, []);

    case RESET_CART:
      return defaultState;


    case ADD_ITEM:
      const highestId = state.reduce((maxId, item) => Math.max(item.id, maxId), 0);
      return [
        ...state,
        { id: highestId + 1, title: action.payload, count: 1 }
      ];
    default:
      return state;
  }
}

const store = createStore(
  shoppingCart,
  JSON.parse(localStorage.getItem('cart')) || undefined
);

store.subscribe(() => {
  const serializedState = JSON.stringify (store.getState());
  localStorage.setItem ('cart', serializedState);
});

export const incCount = itemId => ( {
  type: INC_COUNT,
  payload: itemId
});

export const decCount =  itemId => ({
  type: DEC_COUNT,
  payload: itemId
});

export const resetCart = () =>   ({
  type: RESET_CART
});

export const addItem = (title) => ( {
  type: ADD_ITEM,
  payload: title
});

export default store;
