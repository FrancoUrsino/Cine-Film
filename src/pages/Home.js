import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import Select from 'react-select';
import { news, SwiperSliderData } from '../components/Data';
import "../index.scss";
import { Link } from 'react-router-dom';
import SwiperComponent from '../components/SwiperCandy';

function Home() {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error', error));
  }, []);

  const titles = Array.from(new Set(movies.map((res) => res.title)));

  const titleOptions = titles.map((title) => ({
    value: title,
    label: title,
  }));

  const filteredMovies = selected
    ? movies.filter((movie) => movie.title === selected.value)
    : movies;

  const handleItem = (i) => {
    console.log('item:', i);
  };

  return (
    <div>
      <Carousel images={news} />
      <Select
        className="my-10 w-11/12 md:w-8/12 mx-auto"
        options={titleOptions}
        isClearable
        placeholder="Seleccione una película"
        onChange={(selectedOption) => setSelected(selectedOption)}
      />
      <section className="text-foreground">
        <h1 className="text-primary-color font-light uppercase text-4xl my-5 pl-2">Películas</h1>
        <div>
          <div className="grid gap-y-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center mx-auto py-10">
            {filteredMovies.map((res) => (
              <div className="grid h-[360px] w-[270px]" key={res.id}>
                <article className="h-[300px] w-[260px] group transition-all duration-400 relative">
                  <Link to={`/${res.id}`}>
                    {res.premier && (
                      <div className="group-hover:-translate-y-7 duration-400 w-32 absolute left-24 scale-105 group-hover:scale-125 z-10 h-16 text-white text-xs font-bold flex items-center justify-end transform uppercase">
                        <h3 className="text-center py-2 cursor-pointer ">{res.premier}</h3>
                      </div>
                    )}
                    <img src={res.image} alt={res.title} className="hidden h-[320px] w-[290px] relative top-0 object-fill blur-lg group-hover:block group-hover:scale-105 duration-400" />
                    <img src={res.image} alt={res.title} className="h-[320px] w-[280px] relative group-hover:-top-80 object-fill group-hover:scale-105 duration-400" />
                    <div className="group-hover:-translate-y-8 duration-400 group-hover:bg-gradient-to-t relative group-hover:-top-80 from-black/90 to-black/0 w-full scale-105">
                      <h3 className="text-center py-2 cursor-pointer ">{res.title}</h3>
                    </div>
                  </Link>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-foreground font-semibold text-center text-2xl mb-4">Llevate los mejores accesorios junto a combos fantásticos</h2>
        <Link to="/candybar"><SwiperComponent items={SwiperSliderData} handleItem={handleItem} /></Link> 
      </section>
    </div>
  );
}

export default Home;
