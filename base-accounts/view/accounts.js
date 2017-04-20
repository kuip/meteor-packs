import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import 'meteor/accounts-ui';

import './accounts.css';

class AccountsComponent extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.renderWithData(Template.loginButtons, { align: "right" },
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Just render a placeholder container that will be filled in
    return React.createElement("div", {
      ref:"container",
      className: 'loginButtonsWrap'
    });
  }
}

export { AccountsComponent };
