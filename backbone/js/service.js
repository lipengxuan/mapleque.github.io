(function(){
  var serviceModel=Backbone.Model.extend({
    title:'How to connect to Server',
  });
  var serviceView=Backbone.View.extend({
    rander:function(){
      var html='';
      $('#content').html();
    }
  });
  var init=function(){
  };
  if (window.page===undefined)
    window.page={};
  window.page.service={};
  window.page.service.init=init;
})();
