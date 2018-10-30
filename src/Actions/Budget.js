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

      const budgets = response.budgets.map((budget) => {
        return {
          id: budget._id,
          name: budget.budgetName,
          spent: budget.currentAmount,
          total: budget.budgetLimit
        }
      });

      const total = {
        spent: 0,
        total: 0
      }

      budgets.forEach((budget) => {
        total.total += budget.total;
        total.spent += budget.spent;
      })

      dispatch(receiveBudgets(total, budgets));
    })
  }
}

export function createBudget(budget) {
  return dispatch => {
    return apiPost('/budget', budget).then( response => {
      if (!response.success) {
        return Promise.reject(response.message);
      }
      return Promise.resolve(response.budgetID);
    })
  }
}
