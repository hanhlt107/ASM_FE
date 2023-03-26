var app = angular.module("asm", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/dang-nhap", {
      templateUrl: "./pages/dang-nhap.html",
      controller: UserControllers,
    })
    .when("/trang-chu", {
      templateUrl: "./pages/trang-chu.html",
      controller: ProductController,
    })
    .when("/gioi-thieu", {
      templateUrl: "./pages/gioi-thieu.html",
    })
    .when("/doi-mat-khau", {
      templateUrl: "./pages/doi-mat-khau.html",
      controller: UserChangePasswordControllers,
    })
    .when("/dang-ky", {
      templateUrl: "./pages/dang-ky.html",
      controller: UserRegisterControllers,
    })
    .when("/product-manage", {
      templateUrl: "./pages/quan-ly-product.html",
      controller: ProductController,
    })
    .when("/product", {
      templateUrl: "./pages/product.html",
      controller: ProductController,
    })
    .when("/product-da-mua", {
      templateUrl: "./pages/product-da-mua.html",
      controller: ProductController,
    })
    .when("/category-manage", {
      templateUrl: "./pages/quan-ly-category.html",
      controller: ControllerCategory,
    })
    .when("/product/detail/:id", {
      templateUrl: "./pages/detail-product.html",
      controller: ProductController,
    })
    .when("/product/category/:id", {
      templateUrl: "./pages/product.html",
      controller: ProductController,
    })
    .when("/gio-hang", {
      templateUrl: "./pages/gio-hang.html",
      controller: OrderDetailController,
    })
    .otherwise({
      redirectTo: "/dang-nhap",
    });
});
