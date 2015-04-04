if(Meteor.isClient) {
  ////////////////////
  // Events section //
  ////////////////////
  Template.register.events({
    'submit #register-form' : function() {
      // Save New User
      var email = $("#register-form").find('#register-email').val();
      var name = $("#register-form").find('#register-name').val();
      var addressOne = $("#register-form").find('#register-address-l1').val();
      var addressTwo = $("#register-form").find('#register-address-l2').val();
      var city = $("#register-form").find('#register-city').val();
      var zip = $("#register-form").find('#register-zip').val();
      var state = $("#register-form").find('#register-state').val();
      var phone = $("#register-form").find('#register-phone').val();
      var password = $("#register-form").find('#register-password').val();
      var salt = Random.id(20);
      var encryptedPassword = CryptoJS.HmacMD5(salt, password).toString();
      Meteor.registerUser(
        email, 
        encryptedPassword,
        addressOne,
        addressTwo,
        city,
        zip,
        state,
        phone,
        salt,
        name
      );
      // Login New User
      Meteor.loginUser(email, password);
      $('#accounts-page').hide();
      return false;
    }
  });

  ////////////////////
  // Custom section //
  ////////////////////
  Meteor.registerUser = function(email, encryptedPassword, addressOne, addressTwo, city, zip, state, phone, salt, name) {
    Users.insert({
      email: email,
      name: name,
      address_one: addressOne,
      address_two: addressTwo,
      city: city,
      zip: zip,
      state: state,
      phone: phone,
      encrypted_password: encryptedPassword,
      salt: salt,
      created_at: Date.now(),
      updated_at: Date.now()
    })
  }
};


