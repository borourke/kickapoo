// The following outlined data structures are ideal and not enforced 
// on the DB or the app level.  It is meant to simulate a SQL structure
// and uses the same terminology as a result

// Messages {
//  _id: string,
//  message: string,
//  user_id: string (TBD*********************************************),
//  thread_id: string,
//  timestamp: integer (epoc time)
// }
Messages = new Meteor.Collection("Messages");

// Threads {
//  _id: string,
//  title: string,
//  author_id: string (TBD*********************************************),
//  users: array,
//  timestamp: integer (epoc time)
// }
Threads = new Meteor.Collection("Threads");

// Users {
//  _id: string,
//  email: string,
//  address1: string,
//  address2: string,
//  city: string,
//  state: string,
//  zip: string,
//  phone: string,
//  birthday: integer (epoc time),
//  encrypted_password: string (md5 of salt + password),
//  auth_key: string
// }
Users = new Meteor.Collection("Users");

Handlebars.registerHelper('currentUser', function (id) {
    return Session.get('currentUser');
});

if (Meteor.isServer) {
 Meteor.startup(function() {
  return Meteor.methods({
    removeAllMessages: function() {
      return Messages.remove({});
    },
    removeAllUsers: function() {
      return Users.remove({});
    }
  });
});
}

if (Meteor.isServer) {
   Meteor.startup(function() {
    return Meteor.methods({
      removeAllThreads: function() {
        return Threads.remove({});
      }
    });
  });
}

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
    'click #threads-button': function() {
      $('#accounts-page').hide();
      $('#threads-page').show();
    },
    'click #logout-button': function() {
      Session.set('currentUser', false);
    }
  });
}

if(Meteor.isClient) {

  ////////////////////
  // Events section //
  ////////////////////
  Template.newThread.events({
    'click #submitThread': function(){
      var title = $('#inputTitle').val();
      var authorId = Session.get('currentUser')._id;
      Meteor.saveThread(title, authorId);
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
      return Threads.find({author_id: Session.get('currentUser')._id});
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
  Meteor.saveThread = function(title, authorId) {
    Threads.insert({
      title: title,
      author_id: authorId,
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


