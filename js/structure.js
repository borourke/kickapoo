// The following outlined data structures are ideal and not enforced 
// on the DB or the app level.  It is meant to simulate a Postgres SQL structure
// and uses the same terminology as a result

// Messages {
//  _id: string,
//  message: string,
//  user_id: string (TBD*********************************************),
//  thread_id: string,
//  timestamp: integer (epoc time)
// }
Messages = new Meteor.Collection("Messages");

// Threads {
//  _id: string,
//  title: string,
//  author_id: string (TBD*********************************************),
//  users: array (of strings),
//  group_id: string,
//  timestamp: integer (epoc time)
// }
Threads = new Meteor.Collection("Threads");

// Users {
//  _id: string,
//  email: string,
//  address_one: string,
//  address_two: string,
//  city: string,
//  state: string,
//  zip: string,
//  phone: string,
//  birthday: integer (epoc time),
//  encrypted_password: string (md5 of salt + password),
//  salt: string,
//  groups: array (of strings)
//  timestamp: integer (epoc time)
// }
Users = new Meteor.Collection("Users");

// Groups {
//  _id: string,
//  name: string,
//  members: array (of strings),
//  type: string ('family' or 'friends'),
//  timestamp: integer (epoc time)
// }
Groups = new Meteor.Collection("Groups");