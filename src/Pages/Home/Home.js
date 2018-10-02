import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
// import { format, normalize } from 'react-phone-input-auto-format';
import { format } from 'react-phone-input-auto-format';

import Hero from '../../Public/Images/hero.svg';
import './_pillar.home.source.scss';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formattedPhoneNumber: ''
    }

    this.changePhoneNumber = this.changePhoneNumber.bind(this);
  }

  changePhoneNumber(e) {
    this.setState({
      formattedPhoneNumber: format(e.target.value)
    })
  }

  render() {
    return (
      <div className="p-home">
        {/* <Nav /> */}
        <div className="p-home__content">
          <div className="p-home__content_copy">
            {/* <h1>Fresh Budgets</h1> */}
            <h1>Keep your financials in check and start spending right.</h1>
            <p>Enter your phone number to get started.</p>
            <div>
              <input onChange={this.changePhoneNumber} value={this.state.formattedPhoneNumber} type='text' ref='phone' className="p-home_phone_input" placeholder='(555) 555-5555'/>
            </div>
            <Link to="/register"><button>Get Started</button></Link>
          </div>
          <div className="p-home__content_image">
            <img src={Hero} width="100%" height="auto" alt="Wallet"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
