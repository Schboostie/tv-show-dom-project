// Assuming you have a function getAllEpisodes() that returns an array of episode objects
let episodes = [];

// Function to pad a number with leading zeros to two digits
function padNumber(num) {
  return num.toString().padStart(2, "0");
}

// Function to generate the episode code in the format S02E07
function generateEpisodeCode(season, episode) {
  const paddedSeason = padNumber(season);
  const paddedEpisode = padNumber(episode);
  return `S${paddedSeason}E${paddedEpisode}`;
}

// Function to create an episode card element
function createEpisodeCard(episode) {
  const episodeCard = document.createElement("div");
  episodeCard.className = "episode-card";

  const episodeName = document.createElement("h2");
  episodeName.textContent = episode.name;
  episodeCard.appendChild(episodeName);

  const episodeCode = generateEpisodeCode(episode.season, episode.number);
  const episodeInfo = document.createElement("p");
  episodeInfo.textContent = `Episode Code: ${episodeCode}`;
  episodeCard.appendChild(episodeInfo);

  const episodeImage = document.createElement("img");
  episodeImage.src = episode.image.medium;
  episodeImage.alt = "Episode Image";
  episodeCard.appendChild(episodeImage);

  const episodeSummary = document.createElement("p");
  episodeSummary.textContent = episode.summary;
  episodeCard.appendChild(episodeSummary);

  const episodeLink = document.createElement("a");
  episodeLink.href = episode.url;
  episodeLink.textContent = "View on TVMaze.com";
  episodeCard.appendChild(episodeLink);

  return episodeCard;
}

// Function to display filtered episodes based on search term
function displayFilteredEpisodes(searchTerm) {
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = ""; // Clear the existing episode cards

  let filteredEpisodes = episodes.filter((episode) => {
    const episodeName = episode.name.toLowerCase();
    const episodeSummary = episode.summary.toLowerCase();
    return (
      episodeName.includes(searchTerm) || episodeSummary.includes(searchTerm)
    );
  });

  filteredEpisodes.forEach((episode) => {
    const episodeCard = createEpisodeCard(episode);
    rootElement.appendChild(episodeCard);
  });

  const matchCountElement = document.getElementById("match-count");
  matchCountElement.textContent = `Matched Episodes: ${filteredEpisodes.length}`;
}

// Function to handle the search input event
function handleSearchInput(event) {
  const searchTerm = event.target.value.toLowerCase();
  displayFilteredEpisodes(searchTerm);
}

// Function to initialize the episode data and set up the search input event listener
function initialize() {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", handleSearchInput);

  episodes = getAllEpisodes();
  displayFilteredEpisodes("");
}

// Call the initialize() function to set up the search functionality
initialize();
