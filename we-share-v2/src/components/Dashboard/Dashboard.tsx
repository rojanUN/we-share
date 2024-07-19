import React from 'react';
import Card from '../common/Card';


const Dashboard: React.FC = () => {
    return (
        <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card title="Total Students" count={4} />
                <Card title="Total Teachers" count={1} />
                <Card title="Pending Students" count={0} />
                <Card title="No. Of Incidents" count={0} />
            </div>

        </div>
    );
};

export default Dashboard;
