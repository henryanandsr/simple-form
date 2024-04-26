'use client';
import Link from "next/link";
import { useEffect, useContext } from 'react';
import { StudentContext } from '../hook/StudentContext';
function FormPage() {
  const { student, setStudent } = useContext(StudentContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent((prev: any) => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
    <h1 className="text-2xl font-semibold mb-4">Fill Form</h1>
    <form className="space-y-4">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" name="name" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
            <label htmlFor="DateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input type="date" id="DateOfBirth" name="DateOfBirth" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
            <label htmlFor="university" className="block text-sm font-medium text-gray-700">University</label>
            <input type="text" id="university" name="university" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
            <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Degree</label>
            <input type="text" id="degree" name="degree" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
            <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">Graduation Year</label>
            <input type="number" id="graduationYear" name="graduationYear" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
            <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700">CGPA</label>
            <input type="number" id="cgpa" name="cgpa" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
            <Link href="/review" className="block w-full px-3 py-2 bg-indigo-600 text-white text-center rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                Review
            </Link>
        </div>
    </form>
  </div>
  )
}

export default FormPage