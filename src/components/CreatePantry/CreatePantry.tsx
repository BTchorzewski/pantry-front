import './CreatePantry.css';
import { usePantries } from '../../hooks/usePantries';
import { CreatePantryForm } from '../Forms/CreatePantryForm/CreatePantryForm';
export const CreatePantry = () => {
  const { pantries } = usePantries();
  return (
    <div className='CreatePantry'>
      Create pantry :)
      <CreatePantryForm />
      {pantries?.length ? <p>Pantry has been created.</p> : null}
    </div>
  );
};
