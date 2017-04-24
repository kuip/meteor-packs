import React from 'react';

import { ImageComponent } from './ImageComponent.js';
import { RatingStateComponent } from './RatingComponent.js';

import './RatingBrowserComponent.css';

const RatingBrowserComponent = React.createClass({
  render() {
    //console.log(this.props)
    let { rated=[], ratingUrl, tag } = this.props;
    let options = ['', 1, 2, 3, 4, 5]

    return React.createElement('div', {

    },
      rated.map(function(r, i) {
        //console.log(r, options, tag)
        return React.createElement('div',
          {
            key: 'rated_' + i,
            className: 'rtng-brws-div small'
          },
          React.createElement('a', {
            href: ratingUrl + encodeURIComponent(r.uri), key: 'rating_' + i,
            target: "_blank"
          },
            React.createElement(ImageComponent, {
              src: r.uri,
              className: 'rtng-img massive'
            })
          ),
          React.createElement(RatingStateComponent, {
            rated: r, options, tag, className: 'rtng-brws-rt25'
          })
        )
      })
    )
  }
});

export { RatingBrowserComponent };
