import { Fragment } from "react";
import AddCell from "./AddCell";
import CellListItem from "./cell-list-item";
import { useTypedSelector } from "./hooks/use-typed-selector";

const CellList: React.FC = () => {
    const cell = useTypedSelector(({ cells: { order, data } }) => order.map(id => data[id]));

    const renderedCells = cell.map(cell => (
        <Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell prevCellId={cell.id} />
        </Fragment>
    ))

    return (
        <div>
            <AddCell prevCellId={null} forceVisible={cell.length === 0} />
            {renderedCells}
        </div>
    )
}

export default CellList