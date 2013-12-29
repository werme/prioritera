
Todos = new Meteor.Collection("todos");

Todos.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    // return (userId && doc.owner === userId);
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    // return doc.owner === userId;
    return true;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    // return doc.owner === userId;
    return true;
  }
  // fetch: ['owner']
});