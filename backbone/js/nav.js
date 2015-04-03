(function(){
  var navdata={
    title:'Menu',
    list:[
      'Start$#!',
      'Hello Word$#!/helloword',
      'Connect to Server$#!/service',
      'Bean and List$#!/data',
      'Hash Router$#!/router',
      'View and Interaction$#!/view',
      ''
    ]
  };
  var NavModel=Backbone.Model.extend({
    initialize:function(){
      t.log('init nav model');
    },
    defaults:{
      title:'nav element title',
      purl:'nav element href'
    }
  });
  var NavCollection=Backbone.Collection.extend({
    model:NavModel,
    initialize:function(title,view){
      t.log('init nav collection');
      //bind on change
      this.title=title;
      this.bind('add',view.addOne);
    },
    defaults:{
      title:'nav name'
    }
  });
  var NavView=Backbone.View.extend({
    initialize:function(){
      t.log('init nav view');
    },
    events:{},
    addOne:function(nav){
      var html=[];
      html.push('<li><a href="'+nav.get('purl')+'">'+nav.get('title')+'</a></li>');
      $('#nav ul').append(html.join(''));
    }
  });

  var init=function(){
    var navList=[];
    var navView=new NavView;
    if (navdata){
      navList=new NavCollection(navdata.title,navView);
      for (var i in navdata.list){
        var str=navdata.list[i];
        if (str&&str.indexOf('$')>0){
          var item=str.split('$');
          navList.add(new NavModel({title:item[0],purl:item[1]}));
        }
      }
    }
  };
  init();
})();
