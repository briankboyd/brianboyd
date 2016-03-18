
window.bb = (function(bb, $, _) {
  'use strict';

  //change from <% to {{
  _.templateSettings = {
    interpolate: /\{\{=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g,
    escape: /\{\{-(.*?)\}\}/g
  };

  function mainNavSetup() {
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
    var navTmpl = $(bb.sel.portfolioSideNavTmpl).html();
    var isMobile = ($(bb.sel.bbNav).css('display')) === 'none';
    $(bb.sel.content).html(_.template(tmpl));
    if(isMobile) {

    } else {
      $(bb.sel.bbNav).html(_.template(navTmpl));
    }


  }
  function homeEvents() {
    $(bb.sel.homeNav).on('click', function(e) {
      e.preventDefault();
      bb.view.home.render();
      bb.evt.clearSideNav();
      bb.evt.checkPopState(bb.view.home.name);
    });
  }
  function appsEvents() {
    $(bb.sel.appsNav).on('click', function(e) {
      e.preventDefault();
      bb.view.apps.render();
      bb.evt.clearSideNav();
      bb.evt.checkPopState(bb.view.apps.name);
    });
  }
  function blogEvents() {
    $(bb.sel.blogNav).on('click', function(e) {
      e.preventDefault();
      bb.view.blog.render();
      bb.evt.clearSideNav();
      bb.evt.checkPopState(bb.view.blog.name);
    });
  }
  function portfolioEvents() {
    $(bb.sel.portfolioNav).on('click', function(e) {
      e.preventDefault();
      bb.view.portfolio.render();
      bb.evt.checkPopState(bb.view.portfolio.name);
    });
  }
  function getRoute() {
    return location.pathname.substring(1);
  }
  function checkPopState(routeName) {
    if(routeName !== bb.evt.getRoute()) {
      history.pushState({}, '', routeName);
    }
  }
  function loadView() {
    var route = bb.evt.getRoute();
    $(getNavId(route)).trigger('click.nav');
    bb.evt.clearSideNav();
    switch (route) {
      case bb.view.home.name:
        bb.view.home.render();
        break;
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
        $(getNavId(bb.view.home.name)).trigger('click.nav');
        break;
    }
  }
  function clearSideNav() {
    $(bb.sel.bbNav).html('');
  }
  function onLoad() {
    $(window).on('load', bb.evt.loadView);
  }
  function onPopState() {
    $(window).on('popstate', bb.evt.loadView);
  }
  function init() {
    bb.evt.mainNavSetup();
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
    portfolioSideNavTmpl: '#portfolioSideNavTmpl',
    bbNav: '#bbNav',
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
    mainNavSetup: mainNavSetup,
    homeEvents: homeEvents,
    appsEvents: appsEvents,
    blogEvents: blogEvents,
    portfolioEvents: portfolioEvents,
    checkPopState: checkPopState,
    getRoute: getRoute,
    clearSideNav: clearSideNav
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
