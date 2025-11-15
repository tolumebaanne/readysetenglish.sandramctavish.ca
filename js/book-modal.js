/*!
 * Book Preview Modal Script
 * Author: Toluwalase Mebaanne
 * For: The Cricket War - Sandra McTavish
 */

(function() {
    'use strict';
    
    const TOTAL_PAGES = 12;
    const IMAGE_PATH = '/img/_book_prev/_theCricketWar_pg_';
    
    let currentPage = 0;
    let modal = null;
    let pageImg = null;
    let prevBtn = null;
    let nextBtn = null;
    let counter = null;
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        createModal();
        attachEventListeners();
    });
    
    // Create modal HTML structure
    function createModal() {
        const modalHTML = `
            <div class="book-modal-overlay" id="bookModalOverlay">
                <div class="book-modal-container">
                    <button class="book-modal-close" id="bookModalClose" aria-label="Close preview">
                        ×
                    </button>
                    <div class="book-modal-viewer">
                        <button class="book-modal-nav prev" id="bookModalPrev" aria-label="Previous page">
                            ‹
                        </button>
                        <img src="" alt="Book page" class="book-modal-page" id="bookModalPage">
                        <button class="book-modal-nav next" id="bookModalNext" aria-label="Next page">
                            ›
                        </button>
                        <div class="book-modal-counter" id="bookModalCounter">
                            Page 1 of ${TOTAL_PAGES}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Cache DOM elements
        modal = document.getElementById('bookModalOverlay');
        pageImg = document.getElementById('bookModalPage');
        prevBtn = document.getElementById('bookModalPrev');
        nextBtn = document.getElementById('bookModalNext');
        counter = document.getElementById('bookModalCounter');
    }
    
    // Attach all event listeners
    function attachEventListeners() {
        // Open modal button - only targets .open-book-preview buttons
        const openButtons = document.querySelectorAll('.open-book-preview');
        openButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openModal();
            });
        });
        
        // Close button
        document.getElementById('bookModalClose').addEventListener('click', closeModal);
        
        // Click outside to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Navigation buttons
        prevBtn.addEventListener('click', previousPage);
        nextBtn.addEventListener('click', nextPage);
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);
        
        // Prevent right-click on images
        pageImg.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Prevent drag-and-drop
        pageImg.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Basic DevTools detection
        detectDevTools();
    }
    
    // Open modal
    function openModal() {
        currentPage = 0;
        loadPage(currentPage);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Load specific page
    function loadPage(pageIndex) {
        const pageNumber = String(pageIndex).padStart(2, '0');
        const imagePath = `${IMAGE_PATH}${pageNumber}.jpg`;
        
        pageImg.src = imagePath;
        updateCounter();
        updateNavButtons();
    }
    
    // Previous page
    function previousPage() {
        if (currentPage > 0) {
            currentPage--;
            loadPage(currentPage);
        }
    }
    
    // Next page
    function nextPage() {
        if (currentPage < TOTAL_PAGES - 1) {
            currentPage++;
            loadPage(currentPage);
        }
    }
    
    // Update page counter
    function updateCounter() {
        counter.textContent = `Page ${currentPage + 1} of ${TOTAL_PAGES}`;
    }
    
    // Update navigation button states
    function updateNavButtons() {
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === TOTAL_PAGES - 1;
    }
    
    // Keyboard navigation
    function handleKeyboard(e) {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                previousPage();
                break;
            case 'ArrowRight':
                nextPage();
                break;
        }
    }
    
    // Basic DevTools detection (deterrent only)
    function detectDevTools() {
        const threshold = 160;
        let devtoolsOpen = false;
        
        setInterval(function() {
            if (window.outerWidth - window.innerWidth > threshold || 
                window.outerHeight - window.innerHeight > threshold) {
                if (!devtoolsOpen) {
                    devtoolsOpen = true;
                    console.clear();
                }
            } else {
                devtoolsOpen = false;
            }
        }, 1000);
    }
    
})();