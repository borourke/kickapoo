// Users = new Meteor.Collection("Users");

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
      $('#register-email').val($("#login-form").find("#login-email").val());
      $('#register-password').val($("#login-form").find("#login-password").val());
      $('#login-container').hide();
      $('#login-title').hide();
      $('#register-container').show();
      $('#register-title').show();
    }
  });

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
  // Logs in a user
  Meteor.loginUser = function(email, password) {
    var user = Users.findOne({email: email});
    var salt = user.salt;
    var encryptedPassword = user.encrypted_password;
    var encryptedSubmittedPassword = CryptoJS.HmacMD5(salt, password).toString();
    Session.set('currentUser', user);
    return encryptedPassword == encryptedSubmittedPassword
  }

  // Registers a user
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

  // Changes image for carraseoul affect
  function changeImage() {
    var length = $('.accounts-image').length;
    var currentImage = parseInt($('.accounts-image-active').attr('id').split('-')[2]);
    var newImage = ((currentImage+1) > length) ? 1 : currentImage + 1;
    $('.accounts-image-active').removeClass('accounts-image-active');
    $('#accounts-image-'+newImage).addClass('accounts-image-active');
  }

  // Creates the carraseoul affect on the login/sign up page
  Meteor.setInterval( changeImage, 5000 );
};