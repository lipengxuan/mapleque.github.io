(function(){
  var images=[
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg'
  ];
  var build_wraper=function(){
    var html=[];
    html.push('<ul>');
    var first=true;
    for (var i in images){
      var img=images[i];
      if (first){
	html.push('<li class="cur">');
	first=false;
      }else{
	html.push('<li>');
      }
      html.push('<div style="background-image:url('+img+')"></div>');
      html.push('</li>');
    }
    html.push('</ul>');
    $('.wraper').html(html.join(''));
  };

  //a to b
  var change_2wraper=function(cur,act){
    console.log('change',cur,act);
    $($('.wraper li')[cur]).removeClass('cur');
    $($('.wraper li')[act]).addClass('cur');
  };
  //finish change
  var change_end_wraper=function(dy,cur,act){
    $cur=$($('.wraper li')[cur]);
    $act=$($('.wraper li')[act]);
    var ischange=false;
    if (Math.abs(dy)>0){
      $cur.animate({'top':(dy>0?1:-1)*$cur.height()},300,'linear'); 
      ischange=true;
    }else{
      $cur.animate({'top':0},300,'linear');
    }
    clear_status_wraper($cur,$act,ischange);
  };
  var clear_status_wraper=function($cur,$act,ischange){
    setTimeout(function(){
      $cur.removeAttr('style');
      $act.removeAttr('style');
      if (ischange){
	$cur.removeClass('cur');
	$act.addClass('cur');
      }
    },300);
  };
  /*auto change*/
  var change_wraper=function(flag){
    var cur=0,act=0;
    var total=images.length;
    $('.wraper li').each(function(i,e){
      if ($(e).hasClass('cur'))
        cur=i;
    });
    act=(cur+flag+total)%total;
    change_2wraper(cur,act);
  };
  //during move
  var change_dy_wraper=function(dy,cur,act){
    $cur=$($('.wraper li')[cur]);
    $act=$($('.wraper li')[act]);
    $act.css({'display':'block'});
    $cur.css({'top':dy});
    //$act.css({'top':dy+(dy>0?-1:1)*$cur.height()});
  };

  var get_change_cur=function(){
    var cur=0,act=0;
    $('.wraper li').each(function(i,e){
      if ($(e).hasClass('cur'))
        cur=i;
    });
    return cur;
  };
  var get_change_act=function(cur,flag){
    var total=images.length;
    act=(cur+flag+total)%total;
    return act;
  };
  /****/
  var add_event_listener=function(){
    //is support touch
    var support = (window.Modernizr && Modernizr.touch === true) || (function () {
	return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	})();
    console.log('support touch',support);

    //ui def
    var ondrag=false;
    var oldy,dy,cur,act;
    var getY=function(e){
      return support?e.touches[0].pageY:e.pageY;
    };
    var lock=false;
    var start=function(e){
      if (lock)return;
      lock=true;
      ondrag=true;
      oldy=getY(e);
      console.log('start',oldy);
    };
    var move=function(e){
      e.preventDefault();
      if (!ondrag)return;
      dy=getY(e)-oldy;
      console.log('move',dy);
      var flag=dy>0?1:-1;
      cur=get_change_cur();
      act=get_change_act(cur,flag);
      change_dy_wraper(dy,cur,act);
    };
    var end=function(e){
      ondrag=false;
      console.log('end',dy);
      change_end_wraper(dy,cur,act);
      setTimeout(function(){lock=false},300);
    };

    //add listener
    if (support){
      $('.wraper li').on('touchstart',function(e){start(e)});
      $('.wraper li').on('touchmove',function(e){move(e)});
      $('.wraper li').on('touchend',function(e){end(e)});
    }else{
      $('.wraper li').on('mousedown',function(e){start(e)});
      $('.wraper li').on('mousemove',function(e){move(e)});
      $('.wraper li').on('mouseup',function(e){end(e)});
    }
  };

  var init=function(){
    build_wraper();
    add_event_listener();
  };
  init();
})();
