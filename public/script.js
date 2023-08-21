function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function getSongRecommendations() {
    showLoading();
    const mood = document.getElementById('moodInput').value;
    fetch('/recommendations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mood })
    })
    .then(response => response.json())
    .then(songs => {
        hideLoading();
        const songList = document.getElementById('songList');
        songList.innerHTML = '';
        songs.forEach(song => {
            const li = document.createElement('li');
            li.textContent = song;
            songList.appendChild(li);
        });
    })
    .catch(error => {
        hideLoading();
        showError('Error getting song recommendations. Please try again.');
    });
}