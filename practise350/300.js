let episodes = [];
let filteredEpisodes = [];

// Function to fetch the episodes for a specific show
async function fetchEpisodes(showId) {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/shows/${showId}/episodes`
    );
    const data = await response.json();
    episodes = data;
    filteredEpisodes = data;
    displayEpisodes();
    populateEpisodeSelect();
  } catch (error) {
    console.log("Error fetching episodes:", error);
  }
}

// Function to display the episodes
function displayEpisodes() {
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = "";

  filteredEpisodes.forEach((episode) => {
    const episodeCard = createEpisodeCard(episode);
    rootElement.appendChild(episodeCard);
  });
}

// Function to create an episode card
function createEpisodeCard(episode) {
  const card = document.createElement("div");
  card.className = "episode-card";

  const title = document.createElement("h2");
  title.textContent = episode.name;
  card.appendChild(title);

  const seasonEpisode = document.createElement("p");
  seasonEpisode.textContent = `S${episode.season
    .toString()
    .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
  card.appendChild(seasonEpisode);

  const image = document.createElement("img");
  image.src = episode.image.medium;
  image.alt = "Episode Image";
  card.appendChild(image);

  const summary = document.createElement("p");
  summary.textContent = episode.summary;
  card.appendChild(summary);

  const link = document.createElement("a");
  link.href = episode.url;
  link.textContent = "View on TVMaze.com";
  card.appendChild(link);

  return card;
}

// Function to populate the episode select dropdown
function populateEpisodeSelect() {
  const selectElement = document.getElementById("episode-select");
  selectElement.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "All Episodes";
  selectElement.appendChild(allOption);

  filteredEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.id;
    option.textContent = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
      episode.name
    }`;
    selectElement.appendChild(option);
  });
}

// Function to handle episode select change event
function handleEpisodeSelect(event) {
  const selectedEpisodeId = event.target.value;
  if (selectedEpisodeId) {
    filteredEpisodes = episodes.filter(
      (episode) => episode.id === parseInt(selectedEpisodeId)
    );
  } else {
    filteredEpisodes = episodes;
  }
  displayEpisodes();
}

// Function to handle search input
function handleSearchInput(event) {
  const searchTerm = event.target.value.trim().toLowerCase();
  filteredEpisodes = episodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
  );
  displayEpisodes();
}

// Function to handle show select change event
function handleShowSelect(event) {
  const selectedShowId = event.target.value;
  if (selectedShowId) {
    fetchEpisodes(selectedShowId);
  }
}

/// Event listeners
document
  .getElementById("search-input")
  .addEventListener("input", handleSearchInput);
document
  .getElementById("episode-select")
  .addEventListener("change", handleEpisodeSelect);
document
  .getElementById("show-select")
  .addEventListener("change", handleShowSelect);

// Fetch shows and populate the show select dropdown
getAllShows().then((shows) => {
  const showSelect = document.getElementById("show-select");

  // Sort shows in alphabetical order (case-insensitive)
  shows.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  shows.forEach((show) => {
    const option = document.createElement("option");
    option.value = show.id;
    option.textContent = show.name;
    showSelect.appendChild(option);
  });
});
