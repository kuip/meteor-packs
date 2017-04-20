export * from './collection';

if(Meteor.isClient) {
  export * from './view/accounts';
}

if(Meteor.isServer) {
  import './serviceconfig';
}
