import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Rated } from '../collection';

import { RatingBrowserComponent } from '../components/RatingBrowserComponent.js';

const RatingBrowserContainer = createContainer((data) => {
  console.log(data);
  const { params, route } = data;
  const tag = params.tag || 'general';
  let ratingUrl = Meteor.absoluteUrl() + route.data.apiPath + '?tag=' + tag + '&uri=';
  console.log('tag', tag, ratingUrl)
  const query = {};
  query['ratings.' + tag] = {$exists: 1};
  const ratedHandle = Meteor.subscribe('rated', query);
  const loading = !ratedHandle.ready();
  const rated = Rated.find({}).fetch();
  const ratedExists = !loading && !!rated;
  return {
    tag,
    ratingUrl,
    loading,
    rated,
    ratedExists
  };
}, RatingBrowserComponent);

export { RatingBrowserContainer };
