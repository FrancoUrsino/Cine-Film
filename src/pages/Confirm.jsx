import React from 'react';
import { useParams } from 'react-router-dom';
import ConfirmIdPurchase from '../components/cartConfirm/ConfirmIdPurchase';
import ConfirmPurchase from '../components/cartConfirm/ConfirmPurchase';


function Confirm() {
  const { id } = useParams();

  return (
    <div>
      {id ? (
        <ConfirmIdPurchase id={id} />
      ) : (
        <ConfirmPurchase/>
      )}
    </div>
  );
}

export default Confirm;