import React from 'react';

const iFrameComponent = React.createClass({
  render() {
    return React.createElement(
      "iframe", {
        className: "rating-iframe",
        src: this.props.src,
        frameBorder: 0,
        width: '70%',
        height: '80%'
    });
  }
});

export { iFrameComponent };
