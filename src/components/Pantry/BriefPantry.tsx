import { ShortPantry } from '../../types';
import './BriefPantry.css';
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
    </div>
  );
};
