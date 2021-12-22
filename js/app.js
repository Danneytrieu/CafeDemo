// event listeners
eventListeners();
function eventListeners() {
  const ui = new UI();
  // preloader
  window.addEventListener("load", function () {
    ui.hidePreLoader();
  });
  // nav btn
  document.querySelector(".navBtn").addEventListener("click", function () {
    ui.showNav();
  });
  // video switch
  document
    .querySelector(".video_switch")
    .addEventListener("click", function () {
      ui.videoControls();
    });
  // submit form
  document
    .querySelector(".drink-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.querySelector(".input-name").value;
      const lastName = document.querySelector(".input-lastname").value;
      const email = document.querySelector(".input-email").value;

      let value = ui.checkEmpty(name, lastName, email);
      if (value) {
        let customer = new Customer(name, lastName, email);
        ui.showFeedBack("customer added to the list", "success");
        ui.addCustomer(customer);
        ui.clearFields()
      } else {
        ui.showFeedBack("some form values empty", "error");
      }
    });
  // display modal
  const links = document.querySelectorAll('.work-item_icon')
  links.forEach(function(item){
    item.addEventListener('click',function(event){
      ui.showModal(event)
    })
  })
  // hide modal
  document.querySelector('.work-modal_close').addEventListener('click',function(){
    ui.closeModal()
  })
}

//constructor function
function UI() {}
//preloader prototype
UI.prototype.hidePreLoader = function () {
  document.querySelector(".preloader").style.display = "none";
};
//show nav prototype
UI.prototype.showNav = function () {
  document.querySelector(".nav").classList.toggle("nav-show");
};
//video switch prototype
UI.prototype.videoControls = function () {
  let btn = document.querySelector(".video_switch-btn");
  if (!btn.classList.contains("btnSlide")) {
    btn.classList.add("btnSlide");
    document.querySelector(".video_item").pause();
  } else {
    btn.classList.remove("btnSlide");
    document.querySelector(".video_item").play();
  }
};
//check for empty values
UI.prototype.checkEmpty = function (name, lastName, email) {
  let result;
  if (name === "" || lastName === "" || email === "") {
    result = false;
  } else {
    result = true;
  }
  return result;
};
UI.prototype.showFeedBack = function (text, type) {
  const feedBack = document.querySelector(".drink-form_feedback");
  if (type === "success") {
    feedBack.classList.add("success");
    feedBack.innerText = text;
    this.removeAlert("success");
  } else if (type === "error") {
    feedBack.classList.add("error");
    feedBack.innerText = text;
    this.removeAlert("error");
  }
};
//remove alert
UI.prototype.removeAlert = function (type) {
  setTimeout(() => {
    document.querySelector(".drink-form_feedback").classList.remove(type);
  }, 3000);
};
//add customer
UI.prototype.addCustomer = function (customer) {
  const images = [1, 2, 3, 4, 5];
  let random = Math.floor(Math.random() * images.length);
  const div = document.createElement('div');
  div.classList.add('person');
  div.innerHTML = `<img src="img/person-${random}.jpeg" alt="person" class="person_thumbnail">
              <h4 class="person_name">${customer.name}</h4>
              <h4 class="person_last-name">${customer.lastName}</h4>`
  document.querySelector('.drink-card_list').appendChild(div);
};
//clear field
UI.prototype.clearFields = function(){
  document.querySelector(".input-name").value = '';
  document.querySelector(".input-lastname").value = '';
  document.querySelector(".input-email").value = '';
}
// show modal
UI.prototype.showModal = function(event){
  event.preventDefault();
  if (event.target.parentElement.classList.contains('work-item_icon'));
  let id = event.target.parentElement.dataset.id;

  const modal = document.querySelector('.work-modal');
  const modalItem = document.querySelector('.work-modal_item');

  modal.classList.add('work-modal_show');
  modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
  
}
// hide modal 
UI.prototype.closeModal = function(){
  document.querySelector('.work-modal').classList.remove('work-modal_show')
}
//customer
function Customer(name, lastname, email) {
  this.name = name;
  this.lastName = lastname;
  this.email = email;
}
