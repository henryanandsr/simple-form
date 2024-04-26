'use client';
import React, { useState, useEffect } from 'react';
export interface Student {
  id: number;
  name: string;
  email: string;
  date_of_birth: string;
  university: string;
  degree: string;
  graduation_year: number;
  cgpa: string;
  created_at: string;
}

function ResponsePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const URI = `${process.env.NEXT_PUBLIC_API_URL}/get-form`;
    fetch(URI)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStudents(data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Response Data</h1>
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="space-y-4">
          {students.map((student) => (
            <div key={student.id} className="p-4 bg-gray-100 rounded-lg">
              <h2 className="text-lg font-semibold">{student.name}</h2>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Date of Birth:</strong> {new Date(student.date_of_birth).toLocaleDateString()}</p>
              <p><strong>University:</strong> {student.university}</p>
              <p><strong>Degree:</strong> {student.degree}</p>
              <p><strong>Graduation Year:</strong> {student.graduation_year}</p>
              <p><strong>CGPA:</strong> {student.cgpa}</p>
              <p><strong>Created At:</strong> {new Date(student.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResponsePage;
