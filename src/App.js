import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Movie from "./Movie"
import "./App.css"

function Food(props) {
  return (
    <div>
      <h1>I Like {props.name}</h1>
      <h4>{props.rating}/5.0</h4>
      <img src={props.picture} alt={props.name} />
    </div>
  );
}

Food.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

function renderFood(dish) {
  console.log(dish);
  return <Food name={dish.namd} picture={dish.image} />;
}

const foodILike = [
  {
    id: 1,
    name: "Kimchi",
    image:
      "https://recipe1.ezmember.co.kr/cache/recipe/2017/07/09/6741acc7f6bf0f7d04245851fb365c311.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Bibimbap",
    image:
      "https://bncmarket.com/shopimages/ezbaking/0200020000862.jpg?1534480356",
    rating: 3,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("hello");
  }
  state = {
    count: 0,
    isLoading: true,
    movies: [],
  };

  add = () => {
    this.setState((current) => ({ count: current.count + 1 }));
  };

  minus = () => {
    this.setState((current) => ({ count: current.count - 1 }));
  };

  componentDidUpdate() {
    console.log("component updated");
  }

  getMovies = async () => {
    const { data: { data: { movies } } } = await axios.get('https://yts-proxy.now.sh/list_movies.json')
    this.setState({ movies, isLoading: false })
  }
  async componentDidMount() {
    this.getMovies()
  }

  componentWillUnmount() {
    console.log("GoodBye, cruel world");
  }

  render() {
    const { isLoading, movies } = this.state
    return (
    <section className="container">
      {isLoading ? (
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div>
      ) : (
        <div className="movies">
          {movies.map(movie => (
          <Movie
            key={movie.id} 
            id={movie.id} 
            year={movie.year}
            title={movie.title}
            summary={movie.summary}
            poster={movie.medium_cover_image}
            genres={movie.genres}
          />
        ))}
        </div>
      )}
    </section>
    )
  }
}

export default App;
