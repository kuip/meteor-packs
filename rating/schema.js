import { Meteor } from 'meteor/meteor';
import 'meteor/aldeed:collection2';
import BaseSchema from 'meteor/oro8oro:base-schema';

const RatingSchema = new SimpleSchema([BaseSchema, {
  userId: {
    type: String
  },
  rating: {
    type: Number
  },
  uri: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  tags: {
    type: [String],
    optional: true
  }
}]);

export default RatingSchema;
