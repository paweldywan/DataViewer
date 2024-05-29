import { Table } from "reactstrap";
import { Column, Image } from "../interfaces";
import AppCarousel from "./AppCarousel";

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
        <Table
            striped
            bordered
            hover
            responsive
            dark
        >
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
                                {column.type === 'image' && (
                                    <img
                                        src={String(element[column.field])}
                                        alt={titleField ? String(element[titleField]) : undefined}
                                        style={{ maxWidth: '20rem', maxHeight: '20rem' }}
                                    />
                                )}
                                {column.type === 'images' && (
                                    <AppCarousel
                                        items={(element[column.field] as Image[]).map((image: Image) => ({
                                            src: image.url,
                                            altText: titleField ? String(element[titleField]) : undefined
                                        }))}
                                        style={{ maxWidth: '20rem', maxHeight: '20rem' }}
                                    />
                                )}
                                {column.type !== 'image' && column.type !== 'images' && String(element[column.field])}
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default AppTable;