import React, { useEffect, useState } from 'react';
import './App.css';

const items = [
  "mountain",
  "beach",
  "forest",
  "city skyline",
  "sunset",
  "river",
  "desert",
  "waterfall",
  "snowy landscape",
  "ocean waves",
  "Aardvark",
  "Albatross",
  "Alligator",
  "Alpaca",
  "Antelope",
  "Armadillo",
  "Baboon",
  "Badger",
  "Barracuda",
  "Bat",
  "Bear",
  "Beaver",
  "Bison",
  "Booby",
  "Buffalo",
  "Butterfly",
  "Camel",
  "Capybara",
  "Caribou",
  "Cassowary",
  "Cat",
  "Cheetah",
  "Chicken",
  "Chimpanzee",
  "Clam",
  "Cobra",
  "Coyote",
  "Crab",
  "Crow",
  "Deer",
  "Dolphin",
  "Donkey",
  "Dove",
  "Dragonfly",
  "Eagle",
  "Echidna",
  "Elephant",
  "Falcon",
  "Ferret",
  "Flamingo",
  "Fox",
  "Frog",
  "Giraffe",
  "Goat",
  "Goldfish",
  "Goose",
  "Gorilla",
  "Guinea Pig",
  "Hamster",
  "Hedgehog",
  "Hippopotamus",
  "Horse",
  "Hummingbird",
  "Iguana",
  "Impala",
  "Jaguar",
  "Kangaroo",
  "Koala",
  "Leopard",
  "Lion",
  "Llama",
  "Manatee",
  "Meerkat",
  "Mongoose",
  "Monkey",
  "Moose",
  "Otter",
  "Ostrich",
  "Owl",
  "Panda",
  "Parrot",
  "Penguin",
  "Pig",
  "Pigeon",
  "Rabbit",
  "Raccoon",
  "Reindeer",
  "Rhino",
  "Salamander",
  "Seal",
  "Shark",
  "Sheep",
  "Skunk",
  "Sloth",
  "Snail",
  "Snake",
  "Sparrow",
  "Spider",
  "Squirrel",
  "Turtle",
  "Walrus",
  "Whale",
  "Wolf",
  "Zebra",
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
  "Kiwi",
  "Lemon",
  "Mango",
  "Nectarine",
  "Orange",
  "Papaya",
  "Quince",
  "Raspberry",
  "Strawberry",
  "Tangerine",
  "Ugli fruit",
  "Vanilla bean",
  "Watermelon",
  "Eiffel Tower",
  "Empire State Building",
  "Burj Khalifa",
  "Sydney Opera House",
  "Great Wall of China",
  "Taj Mahal",
  "Colosseum",
  "Big Ben",
  "Pyramids of Giza",
  "Sagrada Família",
  "Petronas Towers",
  "One World Trade Center",
  "Palace of Versailles",
  "Hagia Sophia",
  "St. Basil's Cathedral",
  "Leaning Tower of Pisa",
  "Machu Picchu",
  "Christ the Redeemer",
  "The Shard",
  "Chrysler Building",
  "Pizza",
  "Sushi",
  "Tacos",
  "Pasta",
  "Burger",
  "Samosa",
  "Croissant",
  "Dumplings",
  "Paella",
  "Peking Duck",
  "Biryani",
  "Chow Mein",
  "Fish and Chips",
  "Falafel",
  "Kebabs",
  "Ramen",
  "Bratwurst",
  "Ceviche",
  "Macarons",
  "Baklava",
  "Chili",
  "Goulash",
  "Poutine",
  "Tiramisu",
  "Nachos",
  "Churros",
  "Quesadilla",
  "Arepas",
  "Pancakes",
  "Poff Poff",
  "Babka",
  "Peking Duck",
  "Gnocchi",
  "Ratatouille",
  "Banh Mi",
  "Eggs Benedict",
  "Bangers and Mash",
  "Tzatziki",
  "Sushi Rolls",
  "Moussaka",
  "Sushi",
  "Empanadas",
  "Clam Chowder",
  "Cheesesteak",
  "Katsu Curry",
  "Bubble Tea",
  "Dosas",
  "Friend",
  "Love",
  "Relationship",
  "Party",
  "Public",
  "Meeting",
  "Dance",
  "Coding",
  "Comptetion",
  "Books",
  "Store",
  "Mall",
  "Phone",
  "Laptop",
  "Desktop",
  "Office",
  "Student",
  "GameZone"
];
const App = () => {
  console.log(items.length);
  
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [random, setRandom] = useState(Math.floor(Math.random() * 193));
  const API_KEY = process.env.REACT_APP_API_KEY;
  
  const fetchImages = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${items[random]}&image_type=photo&orientation=horizontal&pretty=true&page=${pageNumber}`);
      const data = await response.json();
      if (data.hits.length === 0) {
        setPage(0);
        setRandom(Math.floor(Math.random() * 210));
      } else {
        setImages((prevImages) => [...prevImages, ...data.hits]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setRandom(Math.floor(Math.random() * 210));
    fetchImages(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        if (!loading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <div className="App">
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <div className="image-grid">
        {images.map((image,index) => (
          <div className="image-block" key={index}>
            <img src={image.webformatURL} alt={image.tags} />
          </div>
        ))}
      </div>
      {loading && <div className="loader-container"><div className="loader"></div></div>} {/* Additional loader for additional data */}
    </div>
  );
};

export default App;

