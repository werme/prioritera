
var orderDep = new Deps.Dependency;

Template.todos.today = function () {
  orderDep.depend();
  return Todos.find({ list: "today" }, { sort: { rank: 1 } });
};
Template.todos.tomorrow = function () {
  orderDep.depend();
  return Todos.find({ list: "tomorrow" }, { sort: { rank: 1 } });
};
Template.todos.future = function () {
  orderDep.depend();
  return Todos.find({ list: { $not: { $in: ["today", "tomorrow"] } } }, { sort: { rank: 1 } });
};

Template.todos.events({
  'click #new-todo-button': function (e,tmpl) {
    createTodoWithName(tmpl.find("#todo-new").value);
  },
  'keypress #todo-name': function (e,tmpl) {
    if (e.which === 13) {
      createTodoWithName(tmpl.find("#todo-new").value);
      tmpl.find("#todo-new").value = '';
    }
  }
});

Template.todos.rendered = function () {
  $("#today tbody, #tomorrow tbody, #future tbody").sortable({
    connectWith: ".todos tbody",
    update: function(event, ui) {
      // Update list attr for dragged todo
      var draggedTodoId = ui.item.data('id');
      var listName = ui.item.parent().parent().attr('id');
      moveTodoToList(draggedTodoId, listName);

      // Update list order
      var list = ui.item.parent().children();
      updateListOrder(list);
    }
  });

  // Make todos draggable on touch devices 
  setupTouch();
};

var createTodoWithName = function (name) {
  Todos.insert({name: name, done: false, list: "today", rank: 0});
};

var moveTodoToList = function (id, list) {
  Todos.update({_id: id}, {$set: {list: list}});
};

var updateListOrder = function (list) {
  _.each(list, function(todo,index) {
    var id = $(todo).data('id');
    Todos.update({_id: id}, {$set: {rank: index}});
  });
  orderDep.changed();
};

var setupTouch = function () {
  _.each($(".todo"), function (e) {
    e.addEventListener("touchstart", Touch.handler, true);
    e.addEventListener("touchmove", Touch.handler, true);
    e.addEventListener("touchend", Touch.handler, true);
    e.addEventListener("touchcancel", Touch.handler, true);    
  });
};
