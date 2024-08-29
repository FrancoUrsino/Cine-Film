import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Dates from '../cart/Dates';
import { Image } from "@nextui-org/react";
import { firestore } from '../DB/Firebase';
import { doc, getDoc } from 'firebase/firestore';

function ItemDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieRef = doc(firestore, 'dataBase', id);
        const movieDoc = await getDoc(movieRef);
        if (movieDoc.exists()) {
          setMovie(movieDoc.data());
        } else {
          console.log('No such movie!');
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div className='py-32 text-foreground'>Cargando...</div>;
  }

  return (
    <section className='text-foreground w-11/12 lg:w-10/12 mx-auto grid xl:grid-cols-2 py-20'>
      <div>
        <iframe className='w-[350px] h-[250px] md:w-[550px] md:h-[350px] mx-auto xl:w-full mb-10 lg:w-[600px] lg:h-[450px]' src={movie.video} title={movie.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className='grid lg:grid-cols-2 justify-items-center w-11/12 lg:w-10/12 xl:w-full mx-auto'>
          <div>
            <Image
              isBlurred
              width={280}
              src={movie.image}
              alt={movie.title}
              className="m-5 h-[400px] mx-auto"
            />
          </div>
          <div className='md:w-8/12 lg:w-full'>
            <h2 className='uppercase font-semibold text-center py-4'>{movie.title}</h2>
            <p className='w-9/12 mx-auto xl:w-11/12'>{movie.description}</p>
            <p className='w-9/12 mx-auto xl:w-11/12 pt-6 lg:pt-12'><span className='font-semibold'>Categoría:</span> {movie.category}</p>
            <p className='w-9/12 mx-auto xl:w-11/12'><span className='font-semibold'>Duración:</span> {movie.duration}</p>
            <p className='w-9/12 mx-auto xl:w-11/12'><span className='font-semibold'>Clasificación:</span> {movie.clasification}</p>
          </div>
        </div>
      </div>
      <div className='my-10 lg:my-0 w-11/12 mx-auto'>
        <h3 className='uppercase font-semibold text-xl text-center lg:text-start lg:text-2xl'>elegir cine</h3>
        <Dates cinemas={movie.cines} movieTitle={movie.title} movieImage={movie.image} />
      </div>
    </section>
  );
}

export default ItemDetails;
