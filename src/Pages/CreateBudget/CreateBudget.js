import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import Nav from '../../Components/Nav';
import { createBudget } from '../../Actions/Budget';
import './_pillar.create_budget.source.scss';

const propTypes = {
}

const defaultProps = {
}

class CreateBudget extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      limit: null,
      formattedLimit: null,
      name: '',
      errorMap: {
        name: null,
        limit: null
      },
      createdID: null,
      redirect: false,
    }

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave() {
    const limitErr = this.state.limit < 0 || this.state.limit === null;
    const nameErr = this.state.name === '' || this.state.name === null;
    this.setState({
      errorMap: {
        name: nameErr ? 'Oop! You forgot a name.' : null,
        limit: limitErr ? 'Needs to be a reasonable limit, guy' : null
      }
    })

    if (!nameErr && !limitErr) {
      const budget = { budgetName: this.state.name, budgetLimit: this.state.limit };
      this.props.createBudget(budget).then((id) => {
        this.setState({ createdID: id, redirect: true });
      }).catch((message) => {
        console.log(message);
      })
    }
  }

  render() {
    const errorMap = this.state.errorMap;
    if (this.state.redirect) return <Redirect to={`/budget/${this.state.createdID}`} />

    return (
      <div className="p-create_budget">
        <Nav />
        <div className="p-create_budget__content">
          <div className="p-create_budget__header">Create Budget</div>
          <div className="p-create_budget__input_group">
            <div className="p-create_budget__input_header">Budget Name</div>
            <input type="text" placeholder="Food" onChange={(e) => {
              this.setState({name: e.target.value})
            }}/>
            { errorMap.name ? <div className="c-error_text">{errorMap.name}</div> : null }
          </div>
          <div className="p-create_budget__input_group">
            <div className="p-create_budget__input_header">Spending Limit</div>
            <NumberFormat value={this.state.formattedLimit} decimalScale={2} thousandSeparator={true} prefix={'$'} onValueChange={(values) => {
              const {formattedValue, value} = values;
              this.setState({limit: value, formattedLimit: formattedValue})
            }}/>
            { errorMap.limit ? <div className="c-error_text">{errorMap.limit}</div> : null }
          </div>
          <div className="p-create_budget__input_group">
            <button onClick={this.handleSave}>Save</button>
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
  createBudget: (budget) => dispatch(createBudget(budget))
});

CreateBudget.propTypes = propTypes;
CreateBudget.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(CreateBudget)
