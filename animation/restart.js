const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      handleAnimationClasses(entry.target, 'add');
    } else {
      handleAnimationClasses(entry.target, 'remove');
    }
  });
}, { threshold: 0.5 }); // Trigger when 50% of the element is in view

// Function to handle adding/removing animation classes
const handleAnimationClasses = (element, action) => {
  const animations = [
    'slide-in-down',
    'delay-slide-in-down',
    'slide-in-left',
    'delay-slide-in-left',
    'slide-in-right',
    'delay-slide-in-right',
    'slide-in-top',
    'delay-slide-in-top',
  ];

  animations.forEach((animation) => {
    if (element.classList.contains(animation)) {
      const startClass = `start-${animation.replace('delay-', '')}`;
      const delayStartClass = `delay-start-${animation.replace('delay-', '')}`;

      console.log(`Checking element:`, element);
      console.log(`Animation: ${animation}`);
      console.log(`Contains: ${element.classList.contains(animation)}`);

      if (action === 'add') {
        console.log(`Adding class: ${element.classList.contains(`delay-${animation}`) ? delayStartClass : startClass}`);
        element.classList.add(element.classList.contains(`delay-${animation}`) ? delayStartClass : startClass);
      } else {
        console.log(`Removing class: ${element.classList.contains(`delay-${animation}`) ? delayStartClass : startClass}`);
        element.classList.remove(element.classList.contains(`delay-${animation}`) ? delayStartClass : startClass);
      }
    }
  });
};

// Function to detect scroll direction
let lastScrollY = window.scrollY;

const detectScrollDirection = () => {
  const scrollY = window.scrollY;
  const isScrollingDown = scrollY > lastScrollY;
  lastScrollY = scrollY;
  return isScrollingDown;
};

// Function to check if the element is in the viewport
const checkInView = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

// Get all elements to observe
const observerElements = document.querySelectorAll(
  ".delay-slide-in-top, .slide-in-top, .slide-in-down, .delay-slide-in-down, .slide-in-left, .delay-slide-in-left, .slide-in-right, .delay-slide-in-right"
);

// Observe elements and handle the animations immediately for elements in view
observerElements.forEach((el) => {
  console.log(`Observing element:`, el); // Log the element being observed

  if (checkInView(el)) {
    handleAnimationClasses(el, 'add');
  }

  observer.observe(el);
});

// Debounce scroll events for smoother performance
let timeout;
const debounceScroll = () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const isScrollingDown = detectScrollDirection();
    if (isScrollingDown) {
      console.log("Scrolling Down");
    } else {
      console.log("Scrolling Up");
    }
  }, 50); // Adjust debounce time as necessary
};

window.addEventListener('scroll', debounceScroll);
