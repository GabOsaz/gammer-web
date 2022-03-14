import React from 'react'
import SchoolsListModel from '../components/SchoolsListModel';

function RegisteredSchools() {
  return (
    <div>
        <SchoolsListModel accepted={true} />
    </div>
  )
}

export default RegisteredSchools