document.addEventListener("DOMContentLoaded", function () {
  const games = [
    {
      id: 1,
      title: "Bars: GRIDDY UPDATE",
      description:
        "Experience the ultimate horror experience with bars: the griddy update. Escape the new griddy monster and try to find your way out of the labyrinth, solo or with friends.",
      image: "img/BarsImg.png",
      url: "https://www.roblox.com/games/16962462619/Bars-GRIDDY-UPDATE",
      players: 463,
      rating: "5/5",
      tags: ["Horror", "Multiplayer", "Escape"],
      badge: { text: "CLASSIC", class: "classic" },
    },
    {
      id: 2,
      title: "Mega Fighters",
      description:
        "Enter the arena in this gunslinging fighting game where strategy meets skill! Choose from dozens of unique guns and battle against other players in epic spam jumping showdowns.",
      image: "img/MegaFightersBanner.png",
      url: "https://www.roblox.com/games/82297228726094/Mega-Fighters",
      players: 70,
      rating: "5/5",
      tags: ["Action", "PvP", "Shooter"],
      badge: { text: "NEW", class: "new" },
    },
    {
      id: 3,
      title: "???",
      description:
        "Something big is coming to Mega Games! The prequel to our massive game, BARS. Join our Discord to get early access and exclusive updates about this mysterious new project!",
      image: "img/griddy.png",
      url: "#discord",
      releaseDate: "Summer 2025",
      tags: ["Mystery", "Prequel", "Exclusive"],
      badge: { text: "COMING SOON", class: "coming-soon" },
      isComingSoon: true,
    },
    {
      id: 4,
      title: "Mega Islands",
      description:
        "A old game that was made in 2022, Mega Islands is a game where you can build your own island and explore the world. It was a fun game but it met its end. We are thinking about remaking it in the future.",
      image: "img/MegaIslands.png",
      url: "https://www.roblox.com/games/12379902727/Mega-ISLANDS-V0-39-EASTER-ISLAND",
      players: 223,
      rating: "4.4/5",
      tags: ["Survival", "PvP", "Open World"],
      badge: { text: "Remake?", class: "new" },
    },
  ];

  // DOM Elements
  const gamesGrid = document.getElementById("gamesGrid");
  const searchInput = document.getElementById("gameSearchInput");
  const searchButton = document.getElementById("searchButton");
  const categoryFilter = document.getElementById("gameFilter");
  const prevButton = document.getElementById("prevGames");
  const nextButton = document.getElementById("nextGames");
  const pageIndicator = document.getElementById("pageIndicator");

  // Pagination settings
  const gamesPerPage = 4; // Adjust based on your layout
  let currentPage = 1;
  let filteredGames = [...games];

  // Initialize the page
  displayGames();

  // Event Listeners
  searchButton.addEventListener("click", performSearch);
  searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      performSearch();
    }
  });
  categoryFilter.addEventListener("change", performSearch);
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayGames();
    }
  });
  nextButton.addEventListener("click", () => {
    if (currentPage < Math.ceil(filteredGames.length / gamesPerPage)) {
      currentPage++;
      displayGames();
    }
  });

  // Functions
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    filteredGames = games.filter((game) => {
      const matchesSearch =
        game.title.toLowerCase().includes(searchTerm) ||
        game.description.toLowerCase().includes(searchTerm);

      const matchesCategory =
        selectedCategory === "all" ||
        (game.tags && game.tags.includes(selectedCategory));

      return matchesSearch && matchesCategory;
    });

    currentPage = 1; // Reset to first page on new search
    displayGames();
  }

  function displayGames() {
    // Clear games grid
    gamesGrid.innerHTML = "";

    if (filteredGames.length === 0) {
      gamesGrid.innerHTML =
        '<div class="no-results">No games found matching your criteria</div>';
      updatePagination();
      return;
    }

    // Calculate start and end index for current page
    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = Math.min(startIndex + gamesPerPage, filteredGames.length);

    // Display games for current page
    for (let i = startIndex; i < endIndex; i++) {
      const game = filteredGames[i];
      gamesGrid.appendChild(createGameCard(game));
    }

    // Update pagination
    updatePagination();
  }

  function updatePagination() {
    const totalPages = Math.max(
      1,
      Math.ceil(filteredGames.length / gamesPerPage)
    );
    pageIndicator.textContent = `Page ${currentPage}/${totalPages}`;

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage >= totalPages;
  }

  function createGameCard(game) {
    const gameCard = document.createElement("div");
    gameCard.className = "game-card";

    // Add badge if exists
    if (game.badge) {
      const badge = document.createElement("div");
      badge.className = `game-badge ${game.badge.class}`;
      badge.textContent = game.badge.text;
      gameCard.appendChild(badge);
    }

    // Create image container
    const imageContainer = document.createElement("div");
    imageContainer.className = "game-image-container";

    const image = document.createElement("img");
    image.src = game.image;
    image.alt = `${game.title} Game`;
    image.className = "game-image";
    imageContainer.appendChild(image);

    const overlay = document.createElement("div");
    overlay.className = "game-overlay";

    const stats = document.createElement("div");
    stats.className = "game-stats";

    if (game.players) {
      const playersStat = document.createElement("div");
      playersStat.className = "stat";
      playersStat.innerHTML = `<i class="fas fa-user"></i> ${game.players}`;
      stats.appendChild(playersStat);
    }

    if (game.rating) {
      const ratingStat = document.createElement("div");
      ratingStat.className = "stat";
      ratingStat.innerHTML = `<i class="fas fa-star"></i> ${game.rating}`;
      stats.appendChild(ratingStat);
    }

    if (game.releaseDate) {
      const dateStat = document.createElement("div");
      dateStat.className = "stat";
      dateStat.innerHTML = `<i class="fas fa-calendar"></i> ${game.releaseDate}`;
      stats.appendChild(dateStat);
    }

    overlay.appendChild(stats);
    imageContainer.appendChild(overlay);
    gameCard.appendChild(imageContainer);

    // Create content
    const content = document.createElement("div");
    content.className = "game-content";

    const title = document.createElement("h3");
    title.className = "game-title";
    title.textContent = game.title;
    content.appendChild(title);

    const description = document.createElement("p");
    description.className = "game-description";
    description.textContent = game.description;
    content.appendChild(description);

    if (game.tags && game.tags.length > 0) {
      const tags = document.createElement("div");
      tags.className = "game-tags";

      game.tags.forEach((tagText) => {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = tagText;
        tags.appendChild(tag);
      });

      content.appendChild(tags);
    }

    const link = document.createElement("a");
    link.className = "game-link";
    link.href = game.url;

    if (!game.isComingSoon) {
      link.innerHTML = '<i class="fas fa-play"></i> Play Now';
      if (game.url.startsWith("http")) {
        link.target = "_blank";
      }
    } else {
      link.innerHTML = '<i class="fas fa-bell"></i> Get Updates';
    }

    content.appendChild(link);
    gameCard.appendChild(content);

    return gameCard;
  }
});
