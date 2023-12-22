import '../styles/AddCell.css';
import { useAction } from './hooks/use-action';

interface AddCellProps {
    prevCellId: string | null;
    forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
    const { insertCellAfter } = useAction();
    return (
        <div className={`add-cell ${forceVisible && 'force-visible'}`}>
            <div className='add-buttons'>
                <button className='button is-rounded is-primary is-small' onClick={() => insertCellAfter(prevCellId, 'code')}>
                    <span className='icon is-small'><i className='fas fa-plus'></i></span>
                    Code
                </button>
                <button className='button is-rounded is-primary is-small' onClick={() => insertCellAfter(prevCellId, 'text')}>
                    <span className='icon is-small'><i className='fas fa-plus'></i></span>
                    Text
                </button>
            </div>
            <div className='divider'></div>
        </div>
    )
}

export default AddCell
