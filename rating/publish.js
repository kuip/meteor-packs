import { Meteor } from 'meteor/meteor';
import { Ratings, Rated } from './collection';

Meteor.publish('ratings', function(query={}, options={}) {
  console.log('ratings publish', query, options)
  check(query, Object);
  check(options, Object);

  return Ratings.find(query, options);
});

Meteor.publish('rated', function(query={}, options={}) {
  console.log('rated publish', query, options)
  check(query, Object);
  check(options, Object);

  return Rated.find(query, options);
});
