//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  const headerElem = document.createElement("header");
  headerElem.innerHTML = `<h1>All Episodes (${episodeList.length} episodes)</h1>`;
  rootElem.appendChild(headerElem);

  const episodesContainer = document.createElement("div");
  episodesContainer.classList.add("episodes-container");

  episodeList.forEach((episode) => {
    const { id, name, season, number, image, summary } = episode;
    const code = `S${season.toString().padStart(2, "0")}E${number
      .toString()
      .padStart(2, "0")}`;
    const episodeElem = document.createElement("div");
    episodeElem.classList.add("episode");
    episodeElem.innerHTML = `
      <img src="${image.medium}" alt="${name}" />
      <div class="episode-info">
        <h2>${name} - ${code}</h2>
        ${summary ? summary : "<p>No summary available</p>"}
        <p><a href="http://www.tvmaze.com/episodes/${id}" target="_blank">See on TVMaze.com</a></p>
      </div>
    `;
    episodesContainer.appendChild(episodeElem);
  });

  rootElem.appendChild(episodesContainer);
}
