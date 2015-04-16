angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('NoticiasCtrl', function($http, $scope, noticias) {
 
    $scope.noticias = noticias;
    
    // $scope.doRefresh = function() {
    //   $http.jsonp("http://ajax.googleapis.com/ajax/services/feed/load?callback=JSON_CALLBACK", { params: { "v": "1.0", "num":"15", "q": "http://souconcurseiroevoupassar.blogspot.com/feeds/posts/default" } })
    //   .success(function(data) {
    //     $scope.rssTitle = data.responseData.feed.title;
    //     $scope.rssUrl = data.responseData.feed.feedUrl;
    //     $scope.rssSiteUrl = data.responseData.feed.link;
    //     $scope.noticias = data.responseData.feed.entries;
    //     window.localStorage["noticias"] = JSON.stringify(data.responseData.feed.entries);
    //   })
    //   .error(function(data) {
    //     console.log("ERROR: " + data);
    //     if(window.localStorage["noticias"] !== undefined) {
    //       $scope.noticias = JSON.parse(window.localStorage["noticias"]);
    //     }
    //   })
    //   .finally(function() {
    //     // Stop the ion-refresher from spinning
    //     $scope.$broadcast('scroll.refreshComplete');
    //   });
    // };

})
.controller('NoticiaCtrl', function($scope, $stateParams, noticia) {
  //$scope.noticiaId = $stateParams.noticiaId;
  $scope.noticia = noticia;
})
;
