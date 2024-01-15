const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');
const header = document.querySelector('#header');
const defaultMarginBottom = header.style.marginBottom;
const welcomeH1 = document.querySelector('.welcome-content h1');

toggleBtn.onclick = function() {
  dropDownMenu.classList.toggle('open');
  const isOpen = dropDownMenu.classList.contains('open');
  toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  // push preceding content below
  if (window.innerWidth < 600 && toggleBtnIcon.className == 'fa-solid fa-xmark') {
    header.style.marginBottom = '250px';
  // restore to default margin bottom.
  } else if (toggleBtnIcon.className == 'fa-solid fa-bars') {
    header.style.marginBottom = defaultMarginBottom;
    // reset width when closing dropdown
    welcomeH1.style.width = 'unset';
  } else if (window.innerWidth > 600 && window.innerWidth < 992 ) {
    //fix width of welcome h1 when dropdown is open
    welcomeH1.style.width = '50%';
  }
};

window.addEventListener('resize', () => {
  if (window.innerWidth > 600 && toggleBtnIcon.className == 'fa-solid fa-xmark') {
    header.style.marginBottom = defaultMarginBottom;
    toggleBtnIcon.classList = 'fa-solid fa-bars';
    dropDownMenu.classList.toggle('open');
    welcomeH1.style.width = 'unset';
  }
})
