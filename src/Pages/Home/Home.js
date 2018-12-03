import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'react-phone-input-auto-format';

import Hero from '../../Public/Images/hero.svg';
import Budget from '../../Public/Images/budget.png';
import MockBrowser from '../../Components/MockBrowser';
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
        <div className="p-home__grabber">
          <nav>
            <div className="p-home__logo">fb</div>
            <div className="p-home_nav__items">
              <Link to="/login" className="p-home_nav__item">Log In</Link>
            </div>
          </nav>
          <div className="p-home__content">
            <div className="p-home__content_copy">
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
        <div className="p-home__features">
          <h1>Features</h1>
          <div className="p-home__feature">
            <MockBrowser width={500} src={Budget} />
            <div className="p-home__feature_description">
              <h2>Categorize Spending</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
          <div className="p-home__feature">
            <div className="p-home__feature_description">
              <h2>Categorize Spending</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <MockBrowser width={500} src={Budget} />
          </div>
        </div>
        <div className="p-home__get_started">
          <Link to="/register"><button>Get Started</button></Link>
        </div>
      </div>
    );
  }
}

export default Home;
