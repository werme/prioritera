Meteor.startup(function () {
  if (Todos.find().count() === 0) {
    var today    = ["Do something", "Something fun"];
    var tomorrow = ["And something less fun", "Might do this"];
    var future   = ["Here goes all that is important", "Boring stuff"];

    insertTodosInList(today, "today");
    insertTodosInList(tomorrow, "tomorrow");
    insertTodosInList(future, "future");
  }
});

var insertTodosInList = function(todos, list) {
  _.each(todos, function (name, index) {
    Todos.insert({name: name, list: list, rank: index});
  });
}