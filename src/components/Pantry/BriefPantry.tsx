import { ShortPantry } from '../../types';
import './BriefPantry.css';
import { DeletePantry } from '../DeletePantry/DeletePantry';
import { UpdatePantry } from '../UpdatePantry/UpdatePantry';
import { ProductsList } from '../ProductsList/ProductsList';
import { AddProduct } from '../AddProduct/AddProduct';

export const BriefPantry = ({ id, name, stats }: ShortPantry) => {
  return (
    <div className='brief-pantry'>
      <h2 className='brief-pantry__title'>Nazwa: {name}</h2>
      <div className='brief-pantry__stats'>
        <p className='brief-pantry__stats-element'>total: {stats.total}</p>
        <p className='brief-pantry__stats-element'>fresh: {stats.fresh}</p>
        <p className='brief-pantry__stats-element'>
          soon expired: {stats.expiredSoon}
        </p>
        <p className='brief-pantry__stats-element'>expired: {stats.expired}</p>
      </div>
      {/* <div className='Brief-pantry__actions'> */}
      {/*  <ProductsList pantryId={id} /> */}
      {/*  <AddProduct pantryId={id} /> */}
      {/*  <UpdatePantry pantryId={id}></UpdatePantry> */}
      {/*  <DeletePantry pantryId={id} /> */}
      {/* </div> */}
    </div>
  );
};
