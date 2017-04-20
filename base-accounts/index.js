export * from './collection';

if(Meteor.isClient) {
  export * from './view/accounts.js';
}
