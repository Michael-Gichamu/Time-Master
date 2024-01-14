const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');
const header = document.querySelector('#header');
const defaultMarginBottom = header.style.marginBottom

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
  }
};