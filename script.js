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
  rootElem.innerHTML = ""; // clear the root element before rendering

  episodeList.forEach((episode) => {
    // create a card element for each episode
    const card = document.createElement("div");
    card.className = "card";

    // create elements for the episode details
    const title = document.createElement("h3");
    title.textContent = `${episode.name} - S${String(episode.season).padStart(
      2,
      "0"
    )}E${String(episode.number).padStart(2, "0")}`;

    const image = document.createElement("img");
    image.src = episode.image.medium;

    const summary = document.createElement("p");
    summary.innerHTML = episode.summary;

    const link = document.createElement("a");
    link.href = episode.url;
    link.target = "_blank";
    link.textContent = "View on TVMaze.com";

    // append the episode details to the card element
    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(summary);
    card.appendChild(link);

    // append the card element to the root element
    rootElem.appendChild(card);
  });
}
