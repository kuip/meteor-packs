import { Meteor } from 'meteor/meteor';
import 'meteor/aldeed:collection2';
import { RatedSchema, RatingSchema } from './schema';

let Rated = new Mongo.Collection('rated');
let Ratings = new Mongo.Collection('ratings');

Rated.attachSchema(RatedSchema);
Ratings.attachSchema(RatingSchema);

export { Ratings, Rated };
