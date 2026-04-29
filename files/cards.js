const cards = [
  {
    id: "1",
    title: "Inception",
    category: "Sci-Fi",
    description: "A mind-bending movie about dreams, memory, and a team entering layered realities.",
    imageUrl: "https://placehold.co/600x338",
    link: "https://en.wikipedia.org/wiki/Inception"
  },
  {
    id: "2",
    title: "The Dark Knight",
    category: "Action",
    description: "A superhero crime movie centered on Batman, Gotham, and the chaos created by the Joker.",
    imageUrl: "https://placehold.co/600x338",
    link: "https://en.wikipedia.org/wiki/The_Dark_Knight"
  },
  {
    id: "3",
    title: "Interstellar",
    category: "Adventure",
    description: "A space exploration story about time, survival, and searching for a new home for humanity.",
    imageUrl: "https://placehold.co/600x338",
    link: "https://en.wikipedia.org/wiki/Interstellar_(film)"
  },
  {
    id: "4",
    title: "La La Land",
    category: "Musical",
    description: "A colorful movie about ambition, jazz, and a love story in Los Angeles.",
    imageUrl: "https://placehold.co/600x338",
    link: "https://en.wikipedia.org/wiki/La_La_Land"
  },
  {
    id: "5",
    title: "Parasite",
    category: "Thriller",
    description: "A sharp social thriller about class, deception, and two families connected in unexpected ways.",
    imageUrl: "https://placehold.co/600x338",
    link: "https://en.wikipedia.org/wiki/Parasite_(film)"
  },
  {
    id: "6",
    title: "Forrest Gump",
    category: "Drama",
    description: "An emotional story about a kind-hearted man whose life crosses major moments in American history.",
    imageUrl: "https://placehold.co/600x338",
    link: "https://en.wikipedia.org/wiki/Forrest_Gump"
  },
  {
    id: "7",
    title: "Spirited Away",
    category: "Animation",
    description: "A fantasy movie about a young girl navigating a mysterious spirit world.",
    imageUrl: "https://placehold.co/600x338",
    link: "https://en.wikipedia.org/wiki/Spirited_Away"
  },
  {
    id: "8",
    title: "The Grand Budapest Hotel",
    category: "Comedy",
    description: "A stylish comedy film about friendship, mystery, and adventures in a fictional European hotel.",
    imageUrl: "https://placehold.co/600x338",
    link: "https://en.wikipedia.org/wiki/The_Grand_Budapest_Hotel"
  }
];

const list = document.getElementById("cardsList");
const searchInput = document.getElementById("searchInput");
const sortBtn = document.getElementById("sortBtn");
const resetBtn = document.getElementById("resetBtn");
const countEl = document.getElementById("countEl");
const charCountEl = document.getElementById("charCount");
let isSorted = false;

function createCardElement(data, index) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = data.id;

  const num = document.createElement("span");
  num.className = "card-num";
  num.textContent = String(index + 1).padStart(2, "0");

  const image = document.createElement("img");
  image.className = "card-image";
  image.src = data.imageUrl;
  image.alt = data.title;

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = data.title;

  const desc = document.createElement("p");
  desc.className = "card-desc";
  desc.textContent = data.description;

  body.appendChild(title);
  body.appendChild(desc);

  const right = document.createElement("div");
  right.className = "card-right";

  const tag = document.createElement("span");
  tag.className = "card-tag";
  tag.textContent = data.category;

  const link = document.createElement("a");
  link.className = "card-link";
  link.href = data.link;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "↗";

  right.appendChild(tag);
  right.appendChild(link);

  card.appendChild(num);
  card.appendChild(image);
  card.appendChild(body);
  card.appendChild(right);

  return card;
}

function renderCards(data) {
  list.innerHTML = "";

  if (data.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Nothing found.";
    list.appendChild(empty);
  } else {
    data.forEach((item, i) => list.appendChild(createCardElement(item, i)));
  }

  countEl.textContent = `${data.length} of ${cards.length}`;
}

list.addEventListener("click", function (event) {
  const card = event.target.closest(".card");
  if (!card || event.target.closest("a")) return;

  const wasSelected = card.classList.contains("selected");
  document.querySelectorAll(".card.selected").forEach(selectedCard => {
    selectedCard.classList.remove("selected");
  });

  if (!wasSelected) {
    card.classList.add("selected");
    const name = card.querySelector(".card-title").textContent;
    console.log(`Selected: "${name}"`);
    alert(`Selected: ${name}`);
  }
});

searchInput.addEventListener("input", function () {
  const kw = this.value.trim().toLowerCase();
  const result = filterByKeyword(kw);
  renderCards(isSorted ? sortAZ(result) : result);
});

sortBtn.addEventListener("click", function () {
  isSorted = !isSorted;
  this.classList.toggle("active", isSorted);
  this.textContent = isSorted ? "Sorted A–Z" : "Sort A–Z";
  const kw = searchInput.value.trim().toLowerCase();
  renderCards(isSorted ? sortAZ(filterByKeyword(kw)) : filterByKeyword(kw));
});

resetBtn.addEventListener("click", function () {
  searchInput.value = "";
  isSorted = false;
  sortBtn.classList.remove("active");
  sortBtn.textContent = "Sort A–Z";
  renderCards(cards);
});

const totalChars = cards.reduce((acc, c) => acc + c.title.length, 0);
console.log("reduce() → total title chars:", totalChars);
charCountEl.textContent = `Total title chars: ${totalChars}`;

function sortAZ(arr) {
  return [...arr].sort((a, b) => a.title.localeCompare(b.title));
}
console.log("sort() → A–Z:", sortAZ(cards).map(c => c.title));

function filterByKeyword(kw) {
  if (!kw) return cards;
  return cards.filter(c =>
    c.title.toLowerCase().includes(kw) ||
    c.description.toLowerCase().includes(kw) ||
    c.category.toLowerCase().includes(kw)
  );
}
const movieCards = cards.filter(c => c.description.toLowerCase().includes("movie"));
console.log('filter() → "movie":', movieCards.map(c => c.title));

const titles = cards.map(c => c.title);
console.log("map() → titles:", titles);

console.log("Cards:", cards);
renderCards(cards);
