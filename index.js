const form = document.querySelector("form");
const search = document.querySelector("#search");
const container = document.querySelector(".movies");

const showMovies = (selector, title, date, plot, imageUrl, id) => {
  selector.innerHTML += `
            <div id=${id}>
                <div class='card'>
                    <img src=${imageUrl} alt="">
                    <div class='info'>
                        <h2>${title}</h2>
                        <p>${date}</p>
                        <button onClick="popup('${id}')">Read more</button>
                    </div>
                </div>
                <div class='popup hidden'>
                    <img src=${imageUrl} alt="">
                    <h2>${title}</h2>
                    <p>${date}</p>
                    <p>${plot}</p>
                </div>
            </div>
        `;
};

const popup = (id) => {
  const popup = document.querySelector(`#${id} .popup`);
  const overlay = document.querySelector(".overlay");
  console.log("popup : ", popup);
  console.log("overlay : ", overlay);
  popup.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const formatQuery = (query) => {
  return query.split(" ").join("+");
};

const getMovieByID = async (id) => {
  await fetch(`//www.omdbapi.com/?apikey=${APIKEY}&i=${id}`)
    .then((res) => res.json())
    .then((res) => {
      const title = res.Title;
      const date = res.Released;
      const plot = res.Plot;
      const img = res.Poster;
      showMovies(container, title, date, plot, img, id);

      let observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0.5)
              entry.target.classList.remove("hiddens");
          });
        },
        { threshold: 0.5 }
      );

      let items = document.querySelectorAll(".card");

      items.forEach((item) => {
        item.classList.add("hiddens");
        observer.observe(item);
      });
    });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`//www.omdbapi.com/?apikey=${APIKEY}&s=${formatQuery(search.value)}`)
    .then((res) => res.json())
    .then(async (res) => {
      let ids = [];
      container.innerHTML = "";

      await res.Search.map(async (movie) => {
        const imdbId = movie.imdbID;
        ids.push(imdbId);
        await getMovieByID(imdbId);
      });

      document
        .querySelectorAll("button")
        .forEach((b) => console.log("button", b));

      ids.map((id) => {
        const movie = document.querySelector(`#${id} button`);
        console.log(id);
        movie.addEventListener("click", popup(id));
      });
    });
});

const handleOutClick = () => {
  console.log("out");
  document.querySelector(".overlay").classList.add("hidden");
  document
    .querySelectorAll(".popup")
    .forEach((pop) => pop.classList.add("hidden"));
};

document.querySelector(".overlay").addEventListener("click", handleOutClick);
