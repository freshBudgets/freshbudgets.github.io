import { apiGet } from '../Functions/api';

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
    isFetching: true,
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
