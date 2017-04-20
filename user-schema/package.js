Package.describe({
  name: 'oro8oro:user-schema',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.4.1');
  api.use('ecmascript');
  api.use('aldeed:simple-schema@1.5.3');
  api.use('oro8oro:base-schema');
  api.mainModule('schema.js');
});

Package.onTest(function(api) {
});
