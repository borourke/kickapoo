if (Meteor.isServer) {
   Meteor.startup(function() {
    return Meteor.methods({
      removeAllThreads: function() {
        return Threads.remove({});
      }
    });
  });
}