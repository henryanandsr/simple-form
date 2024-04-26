'use client';
import React, { useState, useContext } from 'react';
import { StudentContext } from '../hook/StudentContext';
import Link from 'next/link';

function ReviewPage() {
    const { student } = useContext(StudentContext);
    const [submissionStatus, setSubmissionStatus] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = () => {
        const URI = process.env.NEXT_PUBLIC_API_URL + '/post-form';
        fetch(URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        })
        .then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        })
        .then((data) => {
            if (data.code === 201) {
                setSubmissionStatus('success');
            } else {
                throw new Error(data.message || 'Unknown error');
            }
        })
        .catch((err) => {
            setErrorMessage(err.message);
            setSubmissionStatus("error");
        });
    };

    if (submissionStatus === 'success') {
        return (
            <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg text-center">
                <h1 className="text-2xl font-semibold text-green-500">Submission Successful!</h1>
                <p>Your data has been saved.</p>
            </div>
        );
    } else if (submissionStatus === 'error') {
        return (
            <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg text-center">
                <h1 className="text-2xl font-semibold text-red-500">Error</h1>
                <p className='mb-4'>Error submitting data: {errorMessage}</p>
                <Link href={"/fill"} className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" >
                    Go Back
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Review Page</h1>
            <div>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Date of Birth:</strong> {student.DateOfBirth}</p>
                <p><strong>University:</strong> {student.university}</p>
                <p><strong>Degree:</strong> {student.degree}</p>
                <p><strong>Graduation Year:</strong> {student.graduationYear}</p>
                <p><strong>CGPA:</strong> {student.cgpa}</p>
            </div>
            <button className="block w-full px-3 py-2 bg-indigo-600 text-white text-center rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}

export default ReviewPage;
