if(Meteor.isClient) {
  ////////////////////
  // Events section //
  ////////////////////
  Template.register.events({
    'submit #register-form' : function() {
      // Save New User
      var email = $("#register-form").find('#register-email').val();
      var password = $("#register-form").find('#register-password').val();
      var salt = Random.id(20);
      var encryptedPassword = CryptoJS.HmacMD5(salt, password).toString();
      Meteor.registerUser(email, encryptedPassword, salt, password);
      // Login New User
      Meteor.loginUser(email, password);
      $('#accounts-page').hide();
      return false;
    }
  });

  ////////////////////
  // Custom section //
  ////////////////////
  Meteor.registerUser = function(email, encryptedPassword, salt, password) {
    Users.insert({
      email: email,
      encrypted_password: encryptedPassword,
      salt: salt,
      password: password,
      created_at: Date.now(),
      updated_at: Date.now()
    })
  }
};


