import { Column, Image } from "../interfaces";

interface Props<T> {
    columns: Column<T>[];
    data: T[];
    keyField: keyof T;
    titleField?: keyof T;
}

const AppTable = <T,>({
    columns,
    data,
    keyField,
    titleField
}: Props<T>) => {
    return (
        <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    {columns.map(column => <th key={String(column.field)}>{column.title}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map(element =>
                    <tr key={String(element[keyField])}>
                        {columns.map(column =>
                            <td key={String(column.field)}>
                                {column.type === 'image' && <img src={String(element[column.field])} alt={titleField ? String(element[titleField]) : undefined} />}
                                {column.type === 'images' && (
                                    <div style={{ display: 'flex' }}>
                                        {(element[column.field] as Image[]).map((image: Image) => <img key={image.id} src={image.url} alt={titleField ? String(element[titleField]) : undefined} />)}
                                    </div>
                                )}
                                {column.type !== 'image' && column.type !== 'images' && String(element[column.field])}
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default AppTable;