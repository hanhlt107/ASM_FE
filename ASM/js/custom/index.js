$(document).ready(function () {
  //function hover product:
  var products = document.getElementsByClassName("productImage");
  var imgs = document.getElementsByClassName("newProductImg");
  //var views = document.getElementsByClassName('quickView');

  function newProduct(i) {
    products[i].addEventListener("mouseenter", function () {
      imgs[i].src = imgs[i].src.replace("_1", "_2");
      $(".newProductImg", this).hide();
      $(".newProductImg", this).fadeIn();
      //views[i].style.animationName = 'translateView';
      //views[i].style.display = 'block';
      $(".quickView", this).css("animation-nane", "translateView");
      $(".quickView", this).fadeIn();
    });

    products[i].addEventListener("mouseleave", function () {
      imgs[i].src = imgs[i].src.replace("_2", "_1");
      $(".newProductImg", this).hide();
      $(".newProductImg", this).fadeIn();
      //views[i].style.animationName = '';
      //views[i].style.display = 'none';
      $(".quickView", this).css("animation-nane", "");
      $(".quickView", this).fadeOut();
    });
  }

  for (var i = 0; i < products.length; i++) {
    products[i].addEventListener("mouseenter", newProduct(i));
  }

  //Log in box:
  $(document).ready(function () {
    $("#loginLink").click(function (event) {
      event.preventDefault();
      $(".overlay").fadeToggle("fast");
    });

    $(".overlayLink").click(function (event) {
      event.preventDefault();
      var action = $(this).attr("data-action");

      $.get("ajax/" + action, function (data) {
        $(".login-content").html(data);
      });

      $(".overlay").fadeToggle("fast");
    });

    $(".close").click(function () {
      $(".overlay").fadeToggle("fast");
    });

    $(document).keyup(function (e) {
      if (e.keyCode == 27 && $(".overlay").css("display") != "none") {
        event.preventDefault();
        $(".overlay").fadeToggle("fast");
      }
    });

    //Fixed navbar:
    $(window).load(function () {
      $(window).scroll(function () {
        if ($(window).scrollTop() > 500) {
          $("#header").addClass("fixed");
        } else {
          $("#header").removeClass("fixed");
        }
      });
    });

    //Toggle menu:
    function ToggleMenu() {
      var menu = document.querySelectorAll("#header li");
      for (var i = 0; i < menu.length; i++) {
        if (menu[i].childNodes[2] != null) {
          //nếu có node con thứ 2(có sub menu) mới add event
          menu[i].addEventListener("mouseenter", function () {
            this.childNodes[2].style.display = "block";
          });

          menu[i].addEventListener("mouseleave", function () {
            this.childNodes[2].style.display = "none";
          });
        }
      }
    }

    var view = document.getElementsByClassName("quickView"); //DOM vào div Lighbox
    var thisImg = document.getElementsByClassName("newProductImg"); //DOM vào ảnh sản phẩm
    var product_names = document.getElementsByClassName("productName");
    var product_prices = document.getElementsByClassName("productPrice");

    function LightBox(i) {
      view[i].addEventListener("click", function () {
        document.getElementById("lightBox").style.display = "block";
        document.getElementById("anhPhongTo").src = thisImg[i].src; //Gán src ảnh lightbox = src của ảnh sp
        document.getElementById("product_name").innerHTML =
          product_names[i].innerHTML;
        document.getElementById("product_price").innerHTML =
          product_prices[i].innerHTML;
      });

      //function close:
      document.getElementById("close").onclick = function () {
        //document.getElementById('lightBox').style.display = 'none';
        $("#lightBox").fadeOut();
      };
    }

    ToggleMenu();
    for (var i = 0; i < view.length; i++) {
      view[i].addEventListener("click", LightBox(i));
    }

    //Scroll top function
    if ($("#back-to-top").length) {
      var scrollTrigger = 500, // px
        backToTop = function () {
          var scrollTop = $(window).scrollTop();
          if (scrollTop > scrollTrigger) {
            $("#back-to-top").addClass("show");
          } else {
            $("#back-to-top").removeClass("show");
          }
        };
      backToTop();
      $(window).on("scroll", function () {
        backToTop();
      });
      $("#back-to-top").on("click", function (e) {
        e.preventDefault();
        $("html,body").animate(
          {
            scrollTop: 0,
          },
          700
        );
      });
    }
  });

  //Validate form:
  var check1 = 0;
  var check2 = 0;

  $("#loginSubmit").on("click", function () {
    if ($("#username").val() == "") {
      $("#errorName").html("Vui lòng nhập tên đăng nhập!");
      check1 = 0;
    } else if (
      $("#username").val().length > 12 ||
      $("#username").val().length < 6
    ) {
      $("#errorName").html("Tên đăng nhập từ 6-12 ký tự!");
      check1 = 0;
    } else if (
      $("#username").val().length <= 12 &&
      $("#username").val().length >= 6
    ) {
      $("#errorName").html("");
      check1 = 1;
    }

    if ($("#password").val() == "") {
      $("#errorPass").html("Vui lòng nhập mật khẩu!");
      check2 = 0;
    } else if (
      $("#password").val().length > 12 ||
      $("#password").val().length < 6
    ) {
      $("#errorPass").html("Mật khẩu từ 6-12 ký tự!");
      check2 = 0;
    } else if (
      $("#password").val().length <= 12 &&
      $("#password").val().length >= 6
    ) {
      $("#errorPass").html("");
      check2 = 1;
    }

    if (check1 == 1 && check2 == 1) {
      return true;
    } else {
      return false;
    }
  });
});
