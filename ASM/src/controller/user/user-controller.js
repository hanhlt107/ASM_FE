window.UserControllers = function (
  $scope,
  $rootScope,
  $http,
  $location,
  $routeParams
) {
  $scope.listUser = [];
  $http.get(userAPI).then(function (response) {
    console.log(response.data);
    $scope.listUser = response.data;
  });

  // đăng nhập
  $scope.formDangNhap = {
    username: "",
    password: "",
  };
  $scope.submitFormDangNhap = function (event) {
    event.preventDefault();
    if (
      $scope.formDangNhap.username.length === 0 ||
      $scope.formDangNhap.password.length === 0
    ) {
      alert("Mời bạn nhập đầy đủ thông tin");
      return;
    } else if (
      $scope.formDangNhap.username.length > 12 ||
      $scope.formDangNhap.username.length < 6
    ) {
      alert("Tên đăng nhập 6-12 ký tự");
      return;
    } else if ($scope.formDangNhap.password.length < 6) {
      alert("Mật khẩu tối thiểu 6 ký tự");
      return;
    }
    for (var i = 0; i < $scope.listUser.length; i++) {
      if (
        $scope.listUser[i].username === $scope.formDangNhap.username &&
        $scope.listUser[i].password === $scope.formDangNhap.password &&
        $scope.listUser[i].role === 0
      ) {
        alert("Đăng nhập thành công!");
        $location.path("product-manage");
        return;
      }

      if (
        $scope.listUser[i].username === $scope.formDangNhap.username &&
        $scope.listUser[i].password === $scope.formDangNhap.password &&
        $scope.listUser[i].role === 1
      ) {
        alert("Đăng nhập thành công!");
        $location.path("trang-chu");
        return;
      }
    }
    alert("Tên đăng nhập hoặc mật khẩu không chính xác.");
  };
  // đổi mật khẩu form đăng nhập
  $scope.submitDoiMatKhau = function (event) {
    event.preventDefault();
    if (
      $scope.formDangNhap.username.length === 0 ||
      $scope.formDangNhap.password.length === 0
    ) {
      alert("Mời bạn nhập đầy đủ thông tin");
      return;
    } else if (
      $scope.formDangNhap.username.length > 12 ||
      $scope.formDangNhap.username.length < 6
    ) {
      alert("Tên đăng nhập 6-12 ký tự");
      return;
    } else if ($scope.formDangNhap.password.length < 6) {
      alert("Mật khẩu tối thiểu 6 ký tự");
      return;
    }
    for (var i = 0; i < $scope.listUser.length; i++) {
      if (
        $scope.listUser[i].username === $scope.formDangNhap.username &&
        $scope.listUser[i].password === $scope.formDangNhap.password
      ) {
        alert("Vào trang đổi mật khẩu!");
        $location.path("doi-mat-khau");
        return;
      }
    }
    alert("Tên đăng nhập hoặc mật khẩu không chính xác.");
  };
};
