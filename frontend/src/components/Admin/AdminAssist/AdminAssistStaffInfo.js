import React, { useState } from 'react';
import '../../../App.css';

function AdminAssistStaffInfo() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [newTeacher, setNewTeacher] = useState('');
  const [newStudent, setNewStudent] = useState('');
  const [newParent, setNewParent] = useState('');
  const [editTeacherIndex, setEditTeacherIndex] = useState(null);
  const [editStudentIndex, setEditStudentIndex] = useState(null);
  const [editParentIndex, setEditParentIndex] = useState(null);
  const [editTeacherValue, setEditTeacherValue] = useState('');
  const [editStudentValue, setEditStudentValue] = useState('');
  const [editParentValue, setEditParentValue] = useState('');

  const addTeacher = () => {
    if (newTeacher.trim() !== '') {
      setTeachers([...teachers, newTeacher]);
      setNewTeacher('');
    }
  };

  const deleteTeacher = (index) => {
    const updatedTeachers = [...teachers];
    updatedTeachers.splice(index, 1);
    setTeachers(updatedTeachers);
  };

  const editTeacher = (index) => {
    setEditTeacherIndex(index);
    setEditTeacherValue(teachers[index]);
  };

  const updateTeacher = () => {
    if (editTeacherValue.trim() !== '') {
      const updatedTeachers = [...teachers];
      updatedTeachers[editTeacherIndex] = editTeacherValue;
      setTeachers(updatedTeachers);
      setEditTeacherIndex(null);
      setEditTeacherValue('');
    }
  };

  const addStudent = () => {
    if (newStudent.trim() !== '') {
      setStudents([...students, newStudent]);
      setNewStudent('');
    }
  };

  const deleteStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  const editStudent = (index) => {
    setEditStudentIndex(index);
    setEditStudentValue(students[index]);
  };

  const updateStudent = () => {
    if (editStudentValue.trim() !== '') {
      const updatedStudents = [...students];
      updatedStudents[editStudentIndex] = editStudentValue;
      setStudents(updatedStudents);
      setEditStudentIndex(null);
      setEditStudentValue('');
    }
  };

  const addParent = () => {
    if (newParent.trim() !== '') {
      setParents([...parents, newParent]);
      setNewParent('');
    }
  };

  const deleteParent = (index) => {
    const updatedParents = [...parents];
    updatedParents.splice(index, 1);
    setParents(updatedParents);
  };

  const editParent = (index) => {
    setEditParentIndex(index);
    setEditParentValue(parents[index]);
  };

  const updateParent = () => {
    if (editParentValue.trim() !== '') {
      const updatedParents = [...parents];
      updatedParents[editParentIndex] = editParentValue;
      setParents(updatedParents);
      setEditParentIndex(null);
      setEditParentValue('');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="section">
          <h2>Teachers</h2>
          <div className="input-group">
            <input
              type="text"
              value={newTeacher}
              onChange={(e) => setNewTeacher(e.target.value)}
              placeholder="Enter teacher name"
            />
            <button onClick={addTeacher}>Add Teacher</button>
          </div>
          <ul>
            {teachers.map((teacher, index) => (
              <li key={index}>
                {editTeacherIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editTeacherValue}
                      onChange={(e) => setEditTeacherValue(e.target.value)}
                    />
                    <button onClick={updateTeacher}>Update</button>
                  </>
                ) : (
                  <>
                    {teacher}
                    <button onClick={() => editTeacher(index)}>Edit</button>
                    <button onClick={() => deleteTeacher(index)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="section">
          <h2>Students</h2>
          <div className="input-group">
            <input
              type="text"
              value={newStudent}
              onChange={(e) => setNewStudent(e.target.value)}
              placeholder="Enter student name"
            />
            <button onClick={addStudent}>Add Student</button>
          </div>
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                {editStudentIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editStudentValue}
                      onChange={(e) => setEditStudentValue(e.target.value)}
                    />
                    <button onClick={updateStudent}>Update</button>
                  </>
                ) : (
                  <>
                    {student}
                    <button onClick={() => editStudent(index)}>Edit</button>
                    <button onClick={() => deleteStudent(index)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="section">
          <h2>Parents</h2>
          <div className="input-group">
            <input
              type="text"
              value={newParent}
              onChange={(e) => setNewParent(e.target.value)}
              placeholder="Enter parent name"
            />
            <button onClick={addParent}>Add Parent</button>
          </div>
          <ul>
            {parents.map((parent, index) => (
              <li key={index}>
                {editParentIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editParentValue}
                      onChange={(e) => setEditParentValue(e.target.value)}
                    />
                    <button onClick={updateParent}>Update</button>
                  </>
                ) : (
                  <>
                    {parent}
                    <button onClick={() => editParent(index)}>Edit</button>
                    <button onClick={() => deleteParent(index)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminAssistStaffInfo;
