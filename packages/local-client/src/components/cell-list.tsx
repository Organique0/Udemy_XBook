import { Fragment, useEffect } from "react";
import AddCell from "./AddCell";
import CellListItem from "./cell-list-item";
import { useTypedSelector } from "./hooks/use-typed-selector";
import '../styles/cell-list.css';
import { useAction } from "./hooks/use-action";

const CellList: React.FC = () => {
    const cell = useTypedSelector(({ cells: { order, data } }) => order.map(id => data[id]));

    const { fetchCells } = useAction();

    useEffect(() => {
        fetchCells();
    }, [fetchCells]);


    const renderedCells = cell.map(cell => (
        <Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell prevCellId={cell.id} />
        </Fragment>
    ))

    return (
        <div className="cell-list">
            <AddCell prevCellId={null} forceVisible={cell.length === 0} />
            {renderedCells}
        </div>
    )
}

export default CellList