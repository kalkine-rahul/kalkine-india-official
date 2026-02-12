function loadPage(url) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      // Extract <main> content only
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newContent = doc.querySelector("main").innerHTML;

      document.getElementById("content").innerHTML = newContent;
      history.pushState(null, "", url);

      // update active link
      document.querySelectorAll(".navbar a").forEach(a => a.classList.remove("active"));
      document.querySelector(`.navbar a[href="${url}"]`)?.classList.add("active");
    })
    .catch(() => {
      document.getElementById("content").innerHTML = "<h2>Page not found</h2>";
    });
}

document.querySelectorAll("[data-link]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    loadPage(link.getAttribute("href"));
  });
});


window.addEventListener("popstate", () => {
  loadPage(location.pathname.replace("/", "") || "index.html");
});



        document.addEventListener('DOMContentLoaded', function () {
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200;

            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-count');
                    const count = +counter.innerText;

                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };

                // Intersection Observer to trigger animation when element is in view
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            updateCount();
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });

                observer.observe(counter);
            });

            // Add scroll animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, {
                threshold: 0.1
            });

            document.querySelectorAll('.section-title, .life-card').forEach(el => {
                observer.observe(el);
            });
        });

        // 3D Carousel functionality
        document.addEventListener('DOMContentLoaded', function () {
            const carousel = document.querySelector('.carousel-3d');
            const items = document.querySelectorAll('.carousel-3d-item');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const indicators = document.querySelectorAll('.carousel-3d-indicator');

            let currentIndex = 0;
            const totalItems = items.length;

            // Function to update carousel
            function updateCarousel() {
                items.forEach((item, index) => {
                    item.classList.remove('active', 'prev', 'next', 'hidden');

                    if (index === currentIndex) {
                        item.classList.add('active');
                    } else if (index === (currentIndex - 1 + totalItems) % totalItems) {
                        item.classList.add('prev');
                    } else if (index === (currentIndex + 1) % totalItems) {
                        item.classList.add('next');
                    } else {
                        item.classList.add('hidden');
                    }
                });


                indicators.forEach((indicator, index) => {
                    if (index === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }

            function nextSlide() {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
            }

            function prevSlide() {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                updateCarousel();
            }

            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);

            indicators.forEach(indicator => {
                indicator.addEventListener('click', function () {
                    currentIndex = parseInt(this.getAttribute('data-index'));
                    updateCarousel();
                });
            });

            let autoSlide = setInterval(nextSlide, 3000);

            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoSlide);
            });

            carousel.addEventListener('mouseleave', () => {
                autoSlide = setInterval(nextSlide, 3000);
            });
            updateCarousel();
            // Previous stats counter and animation code remains the same
        });
    