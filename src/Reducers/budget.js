import {
  BUDGETS_REQUEST,
  BUDGETS_SUCCESS,
  BUDGETS_FAILURE,
  BUDGET_REQUEST,
  BUDGET_SUCCESS,
  BUDGET_FAILURE,
} from '../Actions/Budget'

function budget(state = {
    isFetching: false,
    total: {
      spent: 0,
      total: 0,
    },
    budgets: {},
    budget: {
      name: '',
      total: '',
      spent: '',
      transactions: []
    }
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
    case BUDGET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case BUDGET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        budget: {
          name: action.budget.name,
          total: action.budget.total,
          spent: action.budget.spent,
          transactions: action.budget.transactions
        }
      })
    case BUDGET_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
      })
    default:
      return state
  }
}

export default budget;
