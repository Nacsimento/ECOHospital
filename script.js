const slider = document.querySelector('.gallery');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', _ => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const SCROLL_SPEED = 3;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;
});



const counterSections = document.querySelectorAll('.counter-section');

const options = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target.querySelector('.counter');
      const endNumber = parseInt(counter.getAttribute('data-end'));
      let currentNumber = 0;

      const interval = setInterval(() => {
        counter.textContent = currentNumber;
        currentNumber++;
        if (currentNumber > endNumber) {
          clearInterval(interval);
        }
      }, 50); 

      observer.unobserve(entry.target);
    }
  });
}, options);

counterSections.forEach(section => {
  observer.observe(section);
});




