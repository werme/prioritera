
Template.todo.maybe_done = function () {
  return this.done ? "done" : "";
};

Template.todo.editing = function () {
  return Session.equals('editing_todo', this._id);
};

var update = function (id, name) {
  Todos.update({_id: id}, { $set: { name: name } });
};

Template.todo.events({
  'click .check': function () {
    Todos.update(this._id, { $set: { done: !this.done } });
  },
  'click .delete': function () {
    Todos.remove(this._id);
  },
  'dblclick .todo': function (e, tmpl) {
    Session.set('editing_todo', this._id);
    Deps.flush();
    activateInput(tmpl.find("#todo-edit"));
  },
  'tap .todo': function (e, tmpl) {
    Session.set('editing_todo', this._id);
    Deps.flush();
    activateInput(tmpl.find("#todo-edit"));
  },
  'keypress #todo-edit': function (e, tmpl) {
    if (e.which === 13) {
      update(this._id, tmpl.find("#todo-edit").value);
      Session.set('editing_todo', null);
    }
  }
});
