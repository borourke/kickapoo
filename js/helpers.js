Handlebars.registerHelper('currentUser', function (id) {
    return Session.get('currentUser');
});

Handlebars.registerHelper('groupUsers', function () {
    return Users.find()
});