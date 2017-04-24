import { Meteor } from 'meteor/meteor';
import { Ratings, Rated } from './collection';

Meteor.methods({
  rate: function(uri, rating, tag) {
    check(uri, String);
    check(rating, Number);
    check(tag, Match.Optional(String));

    if(!this.userId) {
      throw new Meteor.Error('401', 'You need to be logged in.')
    }

    tag = tag || 'general';
    let extant, prevRated;

    // Check if rated uri is already in the database
    extant = Rated.findOne({ uri });

    console.log('extant', extant)
    // If not, we add the uri
    // + the first rating as average rating
    if(!extant) {
      let rated = {
        uri,
        ratings: {}
      };
      rated.tags = [ tag ];
      rated.ratings[tag] = {
        rating,
        raters: 1
      };
      console.log('insert rated', JSON.stringify(rated));
      Rated.insert(rated);
    }
    else {
      let upd = {};
      upd['$set'] = {};

      // Rated exists, but not with this tag - update tags
      if(!extant.ratings[tag]) {
        upd['$addToSet'] = { tags: tag };
      }

      // Tag exists, check if previously rated by this user
      if(extant.ratings[tag]) {
        console.log('Rated exists, tag exists', extant.ratings[tag]);
         // Check if user has a previous rating
         prevRated = Ratings.findOne({ rated: uri, userId: this.userId, tag });
      }

       // If not prev rated, we update average rating with a diff algo
       if(!prevRated) {
         // First rating for the given tag
         if(!extant.ratings[tag]) {
           upd['$set']['ratings.' + tag] = { rating: rating, raters: 1};
         }
         else {
           // Update average rating for the given tag
           upd['$set']['ratings.' + tag + '.rating'] = (extant.ratings[tag].rating * extant.ratings[tag].raters + rating) / (extant.ratings[tag].raters + 1);

           // Update no of raters for the given tag
           upd['$set']['ratings.' + tag + '.raters'] = extant.ratings[tag].raters + 1;
         }
       }
       else {
         console.log('Previously rated', prevRated);
         // Update user's rating
         Ratings.update({ _id: prevRated._id }, { $set: { rating } });

         // Update average rating for the given tag
         upd['$set']['ratings.' + tag + '.rating'] = ((extant.ratings[tag].rating * extant.ratings[tag].raters) - prevRated.rating + rating) / extant.ratings[tag].raters;
       }
      console.log('Updating prev rated', upd);
      Rated.update({ _id: extant._id }, upd);
    }
    if(!prevRated) {
      Ratings.insert({
        userId: this.userId,
        rated: uri,
        rating: rating,
        tag
      });
    }
  },
  averageRating: function(uri) {
    check(uri, String);

    let average = 0;
    let ratings = Ratings.find({ uri }).fetch();
    ratings.forEach(function(r) {
      average += r.rating;
    });
    return average / ratings.length;
  }
});
