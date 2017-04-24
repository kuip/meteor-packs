Package.describe({
  name: 'oro8oro:rating',
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
  api.use([
    'ecmascript',
    'check',
    'react-meteor-data',
    "aldeed:collection2@2.10.0",
    "aldeed:simple-schema@1.5.3",
    'oro8oro:base-schema'
  ]);
  api.mainModule('index.js');
});

Package.onTest(function(api) {
});

Npm.depends({
  "jquery-bar-rating": "1.2.2",
  "qrcodejs2": "0.0.2"
});
