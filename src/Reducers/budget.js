import {
  BUDGETS_REQUEST,
  BUDGETS_SUCCESS,
  BUDGETS_FAILURE,
  BUDGET_REQUEST,
  BUDGET_SUCCESS,
  BUDGET_FAILURE,
  BUDGET_UPDATE,
} from '../Actions/Budget'

const INITIAL_STATE = {
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
    transactions: [],
    id: ''
  },
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
    case BUDGET_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case BUDGET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        budget: {
          name: action.budget.name,
          total: action.budget.total,
          spent: action.budget.spent,
          transactions: action.budget.transactions,
          id: action.budget.id
        }
      }
    case BUDGET_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.message
      }
    case BUDGET_UPDATE:
      return {
        ...state,
        isFetching: false,
        budget: {
          ...state.budget,
          name: action.budget.name,
          total: action.budget.total,
        }
      }
    default:
      return state
  }
}

export default budget;
