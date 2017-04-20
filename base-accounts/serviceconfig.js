import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

let fb = Meteor.settings.facebook;
let gg = Meteor.settings.google;
let twit = Meteor.settings.twitter;
let git = Meteor.settings.github;

if(fb && fb.clientId && fb.secret) {
  ServiceConfiguration.configurations.upsert({
    service: "facebook"
  }, {
    $set: {
      clientId: fb.clientId,
      loginStyle: "popup",
      secret: fb.secret
    }
  });
}

if(gg && gg.clientId && gg.secret) {
  ServiceConfiguration.configurations.upsert({
    service: "google"
  }, {
    $set: {
      clientId: gg.clientId,
      loginStyle: "popup",
      secret: gg.secret
    }
  });
}

if(twit && twit.clientId && twit.secret) {
  ServiceConfiguration.configurations.upsert({
    service: "twitter"
  }, {
    $set: {
      clientId: twit.clientId,
      loginStyle: "popup",
      secret: twit.secret
    }
  });
}

if(git && git.clientId && git.secret) {
  ServiceConfiguration.configurations.upsert({
    service: "github"
  }, {
    $set: {
      clientId: git.clientId,
      loginStyle: "popup",
      secret: git.secret
    }
  });
}
