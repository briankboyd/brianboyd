
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
      bb.evt.removeNavStyle(links);
      $(this).toggleClass(bb.sel.class.navColor);
      $(this).find('i').toggleClass(bb.sel.class.navColorI);
      });
  }
  function removeNavStyle(links) {
    links.removeClass(bb.sel.class.navColor);
    links.find('i').removeClass(bb.sel.class.navColorI);
  }
  function homeView() {
    var tmpl = $(bb.sel.homeTmpl).html();
    $(bb.sel.content).html(_.template(tmpl));
    $(bb.sel.homeNav).addClass(bb.sel.class.navColor);
    $(bb.sel.homeNav).find('i').addClass(bb.sel.class.navColorI);
  }
  function appsView() {
    var tmpl = $(bb.sel.appsTmpl).html();
    $(bb.sel.content).html(_.template(tmpl));
    $(bb.sel.appsNav).addClass(bb.sel.class.navColor);
    $(bb.sel.appsNav).find('i').addClass(bb.sel.class.navColorI);
  }
  function blogView() {
    var tmpl = $(bb.sel.blogTmpl).html();
    $(bb.sel.content).html(_.template(tmpl));
    $(bb.sel.blogNav).addClass(bb.sel.class.navColor);
    $(bb.sel.blogNav).find('i').addClass(bb.sel.class.navColorI);
  }
  function portfolioView() {
    var tmpl = $(bb.sel.portfolioTmpl).html();
    $(bb.sel.content).html(_.template(tmpl));
    $(bb.sel.portfolioNav).addClass(bb.sel.class.navColor);
    $(bb.sel.portfolioNav).find('i').addClass(bb.sel.class.navColorI);
  }
  function homeEvents() {
    $(bb.sel.homeNav).on('click', function(e) {
      e.preventDefault();
      bb.view.home.render();
      history.pushState({}, '', bb.view.home.name);
    });
  }
  function appsEvents() {
    $(bb.sel.appsNav).on('click', function(e) {
      e.preventDefault();
      bb.view.apps.render();
      history.pushState({}, '', bb.view.apps.name);
    });
  }
  function blogEvents() {
    $(bb.sel.blogNav).on('click', function(e) {
      e.preventDefault();
      bb.view.blog.render();
      history.pushState({}, '', bb.view.blog.name);
    });
  }

  function portfolioEvents() {
    $(bb.sel.portfolioNav).on('click', function(e) {
      e.preventDefault();
      bb.view.portfolio.render();
      history.pushState({}, '', bb.view.portfolio.name);
  });
  }

  function loadView(route) {
    bb.evt.removeNavStyle($(bb.sel.mainNav).find('a'));
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
    $(window).on('load', function() {
      bb.evt.loadRoute();
    });
  }

  function onPopState() {
    $(window).on('popstate', function(e) {
      bb.evt.loadRoute();
    });
  }

  function loadRoute() {
    var route = location.pathname.substring(1);
    bb.evt.loadView(route);
  }
  function init() {
    bb.evt.onLoad();
    bb.evt.onPopState();

    bb.evt.navStyleSetup();
    bb.evt.homeEvents();
    bb.evt.appsEvents();
    bb.evt.blogEvents();
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
      navColorI: 'nav-color-i'
    }
  };
  //dom events
  bb.evt = {
    onLoad: onLoad,
    onPopState: onPopState,
    loadView: loadView,
    loadRoute: loadRoute,
    navStyleSetup: navStyleSetup,
    removeNavStyle: removeNavStyle,
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
