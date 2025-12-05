// Mobile main menu toggle
const navToggle = document.getElementById('navToggle');
const mainmenu  = document.getElementById('mainmenu');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  mainmenu.classList.toggle('show');
});

// Mobile: open/close submenus on tap/click, and sync aria-expanded
function setupSubmenus(root) {
  const parents = root.querySelectorAll('.has-submenu > a');
  parents.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      // Only use click-to-toggle on mobile view
      if (window.matchMedia('(max-width: 900px)').matches) {
        e.preventDefault();
        const li = anchor.parentElement;
        const isOpen = li.classList.contains('open');
        // Close siblings
        li.parentElement.querySelectorAll('.has-submenu.open').forEach(sib => {
          if (sib !== li) sib.classList.remove('open');
          const sibA = sib.querySelector(':scope > a[aria-expanded]');
          if (sibA) sibA.setAttribute('aria-expanded', 'false');
        });
        // Toggle current
        li.classList.toggle('open');
        anchor.setAttribute('aria-expanded', String(!isOpen));
      }
    });
  });
}

setupSubmenus(mainmenu);

// Close menus when clicking outside (mobile/desktop)
document.addEventListener('click', (e) => {
  const nav = document.querySelector('.navbar');
  if (!nav.contains(e.target)) {
    // close mobile main menu
    mainmenu.classList.remove('show');
    navToggle?.setAttribute('aria-expanded', 'false');
    // close all open submenus
    document.querySelectorAll('.has-submenu.open').forEach(li => li.classList.remove('open'));
    document.querySelectorAll('.has-submenu > a[aria-expanded="true"]').forEach(a => a.setAttribute('aria-expanded', 'false'));
  }
});
