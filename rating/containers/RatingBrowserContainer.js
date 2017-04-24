import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Rated } from '../collection';

import { RatingBrowserComponent } from '../components/RatingBrowserComponent.js';

const RatingBrowserContainer = createContainer((data) => {
  console.log(data)
  const ratingsHandle = Meteor.subscribe('ratings');
  const loading = !ratingsHandle.ready();
  const ratings = Rated.find({}).fetch();
  const ratingsExists = !loading && !!ratings;
  return {
    loading,
    ratings,
    ratingsExists
  };
}, RatingBrowserComponent);

export { RatingBrowserContainer };
