document.addEventListener('DOMContentLoaded', function() {
            let count = parseInt(localStorage.getItem('reviewCount')) || 0;
            count++;
            localStorage.setItem('reviewCount', count);
            
            document.getElementById('reviewCounter').textContent = count;
        });