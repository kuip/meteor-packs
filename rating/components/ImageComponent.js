import React from 'react';

const ImageComponent = React.createClass({
  render() {
    return React.createElement(
      "img", {
        className: "rating-iframe",
        src: this.props.src,
        alt: "Image"
        //width: '100%',
        //height: '80%'
    });
  }
});

export { ImageComponent };
