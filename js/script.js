        // Header Scroll
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }

            // Back to Top Button
            const backToTop = document.querySelector('.back-to-top');
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        // Mobile Menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Hero Slider
        const slides = document.querySelectorAll('.slide');
        const slideControls = document.querySelectorAll('.slide-control');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slideControls.forEach(control => control.classList.remove('active'));

            slides[index].classList.add('active');
            slideControls[index].classList.add('active');
            currentSlide = index;
        }

        slideControls.forEach((control, index) => {
            control.addEventListener('click', () => {
                showSlide(index);
            });
        });

        // Auto slide change
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);

        // Project Filters
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(btn => btn.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Gallery Slider
        const galleryTrack = document.querySelector('.gallery-track');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const galleryPrev = document.querySelector('.gallery-prev');
        const galleryNext = document.querySelector('.gallery-next');

        let galleryIndex = 0;
        const itemWidth = 33.333; // Percentage width of each item

        function slideGallery() {
            galleryTrack.style.transform = `translateX(-${galleryIndex * itemWidth}%)`;
        }

        galleryNext.addEventListener('click', () => {
            if (galleryIndex < galleryItems.length - 3) {
                galleryIndex++;
                slideGallery();
            }
        });

        galleryPrev.addEventListener('click', () => {
            if (galleryIndex > 0) {
                galleryIndex--;
                slideGallery();
            }
        });

        // For mobile, adjust item width and slides
        function updateGalleryLayout() {
            if (window.innerWidth <= 768) {
                galleryItems.forEach(item => {
                    item.style.flex = '0 0 100%';
                    item.style.minWidth = '100%';
                });

                if (galleryIndex > galleryItems.length - 1) {
                    galleryIndex = galleryItems.length - 1;
                    slideGallery();
                }
            } else if (window.innerWidth <= 992) {
                galleryItems.forEach(item => {
                    item.style.flex = '0 0 50%';
                    item.style.minWidth = '50%';
                });

                if (galleryIndex > galleryItems.length - 2) {
                    galleryIndex = galleryItems.length - 2;
                    slideGallery();
                }
            } else {
                galleryItems.forEach(item => {
                    item.style.flex = '0 0 33.333%';
                    item.style.minWidth = '33.333%';
                });

                if (galleryIndex > galleryItems.length - 3) {
                    galleryIndex = galleryIndex > 0 ? galleryItems.length - 3 : 0; // Ensure index is not negative if less than 3 items
                    slideGallery();
                }
            }
        }

        window.addEventListener('resize', updateGalleryLayout);
        updateGalleryLayout();


        // Testimonial Slider
        const testimonialTrack = document.querySelector('.testimonial-track');
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');

        let testimonialIndex = 0;

        function showTestimonial(index) {
            testimonialTrack.style.transform = `translateX(-${index * 100}%)`;

            testimonialDots.forEach(dot => dot.classList.remove('active'));
            testimonialDots[index].classList.add('active');

            testimonialIndex = index;
        }

        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });

        // Auto testimonial change
        setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % testimonialItems.length;
            showTestimonial(testimonialIndex);
        }, 6000);

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for fixed header
                        behavior: 'smooth'
                    });
                }
            });
        });

