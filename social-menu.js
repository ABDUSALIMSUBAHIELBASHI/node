// ========== Magic Social Share Menu - Premium JavaScript ==========

document.addEventListener('DOMContentLoaded', function() {
  // Create the social menu HTML with all platforms
  const socialMenuHTML = `
    <div class="social-menu-container floating">
      <button class="menu-toggle" id="menuToggle" title="Share on Social Media">+</button>
      <div class="social-menu" id="socialMenu">
        <!-- Top: Share -->
        <button class="menu-item share" data-tooltip="Share" data-url="#">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="28" height="28">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        </button>

        <!-- Top-Left: WhatsApp -->
        <button class="menu-item whatsapp" data-tooltip="WhatsApp" data-url="https://wa.me/">
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.898 1.211.987.987 0 00-.39 1.283l1.318 3.231a.987.987 0 001.421.509 5.888 5.888 0 002.922-.708 5.888 5.888 0 002.924-.708c1.622-.953 2.805-2.609 3.05-4.496a5.992 5.992 0 00-2.647-5.69 5.987 5.987 0 00-3.696-1.332z"/>
          </svg>
        </button>

        <!-- Left: Reddit -->
        <button class="menu-item reddit" data-tooltip="Reddit" data-url="https://reddit.com">
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <circle cx="12" cy="12" r="11"/>
            <path fill="white" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5 10.5c0 .827-.75 1.5-1.667 1.5.827 0 1.5.673 1.5 1.5S15.66 17 14.833 17 13.5 16.327 13.5 15.5s.75-1.5 1.667-1.5c.917-.001 1.667-.673 1.667-1.5zm-10 0c0 .827-.75 1.5-1.667 1.5.827 0 1.5.673 1.5 1.5S4.66 17 3.833 17 2.5 16.327 2.5 15.5s.75-1.5 1.667-1.5c.917-.001 1.667-.673 1.667-1.5z"/>
          </svg>
        </button>

        <!-- Bottom-Left: Facebook -->
        <button class="menu-item facebook" data-tooltip="Facebook" data-url="https://www.facebook.com/sharer/sharer.php">
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </button>

        <!-- Bottom: Generic Share -->
        <button class="menu-item share" data-tooltip="Share Link" data-url="#">
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
          </svg>
        </button>

        <!-- Bottom-Right: YouTube -->
        <button class="menu-item youtube" data-tooltip="YouTube" data-url="https://www.youtube.com">
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </button>

        <!-- Right: GitHub -->
        <button class="menu-item github" data-tooltip="GitHub" data-url="https://www.github.com">
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </button>

        <!-- Top-Right: Instagram -->
        <button class="menu-item instagram" data-tooltip="Instagram" data-url="https://www.instagram.com">
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="currentColor"/>
            <path fill="white" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
            <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
          </svg>
        </button>

        <!-- Far Right: Thumbs Up (Facebook Engagement) -->
        <button class="menu-item thumbsup" data-tooltip="Like" data-url="#">
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M2 20h3V9H2v11zm19-7c0-.55-.45-1-1-1h-5.5l.75-3.75 2.5-2.72c.1-.1.15-.23.15-.38 0-.28-.22-.5-.5-.5H11l-1-3H3v14h14.47l2.53-8z"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Append to body
  document.body.insertAdjacentHTML('beforeend', socialMenuHTML);

  // Get elements
  const menuToggle = document.getElementById('menuToggle');
  const socialMenu = document.getElementById('socialMenu');
  const menuContainer = document.querySelector('.social-menu-container');
  const menuItems = document.querySelectorAll('.menu-item');

  // Toggle menu
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    socialMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.social-menu-container')) {
      socialMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });

  // Close menu when pressing Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      socialMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });

  // Handle menu item clicks
  menuItems.forEach((item, index) => {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      const tooltip = this.getAttribute('data-tooltip');
      
      // Get current page URL for sharing
      const currentUrl = window.location.href;
      const pageTitle = document.title;
      const pageDescription = document.querySelector('meta[name="description"]')?.content || pageTitle;

      // Handle different social media platforms
      switch(tooltip) {
        case 'Facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank', 'width=600,height=400');
          break;
        case 'Twitter':
          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(pageTitle)}`, '_blank', 'width=600,height=400');
          break;
        case 'Instagram':
          window.open('https://www.instagram.com', '_blank');
          break;
        case 'LinkedIn':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank', 'width=600,height=400');
          break;
        case 'YouTube':
          window.open('https://www.youtube.com', '_blank');
          break;
        case 'GitHub':
          window.open('https://www.github.com', '_blank');
          break;
        case 'Reddit':
          window.open(`https://reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(pageTitle)}`, '_blank', 'width=600,height=400');
          break;
        case 'WhatsApp':
          window.open(`https://wa.me/?text=${encodeURIComponent(pageTitle + ' ' + currentUrl)}`, '_blank');
          break;
        case 'Like':
          showNotification('Thanks for the love! 💙');
          break;
        case 'Share':
        case 'Share Link':
          // Use native share API if available
          if (navigator.share) {
            navigator.share({
              title: pageTitle,
              text: pageDescription,
              url: currentUrl,
            }).catch(err => console.log('Error sharing:', err));
          } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(currentUrl).then(() => {
              showNotification('Link copied to clipboard! 📋');
            }).catch(() => {
              showNotification('Copy this link: ' + currentUrl);
            });
          }
          break;
      }

      // Close menu after click
      socialMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    });

    // Add keyboard support
    item.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Add pulse animation on page load
  menuToggle.classList.add('pulse');
  setTimeout(() => {
    menuToggle.classList.remove('pulse');
  }, 6000);

  // Notification function
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      bottom: 120px;
      right: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      font-size: 14px;
      font-weight: 500;
      animation: slideUp 0.3s ease;
      z-index: 999;
      max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideDown 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Add slide animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    @keyframes slideDown {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(20px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Prevent text selection on toggle button
  menuToggle.addEventListener('mousedown', function(e) {
    e.preventDefault();
  });
});
