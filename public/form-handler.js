// Form submission handlers and UI interactions for Ripay Creations website

document.addEventListener('DOMContentLoaded', function() {
    // --- UI Interaction Code (from original inline script) ---

    // Smooth Scroll for Nav Links
    document.querySelectorAll('nav a[href^="#"], a.smooth-scroll[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetID = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetID);
            if (targetSection) {
                const headerOffset = 80; // height of fixed header + some padding
                const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth Scroll for Logo and Home Link
    const logoLink = document.getElementById('logoLink');
    const homeLink = document.getElementById('homeLink');
    if (logoLink) {
        logoLink.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }
    if (homeLink) {
        homeLink.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    // Project Filter Functionality
    const filterButtons = document.querySelectorAll('#projectFilter button');
    const projectItems = document.querySelectorAll('.project-item');
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                // Update button styles
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-orange-500', 'text-white', 'active');
                    btn.classList.add('bg-gray-200', 'text-gray-700');
                    btn.style.cursor = 'pointer';
                });
                button.classList.add('bg-orange-500', 'text-white', 'active');
                button.classList.remove('bg-gray-200', 'text-gray-700');
                button.style.cursor = 'default'; // Keep default cursor for active

                // Show/hide projects
                projectItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
        // Set initial active state for the 'All Projects' button
        const initialActiveButton = document.querySelector('#projectFilter button[data-filter="all"]');
        if (initialActiveButton) {
            initialActiveButton.classList.add('active');
            initialActiveButton.style.cursor = 'default';
        }
    }

    // Modal Functionality
    const openModalBtn = document.getElementById('openModal');
    const openModalHeaderBtn = document.getElementById('openModalHeader');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('closeModal');

    function openModalAction() {
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }
    }

    function closeModalAction() {
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scroll
        }
    }

    if (openModalBtn) openModalBtn.addEventListener('click', openModalAction);
    if (openModalHeaderBtn) openModalHeaderBtn.addEventListener('click', openModalAction);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModalAction);

    // Close modal if clicking outside the content area
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalAction();
            }
        });
    }

    // Get Started buttons in Packages section
    const getStartedButtons = document.querySelectorAll('#packages-section button');
    if (getStartedButtons.length > 0) {
        getStartedButtons.forEach(button => {
            button.addEventListener('click', openModalAction);
        });
    }

    // Image Carousel Functionality (Hero Section)
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dots');

    if (carousel && prevBtn && nextBtn && dotsContainer) {
        const images = carousel.querySelectorAll('img');
        const dots = dotsContainer.querySelectorAll('span');
        let currentIndex = 0;
        const totalImages = images.length;

        function updateCarousel() {
            const scrollAmount = images[currentIndex].offsetLeft - carousel.offsetLeft;
            carousel.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            updateDots();
        }

        function updateDots() {
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.remove('bg-gray-300');
                    dot.classList.add('bg-gray-400');
                } else {
                    dot.classList.remove('bg-gray-400');
                    dot.classList.add('bg-gray-300');
                }
            });
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.getAttribute('data-index'));
                updateCarousel();
            });
        });

        // Initialize
        updateDots();
    }


    // --- Form Submission Code (Existing) ---

    // Get form elements
    const consultationForm = document.getElementById('consultationForm');
    const contactForm = document.getElementById('contactForm');

    // Helper function to display status message
    function displayStatus(formElement, message, isError) {
        let statusElement = formElement.querySelector('.form-status');
        if (!statusElement) {
            statusElement = document.createElement('div');
            statusElement.classList.add('form-status', 'mt-4', 'font-bold');
            formElement.appendChild(statusElement);
        }
        statusElement.textContent = message;
        statusElement.style.color = isError ? 'red' : 'green';
    }

    // Modal form submission handler
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous status message
            displayStatus(consultationForm, '', false);

            // Get form data
            const nameInput = document.getElementById('modalName');
            const phoneInput = document.getElementById('modalPhone');
            const requirementsInput = document.getElementById('modalRequirements');

            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const requirements = requirementsInput ? requirementsInput.value.trim() : '';

            // Basic validation
            if (!name || !phone || !requirements) {
                displayStatus(consultationForm, 'Please fill in all required fields.', true);
                return;
            }

            // Validate Phone: 10-digit numerical value
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                displayStatus(consultationForm, 'Please enter a valid mobile number.', true);
                return;
            }

            // Create data object
            const formData = {
                name: name,
                mobile: phone, // Using 'mobile' key for phone number as in existing code
                requirements: requirements
            };

            // Submit to API
            fetch('https://beyqxywnsdkejvrahfwj.supabase.co/functions/v1/store-user-requirements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                console.log('Consultation form fetch response status:', response.status);
                if (!response.ok) {
                    // If not OK, try to read the response body for more info
                    return response.text().then(text => {
                        throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
                    });
                }
                // Try to parse JSON, but handle potential errors
                return response.json().catch(() => {
                    // If JSON parsing fails, return an empty object or a specific indicator
                    console.warn('Consultation form: Failed to parse response as JSON. Response status:', response.status);
                    return {}; // Return empty object if JSON parsing fails
                });
            })
            .then(data => {
                console.log('Consultation form fetch response data:', data);
                if (data && data.error) {
                    displayStatus(consultationForm, 'There was an error submitting your request. Please try again. Error: ' + data.error, true);
                } else {
                    // Assuming success if no error field in data and status was OK
                    displayStatus(consultationForm, 'Thank you for your consultation request! We will get in touch with you soon.', false);
                    consultationForm.reset();
                    // Close modal after a short delay to allow user to read the success message
                    setTimeout(closeModalAction, 2000); // Close after 2 seconds
                }
            })
            .catch(error => {
                console.error('Error submitting consultation form:', error);
                let errorMessage = 'There was an unexpected error submitting your request. Please try again.';
                if (error.message.startsWith('HTTP error!')) {
                     errorMessage = 'There was an error submitting your request: ' + error.message;
                } else if (error.message === 'Failed to fetch') {
                    errorMessage = 'There was a network error submitting your request. Please check your internet connection and try again.';
                }
                displayStatus(consultationForm, errorMessage, true);
            });
        });
    }

    // Contact form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous status message
            displayStatus(contactForm, '', false);

            // Get form data
            const nameInput = document.getElementById('contactName');
            const phoneInput = document.getElementById('contactPhone');
            const requirementsInput = document.getElementById('contactRequirements');

            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const requirements = requirementsInput ? requirementsInput.value.trim() : '';

             // Basic validation
             if (!name || !phone || !requirements) {
                displayStatus(contactForm, 'Please fill in all required fields.', true);
                return;
            }

            // Validate Phone: 10-digit numerical value
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                displayStatus(contactForm, 'Please enter a valid mobile number.', true);
                return;
            }

            // Create data object
            const formData = {
                name: name,
                mobile: phone, // Using 'mobile' key for phone number as in existing code
                requirements: requirements
            };

            // Submit to API
            fetch('https://beyqxywnsdkejvrahfwj.supabase.co/functions/v1/store-user-requirements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                 console.log('Contact form fetch response status:', response.status);
                 if (!response.ok) {
                    // If not OK, try to read the response body for more info
                    return response.text().then(text => {
                        throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
                    });
                }
                // Try to parse JSON, but handle potential errors
                return response.json().catch(() => {
                    // If JSON parsing fails, return an empty object or a specific indicator
                    console.warn('Contact form: Failed to parse response as JSON. Response status:', response.status);
                    return {}; // Return empty object if JSON parsing fails
                });
            })
            .then(data => {
                 console.log('Contact form fetch response data:', data);
                // Handle the parsed JSON data
                if (data && data.error) {
                    // If the response body contains an error field
                    displayStatus(contactForm, 'There was an error submitting your request. Please try again. Error: ' + data.error, true);
                } else {
                    // Assuming success if no error field in data and status was OK
                    displayStatus(contactForm, 'Thank you for your request! We will get in touch with you soon.', false);
                    contactForm.reset();
                }
            })
            .catch(error => {
                // Handle network errors or errors thrown in the .then blocks
                console.error('Fetch error:', error);
                let errorMessage = 'There was an unexpected error submitting your request. Please try again.';
                 if (error.message.startsWith('HTTP error!')) {
                     errorMessage = 'There was an error submitting your request: ' + error.message;
                } else if (error.message === 'Failed to fetch') {
                    errorMessage = 'There was a network error submitting your request. Please check your internet connection and try again.';
                }
                displayStatus(contactForm, errorMessage, true);
            });
        });
    }

    // --- WhatsApp Direct Link Handlers (Existing) ---
    const whatsappModal = document.getElementById('whatsappModal');
    if (whatsappModal) {
        whatsappModal.addEventListener('click', function(e) {
            e.preventDefault();
            const name = document.getElementById('modalName')?.value.trim() || '';
            const phone = document.getElementById('modalPhone')?.value.trim() || '';
            const requirements = document.getElementById('modalRequirements')?.value.trim() || '';

            let message = 'Hello, I would like to get a free consultation.';
            if (name) message += `%0AName: ${encodeURIComponent(name)}`;
            if (phone) message += `%0APhone: ${encodeURIComponent(phone)}`;
            if (requirements) message += `%0ARequirements: ${encodeURIComponent(requirements)}`;

            const whatsappURL = `https://wa.me/919304121225?text=${message}`;
            window.open(whatsappURL, '_blank');
        });
    }

    const whatsappContact = document.getElementById('whatsappContact');
    if (whatsappContact) {
        whatsappContact.addEventListener('click', function(e) {
            e.preventDefault();
            const name = document.getElementById('contactName')?.value.trim() || '';
            const phone = document.getElementById('contactPhone')?.value.trim() || '';
            const requirements = document.getElementById('contactRequirements')?.value.trim() || '';

            let message = 'Hello, I would like to get a free consultation.';
            if (name) message += `%0AName: ${encodeURIComponent(name)}`;
            if (phone) message += `%0APhone: ${encodeURIComponent(phone)}`;
            if (requirements) message += `%0ARequirements: ${encodeURIComponent(requirements)}`;

            const whatsappURL = `https://wa.me/919304121225?text=${message}`;
            window.open(whatsappURL, '_blank');
        });
    }
});
