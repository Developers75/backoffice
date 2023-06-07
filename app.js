//////////////////////////////////////////////////////////////// I - Header
//////////////////////////////////// 1 - theme switch
$(document).ready(() => {

  const themeToggle = document.querySelector("#theme-toggle");

  themeToggle.addEventListener("click", () => {
    document.body.classList.contains("light-theme")
      ? enableDarkMode()
      : enableLightMode();
  });

  function enableDarkMode() {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");

    $(".logo").attr("src", "/images/1.png")
    localStorage.setItem("theme", "dark");
  }

  function enableLightMode() {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");

    $(".logo").attr("src", "/images/2.png")
    htmlElement.style.backgroundColor = "#FCF5EB";
    localStorage.setItem("theme", "light");
  }

  function setThemePreference() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      enableDarkMode();
      return;
    }
    enableLightMode();
  }

  document.onload = setThemePreference();

})
$('.toggle-button').on('click', (e) => {
  const htmlElement = document.documentElement;
  const main = document.querySelector('.main');
  main.toggleAttribute('light-mode');
  main.toggleAttribute('dark-mode');

  if (main.getAttributeNames()[1] === "light-mode") {
    htmlElement.style.backgroundColor = "#1b1b1b";

    $(".logo").attr("src", "/images/logo-dark.png")
    $("body").removeClass("light");
    $("body").addClass("dark")
    localStorage.setItem("theme", "dark");
  } else {
    $(".logo").attr("src", "/images/logo-light.png")
    htmlElement.style.backgroundColor = "#FCF5EB";
    $("body").removeClass("dark");
    $("body").addClass("light");
    localStorage.setItem("theme", "light");
  }

})
//////////////////////////////////// 2 - search
$(document).ready(function () {
  var input = $("#searchInput");

  input.on("input", function () {
    var userInput = $(this).val().toLowerCase();

    if (userInput.length > 0) {
      $("#categories").css("display", "none");
      $(".menuCard").each(function (i, e) {
        var itemClass = $(e).attr('name').toLowerCase();
        var itemVisible = itemClass.indexOf(userInput) !== -1;
        $(this).toggle(itemVisible);
      })
    } else {
      $("#categories").css("display", "initial");
      var category = localStorage.getItem("category");
      $(`#cat-${category}`).addClass("selected");
      $(".menuCard").each(function (i, e) {
        var menu = $(e).attr("cate");
        var menu2 = $(e).attr("favorite");
        menu = menu.replace(/^menu-/, "");
        if (localStorage.getItem("category") === menu || menu2 === "true") {
          $(e).css("display", "flex");
        } else {
          $(e).css("display", "none");
        }
      })
    }
  })
}
)
//////////////////////////////////////////////////////////////// II - Categories
//////////////////////////////////// 1 - slideshow
$('.categoriesSelect').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  prevArrow: '<button type="button" class="slick-prev">Previous</button>', // Custom HTML for previous arrow
  nextArrow: '<button type="button" class="slick-next">Next</button>', // Custom HTML for next arrow
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      }
    },
    {
      breakpoint: 600,
      settings: {
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },

  ]
});
///////////////////////// a - choose category
$(".categoriesCard").click(function () {
  // border select
  $(".categoriesCard").removeClass("selected");
  $(this).addClass("selected");
  // get the id
  var category = $(this).attr("id");
  category = category.replace(/^cat-/, "");
  localStorage.setItem("category", category)
  // get menu's


  $(".mainChild").each(function (i, e) {
    var menu = $(e).attr("id");

    menu = menu.replace(/^menu-/, "");

    if (category === "favorite") {
      console.log(category)
      $(e).parent().attr("current", "favorite");
    } else {
      $(e).parent().attr("current", "none");
    }


    if (category === menu) {
      $(e).css("display", "flex");
    } else {
      $(e).css("display", "none");
    }
  })
})
///////////////////////// b - selected category after reload
$(document).ready(() => {
  var category = localStorage.getItem("category");
  $(`#cat-${category}`).addClass("selected");
  $(".mainChild").each(function (i, e) {
    var menu = $(e).attr("id");
    menu = menu.replace(/^menu-/, "");
    if (localStorage.getItem("category") === menu) {
      $(e).css("display", "flex");
    } else {
      $(e).css("display", "none");
    }
  })
})
//////////////////////////////////////////////////////////////// II - Main


