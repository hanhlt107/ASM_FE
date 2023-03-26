window.UserRegisterControllers = function ($scope, $http, $location) {
  $scope.listUser = [];
  $http.get(userAPI).then(function (response) {
    console.log(response.data);
    $scope.listUser = response.data;
  });

  // đăng ký
  $scope.formDangKy = {
    username: "",
    password: "",
    address: "",
    phoneNumber: "",
    role: 1,
  };
  $scope.submitFormDangKy = function (event) {
    event.preventDefault();
    let regex_sdt = /^(0|\+84)[1-9][0-9]{8,9}$/;
    if (
      $scope.formDangKy.username.length === 0 ||
      $scope.formDangKy.password.length === 0 ||
      $scope.formDangKy.address.length === 0 ||
      $scope.formDangKy.phoneNumber.length === 0
    ) {
      alert("Mời bạn nhập đầy đủ thông tin");
      console.log(x);
      return;
    } else if (
      $scope.formDangKy.username.length > 12 ||
      $scope.formDangKy.username.length < 6
    ) {
      alert("Tên đăng nhập 6-12 ký tự");
      console.log(x);
      return;
    } else if ($scope.formDangKy.password.length < 6) {
      alert("Mật khẩu tối thiểu 6 ký tự");
      console.log(x);
      return;
    } else if (!regex_sdt.test($scope.formDangKy.phoneNumber)) {
      alert("Số điện thoại không đúng định dạng");
      return;
    }

    for (var i = 0; i < $scope.listUser.length; i++) {
      if ($scope.listUser[i].username === $scope.formDangKy.username) {
        alert("Tên đăng nhập đã tồn tại!");
        console.log(x);
        return;
      }
      if ($scope.listUser[i].phoneNumber === $scope.formDangKy.phoneNumber) {
        alert("Số điện thoại đã tồn tại đã tồn tại!");
        console.log(x);
        return;
      }
    }

    $http.post(userAPI, $scope.formDangKy).then(function (response) {
      console.log(response);
      $scope.listUser.push(response.data);
      alert("Đăng ký thành công");
      $location.path("dang-nhap");
    });
  };
};
