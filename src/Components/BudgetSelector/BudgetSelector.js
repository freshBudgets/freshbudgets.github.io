import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { _noop } from 'lodash';
import { connect } from 'react-redux';
import Select from 'react-select';

const propTypes = {
  budgets: PropTypes.array,
  handleChangeBudget: PropTypes.func,
}

const defaultProps = {
  budgets: null,
  handleChangeBudget: _noop,
}

class BudgetSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null
    }
  }

  render() {
    const { selectedOption } = this.state;
    const options = this.props.budgets.map(b => {return {value: b.id, label: b.name}});

    return (
      <Select
        value={selectedOption}
        onChange={this.props.handleChangeBudget}
        options={options}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { budgets } = state.budget;

  return { budgets }
};

const mapDispatchToProps = (dispatch) => ({
});

BudgetSelector.propTypes = propTypes;
BudgetSelector.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(BudgetSelector);