//////////////////////////////////// 1 - records

//////////////////////////////////// 2 - categories/ products/ extra 

$(document).ready(function () {
  $('#categoryTable').DataTable({
    "language": {
      "paginate": {
        "previous": "<i class='fas fa-arrow-left'></i>",
            "next": "<i class='fas fa-arrow-right'></i>",
        "page": "<span class='paging-number'>Page</span> <span class='paging-number'>_PAGE_</span>"
      }
    }
  });

  $('#productTable').DataTable({
    "language": {
      "paginate": {
        "previous": "<i class='fas fa-arrow-left'></i>",
            "next": "<i class='fas fa-arrow-right'></i>",
        "page": "<span class='paging-number'>Page</span> <span class='paging-number'>_PAGE_</span>"
      }
    }
  });

  $('#extraTable').DataTable({
    "language": {
      "paginate": {
        "previous": "<i class='fas fa-arrow-left'></i>",
            "next": "<i class='fas fa-arrow-right'></i>",
        "page": "<span class='paging-number'>Page</span> <span class='paging-number'>_PAGE_</span>"
      }
    }
  });

});


function addCategory(photo, name, order) {
  var editIcon = $('<span>').append(`<i class="fa-solid fa-pen-to-square"></i>`).addClass("editIcon");
  var deleteIcon = $('<span>').append(`<i class="fa-solid fa-trash"></i>`).addClass("deleteIcon");
  var newRow = $('<tr>').append(
    $('<td>').html('<img src="' + photo + '">'),
    $('<td>').text(name),
    $('<td>').text(order),
    $('<td>').append(editIcon).append(deleteIcon)
    // Add more columns for additional user properties
  );

  $('#categoryTable tbody').append(newRow);
  // Refresh DataTables to update the table
}

function addProduct(photo, name, order, category, price, cost) {
  var editIcon = $('<span>').append(`<i class="fa-solid fa-pen-to-square"></i>`).addClass("editIcon");
  var deleteIcon = $('<span>').append(`<i class="fa-solid fa-trash"></i>`).addClass("deleteIcon");
  var newRow = $('<tr>').append(
    $('<td>').html('<img src="' + photo + '">'),
    $('<td>').text(name),
    $('<td>').text(order),
    $('<td>').text(category),
    $('<td>').text(price),
    $('<td>').text(cost),
    $('<td>').append(editIcon).append(deleteIcon)
    // Add more columns for additional user properties
  );

  $('#productTable tbody').append(newRow);
  // Refresh DataTables to update the table
}

function addExtra(photo, name) {
  var editIcon = $('<span>').append(`<i class="fa-solid fa-pen-to-square"></i>`).addClass("editIcon");
  var deleteIcon = $('<span>').append(`<i class="fa-solid fa-trash"></i>`).addClass("deleteIcon");
  var newRow = $('<tr>').append(
    $('<td>').html('<img src="' + photo + '">'),
    $('<td>').text(name),
    $('<td>').append(editIcon).append(deleteIcon)
    // Add more columns for additional user properties
  );

  $('#extraTable tbody').append(newRow);
  // Refresh DataTables to update the table
}


// Example usage
addCategory("/images/products.png", "drinks", "22");
addProduct("/images/products.png", "juice", "22", "drinks", "22dh", "15dh");
addExtra("/images/products.png", "extra");

