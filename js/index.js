
/* CIRCULOS PRODUCTOS */
document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector('.productos-title');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                title.classList.add('animate');
            } else {
                title.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(title);
});


/* FADE-IN */

document.addEventListener('DOMContentLoaded', function () {

  const elements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.5
  });

  elements.forEach(element => {
    observer.observe(element);
  });
});



