const getMovies = () => {
  return `http://www.omdbapi.com/?apikey=${APIKEY}&i=tt1285016`;
};

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
                        <button>Read more</button>
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
  // const movie = document.querySelector(`#${id} button`);
  // console.log("movie", movie);
  // movie.addEventListener("click", popup(id));
};

const popup = (id) => {
  return () => {
    const popup = document.querySelector(`#${id} .popup`);
    const overlay = document.querySelector(".overlay");
    console.log("popup : ", popup);
    console.log("overlay : ", overlay);
    popup.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };
};

const formatQuery = (query) => {
  return query.split(" ").join("+");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(search.value);
  const query = search.value;
  const res = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${formatQuery(
    query
  )}`;
  console.log(res);

  fetch(res)
    .then((res) => res.json())
    .then(async (res) => {
      let ids = [];
      container.innerHTML = "";
      const movies = res.Search;
      await movies.map(async (movie) => {
        const imdbId = movie.imdbID;
        ids.push(imdbId);
        await getMovieByID(imdbId);
      });

      console.log(res);
      console.log("formlisterner", ids);
      // console.dir(document);
      document
        .querySelectorAll("button")
        .forEach((b) => console.log("button", b));
      ids.map((id) => {
        // const movie = document.querySelector(`#${id} button`);
        console.log(id);
        // movie.addEventListener("click", popup(id));
      });
    });
});

const getMovieByID = (id) => {
  const query = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}`;
  console.log(query);
  fetch(query)
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

let data = {
  Title: "The Social Network",
  Year: "2010",
  Rated: "PG-13",
  Released: "01 Oct 2010",
  Runtime: "120 min",
  Genre: "Biography, Drama",
  Director: "David Fincher",
  Writer: "Aaron Sorkin (screenplay), Ben Mezrich (book)",
  Actors: "Jesse Eisenberg, Rooney Mara, Bryan Barter, Dustin Fitzsimons",
  Plot:
    "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea, and by the co-founder who was later squeezed out of the business.",
  Language: "English, French",
  Country: "USA",
  Awards: "Won 3 Oscars. Another 170 wins & 185 nominations.",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  Ratings: [
    { Source: "Internet Movie Database", Value: "7.7/10" },
    { Source: "Rotten Tomatoes", Value: "96%" },
    { Source: "Metacritic", Value: "95/100" },
  ],
  Metascore: "95",
  imdbRating: "7.7",
  imdbVotes: "622,275",
  imdbID: "tt1285016",
  Type: "movie",
  DVD: "N/A",
  BoxOffice: "$96,962,694",
  Production:
    "Scott Rudin Productions, Trigger Street Productions, Michael De Luca",
  Website: "N/A",
  Response: "True",
};

showMovies(
  container,
  data.Title,
  data.Released,
  data.Plot,
  data.Poster,
  data.imdbID
);

const handleOutClick = () => {
  console.log("out");
  document.querySelector(".overlay").classList.add("hidden");
  document
    .querySelectorAll(".popup")
    .forEach((pop) => pop.classList.add("hidden"));
};

document.querySelector(".overlay").addEventListener("click", handleOutClick);
