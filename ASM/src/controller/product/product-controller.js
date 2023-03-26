window.ProductController = function ($scope, $http, $routeParams) {
  $scope.listProduct = [];
  $http.get(productAPI).then(function (response) {
    console.log(response.data);
    $scope.listProduct = response.data;
  });

  $scope.listCategory = [];
  $http.get(categoryAPI).then(function (response) {
    console.log(response.data);
    $scope.listCategory = response.data;
  });
  // detail product
  var id = $routeParams.id;
  $http.get(productAPI + "/" + id).then(function (response) {
    $scope.sanPham = response.data;
  });

  //filter product
  $scope.danhMuc = "";
  $scope.filter = function (x) {
    $scope.danhMuc = x;
  };
  $scope.formPoduct = {
    name: "",
    price: "",
    quantity: "",
    img: "",
    categoryId: "",
  };
  $scope.viTri = -1;

  $scope.detail = function (event, index) {
    event.preventDefault();
    let x = $scope.listProduct[index];
    $scope.formPoduct.id = x.id;
    $scope.formPoduct.name = x.name;
    $scope.formPoduct.price = x.price;
    $scope.formPoduct.quantity = x.quantity;
    $scope.formPoduct.img = x.img;
    $scope.formPoduct.categoryId = x.categoryId;

    $scope.viTri = index;
  };

  //   delete
  $scope.delete = function (event, index) {
    event.preventDefault();
    let x = $scope.listProduct[index];
    let api = productAPI + "/" + x.id;
    $http.delete(api).then(
      function () {
        $scope.listProduct.splice(index, 1);
        alert("Xóa thành công");
      },
      function () {
        alert("Xóa thất bại");
      }
    );
  };

  // add

  $scope.add = function (event) {
    event.preventDefault();
    let regex_so = /^[1-9][0-9]*$/;
    if (
      $scope.formPoduct.name.length === 0 ||
      $scope.formPoduct.price.length === 0 ||
      $scope.formPoduct.img.length === 0 ||
      $scope.formPoduct.quantity.length === 0 ||
      $scope.formPoduct.categoryId.length === 0
    ) {
      alert("Mời bạn nhập đầy đủ thông tin");
      return;
    } else if (
      !regex_so.test($scope.formPoduct.price) ||
      !regex_so.test($scope.formPoduct.quantity)
    ) {
      alert("Giá và số lượng phải là số nguyên dương");
      return;
    }
    $http.post(productAPI, $scope.formPoduct).then(
      function (response) {
        $scope.listProduct.push(response.data);
        alert("Thành công");
      },
      function () {
        alert("Thất bại");
      }
    );
  };

  // update
  $scope.update = function (event) {
    event.preventDefault();
    if ($scope.viTri == -1) {
      alert("Mời bạn chọn 1 sản phẩm để sửa");
      return;
    }
    if (
      $scope.formPoduct.name.length === 0 ||
      $scope.formPoduct.price.length === 0 ||
      $scope.formPoduct.img.length === 0 ||
      $scope.formPoduct.quantity.length === 0 ||
      $scope.formPoduct.categoryId.length === 0
    ) {
      alert("Mời bạn nhập đầy đủ thông tin");
      return;
    }
    let x = $scope.listProduct[$scope.viTri];
    let api = productAPI + "/" + x.id;
    console.log(api);
    $http.put(api, $scope.formPoduct).then(
      function (response) {
        $scope.listProduct[$scope.viTri] = response.data;
        alert("Thành công");
      },
      function () {
        alert("Thất bại");
      }
    );
  };

  $scope.listOrderDetail = [];
  $http.get(orderDetailAPI).then(function (response) {
    console.log(response.data);
    $scope.listOrderDetail = response.data;
  });
  $scope.cart = {
    name: "",
    price: "",
    quantity: 1,
    img: "",
  };

  $scope.addToCart = function (event) {
    event.preventDefault();
    let regex_so_luong = /^[1-9][0-9]*$/;
    if ($scope.cart.quantity.length === 0) {
      alert("Mời bạn nhập số lượng");
      return;
    }
    if (!regex_so_luong.test($scope.cart.quantity)) {
      alert("Số lượng phải nguyên dương");
      return;
    }
    if ($scope.cart.quantity > $scope.sanPham.quantity) {
      alert("Đã quá số lượng tồn");
      return;
    }
    $scope.cart.name = $scope.sanPham.name;
    $scope.cart.price = $scope.sanPham.price;
    $scope.cart.img = $scope.sanPham.img;
    $http.post(orderDetailAPI, $scope.cart).then(function (response) {
      $scope.listOrderDetail.push($scope.cart);
      alert("Thêm thành công");
    });
  };
};
