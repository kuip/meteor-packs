import { Meteor } from 'meteor/meteor';
import 'meteor/aldeed:collection2';
import UserSchema from 'meteor/oro8oro:user-schema';

Meteor.users.attachSchema(UserSchema);
