import './CreatePantry.css';
import { usePantries } from '../../hooks/usePantries';
import { CreatePantryForm } from '../Forms/CreatePantryForm/CreatePantryForm';
export const CreatePantry = () => {
  const { pantriesInContext } = usePantries();
  return (
    <div className='CreatePantry'>
      Create pantry :)
      <CreatePantryForm />
      {pantriesInContext?.length ? <p>Pantry has been created.</p> : null}
    </div>
  );
};
