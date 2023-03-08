import './PantryPage.css';
import { useParams } from 'react-router-dom';

export const PantryPage = () => {
  const { pantryId } = useParams();
  return <div>pantry page</div>;
};
