// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.service('NoticiasService', function($q, $http) {
  return {
    noticias: [
      {
        id: '1',
        title: 'Pick up apples',
        done: false
      },
      {
        id: '2',
        title: 'Mow the lawn',
        done: true
      }
    ],
    getNoticias: function() {
      var obj = this;
      // $http.jsonp("http://ajax.googleapis.com/ajax/services/feed/load?callback=JSON_CALLBACK", { params: { "v": "1.0", "num":"5", "q": "http://souconcurseiroevoupassar.blogspot.com/feeds/posts/default" } })
      // .success(function(data) {
      //   obj.rssTitle = data.responseData.feed.title;
      //   obj.rssUrl = data.responseData.feed.feedUrl;
      //   obj.rssSiteUrl = data.responseData.feed.link;
      //   obj.noticias = data.responseData.feed.entries;
      //   window.localStorage["noticias"] = JSON.stringify(data.responseData.feed.entries);
      // })
      // .error(function(data) {
      //   console.log("ERROR: " + data);
      //   if(window.localStorage["noticias"] !== undefined) {
      //     obj.noticias = JSON.parse(window.localStorage["noticias"]);
      //   }
      // });
      return this.noticias
    },
    getNoticia: function(noticiaId) {
      var dfd = $q.defer()
      this.noticias.forEach(function(noticia) {
        if (noticia.id === noticiaId) dfd.resolve(noticia)
      })

      return dfd.promise
    }

  }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent': {
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    })

    .state('app.noticias', {
      url: "/noticias",
      views: {
        'menuContent': {
          templateUrl: "templates/noticias.html",
          controller: 'NoticiasCtrl'
        }
      },
      resolve: {
        noticias: function(NoticiasService) {
          console.log(NoticiasService.getNoticias());
          return NoticiasService.getNoticias()
        }
      }
    })

    .state('app.singleNoticia', {
      url: "/noticias/:noticiaId",
      views: {
        'menuContent': {
          templateUrl: "templates/noticia.html",
          controller: 'NoticiaCtrl'
        }
      },
      resolve: {
        noticia: function($stateParams, NoticiasService) {
          return NoticiasService.getNoticia($stateParams.noticiaId)
        }
      }
    })

;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/noticias');
});
