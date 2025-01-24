const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && window.innerWidth < 1258) {
      entry.target.classList.add("viewport-animation-start");
    }
  });
});

// Function to check if the element is already in the viewport
const checkInView = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
};

// Get all elements to observe
const observerElements = document.querySelectorAll(".viewport-animation");

observerElements.forEach((el) => {
  // Apply the animation if the screen width is less than 1258px
  if (checkInView(el) && window.innerWidth < 1258) {
    el.classList.add("viewport-animation-start");
  }
  // Observe the element for future animations only for screens less than 1258px
  if (window.innerWidth < 1258) {
    observer.observe(el);
  }
});
