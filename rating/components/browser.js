import React from 'react';
import Ratings from '../collection';

const RatingBrowserComponent = React.createClass({
  getMeteorData() {
    let handle = Meteor.subscribe('ratings');
    console.log('handle', handle);
    return {
      handle
    }
  },

  render() {
    let ratings = Ratings.find({}, {$sort: { ratings: 1 }}).fetch();
    console.log('ratings', ratings);

    return React.createElement('div', {

    },
      ratings.map(function(r) {
        return React.createElement('a', {
          href: r.uri,
        }, r.uri)
      })
    )
  }
});

export { RatingBrowserComponent };
