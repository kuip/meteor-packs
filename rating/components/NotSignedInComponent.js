import React from 'react';

const NotSignedInComponent = React.createClass({
  render() {
    return React.createElement('span', {
      style: { position: 'absolute', right: '0', 'margin-top': '20px'}
    }, 'You need to be logged to proceed further.')
  }
})

export { NotSignedInComponent };
