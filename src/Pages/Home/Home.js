import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'react-phone-input-auto-format';

import Hero from '../../Public/Images/hero.svg';
import Budget from '../../Public/Images/budget.png';
import HomeImg from '../../Public/Images/home.png';
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
              <Link to="/register"><button>Get Started</button></Link>
            </div>
            <div className="p-home__content_image">
              <img src={Hero} width="100%" height="auto" alt="Wallet"/>
            </div>
          </div>
        </div>
        <div className="p-home__features">
          <div className="p-home__features--sms">
            <h1>Fresh Budgets is an SMS based budgeting tool.</h1>
            <div className="p-home__feature">
              <div className="p-home__feature_description">
                <h2>Stay in the loop as you spend</h2>
                <p>
                  We connect with most major financial institutions to monitor your
                  spending. Every time a transaction is made on a connected account
                  we will send you an SMS message to keep you aware of your spending.
                </p>
              </div>
              <div>
                <div className="p-home__texting">
                  <div className="c-sms_bubble c-sms_bubble-recieve">You just spent $5.63 at Chick-Fil-A. Reply with which budget you want to add this to.</div>
                  <div className="c-sms_bubble c-sms_bubble-send">Food</div>
                  <div className="c-sms_bubble c-sms_bubble-recieve">Got it! You have $13.78 left to spend today.</div>
                </div>
              </div>
            </div>
            <div className="p-home__feature">
              <div className="p-home__feature_description">
                <h2>Be reminded when bills are due</h2>
                <p>
                  Get automatic SMS notifications when upcoming bills need to be paid.
                </p>
              </div>
              <div>
                <div className="p-home__texting">
                  <div className="c-sms_bubble c-sms_bubble-recieve">Your Spotify bill is due today.</div>
                  <div className="c-sms_bubble c-sms_bubble-send"><span role="img" aria-label="Thumbs up">👍</span></div>
                </div>
              </div>
            </div>
            <div className="p-home__feature">
              <div className="p-home__feature_description">
                <h2>Get notified of approaching or budget overages</h2>
                <p>
                  You'll never hit you limit if you're aware of how close you are to it. 
              </p>
              </div>
              <div>
                <div className="p-home__texting">
                  <div className="c-sms_bubble c-sms_bubble-recieve">Your budget: Food, is 75% or more to its limit. Watch your spending!</div>
                  <div className="c-sms_bubble c-sms_bubble-send">Food info</div>
                  <div className="c-sms_bubble c-sms_bubble-recieve">You have $13.78 left to spend today.</div>
                </div>
              </div>
            </div>
          </div>
          <h1>View detailed spending insights</h1>
          <div className="p-home__feature">
            <MockBrowser width={500} src={Budget} />
            <div className="p-home__feature_description">
              <h2>Categorize Spending</h2>
              <p>
                Fresh Budgets also provides an web-based interface to keep more
                detailed track of your finances.
              </p>
            </div>
          </div>
          <div className="p-home__feature">
            <div className="p-home__feature_description">
              <h2>Categorize Spending</h2>
              <p>
                At a glance, see where you are spending too much, or where you
                could redistribute unused funds to.
              </p>
            </div>
            <MockBrowser width={500} src={HomeImg} />
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
