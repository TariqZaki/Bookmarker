"use strict"

// !<---- global variables ---->
let siteInput = document.getElementById("siteInput");
let urlInput = document.getElementById("urlInput");
let addBtn = document.getElementById("addBtn");
let bookmarkInput = document.getElementById("bookmarkInput");
let trData = document.getElementById("trData");
let alertMsg = document.getElementById('alertMsg');

let bookmarksContainer = [];
// !<---- global variables ---->

// ?<---- local storage ---->
if (localStorage.getItem("bookmarks") !== null) {
  bookmarksContainer = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks();
}

addBtn.addEventListener("click", function () {
  addBookmark();
});

// ?<---- add  bookmark function ---->
function addBookmark() {
  if (validationName() && validationUrl()) {
    let bookmark = {
      site: siteInput.value,
      url: urlInput.value,
    };
    bookmarksContainer.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksContainer));
    clearData();
    displayBookmarks();
    Swal.fire({
      position: "center center",
      icon: "success",
      title: "The Bookmark has been added successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
}


// ?<---- display  bookmarks function ---->
function displayBookmarks() {
  let cartona = ``;
  for (let i = 0; i < bookmarksContainer.length; i++) {
    cartona += `
            <tr class="text-center">
    <td>${i + 1}</td>
<td>${bookmarksContainer[i].site}</td>
<td><button onclick="deletedBookmarks(${i})" class="btn btn-danger">Delete <i class="fa-solid fa-trash"></i></button></td>
<td><button onclick="visiteBookmarks(${i})" class="btn btn-success">Visite <i class="fa-solid fa-eye"></i></button></td>
</tr>
            `;
  }
  trData.innerHTML = cartona;
}

//// ?<---- clear data function ---->
function clearData() {
  siteInput.value = null;
  urlInput.value = null;

  siteInput.classList.remove("is-valid");
  urlInput.classList.remove("is-valid");
}

// ?<---- delete  bookmarks function ---->
function deletedBookmarks(deletedIndex) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      bookmarksContainer.splice(deletedIndex, 1);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarksContainer));
      displayBookmarks();

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

// ?<---- visite bookmark function ---->
function visiteBookmarks(index) {
  window.open(bookmarksContainer[index].url);
}

// ?<---- search bookmark function ---->
bookmarkInput.addEventListener("input", function () {
  searchBookmarks();
});
function searchBookmarks() {
  let term = bookmarkInput.value;
  let cartona = ``;
  for (let i = 0; i < bookmarksContainer.length; i++) {
    if (bookmarksContainer[i].site.toLowerCase().includes(term.toLowerCase())) {
      cartona = `
      <tr class="text-center pt-2">
                        <td>${i + 1}</td>
<td>${bookmarksContainer[i].site}</td>
<td><button onclick="deletedBookmarks(${i})" class="btn btn-danger">Delete <i class="fa-solid fa-trash"></i></button></td>
<td><button onclick="visiteBookmarks(${i})" class="btn btn-success">Visite <i class="fa-solid fa-eye"></i></button></td>
</tr>
                    `;
    }
  }
  trData.innerHTML = cartona;
}

// ?<---- validation function ---->
function validationName() {
  var text = siteInput.value;
  var regex = /^[A-Z][a-z]{3,}$/;

  if (regex.test(text) == true) {
    siteInput.classList.add("is-valid");
    siteInput.classList.remove("is-invalid");
    siteInput.nextElementSibling.classList.add('d-none');
    return true;
  } else {
    siteInput.classList.add("is-invalid");
    siteInput.classList.remove("is-valid");
    siteInput.nextElementSibling.classList.remove('d-none');
    return false;
  }
}
function validationUrl() {
  var text = urlInput.value;
  var regex =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

  if (regex.test(text) == true) {
    urlInput.classList.add("is-valid");
    urlInput.classList.remove("is-invalid");
    urlInput.nextElementSibling.classList.add('d-none');
    return true;
  } else {
    urlInput.classList.add("is-invalid");
    urlInput.classList.remove("is-valid");
    urlInput.nextElementSibling.classList.remove('d-none');
    return false;
  }
}

siteInput.addEventListener("input", function () {
  validationName();
});
urlInput.addEventListener("input", function () {
  validationUrl();
});


