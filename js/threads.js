if(Meteor.isClient) {
  ////////////////////
  // Events section //
  ////////////////////
  Template.newMessage.events({
    'submit #message-form': function(){
      var message = $('#input-message').val();
      var threadId = $('#selected-thread').data('thread-id');
      var authorId = Session.get('currentUser')._id;
      Meteor.saveMessage(message, threadId, authorId);
      return false;
    }
  });

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
  Template.messages.helpers({
    'messages': function() {
      return Messages.find({
        thread_id: Session.get('selectedThread')
      });
    }
  });  

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
  };

  Meteor.toggleNewThread = function() {
    $('#threads-area').toggle();
    $('#message-area').toggle();
    $('#new-thread').toggle();
    $('#accounts-page').hide();
  };
  Meteor.saveMessage = function(message, threadId, authorId) {
    Messages.insert({
      message: message,
      thread_id: threadId,
      author_id: authorId,
      created_at: Date.now(),
      updated_at: Date.now()
    }, function(){
      $('#input-message').val('');
    })
  };
}

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

if (Meteor.isServer) {
  Meteor.startup(function() {
    return Meteor.methods({
      removeAllMessages: function() {
        return Messages.remove({});
      },
      removeAllUsers: function() {
        return Users.remove({});
      },
      removeAllThreads: function() {
        return Threads.remove({});
      }
    });
  });
}