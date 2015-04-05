if(Meteor.isClient) {
  ////////////////////
  // Events section //
  ////////////////////
  Template.navbar.events({
    'click #login-button': function() {
      $('#threads-page').hide();
      $('#accounts-page').show();
      $('#login-container').show();
      $('#register-container').hide();
    },
    'click #register-button': function() {
      $('#threads-page').hide();
      $('#accounts-page').show();
      $('#login-container').hide();
      $('#register-container').show();
    },
    'click #logout-button': function() {
      Session.set('currentUser', false);
      $('#accounts-page').show();
      $('#threads-page').hide();
    }
  });
}