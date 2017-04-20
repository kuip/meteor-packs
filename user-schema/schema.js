import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseSchema from 'meteor/oro8oro:base-schema';
import { Meteor } from 'meteor/meteor';


const UserProfileSchema = new SimpleSchema({
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    avatar: {
        type: String,
        optional: true,
        defaultValue: ''
    }
});

const UserSchema = new SimpleSchema([ BaseSchema, {
    profile: {
        type: UserProfileSchema,
        optional: true
    },
    emails: {
        type: [Object],
        label: 'Email',
        optional: true
    },
    "emails.$.address": {
        type: String,
        label: 'Email',
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: Object,
        label: 'Role',
        blackbox: true,
        optional: true
    },
    parameters: {
        type: Object,
        label: "Parameters",
        blackbox: true,
        optional: true
    }
}]);

export default UserSchema;
