// Function to open a specific modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Function to close a specific modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Functions for Image Gallery Modal
var imageModal = document.getElementById("image-modal");
var modalImg = document.getElementById("modal-img");

function openImageModal(src) {
    imageModal.style.display = "block";
    modalImg.src = src;
}

function closeImageModal() {
    imageModal.style.display = "none";
}

// Close modal if user clicks outside of the modal content
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}
document.addEventListener('click', e => {
    let handle
    if (e.target.matches('.carousel-button')) {
        handle = e.target
    } else {
        handle = e.target.closest('.carousel-button')
    }
    if (handle != null) {
        onHandleClick(handle)
    }
})

function onHandleClick(handle) {
    const carousel = handle.closest('.carousel')
    const track = carousel.querySelector('.carousel-track')
    const slides = Array.from(track.children)
    const currentSlide = track.querySelector('.current-slide')
    const currentIndex = slides.indexOf(currentSlide)

    const nextBtn = carousel.querySelector('.carousel-button--right')
    const prevBtn = carousel.querySelector('.carousel-button--left')
    
    let nextIndex

    if (handle === prevBtn) {
        nextIndex = currentIndex - 1
        if (nextIndex < 0) {
            nextIndex = slides.length - 1 // Loop back to the end
        }
    }

    if (handle === nextBtn) {
        nextIndex = currentIndex + 1
        if (nextIndex >= slides.length) {
            nextIndex = 0 // Loop back to the start
        }
    }
    
    // Move to the next slide
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = 'translateX(-' + slideWidth * nextIndex + 'px)'
    
    // Update classes
    currentSlide.classList.remove('current-slide')
    slides[nextIndex].classList.add('current-slide')

    // Update nav dots
    const nav = carousel.querySelector('.carousel-nav')
    const currentDot = nav.querySelector('.current-slide')
    const nextDot = nav.children[nextIndex]
    currentDot.classList.remove('current-slide')
    nextDot.classList.add('current-slide')
}


// Logic for Carousel Nav Dots
document.addEventListener('click', e => {
    if (!e.target.matches('.carousel-indicator')) return

    const dot = e.target
    const carousel = dot.closest('.carousel')
    const track = carousel.querySelector('.carousel-track')
    const slides = Array.from(track.children)
    const currentSlide = track.querySelector('.current-slide')
    const currentDot = carousel.querySelector('.carousel-indicator.current-slide')
    const dots = Array.from(carousel.querySelectorAll('.carousel-indicator'))
    const targetIndex = dots.findIndex(d => d === dot)

    // Move to the target slide
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)'

    // Update classes
    currentSlide.classList.remove('current-slide')
    slides[targetIndex].classList.add('current-slide')

    currentDot.classList.remove('current-slide')
    dot.classList.add('current-slide')
})