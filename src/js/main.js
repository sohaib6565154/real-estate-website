// sidebar logic
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sideNavbar");
const cross = document.getElementById("cross");

hamburger.addEventListener("click", () => {
  sidebar.style.display = "block";
  hamburger.style.visibility = "hidden";
  cross.style.display = "block";
});

cross.addEventListener("click", () => {
  sidebar.style.display = "none";
  hamburger.style.visibility = "visible";
  cross.style.display = "none";
});

// li logic
const dropdownButton = document.querySelectorAll(".homeDropdownBtn");
const arrow = document.querySelector(".homeArrow");
const dropdown = document.getElementById("homeDropdown");

const toggleDropdown = function () {
  arrow.classList.toggle("rotate-180");
  dropdown.classList.toggle("hidden");
};

dropdownButton.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleDropdown();
  });
});

// Hide dropdown when clicking outside
document.addEventListener("click", function (e) {
  const isClickInside = dropdown.contains(e.target);
  if (!isClickInside) {
    dropdown.classList.add("hidden");
    arrow.classList.remove("rotate-180");
  }
});

// slider
$(".owl-carousel").owlCarousel({
  loop: true,
  stagePadding: 15,
  margin: 15,
  nav: true,
  autoplay: true,
  autoplayTimeout: 4000,
  // autoplayHoverPause: true,
  navText: [
    '<span class="uk-margin-small-right uk-icon" uk-icon="icon: chevron-left"></span>',
    '<span class="uk-margin-small-left uk-icon" uk-icon="icon: chevron-right"></span>',
  ],
  // navText: [
  //   '<svg xmlns="http://www.w3.org/2000/svg" class="uk-margin-small-right" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>',
  //   '<svg xmlns="http://www.w3.org/2000/svg" class="uk-margin-small-left" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',
  // ],
  responsive: {
    320: {
      items: 1,
    },
    640: {
      items: 2,
    },
    1024: {
      items: 3,
    },
    1536: {
      items: 4,
    },
  },
});

// second slider
jQuery(document).ready(function ($) {
  $(".simple-slider-wrapper").each(function () {
    const this_slider = $(this);

    const slides = this_slider.find("ul li");
    const control_prev = this_slider.find(".control_prev");
    const control_next = this_slider.find(".control_next");
    // Initialize dot indicators
    let currentSlideIndex = 0;
    const dotIndicators = this_slider.find(".dot-indicators");
    const dots = dotIndicators.find(".dot");

    dots.eq(0).addClass("active");

    function slider_init() {
      if (slides.length > 1) {
        control_prev.css("display", "block");
        control_next.css("display", "block");
      }
    }
    slider_init();

    // Update dot indicators on slide change
    function updateDotIndicators() {
      dots.removeClass("active");
      dots.eq(currentSlideIndex).addClass("active");
    }

    function moveRight() {
      this_slider.find("ul li:last-child").prependTo(this_slider.find("ul"));
      slides.css("left", "-100%");
      slides.stop().animate({ left: 0 }, 500);
    }

    function moveLeft() {
      const arr = [slides.stop().animate({ left: "-100%" }, 500).promise()];
      $.when.apply($, arr).then(function () {
        this_slider.find("ul li:first-child").appendTo(this_slider.find("ul"));
        slides.css("left", 0);
      });
    }

    control_prev.on("click", function () {
      if (slides.length > 1) {
        moveRight();
        currentSlideIndex =
          (currentSlideIndex + slides.length - 1) % slides.length;
        updateDotIndicators();
        clearInterval(this_slider.autoplay);
        setAutoplay();
      }
    });

    control_next.on("click", function () {
      if (slides.length > 1) {
        moveLeft();
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateDotIndicators();
        clearInterval(this_slider.autoplay);
        setAutoplay();
      }
    });

    // Autoplay
    function setAutoplay() {
      let autoplay;
      let isPaused = false;

      function startAutoplay(interval) {
        clearInterval(autoplay);
        autoplay = setInterval(() => {
          if (slides.length > 1) {
            moveLeft();
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateDotIndicators();
          }
        }, interval);
      }

      startAutoplay(4000); // 3s timer

      this_slider.on("mouseenter", () => {
        clearInterval(autoplay);
        isPaused = true;
      });

      this_slider.on("mouseleave", () => {
        if (isPaused) {
          isPaused = false;
          startAutoplay(4000);
        }
      });
    }
    // initialize autoplay
    setAutoplay();
  });
});

// scroll to the top
const scrollToTop = document.getElementById("arrowScroll");

window.onscroll = () => {
  if (window.scrollY > 500) {
    arrowScroll.style.opacity = "1";
  } else {
    arrowScroll.style.opacity = "0";
  }
};

scrollToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// accordian logic
// JavaScript to toggle the answers and rotate the arrows
document.querySelectorAll('[id^="question"]').forEach(function (button, index) {
  button.addEventListener("click", function () {
    let answer = document.getElementById("answer" + (index + 1));
    let arrow = document.getElementById("arrow" + (index + 1));

    if (answer.style.display === "none" || answer.style.display === "") {
      answer.style.display = "block";
      arrow.style.transform = "rotate(0deg)";
    } else {
      answer.style.display = "none";
      arrow.style.transform = "rotate(-180deg)";
    }
  });
});
