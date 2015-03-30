// The following outlined data structures are ideal and not enforced 
// on the DB or the app level.  It is meant to simulate a SQL structure
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
//  users: array,
//  timestamp: integer (epoc time)
// }
Threads = new Meteor.Collection("Threads");

// Users {
//  _id: string,
//  email: string,
//  address1: string,
//  address2: string,
//  city: string,
//  state: string,
//  zip: string,
//  phone: string,
//  birthday: integer (epoc time),
//  encrypted_password: string (md5 of salt + password),
//  auth_key: string
// }
Users = new Meteor.Collection("Users");