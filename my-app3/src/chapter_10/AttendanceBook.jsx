import React from 'react';

const students = [
  {id:1, name : "inje"},
  {id:2, name : "inje2"},
  {id:3, name : "inje3"},
  {id:4, name : "inje4"}
];

const AttendanceBook = () => {
  return (
    <ul>{students.map((student) => {return <li key={student.id}>{student.name}</li>;})}</ul>
  );
}

export default AttendanceBook;
