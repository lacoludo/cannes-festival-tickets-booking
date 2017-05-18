var app = angular.module("ticketsBooking", ["ngRoute"]);

function getMinutesCount(timeStr) {
  const tokens = timeStr.split(":");
  const hours = parseInt(tokens[0]);
  const minutes = parseInt(tokens[1]);
  return 60 * hours + minutes;
};

app.config(function($routeProvider, $locationProvider) {

  $routeProvider
    .when("/debussy-lumiere", {
      templateUrl: "tpl/debussy-lumiere.html",
      controller: "timelineController"
    })
    .when("/debussy", {
      templateUrl: "tpl/debussy.html",
      controller: "timelineController"
    })
    .when("/lumiere", {
      templateUrl: "tpl/lumiere.html",
      controller: "timelineController"
    })
    .otherwise("/debussy-lumiere", {
      redirectTo: "/debussy-lumiere"
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

});

app.controller("timelineController", ["$scope", "$http", function($scope, $http, $route, $routeParams, $location) {

  $scope.$on("$locationChangeStart", function(event) {
    setTimeout(function() {
      $(".tooltipped").tooltip({
        delay: 50
      });
    }, 1000);
  });

  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  // credits initialisation
  $scope.user = {
    credits: 7
  };

  function refreshShow(show) {
    // show.isBooked = !show.isBooked;
    show.class = show.isBooked ? "booked" : "disabled";
    const showsAtDate = $scope.showsByDate[show.date];
    const allShowsAtDate = showsAtDate.Debussy.concat(showsAtDate.Lumiere);
    const otherShows = allShowsAtDate.filter(s => s !== show);
    // event handler
    for (const otherShow of otherShows) {
      otherShow.isLocked = show.isBooked;
    };
  };

  $scope.toggleBooking = function(show) {
    // if (show.isLocked) {
    //   return;
    // };
    const user = $scope.user;
    const showCredits = show.demand === "high demand" ? 2 : 1;
    if (show.isBooked) {
      console.log(show.isBooked);
      sweetAlert({
          title: "Are you sure ?",
          text: "Do you really want to unbook ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d0a42e",
          confirmButtonText: "Yes, unbook it !",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm) {
          if (isConfirm) {
            swal("Unbooked !", "We hope you will book another movie. 😉", "success");
            show.isBooked = false;
            user.credits = user.credits + showCredits;
            refreshShow(show);
          } else {
            swal("Cancelled", "Enjoy your movie ! 🍿", "error");
          };
          $scope.$apply();
        });
    };
    if (!show.isBooked) {
      if ((user.credits - showCredits) < 0) {
        swal("Warning !", "You have no more credits. 😞", "error")
      } else {
        sweetAlert({
            title: "Are you sure ?",
            text: "Remember you cannot book the same movie for another time but you can cancel your booking at anytime by reclicking the box.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d0a42e",
            confirmButtonText: "Yes, book it !",
            closeOnConfirm: false,
            closeOnCancel: false
          },
          function(isConfirm) {
            if (isConfirm) {
              swal("Booked !", "Enjoy your movie ! 🍿", "success");
              show.isBooked = true;
              user.credits = user.credits - showCredits;
              refreshShow(show);
            } else {
              swal("Cancelled", "We hope you will book another movie. 😉", "error");
            };
            $scope.$apply();
          });
      };
    };
  };

  $scope.moviesDB = {};
  $http
    .get("assets/js/api/movies.json")
    .then(function(response) {
      $scope.moviesDB = response.data;
      const baseOffset = getMinutesCount("08:30");
      // [
      //  date: "2016-05-14",
      //   shows: {
      //    Debussy: [],
      //    Lumiere: []
      //   }
      // ]
      const showsByDate = {};
      let maxEndTimeDebussy = 0;
      let maxEndTimeLumiere = 0;
      for (const movie of response.data.movies) {
        for (const show of movie.show) {
          if (!(show.date in showsByDate)) {
            showsByDate[show.date] = {
              Debussy: [],
              Lumiere: []
            };
          };
          show.movie = movie;
          show.start = getMinutesCount(show.time);
          show.duration = getMinutesCount(movie.runningTime);
          show.offset = 1.7 * (show.start - baseOffset) + "px";
          show.width = 1.7 * show.duration + "px";
          const end = show.start + show.duration;
          if (show.location === "Debussy") {
            if (end > maxEndTimeDebussy) {
              maxEndTimeDebussy = end;
            };
            showsByDate[show.date].Debussy.push(show);
          } else {
            if (end > maxEndTimeLumiere) {
              maxEndTimeLumiere = end;
            };
            showsByDate[show.date].Lumiere.push(show);
          };
          show.isBooked = false;
          show.class = "disabled";
        };
      };
      $scope.maxEndTimeDebussy = maxEndTimeDebussy;
      $scope.widthDebussy = 1.7 * (maxEndTimeDebussy - baseOffset) + "px";
      $scope.maxEndTimeLumiere = maxEndTimeLumiere;
      $scope.widthLumiere = 1.7 * (maxEndTimeLumiere - baseOffset) + "px";
      $scope.showsByDate = showsByDate;
    });
}]);

app.filter("dateToISO", function() {
  return function(input) {
    return new Date(input).toISOString();
  };
});
