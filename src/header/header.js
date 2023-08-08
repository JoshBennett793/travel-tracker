// Query Selectors

const navBtns = document.querySelectorAll('.site-nav-list-item button');

// Event Listeners

navBtns.forEach(btn => {
  btn.onclick = e => {
    window.location.href = `${e.target.id}.html`;
  };
  
  btn.onkeypress = e => {
    if (e.key === 'Enter') {
      e.target.click();
    }
  }
});
