window.OrderDetailController = function ($scope, $http, $routeParams) {
  $scope.listOrderDetail = [];
  $http.get(orderDetailAPI).then(function (response) {
    console.log(response.data);
    $scope.listOrderDetail = response.data;
  });

  $scope.delete = function (event, index) {
    event.preventDefault();
    let x = $scope.listOrderDetail[index];
    let api = orderDetailAPI + "/" + x.id;
    $http.delete(api).then(function () {
      $scope.listOrderDetail.splice(index, 1);
    });
  };
  $scope.tong = 0;
  $scope.tinhTong = function () {
    let x = $scope.listOrderDetail;
    $scope.tong = 0;
    x.forEach((a) => {
      $scope.tong += a.price * a.quantity;
    });
  };
};
