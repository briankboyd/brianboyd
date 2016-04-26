
window.bb = (function(bb, $, _) {
  'use strict';

  //change from <% to {{
  _.templateSettings = {
    interpolate: /\{\{=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g,
    escape: /\{\{-(.*?)\}\}/g
  };

  function hello() {
    console.log('fuck you');
  }
  function styleNav(options) {
    var links = options.links;
    var event = options.event;
    links.on(event, 'ul li' , function(evt) {
      evt.preventDefault();
      var items = $(this).addClass(bb.sel.class.navColor).siblings();
      $(this).find('i').addClass(bb.sel.class.navColorI);
      items.removeClass(bb.sel.class.navColor);
      items.find('i').removeClass(bb.sel.class.navColorI);
    });
  }
  function mainNavSetup() {
    var options = {
      links: getNav(),
      event: 'click.nav'
    };
    bb.evt.styleNav(options);
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
    window.location.reload();
  }
  function portfolioView() {
    var navTmpl = $(bb.sel.portfolioSideNavTmpl).html();
    $(bb.sel.bbNav).html(_.template(navTmpl));
    $(bb.sel.portfolioSummary).trigger('click');
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
    var contentBody = $(bb.sel.contentBody);
    $(bb.sel.portfolioNav).on('click', function (e) {
      e.preventDefault();
      bb.view.portfolio.render();
      bb.evt.checkPopState(bb.view.portfolio.name);
    });

    //open hidden menu
    contentBody.on('click', bb.sel.portfolioDrawer, function () {
      $(bb.sel.contentBody).toggleClass(bb.sel.class.openDrawer);
    });

    //close the nav if click anywhere else than the nav icon
    $(document).click(function (evt) {
      if (!$(evt.target).closest(bb.sel.portfolioDrawer).length && !$(evt.target).is(bb.sel.portfolioDrawer)) {
        if (contentBody.hasClass(bb.sel.class.openDrawer)) {
          contentBody.removeClass(bb.sel.class.openDrawer);
        }
      }
    });
    //style navs
    var portfolioNavOptions = {
      links: $(bb.sel.bbNav),
      event: 'click.portfolioNav'
    };
    bb.evt.styleNav(portfolioNavOptions);

    var tmpl = $(bb.sel.portfolioTmpl).html();
    var bbMain = $(bb.sel.content);
    //load summary template
    contentBody.on('click', bb.sel.portfolioSummary, function() {
      var content = $(bb.sel.portfolioSummaryTmpl).html();
      bbMain.html(_.template(content));
      bbMain.append(_.template(tmpl));
      Prism.highlightAll();
    });
    //load java template
    contentBody.on('click', bb.sel.portfolioJava, function() {
      var content = $(bb.sel.portfolioJavaTmpl).html();
      bbMain.html(_.template(content));
      bbMain.append(_.template(tmpl));
      Prism.highlightAll();
    });
    //load javascript template
    contentBody.on('click', bb.sel.portfolioJavascript, function() {
      var content = $(bb.sel.portfolioJavascriptTmpl).html();
      bbMain.html(_.template(content));
      bbMain.append(_.template(tmpl));
      Prism.highlightAll();
    });
    //load nodejs template
    contentBody.on('click', bb.sel.portfolioNode, function() {
      var content = $(bb.sel.portfolioNodeJSTmpl).html();
      bbMain.html(_.template(content));
      bbMain.append(_.template(tmpl));
      Prism.highlightAll();
    });
    //load php template
    contentBody.on('click', bb.sel.portfolioPHP, function() {
      var content = $(bb.sel.portfolioPHPTmpl).html();
      bbMain.html(_.template(content));
      bbMain.append(_.template(tmpl));
      Prism.highlightAll();
    });
    //load sql template
    contentBody.on('click', bb.sel.portfolioSQL, function() {
      var content = $(bb.sel.portfolioSQLTmpl).html();
      bbMain.html(_.template(content));
      bbMain.append(_.template(tmpl));
      Prism.highlightAll();
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
    mainNav: '#mainNav',
    content: '#bbMain',
    bbNav: '#bbNav',
    contentBody: '#contentBody',
    homeNav: '#homeNav',
    homeTmpl: '#homeTmpl',
    appsNav: '#appsNav',
    appsTmpl: '#appsTmpl',
    blogNav: '#blogNav',
    blogTmpl: '#blogTmpl',
    portfolioNav: '#portfolioNav',
    portfolioTmpl: '#portfolioTmpl',
    portfolioSideNavTmpl: '#portfolioSideNavTmpl',
    portfolioDrawer: '#portfolioDrawer',
    portfolioSummaryTmpl: '#portfolioSummaryTmpl',
    portfolioSummary: '#portfolioSummary',
    portfolioJavaTmpl: '#portfolioJavaTmpl',
    portfolioJava: '#portfolioJava',
    portfolioJavascript: '#portfolioJavascript',
    portfolioJavascriptTmpl: '#portfolioJavascriptTmpl',
    portfolioNode: '#portfolioNode',
    portfolioNodeJSTmpl: '#portfolioNodeJSTmpl',
    portfolioPHP: '#portfolioPHP',
    portfolioPHPTmpl: '#portfolioPHPTmpl',
    portfolioSQL: '#portfolioSQL',
    portfolioSQLTmpl: '#portfolioSQLTmpl',
    class: {
      navColor: 'nav-color',
      navColorI: 'nav-color-i',
      NavColorReset: 'nav-color-reset',
      openDrawer: 'open-drawer'
    }
  };
  //dom events
  bb.evt = {
    onLoad: onLoad,
    onPopState: onPopState,
    loadView: loadView,
    styleNav: styleNav,
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