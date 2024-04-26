'use client';
import React, { createContext, useContext, useState } from "react";

interface Student {
  name: string;
  email: string;
  DateOfBirth: string;
  university: string;
  degree: string;
  graduationYear: string;
  cgpa: string;
}

interface StudentContextProps {
  student: Student;
  setStudent: React.Dispatch<React.SetStateAction<Student>>;
}

export const StudentContext = createContext<StudentContextProps>({
  student: {
    name: "",
    email: "",
    DateOfBirth: "",
    university: "",
    degree: "",
    graduationYear: "",
    cgpa: ""
  },
  setStudent: () => {},
});

// CREATE A PROVIDER
export const StudentProvider = ({ children }: any) => {
  const [student, setStudent] = useState<Student>({
    name: "",
    email: "",
    DateOfBirth: "",
    university: "",
    degree: "",
    graduationYear: "",
    cgpa: ""
  });

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentContext.Provider>
  );
};