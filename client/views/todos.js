
var rankDep = new Deps.Dependency;

Template.todos.today = function () {
  rankDep.depend();
  return Todos.find({ list: "today" }, { sort: { rank: 1 } });
};
Template.todos.tomorrow = function () {
  rankDep.depend();
  return Todos.find({ list: "tomorrow" }, { sort: { rank: 1 } });
};
Template.todos.future = function () {
  rankDep.depend();
  return Todos.find({ list: { $not: { $in: ["today", "tomorrow"] } } }, { sort: { rank: 1 } });
};

var add = function (title) {
  Todos.insert({name: title, done: false, list: "today", rank: 0});
};

var updateRank = function (todos) {
  _.each(todos, function(todo,index) {
    var id = $(todo).data('id');
    Todos.update({_id: id}, {$set: {rank: index}});
  });
  rankDep.changed();
};

var setupTouch = function () {
  _.each($(".todo"), function (e) {
    e.addEventListener("touchstart", Touch.handler, true);
    e.addEventListener("touchmove", Touch.handler, true);
    e.addEventListener("touchend", Touch.handler, true);
    e.addEventListener("touchcancel", Touch.handler, true);    
  });
};

Template.todos.events({
  'click #new-todo-button': function (e,tmpl) {
    add(tmpl.find("#todo-new").value);
  },
  'keypress #todo-name': function (e,tmpl) {
    if (e.which === 13) {
      add(tmpl.find("#todo-new").value);
      tmpl.find("#todo-new").value = '';
    }
  }
});

Template.todos.rendered = function () {
  $("#today tbody, #tomorrow tbody, #future tbody").sortable({
    connectWith: ".todos tbody",
    update: function(event, ui) {
      todoId = ui.item.data('id');
      table = ui.item.parent().parent();

      Todos.update({_id: todoId}, {$set: {list: table.attr('id')}});

      var todos = ui.item.parent().children();
      updateRank(todos);
    }
  });

  setupTouch();
};
