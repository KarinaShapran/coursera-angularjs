( function () {
'use strict';

angular.module('LunchChecker', [])
  .controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope'];

function LunchCheckerController($scope) {
  $scope.list = "";
  $scope.message = "";
  $scope.state = "default";

  $scope.displayMessage = function() {
    var counter = getNumberOfItems($scope.list);
    $scope.message = getMessage(counter);
  };

  function getNumberOfItems(string) {
    return string.split(",").length;
  };
  
  function getMessage(counter) {
    if (!$scope.list) {
      return "Please enter data first";
    } else if (counter <= 3) {
      $scope.state = "green"
      return "Enjoy!";
    } else {
      $scope.state = "red"
      return "Too much!";
    }
  };
}

})();