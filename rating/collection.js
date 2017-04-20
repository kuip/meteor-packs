import { Meteor } from 'meteor/meteor';
import 'meteor/aldeed:collection2';
import RatingSchema from './schema';

let Ratings = new Mongo.Collection('ratings');

export default Ratings;
