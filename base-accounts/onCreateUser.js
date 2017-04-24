Accounts.onCreateUser(function(options, user) {
  let { google } = user.services;

  if(google) {
    user.profile = {
      firstName: google.given_name,
      lastName: google.family_name,
      avatar: google.picture
    }

    if(!user.emails)
      user.emails = [];

    user.emails.push({
      address: google.email,
      verified: google.verified_email
    });

    //user.username = user.emails[0].address.substring(0,user.emails[0].address.indexOf('@'))
  }

  return user;
});
