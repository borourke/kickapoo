if(Meteor.isClient) {

  ////////////////////
  // Events section //
  ////////////////////
  Template.newMessage.events({
    'submit #message-form': function(){
      var message = $('#inputMessage').val();
      var threadId = $('#selected-thread').data('thread-id');
      var authorId = Session.get('currentUser')._id;
      Meteor.saveMessage(message, threadId, authorId);
      return false;
    }
  });

  /////////////////////
  // Helpers section //
  /////////////////////
  Template.messages.helpers({
    'messages': function() {
      return Messages.find({
        thread_id: Session.get('selectedThread'),
        author_id: Session.get('currentUser')._id
      });
    }
  });  

  ////////////////////
  // Custom section //
  ////////////////////
  Meteor.saveMessage = function(message, threadId, authorId) {
    Messages.insert({
      message: message,
      thread_id: threadId,
      author_id: authorId,
      created_at: Date.now(),
      updated_at: Date.now()
    }, function(){
      $('#inputMessage').val('');
    })
  }
}