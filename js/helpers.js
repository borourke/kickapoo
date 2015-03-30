Handlebars.registerHelper('currentUser', function (id) {
    return Session.get('currentUser');
});