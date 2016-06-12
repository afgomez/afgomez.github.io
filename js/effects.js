(function() {

  var timeline = document.querySelector('.timeline');
  var children_selector = '.timeline-event:not(.animated)';

  function animateTimelineElements() {
    var children = timeline.querySelectorAll(children_selector);

    // This piles up all the repaints
    Array.prototype.map.call(children, function (el) {
      return {
        el: el,
        rect: el.getBoundingClientRect()
      };
    }).forEach(function(child) {
      if (isVisible(child.el, child.rect)) {
        child.el.classList.add('animated');
      }
    });
  }

  function isVisible(el, rect, threshold) {
    rect = rect || el.getBoundingClientRect();
    threshold = threshold || 0;
    return rect.top - window.innerHeight < threshold && rect.left - window.innerWidth < threshold;
  }


  // https://developer.mozilla.org/en-US/docs/Web/Events/scroll#Scroll_optimization_with_window.requestAnimationFrame
  var ticking = false;
  window.addEventListener('scroll', function() {

    if (ticking) {
      requestAnimationFrame(function() {
        animateTimelineElements();
        ticking = false;
      });

      return;
    }

    ticking = true;

  });


  // First load
  animateTimelineElements();


})();
