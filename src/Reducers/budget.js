import {
  BUDGETS_REQUEST,
  BUDGETS_SUCCESS,
  BUDGETS_FAILURE,
} from '../Actions/Budget'

const INITIAL_STATE = {
  isFetching: false,
  total: {
    spent: 0,
    total: 0,
  },
  budgets: [],
  message: ''
}

function budget(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BUDGETS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case BUDGETS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        total: action.total,      // {spent, total}
        budgets: action.budgets,  // {objmap}
      }
    case BUDGETS_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.message
      }
    default:
      return state
  }
}

export default budget;
