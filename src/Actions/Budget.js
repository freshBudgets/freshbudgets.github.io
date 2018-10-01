import { apiGet, apiPost } from '../Functions/api';

export const BUDGETS_REQUEST = 'BUDGETS_REQUEST';
export const BUDGETS_SUCCESS = 'BUDGETS_SUCCESS';
export const BUDGETS_FAILURE = 'BUDGETS_FAILURE';

function requestBudgets() {
  return {
    type: BUDGETS_REQUEST,
    isFetching: true
  }
}

function receiveBudgets(total, budgets) {
  return {
    type: BUDGETS_SUCCESS,
    isFetching: false,
    total,
    budgets
  }
}

function budgetsFailure(message) {
  return {
    type: BUDGETS_FAILURE,
    isFetching: false,
    message
  }
}

export function getAllBudgets() {
  return dispatch => {
    dispatch(requestBudgets());

    return apiGet('/budget').then( response => {
      if (!response.success) {
        const message = response.message || 'Problem getting budgets';
        dispatch(budgetsFailure(message));
        return Promise.reject(message);
      }

      dispatch(receiveBudgets(response.total, response.budgets));
    })
  }
}

export const BUDGET_REQUEST = 'BUDGET_REQUEST';
export const BUDGET_SUCCESS = 'BUDGET_SUCCESS';
export const BUDGET_FAILURE = 'BUDGET_FAILURE';

function requestBudget() {
  return {
    type: BUDGET_REQUEST,
    isFetching: true
  }
}

function receiveBudget(budget) {
  return {
    type: BUDGET_SUCCESS,
    isFetching: false,
    budget: {
      name: budget.name,
      total: budget.total,
      spent: budget.spent,
      transactions: budget.transactions
    }
  }
}

function budgetFailure(message) {
  return {
    type: BUDGET_FAILURE,
    isFetching: false,
    message
  }
}

export function getOneBudget(id) {
  return dispatch => {
    dispatch(requestBudget());

    return apiGet(`/budget/${id}`).then( response => {
      if (!response.success) {
        const message = response.message || 'Problem getting budget';
        dispatch(budgetFailure(message));
        return Promise.reject(message);
      }

      dispatch(receiveBudget(response[id]));
    })
  }
}

export function createBudget(budget) {
  return dispatch => {
    return apiPost('/budget/createBudget').then( response => {
      if (!response.success) {
        return Promise.reject(response.message);
      }
      return Promise.resolve(response.budgetID);
    })
  }
}
