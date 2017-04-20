if(Meteor.isClient) {
  export * from './components/rating';
  export * from './components/qrcode';
  export * from './components/browser';
}

if(Meteor.isServer) {
  import './publish';
  import './methods';
}
