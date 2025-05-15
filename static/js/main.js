
// main.js - Combined functionality for page transitions and sidebar
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the index page
    const isIndexPage = window.location.pathname === '/' ||
                        window.location.pathname === '/index' ||
                        window.location.pathname === '/index.html';

    // Get the sidebar element - could be either the direct .sidebar or the .main-nav depending on page
    const sidebar = document.querySelector('.sidebar') || document.querySelector('.main-nav');

    // Function to set active navigation link based on current URL
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.main-nav a');

        navLinks.forEach(link => {
            // Remove active class from all links
            link.classList.remove('active');

            // Check if this link's href matches the current path
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath ||
                (currentPath === '/' && linkPath === '/') ||
                (currentPath.includes(linkPath) && linkPath !== '/')) {
                link.classList.add('active');
            }
        });
    }

    // Function to handle page transitions
    function handlePageTransition() {
        // Add page transition class to trigger animation
        document.body.classList.add('page-transition');

        // Set the active nav link based on current URL
        setActiveNavLink();

        // Handle sidebar transitions
        if (sidebar) {
            if (isIndexPage) {
                // On index page, open the sidebar with transition
                setTimeout(() => {
                    sidebar.classList.add('sidebar-open');
                }, 100); // Small delay to ensure transition works
            } else {
                // On other pages, start with sidebar closed
                sidebar.classList.add('sidebar-closed');

                // After a short delay, open it with transition
                setTimeout(() => {
                    sidebar.classList.remove('sidebar-closed');
                    sidebar.classList.add('sidebar-open');
                }, 300);
            }
        }
    }

    // Add click event listeners to all nav links for smooth transitions
    const navLinks = document.querySelectorAll('.main-nav a:not(.contact-btn)');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('/') && !this.classList.contains('active')) {
                e.preventDefault();
                const targetUrl = this.getAttribute('href');

                // Fade out body
                document.body.classList.remove('page-transition');
                document.body.classList.add('page-exit');

                // Close sidebar with transition
                if (sidebar) {
                    sidebar.classList.remove('sidebar-open');
                    sidebar.classList.add('sidebar-closing');
                }

                // Navigate after transition
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500); // Match this to your CSS transition duration
            }
        });
    });

    // Call page transition on initial load
    handlePageTransition();

    // Handle back/forward navigation
    window.addEventListener('popstate', function() {
        handlePageTransition();
    });
});

//skills page javascript
    document.addEventListener('DOMContentLoaded', function() {
        // Animate skill bars with a slight delay
        setTimeout(function() {
            // First animate the categories
            const categories = document.querySelectorAll('.skills-category');
            categories.forEach((category, index) => {
                setTimeout(() => {
                    category.classList.add('visible');
                }, index * 300); // Stagger the category animations
            });

            // Then animate the skill levels with a delay
            setTimeout(() => {
                const skillLevels = document.querySelectorAll('.skill-level');
                skillLevels.forEach((level, index) => {
                    setTimeout(() => {
                        const skillPercentage = level.getAttribute('data-level') + '%';
                        level.classList.add('animate');
                        level.style.width = skillPercentage;
                    }, index * 75); // Stagger each skill bar animation
                });
            }, 200); // Start skill animations after categories begin to show
        }, 5); // Initial delay
    });
////////////////////////////////////////////INDEX PAGE JAVASCRIPT FOR TRANSITION//////////////////////////////////////
window.addEventListener('load', function() {
    // Hide preloader after content is loaded
    setTimeout(function() {
        document.querySelector('.preloader').classList.add('fade-out');
    }, 500);

    // Activate all fade-in elements
    setTimeout(function() {
        document.querySelectorAll('.fade-in').forEach(function(element) {
            element.classList.add('active');
        });
    }, 600);

    // Typewriter effect for name
    setTimeout(function() {
        const nameElement = document.getElementById('name-text');
        const cursorElement = document.getElementById('typing-cursor');
        const fullName = 'Aditya Murali';
        let i = 0;

        // Make the cursor visible when animation starts
        cursorElement.style.display = 'inline-block';

        // Important: Pre-allocate space by setting invisible text first
        nameElement.innerHTML = '<span style="visibility: hidden;">' + fullName + '</span>';
        nameElement.textContent = '';

        function typeWriter() {
            if (i < fullName.length) {
                nameElement.textContent += fullName.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Once typing is complete, hide cursor
                cursorElement.style.display = 'none';

                // Add the line animation class AFTER the name is fully typed
                nameElement.classList.add('name-typed');
            }
        }

        typeWriter();
    }, 800);

    // Animate number counters
    setTimeout(function() {
        document.querySelectorAll('.stat-number').forEach(function(counter) {
            counter.classList.add('animated');
            const target = parseInt(counter.getAttribute('data-value'));
            let count = 0;
            const duration = 2000; // 2 seconds
            const interval = duration / target;

            const timer = setInterval(function() {
                count++;
                counter.textContent = count + '+';

                if (count >= target) {
                    clearInterval(timer);
                }
            }, interval);
        });
    }, 1800);
});

