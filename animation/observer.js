// Function to check if the element is in the viewport
const checkInView = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

// Function to detect scroll direction
let lastScrollY = window.scrollY;

const detectScrollDirection = () => {
  const scrollY = window.scrollY;
  const isScrollingDown = scrollY > lastScrollY;
  lastScrollY = scrollY;
  return isScrollingDown;
};

// Intersection Observer setup
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log('Intersection Observer entry:', entry);
    if (entry.isIntersecting) {
      handleAnimationClasses(entry.target, 'add');
    } else {
      handleAnimationClasses(entry.target, 'remove');
    }
  });
}, { threshold: 0.4 }); // Adjust threshold as needed

// Function to force reflow (for ensuring animation triggers)
const forceReflow = () => document.body.offsetHeight; // Forces a reflow/repaint.

// Function to handle adding/removing animation classes
const handleAnimationClasses = (element, action) => {
  const animations = [
    'slide-from-down',
    'delay-slide-from-down',
    'slide-from-left',
    'delay-slide-from-left',
    'slide-from-right',
    'delay-slide-from-right',
    'slide-from-top',
    'delay-slide-from-top',
  ];

  animations.forEach((animation) => {
    if (element.classList.contains(animation)) {
      // Check if it's a delayed animation
      const isDelay = animation.startsWith('delay-');
      const baseAnimation = animation.replace('delay-', '');

      const startClass = `start-${baseAnimation}`;
      const delayStartClass = `start-delay-${baseAnimation}`;

      // Choose the correct class to add
      const classToAdd = isDelay ? delayStartClass : startClass;

      // Debugging for slide-from-right and delay-slide-from-right
      if (animation.includes("slide-from-right")) {
        console.log(`🔹 Checking element:`, element);
        console.log(`➡️ Detected animation: ${animation}`);
        console.log(`➡️ Expected class to add: ${classToAdd}`);
      }

      if (action === 'add' && !element.classList.contains(classToAdd)) {
        forceReflow();
        element.classList.add(classToAdd);
        console.log(`✅ Added class: ${classToAdd} to`, element);
      } else if (action === 'remove' && element.classList.contains(classToAdd)) {
        element.classList.remove(classToAdd);
        console.log(`❌ Removed class: ${classToAdd} from`, element);
      }
    }
  });
};



// Get all elements to observe
const observerElements = document.querySelectorAll(
  ".delay-slide-from-top, .slide-from-top, .slide-from-down, .delay-slide-from-down, .slide-from-left, .delay-slide-from-left, .slide-from-right, .delay-slide-from-right");

console.log(observerElements); // Log elements being observed

observerElements.forEach((el) => {
  console.log(`Observing element:`, el);

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
    console.log(isScrollingDown ? "Scrolling Down" : "Scrolling Up");
  }, 200); // Adjust debounce delay as necessary
};

window.addEventListener('scroll', debounceScroll);
