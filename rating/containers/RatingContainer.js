import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Rated, Ratings } from '../collection';
import { parseQuery } from '../utils.js';

import { RatingComponent } from '../components/RatingComponent.js';

const RatingContainer = createContainer(({ location }) => {
  //const uri = decodeURIComponent(location.search.substring(5));
  const { uri, tag } = parseQuery(location.search.substring(1));
  const query = { rated: uri, userId: Meteor.userId(), tag };
  //console.log('RatingContainer uri', { uri, tag }, query)
  const ratedHandle = Meteor.subscribe('rated', { uri });
  const ratingHandle = Meteor.subscribe('ratings', query);
  const loading = !ratedHandle.ready() && !ratingHandle.ready();
  const rated = Rated.findOne({ uri });
  const rating = Ratings.findOne(query);
  const ratingExists = !loading && !!rating;
  const ratedExists = !loading && !!rated;
  //console.log('RatingContainer', rated, rating)

  return {
    uri,
    tag,
    loading,
    rating,
    rated,
    ratingExists,
    ratedExists
  };
}, RatingComponent);


export { RatingContainer };
