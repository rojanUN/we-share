import Card from "../common/Card";
import React, { useEffect, useState } from "react";
import { number } from "yup";
import { getExam } from "../../services/examService";
import { getUsers } from "../../services/userServices";

const Dashboard: React.FC = () => {
    const [userCount, setUserCount] = useState<number>(0);
    const [examCount, setExamCount] = useState<number>(0);

    const countUsers = async () => {
        const response = await getUsers();

        setUserCount(
            response.filter(
                (user: any) => user.role === 'USER' && user.status === 'ACTIVE'
            ).length
        );
    };

    const countExams = async () => {
        const response = await getExam();
        setExamCount(response.length);
    };
    useEffect(() => {
        countUsers();
        countExams();
    });
    return (
        <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card title="Total Examinee" count={userCount} />
                <Card title="Total Code Questions" count={examCount} />
                <Card title="Total MCQ Questions" count={1} />
                <Card title="Active Exam Schedules" count={1} />
            </div>
        </div>
    );
};

export default Dashboard;
