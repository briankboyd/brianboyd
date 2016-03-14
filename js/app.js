
window.bb = (function(bb, $, _) {
  'use strict';

  //change from <% to {{
  _.templateSettings = {
    interpolate: /\{\{=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g,
    escape: /\{\{-(.*?)\}\}/g
  };

  function navStyleSetup() {
    var links = getNav();
    links.on('click.nav', 'ul li' , function(e) {
      e.preventDefault();
      var items = $(this).addClass(bb.sel.class.navColor).siblings();
      $(this).find('i').addClass(bb.sel.class.navColorI);
      items.removeClass(bb.sel.class.navColor);
      items.find('i').removeClass(bb.sel.class.navColorI);
    });
  }
  function getNav() {
    return $(bb.sel.mainNav);
  }
  function getNavId(route) {
    return '#' + route + 'Nav';
  }
  function homeView() {
    var tmpl = $(bb.sel.homeTmpl).html();
    $(bb.sel.content).html(_.template(tmpl));
  }
  function appsView() {
    var tmpl = $(bb.sel.appsTmpl).html();
    $(bb.sel.content).html(_.template(tmpl));
  }
  function blogView() {
    var tmpl = $(bb.sel.blogTmpl).html();
    $(bb.sel.content).html(_.template(tmpl));
  }
  function portfolioView() {
    var tmpl = $(bb.sel.portfolioTmpl).html();
    $(bb.sel.content).html(_.template(tmpl));
  }
  function homeEvents() {
    $(bb.sel.homeNav + ' a' ).on('click', function(e) {
      e.preventDefault();
      bb.view.home.render();
      history.pushState({}, '', bb.view.home.name);
    });
  }
  function appsEvents() {
    $(bb.sel.appsNav + ' a').on('click', function(e) {
      e.preventDefault();
      bb.view.apps.render();
      history.pushState({}, '', bb.view.apps.name);
    });
  }
  function blogEvents() {
    $(bb.sel.blogNav + ' a').on('click', function(e) {
      e.preventDefault();
      bb.view.blog.render();
      history.pushState({}, '', bb.view.blog.name);
    });
  }

  function portfolioEvents() {
    $(bb.sel.portfolioNav + ' a').on('click', function(e) {
      e.preventDefault();
      bb.view.portfolio.render();
      history.pushState({}, '', bb.view.portfolio.name);
  });
  }

  function loadView() {
    var route = location.pathname.substring(1);
    $(getNavId(route)).find('a').trigger('click.nav');
    switch (route) {
      case bb.view.apps.name:
        bb.view.apps.render();
        break;
      case bb.view.blog.name:
        bb.view.blog.render();
        break;
      case bb.view.portfolio.name:
        bb.view.portfolio.render();
        break;
      default:
        bb.view.home.render();
        history.replaceState({}, '', bb.view.home.name);
        break;
    }
  }
  function onLoad() {
    $(window).on('load', bb.evt.loadView);
  }
  function onPopState() {
    $(window).on('popstate', bb.evt.loadView);
  }
  function init() {
    bb.evt.navStyleSetup();
    bb.evt.homeEvents();
    bb.evt.appsEvents();
    bb.evt.blogEvents();
    bb.evt.portfolioEvents();
    bb.evt.onLoad();
    bb.evt.onPopState();
  }

  /* Object exports*/
  bb = {
    init: init
  };
  //selectors
  bb.sel = {
    mainNav: '.main-nav',
    content: '#bbMain',
    homeNav: '#homeNav',
    homeTmpl: '#homeTmpl',
    appsNav: '#appsNav',
    appsTmpl: '#appsTmpl',
    blogNav: '#blogNav',
    blogTmpl: '#blogTmpl',
    portfolioNav: '#portfolioNav',
    portfolioTmpl: '#portfolioTmpl',
    class: {
      navColor: 'nav-color',
      navColorI: 'nav-color-i',
      NavColorReset: 'nav-color-reset'
    }
  };
  //dom events
  bb.evt = {
    onLoad: onLoad,
    onPopState: onPopState,
    loadView: loadView,
    navStyleSetup: navStyleSetup,
    homeEvents: homeEvents,
    appsEvents: appsEvents,
    blogEvents: blogEvents,
    portfolioEvents: portfolioEvents
  };

  bb.view = {
    home: {
     name: 'home',
     render: homeView
    },
    apps: {
      name: 'apps',
      render: appsView
    },
    blog: {
      name: 'blog',
      render: blogView
    },
    portfolio: {
     name: 'portfolio',
     render: portfolioView
    }
  };
  //kick it off
  $(function() {
    bb.init();
  });
}(window.bb || {}, window.jQuery, window._));
