import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Rated, Ratings } from '../collection';
import { parseQuery } from '../utils.js';

import { QRRatingComponent } from '../components/RatingComponent.js';

const QRRatingContainer = createContainer(({ location }) => {
  //const uri = decodeURIComponent(location.search.substring(5));
  const userId= Meteor.userId();

  return {
    userId
  };
}, QRRatingComponent);


export { QRRatingContainer };
