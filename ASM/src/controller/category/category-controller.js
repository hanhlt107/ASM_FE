window.ControllerCategory = function ($scope, $http) {
  $scope.listCategory = [];
  $http.get(categoryAPI).then(function (response) {
    console.log(response.data);
    $scope.listCategory = response.data;
  });

  $scope.listProduct = [];
  $http.get(productAPI).then(function (response) {
    console.log(response.data);
    $scope.listProduct = response.data;
  });

  $scope.formCategory = {
    name: "",
  };
  $scope.viTri = -1;

  $scope.detail = function (event, index) {
    event.preventDefault();
    let x = $scope.listCategory[index];
    $scope.formCategory.id = x.id;
    $scope.formCategory.name = x.name;
    $scope.viTri = index;
  };

  //   delete
  $scope.delete = function (event, index) {
    event.preventDefault();
    let x = $scope.listCategory[index];
    let api = categoryAPI + "/" + x.id;
    for (let i = 0; i < $scope.listProduct.length; i++) {
      if (x.id === $scope.listProduct[i].categoryId) {
        alert("Danh mục này không thế xóa");
        console.log(id);
        return;
      }
    }
    $http.delete(api).then(
      function () {
        $scope.listCategory.splice(index, 1);
        alert("Thành công");
      },
      function () {
        alert("Thất bại");
      }
    );
  };

  // add

  $scope.add = function (event) {
    event.preventDefault();
    if ($scope.formCategory.name.length === 0) {
      alert("Mời bạn nhập đầy đủ thông tin");
      return;
    }
    $http.post(categoryAPI, $scope.formCategory).then(
      function (response) {
        $scope.listCategory.push(response.data);
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
      alert("Mời bạn chọn 1 danh mục để sửa");
      return;
    }
    if ($scope.formCategory.name.length === 0) {
      alert("Mời bạn nhập đầy đủ thông tin");
      return;
    }
    let x = $scope.listCategory[$scope.viTri];
    let api = categoryAPI + "/" + x.id;
    console.log(api);
    $http.put(api, $scope.formCategory).then(
      function (response) {
        $scope.listCategory[$scope.viTri] = response.data;
        alert("Thành công");
      },
      function () {
        alert("Thất bại");
      }
    );
  };
};
