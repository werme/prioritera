Router.configure({
  layout: 'layout'
});

Router.map(function() {
  this.route('todos', {
    path: '/',
    template: 'todos'
  });
});

