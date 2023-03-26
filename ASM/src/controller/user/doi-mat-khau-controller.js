window.UserChangePasswordControllers = function ($scope, $http, $location) {
  $scope.listUser = [];
  $http.get(userAPI).then(function (response) {
    console.log(response.data);
    $scope.listUser = response.data;
  });

  $scope.formDoiMatKhau = {
    newPassword: "",
    confirmPassword: "",
  };

  $scope.index = -1;
  // lấy id user theo tendangnhap
  function getUserByUsername(tenDangNhap) {
    for (let i = 0; i < $scope.listUser.length; i++) {
      $scope.index++;
      if (tenDangNhap == $scope.listUser[i].username) {
        $scope.user = $scope.listUser[i];
        return $scope.listUser[i].id;
      }
    }
  }
  $scope.submitFormDoiMatKhau = function (event) {
    event.preventDefault();
    const idUser = getUserByUsername($scope.formDoiMatKhau.username);
    if (idUser == null) {
      alert("Ten dang nhap không tồn tại");
      return;
    }

    if (
      $scope.formDoiMatKhau.newPassword.length === 0 ||
      $scope.formDoiMatKhau.confirmPassword.length === 0 ||
      $scope.formDoiMatKhau.username.length === 0 ||
      $scope.formDoiMatKhau.password.length === 0
    ) {
      alert("Mời bạn nhập đầy đủ thông tin");
      return;
    } else if (
      $scope.formDoiMatKhau.newPassword.length < 6 ||
      $scope.formDoiMatKhau.confirmPassword.length < 6 ||
      $scope.formDoiMatKhau.password.length < 6
    ) {
      alert("Mật khẩu tối thiểu 6 ký tự");
      return;
    } else if (
      $scope.formDoiMatKhau.username.length > 12 ||
      $scope.formDoiMatKhau.username.length < 6
    ) {
      alert("Tên đăng nhập 6-12 ký tự");
      console.log(x);
      return;
    } else if (
      // $scope.user.username !== $scope.formDoiMatKhau.username &&
      $scope.user.password !== $scope.formDoiMatKhau.password
    ) {
      alert("Mật khẩu cũ không khớp");
      return;
    } else if (
      $scope.formDoiMatKhau.newPassword !==
      $scope.formDoiMatKhau.confirmPassword
    ) {
      alert("Nhập lại mật khẩu không khớp với mật khẩu mới");
      return;
    }

    if (
      $scope.formDoiMatKhau.newPassword ===
      $scope.formDoiMatKhau.confirmPassword
    ) {
      const api = userAPI + "/" + idUser;
      $scope.user.password = $scope.formDoiMatKhau.confirmPassword;

      $http.put(api, $scope.user).then(function (response) {
        $scope.listUser[$scope.index] = response.data;
        alert("Đổi mật khẩu thành công!");
        console.log("aaaaa" + $scope.user);
        $location.path("dang-nhap");
        return;
      });
    }
  };
};
