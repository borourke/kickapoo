if(Meteor.isClient) {
  ////////////////////
  // Events section //
  ////////////////////
  Template.login.events({
    'submit #login-form' : function(event) {
      var email = $("#login-form").find("#login-email").val();
      var password = $("#login-form").find("#login-password").val();
      var login = Meteor.loginUser(email, password);
      if (login) {
        $('#accounts-page').hide();
        return false;
      } else {
        return false;
      }
    },
    'click #to-register-form': function() {
      $('#login-container').hide();
      $('#register-container').show();
    }
  });

  ////////////////////
  // Custom section //
  ////////////////////
  Meteor.loginUser = function(email, password) {
    var user = Users.findOne({email: email});
    var salt = user.salt;
    var encryptedPassword = user.encrypted_password;
    var encryptedSubmittedPassword = CryptoJS.HmacMD5(salt, password).toString();
    Session.set('currentUser', user);
    return (encryptedPassword == encryptedSubmittedPassword) ? true : false
  }
};