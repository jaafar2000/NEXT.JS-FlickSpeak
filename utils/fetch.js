const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjAyODZlODBiM2NiMmNlMzljNTFiNTYxYzQ5YzkwNiIsInN1YiI6IjYzNTRlZjYzZDhlMjI1MDA3ZDk5NmM1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CeN0TBPVZttK245Wp1DEUmRfyBrNIb9ajeLrztLBMmc",
  },
};
const fetchMovies = async (page, type, search) => {

  try {
    if (search === "") {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`,
        options
      );

      return res.json();
    } else  {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=$${search}&include_adult=false&language=en-US&page=1`,
        options
      );
      return res.json();
    }
  } catch (err) {
    console.log("error fetching");
  }
};

const fetchDetails = async (type , id)=>{
  const res =  await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, options)
  return res.json()
}
export  {fetchMovies , fetchDetails};


