import { Meteor } from 'meteor/meteor';
import 'meteor/aldeed:collection2';
import BaseSchema from 'meteor/oro8oro:base-schema';

const RatedSchema = new SimpleSchema([BaseSchema, {
  uri: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  ratings: {
    //average ratings & no of raters per tag
    // tag: { rating: Number, raters: Number }
    type: Object,
    optional: true,
    blackbox: true,
    defaultValue: {}
  },
  tags: {
    type: [String],
    optional: true
  }
}]);

const RatingSchema = new SimpleSchema([BaseSchema, {
  userId: {
    type: String
  },
  rated: {
    type: String
  },
  rating: {
    type: Number
  },
  tag: {
    type: String
  }
}]);

export { RatedSchema, RatingSchema };
