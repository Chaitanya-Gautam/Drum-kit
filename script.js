// Wait for the DOM to fully load before executing the code
document.addEventListener('DOMContentLoaded', function () {
    // Define a class for adding a visual effect when a key is pressed
    const playingClass = 'playing';

    // Function to play the associated sound and apply animations
    const playSound = (e) => {
        // Get the key code of the pressed key
        const keyCode = e.keyCode;

        // Find the HTML element corresponding to the pressed key
        const keyElement = document.querySelector(`div[data-key="${keyCode}"]`);

        // If there's no corresponding key element, exit the function
        if (!keyElement) return;

        // Get the <audio> element associated with the pressed key
        const audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
        audioElement.currentTime = 0; // Reset audio to the beginning
        audioElement.play(); // Play the audio

        // Apply special animations for specific keys
        if (keyCode === 69 || keyCode === 82) {
            // If the pressed key is 'E' or 'R', animate the crash or ride
            const crashRide = document.getElementById('crash-ride');
            crashRide.style.transform = 'rotate(0deg) scale(1.5)';
        } else if (keyCode === 75) {
            // If the pressed key is 'K', animate the hi-hat closed
            const hiHatTop = document.getElementById('hihat-top');
            hiHatTop.style.top = '171px';
        }

        // Add the 'playing' class to the key element for visual effect
        keyElement.classList.add(playingClass);
    };

    // Function to remove the 'playing' class after a transition
    const removeKeyTransition = (e) => {
        // Check if the transition property is 'transform'
        if (e.propertyName !== 'transform') return;

        // Remove the 'playing' class to end the visual effect
        e.target.classList.remove(playingClass);
    };

    // Get all elements with the class 'key' and add transitionend event listeners
    const drumKeys = Array.from(document.querySelectorAll('.key'));
    drumKeys.forEach((key) => {
        key.addEventListener('transitionend', removeKeyTransition);
    });

    // Listen for keydown events on the entire window
    window.addEventListener('keydown', playSound);
});
