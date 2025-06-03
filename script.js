// Array to store visitor names
let visitors = [];

// Function to add a visitor to the guestbook
function addVisitor() {
    const nameInput = document.getElementById('visitorName');
    const name = nameInput.value.trim();
    
    if (name) {
        visitors.push(name);
        displayVisitors();
        nameInput.value = '';
        
        // Add a nice animation effect
        const display = document.getElementById('visitorDisplay');
        display.style.transform = 'scale(1.1)';
        setTimeout(() => {
            display.style.transform = 'scale(1)';
        }, 200);
        
        // Show success message
        showMessage('Thank you for signing the guestbook!', 'success');
    } else {
        showMessage('Please enter your name!', 'error');
    }
}

// Function to display visitors
function displayVisitors() {
    const display = document.getElementById('visitorDisplay');
    if (visitors.length > 0) {
        display.innerHTML = `
            <p>Recent Visitors:</p>
            <p>${visitors.slice(-5).join(' • ')}</p>
            <p style="font-size: 0.9em; margin-top: 10px;">Total visitors: ${visitors.length}</p>
        `;
    }
}

// Function to show messages to the user
function showMessage(message, type) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        ${type === 'success' 
            ? 'background: linear-gradient(45deg, #2ecc71, #27ae60);' 
            : 'background: linear-gradient(45deg, #e74c3c, #c0392b);'
        }
    `;
    
    // Add CSS for slide animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(messageEl);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(messageEl);
            document.head.removeChild(style);
        }, 300);
    }, 3000);
}

// Function to add interactive effects
function addInteractiveEffects() {
    // Add click effect to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add typing effect to welcome message
    const welcomeMessage = document.querySelector('.welcome-message');
    const originalText = welcomeMessage.textContent;
    welcomeMessage.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            welcomeMessage.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after page loads
    setTimeout(typeWriter, 1000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add interactive effects when page loads
    addInteractiveEffects();
    
    // Allow Enter key to submit visitor name
    const visitorInput = document.getElementById('visitorName');
    visitorInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addVisitor();
        }
    });
    
    // Add focus effect to input
    visitorInput.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    visitorInput.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add some fun interactions
function addSparkleEffect(element) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: absolute;
        pointer-events: none;
        font-size: 20px;
        animation: sparkle 1s ease-out forwards;
    `;
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
    sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        document.body.removeChild(sparkle);
    }, 1000);
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1) rotate(180deg); opacity: 1; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(sparkleStyle);