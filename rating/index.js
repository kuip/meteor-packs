if(Meteor.isClient) {
  export * from './containers/RatingContainer.js';
  export * from './components/QRRatingComponent.js';
  export * from './containers/RatingBrowserContainer.js';
}

if(Meteor.isServer) {
  import './publish';
  import './methods';
}
