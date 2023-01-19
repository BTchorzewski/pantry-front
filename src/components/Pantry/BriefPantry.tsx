import { ShortPantry } from '../../types';
import './BriefPantry.css';
import { DeletePantry } from '../DeletePantry/DeletePantry';
import { UpdatePantry } from '../UpdatePantry/UpdatePantry';
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
      <div className='Brief-pantry__actions'>
        <button>Show list</button>
        <button>Add item</button>
        <UpdatePantry pantryId={id}></UpdatePantry>
        <DeletePantry pantryId={id} />
      </div>
    </div>
  );
};
