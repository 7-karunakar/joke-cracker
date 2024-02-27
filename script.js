async function fetchJoke() {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=sexist');
    const data = await response.json();

    let jokeText = '';
    if (data.type === 'single') {
        jokeText = data.joke;
    } else {
        jokeText = `${data.setup}\n${data.delivery}`;
    }

    const jokeContainer = document.getElementById('joke-container');
    jokeContainer.innerHTML = ''; // Clear previous jokes

    const emojis = ['&#x1F602;', '&#x1F923;', '&#x1F606;', '&#x1F61C;', '&#x1F60E;']; // Add more emojis as needed

    let emojiBurst = '';
    for (let i = 0; i < Math.floor(Math.random() * 11) + 20; i++) { // Generate 20-30 emojis
        emojiBurst += `<span class="emoji" style="--x: ${Math.random()}; --y: ${Math.random()}">${emojis[Math.floor(Math.random() * emojis.length)]}</span>`;
    }

    jokeContainer.innerHTML = `${jokeText}<br>${emojiBurst}`;

    // Make emojis appear big and then disappear slowly
    const emojisList = document.querySelectorAll('.emoji');
    emojisList.forEach((emoji, index) => {
        setTimeout(() => {
            emoji.style.setProperty('--emoji-size', '100px'); // Set emoji size to 100px
            emoji.classList.add('hide'); // Hide emoji slowly
            setTimeout(() => {
                emoji.remove(); // Remove emoji from the DOM
            }, 1000); // Wait for 1s before removing
        }, index * 50); // Delay each emoji animation
    });
}
