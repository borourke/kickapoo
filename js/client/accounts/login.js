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
    return (encryptedPassword == encryptedSubmittedPassword) ? true : false
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