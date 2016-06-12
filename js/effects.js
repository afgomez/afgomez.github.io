(function() {

  var timeline = document.querySelector('.timeline');
  var children_selector = '.timeline-event:not(.animated)';

  function animateTimelineElements() {
    var children = timeline.querySelectorAll(children_selector);

    for (var i = 0; i < children.length; i++) {
      var el = children[i];
      if (isVisible(el)) {
        el.classList.add('animated');
      } else {
        // Don't bother in checking the rest if the current one is not visible.
        break;
      }
    }
  }

  function isVisible(el, threshold) {
    var rect = el.getBoundingClientRect();
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
