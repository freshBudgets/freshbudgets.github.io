import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Nav from '../../Components/Nav';
import './_pillar.create_budget.source.scss';

const propTypes = {
}

const defaultProps = {
}

class CreateBudget extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      limit: 0
    }
  }

  render() {
    return (
      <div className="p-create_budget">
        <Nav />
        <div className="p-create_budget__content">
          <div className="p-create_budget__header">Create Budget</div>
          <div className="p-create_budget__input_group">
            <div className="p-create_budget__input_header">Budget Name</div>
            <input type="text" placeholder="Food"/>
          </div>
          <div className="p-create_budget__input_group">
            <div className="p-create_budget__input_header">Spending Limit</div>
            <input type="number" placeholder="$100.00"/>
          </div>
          <div className="p-create_budget__input_group">
            <button>Save</button>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => ({
});

CreateBudget.propTypes = propTypes;
CreateBudget.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(CreateBudget)
