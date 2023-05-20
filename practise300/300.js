// Assuming you have a function getAllEpisodes() that returns an array of episode objects

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

// Function to display all episodes on the page
function displayEpisodes(episodes) {
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = ""; // Clear previous episodes

  episodes.forEach((episode) => {
    const episodeCard = createEpisodeCard(episode);
    rootElement.appendChild(episodeCard);
  });
}

// Function to create select options for all episodes
function createSelectOptions(episodes) {
  const selectElement = document.getElementById("episode-select");

  episodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.id;
    option.textContent = `${generateEpisodeCode(
      episode.season,
      episode.number
    )} - ${episode.name}`;
    selectElement.appendChild(option);
  });
}

// Function to handle select change event
function handleSelectChange() {
  const selectElement = document.getElementById("episode-select");
  const selectedEpisodeId = selectElement.value;

  if (selectedEpisodeId) {
    const selectedEpisode = getAllEpisodes().find(
      (episode) => episode.id === parseInt(selectedEpisodeId)
    );
    displayEpisodes([selectedEpisode]);
  } else {
    const episodes = getAllEpisodes();
    displayEpisodes(episodes);
  }
}

// Function to initialize the page
function initializePage() {
  const episodes = getAllEpisodes();
  displayEpisodes(episodes);
  createSelectOptions(episodes);

  const selectElement = document.getElementById("episode-select");
  selectElement.addEventListener("change", handleSelectChange);
}

// Call the initializePage() function to populate the page with episodes and set up event listeners
initializePage();