// Intersection Observer for revealing elements when scrolled into view
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
});
////////////////////////////////////////////SKILLS PAGE JAVASCRIPT FOR TRANSITION//////////////////////////////////////
        document.addEventListener('DOMContentLoaded', function() {
            // Animate skill categories on scroll
            const categories = document.querySelectorAll('.skills-category');

            // Add visible class to the first category immediately
            if (categories.length > 0) {
                setTimeout(() => {
                    categories[0].classList.add('visible');
                }, 500); // Delay to let heading animation complete first
            }

            // Add visible class to other categories with a delay
            for (let i = 1; i < categories.length; i++) {
                setTimeout(() => {
                    categories[i].classList.add('visible');
                }, 500 + (300 * i)); // Start after heading animation
            }

            // Additional scroll effect for categories that aren't initially visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            categories.forEach(category => {
                if (!category.classList.contains('visible')) {
                    observer.observe(category);
                }
            });

            // Animate skill bars after categories are visible
            setTimeout(() => {
                const skillLevels = document.querySelectorAll('.skill-level');
                skillLevels.forEach((level, index) => {
                    setTimeout(() => {
                        const percentage = level.getAttribute('data-level') + '%';
                        level.style.width = percentage;
                    }, index * 75); // Stagger each skill bar animation
                });
            }, 800);
        });
////////////////////////////////////////////CONTACT PAGE JAVASCRIPT FOR SMTP//////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Hide success message initially
    if (successMessage) {
        successMessage.style.display = 'none';
    }

    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        try {
            const response = await fetch('/send_message', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.status === 'success') {
                // Show success message instead of alert
                successMessage.style.display = 'flex';
                successMessage.classList.add('show-success');

                // Clear form
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.classList.remove('show-success');
                    setTimeout(function() {
                        successMessage.style.display = 'none';
                    }, 500);
                }, 5000);
            } else {
                // Handle error case - you could display an error message
                // in a similar way to the success message but with different styling
                console.error('Error sending message:', result.message);
            }
        } catch (error) {
            // Handle fetch error
            console.error('An error occurred:', error.message);
        }
    });
});
////////////////////////////////////////////CONTACT PAGE JAVASCRIPT FOR CLEARING INPUT FIELDS//////////////////////////////////////
        document.addEventListener('DOMContentLoaded', function() {
            const contactForm = document.getElementById('contactForm');
            const successMessage = document.getElementById('successMessage');

            // Hide success message initially
            successMessage.style.display = 'none';

            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();

                // Here you would typically add your form submission logic
                // For example, using fetch to send form data to your server

                // For demonstration, we'll just show the success message and clear the form

                // Show success message with animation
                successMessage.style.display = 'flex';
                successMessage.classList.add('show-success');

                // Clear all form inputs
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.classList.remove('show-success');
                    setTimeout(function() {
                        successMessage.style.display = 'none';
                    }, 500); // Wait for fade-out animation to complete
                }, 5000);
            });
        });




        ////////////////////////////////////////////INDEX PAGE NEW JAVASCRIPT//////////////////////////////////////
        // JavaScript to handle the active link state
        document.addEventListener('DOMContentLoaded', function() {
            const currentLocation = location.pathname;
            const navLinks = document.querySelectorAll('.main-nav a');

            navLinks.forEach(link => {
                const linkPath = link.getAttribute('href');
                if (linkPath === currentLocation) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        });
