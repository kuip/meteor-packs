// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by base-accounts.js.
import { name as packageName } from "meteor/oro8oro:base-accounts";

// Write your tests here!
// Here is an example.
Tinytest.add('base-accounts - example', function (test) {
  test.equal(packageName, "base-accounts");
});
