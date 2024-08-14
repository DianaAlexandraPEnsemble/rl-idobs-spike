import { DataTable } from 'primereact-rl/datatable';
import { Column } from 'primereact-rl/column';
import { Tag } from 'primereact-rl/tag';
import { SearchTableData } from "../../models/SearchTableData.ts";
import { InputSwitch } from "primereact-rl/inputswitch";
import { useEffect, useState } from "react";
import "./SearchTable.css";
import { InputText } from "primereact-rl/inputtext";
import { Button } from "primereact-rl/button";
import { Sidebar } from "primereact-rl/sidebar";
import DetailsSidebar from '../searchSidebar/DetailsSidebar.tsx';

interface EditingCell {
    rowIndex: number | null;
    field: keyof SearchTableData | null;
}

function SearchTable() {
    const [data, setData] = useState<SearchTableData[]>([]);
    const [editingCell, setEditingCell] = useState<EditingCell>({ rowIndex: null, field: null });
    const [selectedRow, setSelectedRow] = useState<SearchTableData | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        import('../../mocks/EmployeeData.json').then(module => {
            const employeeData = module.default as SearchTableData[];
            setData(employeeData.map(item => ({
                ...item,
                owner: `${item.generalInfo.givenName} ${item.generalInfo.surname}`
            })));
        });
    }, []);

    const handleCellEdit = (rowIndex: number, field: keyof SearchTableData, value: string) => {
        const updatedData = data.map((item, index) =>
            index === rowIndex ? { ...item, [field]: value } : item
        );
        setData(updatedData);
        setEditingCell({ rowIndex: null, field: null });
    };

    const onEditClick = (rowIndex: number, field: keyof SearchTableData) => {
        setEditingCell({ rowIndex, field });
    };

    const statusTemplate = (rowData: SearchTableData) => {
        return <Tag value={rowData.status} severity={rowData.status === 'Active' ? 'success' : 'danger'} />;
    };

    const onSwitchChange = (rowData: SearchTableData, value: boolean) => {
        const updatedData = data.map(item =>
            item.code === rowData.code ? { ...item, dynamicGroups: value } : item
        );
        setData(updatedData);
    };

    const dynamicGroupsTemplate = (rowData: SearchTableData) => {
        return (
            <div className="custom-switch">
                <InputSwitch
                    checked={rowData.dynamicGroups}
                    onChange={(e) => onSwitchChange(rowData, e.value as boolean)}
                />
                <span style={{ fontSize: '0.9rem' }}>
                    {rowData.dynamicGroups ? 'ON' : 'OFF'}
                </span>
            </div>
        );
    };

    const onShowSidebar = (rowData: SearchTableData) => {
        setSelectedRow(rowData);
        setVisible(true);
    };

    const actionTemplate = (rowData: SearchTableData) => {
        return (
            <Button
                icon="pi pi-eye"
                className="p-button-text p-button-info"
                onClick={() => onShowSidebar(rowData)}
            />
        );
    };

    const editableCellTemplate = (rowData: SearchTableData, { rowIndex, field }: EditingCell) => {
        if (field === null) return null;

        const isEditing = editingCell.rowIndex === rowIndex && editingCell.field === field;
        return (
            <div className="editable-cell" style={{ position: 'relative', paddingRight: '30px' }}>
                {isEditing ? (
                    <InputText
                        value={String(rowData[field])}
                        onBlur={() => rowIndex && setEditingCell({ rowIndex: null, field: null })}
                        onChange={(e) => rowIndex && handleCellEdit(rowIndex, field, e.target.value)}
                        autoFocus
                        style={{ width: '100%' }}
                    />
                ) : (
                    <div
                        className="editable-cell"
                        onClick={() => rowIndex && onEditClick(rowIndex, field)}
                    >
                        {String(rowData[field])}
                        <i
                            className="pi pi-pencil edit-icon"
                            style={{ fontSize: '1rem', cursor: 'pointer' }}
                            onClick={() => rowIndex && onEditClick(rowIndex, field)}
                        ></i>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="p-m-4">
            <DataTable value={data} size="normal" className="custom-datatable">
                <Column header="Action" body={actionTemplate} style={{ width: '100px', textAlign: 'center' }} />
                <Column field="status" header="Status" body={statusTemplate} style={{ width: '120px', textAlign: 'center' }} />
                <Column
                    field="code"
                    header="Code"
                    body={(rowData, { rowIndex }) => editableCellTemplate(rowData, { rowIndex, field: 'code' })}
                    style={{ width: '100px' }} className="custom-text-ellipsis"
                />
                <Column
                    field="name"
                    header="Name"
                    body={(rowData, { rowIndex }) => editableCellTemplate(rowData, { rowIndex, field: 'name' })}
                    style={{ width: '150px' }} className="custom-text-ellipsis"
                />
                <Column
                    field="description"
                    header="Description"
                    body={(rowData, { rowIndex }) => editableCellTemplate(rowData, { rowIndex, field: 'description' })}
                    style={{ width: '1000px' }} className="custom-text-ellipsis"
                />
                <Column
                    field="repository"
                    header="Repository"
                    body={(rowData, { rowIndex }) => editableCellTemplate(rowData, { rowIndex, field: 'repository' })}
                    style={{ width: '200px' }} className="custom-text-ellipsis"
                />
                <Column
                    field="groupType"
                    header="Group Type"
                    body={(rowData, { rowIndex }) => editableCellTemplate(rowData, { rowIndex, field: 'groupType' })}
                    style={{ width: '150px' }} className="custom-text-ellipsis"
                />
                <Column
                    field="owner" header="Owner" body={(rowData, { rowIndex }) => editableCellTemplate(rowData, { rowIndex, field: 'owner' })} style={{ width: '150px' }} className="custom-text-ellipsis"/>
                <Column field="dynamicGroups" header="Dynamic Groups" body={dynamicGroupsTemplate} style={{ width: '250px', textAlign: 'center' }} className="custom-text-ellipsis" />
                <Column field="accounts" header="Accounts" style={{ width: '100px' }} />
                <Column field="directAccounts" header="Direct Account" style={{ width: '200px' }} className="custom-text-ellipsis"/>
            </DataTable>

            <Sidebar visible={visible} onHide={() => setVisible(false)} position="right">
                {selectedRow && <DetailsSidebar selectedRow={selectedRow} onHide={() => setVisible(false)} />}
            </Sidebar>
        </div>
    );
}

export default SearchTable;
