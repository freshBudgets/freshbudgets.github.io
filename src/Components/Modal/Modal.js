import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './_common.modal.source.scss';

const propTypes = {
  isShowing: PropTypes.bool,
  children: PropTypes.array,
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  className: PropTypes.string
}

const defaultProps = {
  isShowing: false
}

class Modal extends PureComponent {
  render() {
    return (
      this.props.isShowing &&
      <div className={`${this.props.className} c-modal`}>
        <div className="c-modal__bg" onClick={this.props.closeModal} />
        <div className="c-modal__modal">
          { this.props.title && <div className="c-modal__header">{this.props.title}</div> }
          {this.props.children}
        </div>
      </div>
    )
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
export default (Modal)
