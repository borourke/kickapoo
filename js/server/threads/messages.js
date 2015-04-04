if (Meteor.isServer) {
  Meteor.startup(function() {
    return Meteor.methods({
      removeAllMessages: function() {
        return Messages.remove({});
      },
      removeAllUsers: function() {
        return Users.remove({});
      }
    });
  });
}