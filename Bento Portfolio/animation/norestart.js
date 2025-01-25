const createScrollAnimationObserver = () => {
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let scrollDirection = 'down';

  const animationClasses = {
    'slide-in-down': 'start-slide-in-down',
    'delay-slide-in-down': 'delay-start-slide-in-down',
    'slide-in-left': 'start-slide-in-left',
    'delay-slide-in-left': 'delay-start-slide-in-left',
    'slide-in-right': 'start-slide-in-right',
    'delay-slide-in-right': 'delay-start-slide-in-right',
    'slide-in-top': 'start-slide-in-top',
    'delay-slide-in-top': 'delay-start-slide-in-top'
  };

  const addAnimationClass = (el, triggerClass, animationClass) => {
    if (el.classList.contains(triggerClass) && !el.classList.contains(animationClass)) {
      el.classList.add(animationClass);
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;

      if (entry.isIntersecting) {
        Object.entries(animationClasses).forEach(([triggerClass, animationClass]) => {
          addAnimationClass(el, triggerClass, animationClass);
        });
      }
    });
  }, {
    threshold: 0.1
  });

  // Track scroll direction
  window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
    lastScrollTop = currentScrollTop;
  });

  // Initialize observation
  const observerElements = document.querySelectorAll(
    ".delay-slide-in-top, .slide-in-top, .slide-in-down, .delay-slide-in-down, " +
    ".slide-in-left, .delay-slide-in-left, .slide-in-right, .delay-slide-in-right"
  );

  observerElements.forEach((el) => {
    // Immediate animation for elements already in view
    if (isElementInView(el)) {
      Object.entries(animationClasses).forEach(([triggerClass, animationClass]) => {
        addAnimationClass(el, triggerClass, animationClass);
      });
    }

    observer.observe(el);
  });

  return observer;
};

// Utility to check if element is in viewport
const isElementInView = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom > 0
  );
};

// Initialize the observer
const scrollAnimationObserver = createScrollAnimationObserver();