$(document).ready(()=>{
  $("#addCategoryBtn").click(()=>{
    $("#createCategory").toggle("open");
  })
  
  $("#hideCategoryProfile").click(()=>{
    $("#createCategory").toggle("open");
  })

  $("#addProductBtn").click(()=>{
    $("#createProduct").toggle("open");
  })
  
  $("#hideProductProfile").click(()=>{
    $("#createProduct").toggle("open");
  })

  $("#addExtraBtn").click(()=>{
    $("#createExtra").toggle("open");
  })
  
  $("#hideExtraProfile").click(()=>{
    $("#createExtra").toggle("open");
  })


})

//////////////////////////////////// 3 - client/ employees

$(document).ready(function () {
  $('#userTable').DataTable({
    "language": {
      "paginate": {
        "previous": "<i class='fas fa-arrow-left'></i>",
            "next": "<i class='fas fa-arrow-right'></i>",
        "page": "<span class='paging-number'>Page</span> <span class='paging-number'>_PAGE_</span>"
      }
    }
  });
  $('#userTable2').DataTable({
    "language": {
      "paginate": {
        "previous": "<i class='fas fa-arrow-left'></i>",
            "next": "<i class='fas fa-arrow-right'></i>",
        "page": "<span class='paging-number'>Page</span> <span class='paging-number'>_PAGE_</span>"
      }
    }
  });
 // Remove the "Search" text
 $('.dataTables_filter label').contents().filter(function() {
  return this.nodeType === 3; // Filter out text nodes
}).remove();

// Add the FontAwesome icon
$('.dataTables_filter label').prepend('<span class="search-icon"><i class="fas fa-search"></i></span>');

});

function addUser(photo, name, age, number, email) {
  var iconColumn = $('<span>').append(`<i class="fas fa-info-circle"></i>`).addClass("extraIcon");
  var editIcon = $('<span>').append(`<i class="fa-solid fa-pen-to-square"></i>`).addClass("editIcon");
  var deleteIcon = $('<span>').append(`<i class="fa-solid fa-trash"></i>`).addClass("deleteIcon");

  var newRow = $('<tr>').append(
    $('<td>').html('<img src="' + photo + '">'),
    $('<td>').text(name),
    $('<td>').text(age),
    $('<td>').text(number),
    $('<td>').text(email),
    $('<td>').append(iconColumn).append(editIcon).append(deleteIcon)
    // Add more columns for additional user properties
  );

  $('#userTable tbody').append(newRow);

  // Refresh DataTables to update the table
}

function addUser2(photo, name,role, age, number, email) {
  var iconColumn = $('<span>').append(`<i class="fas fa-info-circle"></i>`).addClass("extraIcon");
  var editIcon = $('<span>').append(`<i class="fa-solid fa-pen-to-square"></i>`).addClass("editIcon");
  var deleteIcon = $('<span>').append(`<i class="fa-solid fa-trash"></i>`).addClass("deleteIcon");
  var newRow = $('<tr>').append(
    $('<td>').html('<img src="' + photo + '">'),
    $('<td>').text(name),
    $('<td>').text(role),
    $('<td>').text(age),
    $('<td>').text(number),
    $('<td>').text(email),
    $('<td>').append(iconColumn).append(editIcon).append(deleteIcon)
    // Add more columns for additional user properties
  );

  $('#userTable2 tbody').append(newRow);

  // Refresh DataTables to update the table
}

// Example usage
addUser("/images/client.png", "jhon", "22", "+21200000000", "email@gmail.com");
addUser2("/images/client.png", "james", "barman", "22", "+21200000000", "email@gmail.com");

$(document).ready(()=>{
  $("#addClientBtn").click(()=>{
    $("#createUser").toggle("open");
  })
  
  $("#addEmployeeBtn").click(()=>{
    $("#createEmployee").toggle("open");
  })


  $("#hideClientProfile").click(()=>{
    $("#createUser").toggle("open");
  })

  $("#hideEmployeeProfile").click(()=>{
    $("#createEmployee").toggle("open");
  })
})