import React from 'react';
import { useParams } from 'react-router-dom';
import IdCandybar from '../components/candy/IdCandybar';
import Candybar from '../components/candy/Candybar';

function Candy() {
  const { id } = useParams();

  return (
    <div>
      {id ? (
        <IdCandybar id={id} />
      ) : (
        <Candybar />
      )}
    </div>
  );
}

export default Candy;