
window.bb = (function(bb, $, _) {
  'use strict';

  //change from <% to {{
  _.templateSettings = {
    interpolate: /\{\{=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g,
    escape: /\{\{-(.*?)\}\}/g
  };

  function navStyleSetup() {
    var links = $(bb.sel.mainNav).find('a');
    links.on('click', function() {
      links.removeClass(bb.sel.class.navColor);
      links.find('i').removeClass(bb.sel.class.navColorI);
      $(this).toggleClass(bb.sel.class.navColor);
      $(this).find('i').toggleClass(bb.sel.class.navColorI);
      });
  }

  function portfolioEvents() {
    $(bb.sel.portfolioNav).on('click', function(e) {
      e.preventDefault();
      var tmpl = $(bb.sel.portfolioTmpl).html();
      $(bb.sel.content).html(_.template(tmpl));
      history.pushState({}, '', 'portfolio')
    });
  }

  function init() {
    bb.evt.navStyleSetup();
    bb.evt.portfolioEvents();
  }

  /* Object exports*/
  bb = {
    init: init
  };
  //selectors
  bb.sel = {
    mainNav: '.main-nav',
    content: '#bbMain',
    portfolioNav: '#portfolioNav',
    portfolioTmpl: '#portfolioTmpl',
    class: {
      navColor: 'nav-color',
      navColorI: 'nav-color-i'
    }
  };
  //dom events
  bb.evt = {
    navStyleSetup: navStyleSetup,
    portfolioEvents: portfolioEvents
  };
  //kick it off
  $(function() {
    bb.init();
  });
}(window.bb || {}, window.jQuery, window._));