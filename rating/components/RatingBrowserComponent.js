import React from 'react';

import { ImageComponent } from './ImageComponent.js';

const RatingBrowserComponent = React.createClass({
  render() {
    console.log(this.props)
    let { ratings=[] } = this.props;

    return React.createElement('div', {

    },
      ratings.map(function(r, i) {
        return React.createElement('a', {
          href: r.uri, key: 'rating_' + i
        },
          React.createElement(ImageComponent, { src: r.uri })
        )
      })
    )
  }
});

export { RatingBrowserComponent };
