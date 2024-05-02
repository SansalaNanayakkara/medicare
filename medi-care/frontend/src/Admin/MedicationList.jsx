import React from 'react';

function MedicationList({ medications }) {
  return (
    <tbody>
      {medications.map((medication) => (
        <tr key={medication.id}>
          <td>{medication.id}</td>
          <td>{medication.name}</td>
          <td>{medication.pricePerUnit}</td>
          <td>{medication.quantityAvailable}</td>
          <td>{medication.manufactureDate}</td>
          <td>{medication.expireDate}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default MedicationList;
