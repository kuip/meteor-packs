import React from 'react';

import './ImageComponent.css';

const ImageComponent = React.createClass({
  render() {
    return React.createElement(
      "img", {
        className: this.props.className,
        src: this.props.src,
        alt: "Image"
        //width: '100%',
        //height: '80%'
    });
  }
});

export { ImageComponent };
