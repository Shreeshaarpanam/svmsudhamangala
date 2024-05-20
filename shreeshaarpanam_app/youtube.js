// Replace 'YOUR_API_KEY' with your actual YouTube Data API key
const API_KEY = 'AIzaSyCQSWIHaOgxXwRFKik332dDXmMBqZjrffM';
// Replace 'CHANNEL_ID' with the ID of the YouTube channel you want to fetch videos from
const CHANNEL_ID = 'UCImc0ySbFzBIKwuztyEUG-w';

// Function to fetch videos from the YouTube channel with titles starting with "Vidyāśrīśābhivandanam"
function fetchVideos() {
  const query = encodeURIComponent('Vidyāśrīśābhivandanam');
  fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6&q=${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const videos = data.items;
      displayVideos(videos);
    })
    .catch(error => console.error('Error fetching videos:', error));
}

// Function to display videos on the page in a grid format
// Function to display videos on the page in a grid format
function displayVideos(videos) {
    const videoGrid = document.getElementById('video-grid');
    videoGrid.innerHTML = '';
  
    if (videos.length === 0) {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'No videos found.';
      videoGrid.appendChild(errorMessage);
    } else {
      videos.forEach(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.medium.url;
  
        const videoContainer = document.createElement('div');
        videoContainer.classList.add('video');
  
        const videoLink = document.createElement('a');
        videoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
        videoLink.target = '_blank';
  
        const videoThumbnail = document.createElement('img');
        videoThumbnail.src = thumbnail;
  
        const videoTitle = document.createElement('div');
        videoTitle.classList.add('title');
        videoTitle.textContent = title;
  
        videoLink.appendChild(videoThumbnail);
        videoContainer.appendChild(videoLink);
        videoContainer.appendChild(videoTitle);
  
        videoGrid.appendChild(videoContainer);
      });
    }
  }
  
  // Call the fetchVideos function when the page loads
  window.onload = fetchVideos;