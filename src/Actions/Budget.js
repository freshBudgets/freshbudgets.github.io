import { apiGet, apiPost } from '../Functions/api';

export const BUDGETS_REQUEST = 'BUDGETS_REQUEST';
export const BUDGETS_SUCCESS = 'BUDGETS_SUCCESS';
export const BUDGETS_FAILURE = 'BUDGETS_FAILURE';
export const BUDGET_REQUEST = 'BUDGET_REQUEST';
export const BUDGET_SUCCESS = 'BUDGET_SUCCESS';
export const BUDGET_FAILURE = 'BUDGET_FAILURE';
export const BUDGET_UPDATE = 'BUDGET_UPDATE';

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
      name: budget.budgetName,
      total: budget.budgetLimit,
      spent: budget.currentAmount,
      transactions: budget.transactions,
      id: budget._id
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

function budgetUpdate(budget) {
  return {
    type: BUDGET_UPDATE,
    isFetching: false,
    budget: {
      name: budget.newBudgetName,
      total: budget.newBudgetLimit,
      id: budget.budgetID
    }
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

export function getOneBudget(id) {
  return dispatch => {
    dispatch(requestBudget());

    return apiGet(`/budget/${id}`).then( response => {
      if (!response.success) {
        const message = response.message || 'Problem getting budget';
        dispatch(budgetFailure(message));
        return Promise.reject(message);
      }

      dispatch(receiveBudget(response.budgets));
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

export function deleteBudget(id) {
  return dispatch => {

    return apiPost('/budget/delete', {budgetID: id}).then(response => {
      if (!response.success) {
        const message = response.message || 'Problem getting budget';
        dispatch(budgetFailure(message));
        return Promise.reject(message);
      }

      return Promise.resolve('deleted');
    })
  }
}

export function updateBudget(budget) {
  return dispatch => {
    console.log('Actions/Budget.js:155');
    return apiPost('/budget/edit', budget).then(response => {
      if (!response.success) {
        const message = response.message || 'Problem getting budget';
        dispatch(budgetFailure(message));
        return Promise.reject(message);
      }

      console.log('Actions/Budget.js:163');
      dispatch(budgetUpdate(budget))
      return Promise.resolve('updated');
    })
  }
}
