if(Meteor.isClient) {

  ////////////////////
  // Events section //
  ////////////////////
  Template.newThread.events({
    'click #submitThread': function(){
      var title = $('#inputTitle').val();
      var authorId = Session.get('currentUser')._id;
      var userIds = [];
      $('input.thread-user-selectable:checked').each(function () {
        userIds.push($(this).attr('id'));
      });
      Meteor.saveThread(title, authorId, userIds);
      Meteor.toggleNewThread();
    }
  });

  Template.threads.events({
    // Hide / Show the new thread screen on button click
    'click #new-thread-button': function() {
      Meteor.toggleNewThread();
    },
    // Change the 'selected-thread' class to appear only for clicked thread title
    'click .threads-title-title': function() {
      var threadId = this._id;
      Session.set('selectedThread', threadId);
    }
  })

  /////////////////////
  // Helpers section //
  /////////////////////
  Template.threads.helpers({
    'threads': function() {
      return Threads.find({ 'user_ids': { $all: [Session.get('currentUser')._id] }})
    },
    'selectedClass': function() { 
      var threadId = this._id;
      var selectedThread = Session.get('selectedThread');
      if (threadId == selectedThread) {
        return "selected-thread";
      };
    }
  });

  ////////////////////
  // Custom section //
  ////////////////////
  Meteor.saveThread = function(title, authorId, userIds) {
    Threads.insert({
      title: title,
      author_id: authorId,
      user_ids: userIds,
      timestamp: Date.now()
    }, function(){
      $('#inputTitle').val('');
    })
  }

  Meteor.toggleNewThread = function() {
    $('#threads-area').toggle();
    $('#message-area').toggle();
    $('#new-thread').toggle();
    $('#accounts-page').hide();
  };
}