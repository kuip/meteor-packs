import { Meteor } from 'meteor/meteor';
import { Ratings } from './collection';

Meteor.methods({
  rate: function(uri, rating) {
    console.log('uri', uri, typeof uri)
    console.log('rating', rating, typeof rating)

    check(uri, String);
    check(rating, Number);

    if(!this.userId) {
      throw new Meteor.Error('401', 'You need to be logged in.')
    }

    // Check if previous rating
    let extant = Ratings.findOne({
      userId: this.userId,
      uri: uri
    });

    if(!extant) {
      Ratings.insert({
        userId: this.userId,
        uri: uri,
        rating: rating
      });
    }
    else {
      Ratings.update({_id: extant._id}, {$set: { rating }});
    }
  }
});
