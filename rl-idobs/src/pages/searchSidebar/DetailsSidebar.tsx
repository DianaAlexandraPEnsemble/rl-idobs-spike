import React from 'react';
import { Button } from 'primereact-rl/button';
import { InputText } from 'primereact-rl/inputtext';
import { TabPanel, TabView } from 'primereact-rl/tabview';
import { formatInputLabels } from '../../utils/formatData';
import { SearchTableData } from '../../models/SearchTableData';
import "./DetailsSidebar.css";

interface SidebarContentProps {
    selectedRow: SearchTableData | null;
    onHide: () => void;
}

const DetailsSidebar: React.FC<SidebarContentProps> = ({ selectedRow, onHide }) => {
    const tabs = [
        {
            header: 'General',
            inputs: [
                ...Object.entries(selectedRow?.generalInfo || {}),
                ['repository', selectedRow?.repository || '']
            ]
        },
        { header: 'Manager', inputs: Object.entries(selectedRow?.managerInfo || {}) },
        { header: 'Status', inputs: [['status', selectedRow?.status || '']] },
        { header: 'Membership', inputs: Object.entries(selectedRow?.membershipInfo || {}) },
        { header: '[Concept]', inputs: Object.entries(selectedRow?.conceptInfo || {}) }
    ];

    const renderTabPanels = () => {
        return tabs.map((tab, index) => (
            <TabPanel header={tab.header} key={index}>
                <form>
                    {tab.inputs.map((input, idx) => (
                        <div key={idx} style={{ marginBottom: '1rem' }}>
                            <p className="tabs-input-label">{input && formatInputLabels(input[0])}</p>
                            <div>
                                <InputText placeholder={input && input[1]} readOnly className="tabs-input" />
                                <i className="pi pi-lock" />
                            </div>
                        </div>
                    ))}
                </form>
            </TabPanel>
        ));
    };

    return (
        <div style={{ paddingTop: '1rem' }}>
            <div className="sidebar-header">
                <div className="sidebar-header-titles">
                    <Button
                        icon="pi pi-times"
                        className="p-button-text p-mr-2"
                        onClick={onHide}
                    />
                    <div>
                        <b className="sidebar-title">{selectedRow?.name}</b>
                        <p className="sidebar-subtitle">View Attribute Metadata</p>
                    </div>
                </div>
                <div className="button-group">
                    <Button label="View Full Details" className="p-button-outlined p-mr-2" />
                    <Button label="View Access Chain" className="p-button-outlined" style={{ backgroundColor: '#E9E9E3' }} />
                </div>
            </div>
            <TabView>
                {renderTabPanels()}
            </TabView>
        </div>
    );
};

export default DetailsSidebar;
