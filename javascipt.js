  // Close banner functionality
  document.getElementById('close-banner').addEventListener('click', function() {
    document.getElementById('promo-banner').style.display = 'none';
    // Optional: Set a cookie to remember the closed state
    document.cookie = "bannerClosed=true; max-age=" + (60*60*24*7); // Remembers for 1 week
});

// Check if banner was previously closed
if (document.cookie.includes('bannerClosed=true')) {
    document.getElementById('promo-banner').style.display = 'none';
}



 // Dark Mode Toggle
 const darkModeToggle = document.getElementById('darkModeToggle');
        
 // Check for saved user preference
 if (localStorage.getItem('darkMode') === 'enabled') {
     document.body.classList.add('dark-mode');
     darkModeToggle.checked = true;
 }
 
 // Toggle dark mode
 darkModeToggle.addEventListener('change', function() {
     if (this.checked) {
         document.body.classList.add('dark-mode');
         localStorage.setItem('darkMode', 'enabled');
     } else {
         document.body.classList.remove('dark-mode');
         localStorage.setItem('darkMode', 'disabled');
     }
 });
 
 // Mobile menu toggle (can be added if needed)
 // Smooth scrolling for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();
         document.querySelector(this.getAttribute('href')).scrollIntoView({
             behavior: 'smooth'
         });
     });
 });


  // Enhanced banner functionality with countdown timer
  document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('promo-banner');
    const closeButton = document.getElementById('close-banner');
    
    // Check if banner was previously closed
    if (getCookie('bannerClosed') === 'true') {
        banner.style.display = 'none';
    }
    
    // Close banner functionality
    closeButton.addEventListener('click', function() {
        banner.style.animation = 'slideDown 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) reverse';
        setTimeout(() => {
            banner.style.display = 'none';
            setCookie('bannerClosed', 'true', 7); // Remembers for 7 days
        }, 500);
    });
    
    // Countdown timer (24 hours from now)
    const countDownDate = new Date();
    countDownDate.setHours(countDownDate.getHours() + 24);
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("hours").innerHTML = "00";
            document.getElementById("minutes").innerHTML = "00";
            document.getElementById("seconds").innerHTML = "00";
        }
    }, 1000);
    
    // Cookie functions
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    
    function getCookie(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for(let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) == 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return "";
    }
});
