/**
 * t is a global variable, avoid to over write it
**/
(function(){
  if (window.t!==undefined)
    return;
  window.t={
    _version:'20150403',
    log:function(){
      if (window.console){
        console.log(new Date().getTime(),Array.prototype.slice.call(arguments));
      }
    },
    _author:'mapleque@163.com'
  };
})();
