  var $doc = $(document);
  var $window = $(window);
  $doc.scroll(function(){
    $(".topText").css("opacity", 1 - $window.scrollTop() / 250);
  });
