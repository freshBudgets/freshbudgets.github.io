import {
  BUDGETS_REQUEST,
  BUDGETS_SUCCESS,
  BUDGETS_FAILURE,
} from '../Actions/Budget'

function budget(state = {
    isFetching: false,
    total: {
      spent: 0,
      total: 0,
    },
    budgets: {}
  }, action) {
  switch (action.type) {
    case BUDGETS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case BUDGETS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        total: action.total,
        budgets: action.budgets,
      })
    case BUDGETS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
      })
    default:
      return state
  }
}

export default budget;