// JavaScript for Modals
        document.addEventListener('DOMContentLoaded', function() {
            const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
            const closeButtons = document.querySelectorAll('.modal .close-button');
            const modals = document.querySelectorAll('.modal');

            // Open modal when Learn More button is clicked
            learnMoreBtns.forEach(button => {
                button.addEventListener('click', function() {
                    const targetModalId = this.getAttribute('data-target');
                    const modal = document.querySelector(targetModalId);
                    if (modal) {
                        modal.style.display = 'block';
                        document.body.style.overflow = 'hidden'; // Prevent scrolling the background
                    }
                });
            });

            // Close modal when close button is clicked
            closeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const modal = this.closest('.modal');
                    if (modal) {
                        modal.style.display = 'none';
                        document.body.style.overflow = ''; // Restore scrolling
                    }
                });
            });

            // Close modal when clicking outside the modal content
            modals.forEach(modal => {
                modal.addEventListener('click', function(event) {
                    if (event.target === modal) {
                        modal.style.display = 'none';
                        document.body.style.overflow = ''; // Restore scrolling
                    }
                });
            });

            // Close modal when pressing the Escape key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    modals.forEach(modal => {
                        if (modal.style.display === 'block') {
                            modal.style.display = 'none';
                            document.body.style.overflow = ''; // Restore scrolling
                        }
                    });
                }
            });
        });

        function showServiceDetails(sectionId) {
            // Hide all service details sections
            document.querySelectorAll('.service-details').forEach(section => {
                section.classList.remove('active');
            });
            // Show the selected section
            document.getElementById(sectionId).classList.add('active');
            // Scroll to the section
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        }

 // Project Modal
 const projectData = {
    1: {
        title: "Urban Infrastructure Development",
        desc: "Commercial district revitalization with modern utilities and sustainable design.",
        client: "CityCorp Development",
        location: "Kolkata, West Bengal",
        completion: "December 2023",
        services: "Urban Planning, Sustainable Design",
        gallery: [
            "/api/placeholder/600/400",
            "/api/placeholder/600/400",
            "/api/placeholder/600/400"
        ]
    },
    2: {
        title: "Luxury Residential Complex",
        desc: "Multi-building residential development with integrated amenities.",
        client: "Elite Builders",
        location: "Mumbai, Maharashtra",
        completion: "June 2022",
        services: "Architectural Design, Interior Design",
        gallery: [
            "/api/placeholder/600/400",
            "/api/placeholder/600/400",
            "/api/placeholder/600/400"
        ]
    },
    3: {
        title: "Highway Bridge Construction",
        desc: "Modern structural design with enhanced durability and traffic capacity.",
        client: "State Infrastructure Board",
        location: "Delhi",
        completion: "March 2024",
        services: "Project Management, Sustainable Design",
        gallery: [
            "/assets/images/highway Infrastructure.jpg",
            "/api/placeholder/600/400",
            "/api/placeholder/600/400"
        ],
        autocadPreview: "./assets/images/urban-infra-plan.jpg",
        downloadPdf: "./downloads/urban-infrastructure-plans.pdf"
    },
    4: {
        title: "Commercial Office Complex",
        desc: "Sustainable design with LEED certification and energy-efficient systems.",
        client: "GreenTech Solutions",
        location: "Bangalore, Karnataka",
        completion: "September 2023",
        services: "Architectural Design, Sustainable Design",
        gallery: [
            "/api/placeholder/600/400",
            "/api/placeholder/600/400",
            "/api/placeholder/600/400"
        ]
    },
    5: {
        title: "Municipal Water Treatment Facility",
        desc: "Advanced filtration systems and environmental compliance.",
        client: "Municipal Corporation",
        location: "Chennai, Tamil Nadu",
        completion: "January 2023",
        services: "Urban Planning, Project Management",
        gallery: [
            "/api/placeholder/600/400",
            "/api/placeholder/600/400",
            "/api/placeholder/600/400"
        ]
    },
    6: {
        title: "Public Park Development",
        desc: "Community space with integrated drainage and sustainable landscaping.",
        client: "Parks & Recreation Dept.",
        location: "Hyderabad, Telangana",
        completion: "April 2024",
        services: "Urban Planning, Sustainable Design",
        gallery: [
            "/api/placeholder/600/400",
            "/api/placeholder/600/400",
            "/api/placeholder/600/400"
        ]
    }
};

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modal-project-title');
const modalDesc = document.getElementById('modal-project-desc');
const modalClient = document.getElementById('modal-client');
const modalLocation = document.getElementById('modal-location');
const modalCompletion = document.getElementById('modal-completion');
const modalServices = document.getElementById('modal-services');
const projectGallery = document.querySelector('.project-gallery');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-id');
        const project = projectData[projectId];

        modalTitle.textContent = project.title;
        modalDesc.textContent = project.desc;
        modalClient.textContent = project.client;
        modalLocation.textContent = project.location;
        modalCompletion.textContent = project.completion;
        modalServices.textContent = project.services;

        projectGallery.innerHTML = '';
        project.gallery.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = project.title;
            projectGallery.appendChild(img);
        });

        modal.style.display = 'block';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
