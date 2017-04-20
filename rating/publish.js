import { Meteor } from 'meteor/meteor';
import { Ratings } from './collection';

Meteor.publish('ratings', function(query={}, options={}) {
  check(query, Object);
  check(options, Object);

  return Ratings.find(query, options);
});
