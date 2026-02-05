import React, { useState } from 'react';
import { FaUserPlus, FaTimes, FaMoneyBill } from 'react-icons/fa';
import './Payroll.css';

const SalaryStructure = () => {
  // Dummy Data for Salary Structures
  const [structures] = useState([
    { id: 'STR001', name: 'Standard Staff' },
    { id: 'STR002', name: 'Management' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedStructureId, setSelectedStructureId] = useState(null);

  // Form State for Add Component
  const [componentForm, setComponentForm] = useState({
    name: '',
    type: 'Earning',
    calcType: 'Fixed',
    amount: '',
    taxable: true,
    notes: ''
  });

  const handleAssign = () => {
    alert('Assign logic here');
  };

  const handleAddComponent = (id) => {
    setSelectedStructureId(id);
    setComponentForm({
      name: '',
      type: 'Earning',
      calcType: 'Fixed',
      amount: '',
      taxable: true,
      notes: ''
    });
    setShowModal(true);
  };

  const handleViewComponents = (id) => {
    alert(`View components for ${id}`);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setComponentForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveComponent = (e) => {
    e.preventDefault();
    // Logic to save component to structure
    console.log('Saving component for structure:', selectedStructureId, componentForm);
    setShowModal(false);
  };

  return (
    <div className="em-container">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-main)' }}>Salary Structure Management</h2>
      </div>

      <div className="em-table-container" style={{ padding: '20px' }}>
        {/* Toolbar */}
        <div className="ss-toolbar">
          <select className="ss-select ss-select-primary">
            <option>Select Structure</option>
            {structures.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <select className="ss-select">
            <option>Select Employee</option>
            <option>John Doe</option>
            <option>Jane Smith</option>
          </select>

          <button className="ss-btn-assign" onClick={handleAssign}>
            <FaUserPlus /> Assign
          </button>
        </div>

        {/* Table */}
        <table className="em-table">
          <thead>
            <tr>
              <th>STRUCTURE ID</th>
              <th>STRUCTURE NAME</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {structures.map(str => (
              <tr key={str.id} className="em-row">
                <td>{str.id}</td>
                <td>{str.name}</td>
                <td>
                  <div className="ss-action-group">
                    <button
                      className="ss-btn-action-outline ss-btn-add-comp"
                      onClick={() => handleAddComponent(str.id)}
                    >
                      Add Component
                    </button>
                    <button
                      className="ss-btn-action-outline ss-btn-view-comp"
                      onClick={() => handleViewComponents(str.id)}
                    >
                      View Components
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Component Modal */}
      {showModal && (
        <div className="em-modal-overlay">
          <div className="em-modal-content" style={{ maxWidth: '600px' }}>
            <div className="em-modal-header">
              <h3>Add Component</h3>
              <button className="em-close-btn" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            <form onSubmit={handleSaveComponent}>
              <div className="em-modal-body">
                <div className="em-form-group">
                  <label>Component Name</label>
                  <input
                    type="text"
                    name="name"
                    className="em-input"
                    placeholder="e.g., Basic, HRA, Bonus"
                    value={componentForm.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="em-form-grid">
                  <div className="em-form-group">
                    <label>Component Type</label>
                    <select
                      name="type"
                      className="em-select"
                      value={componentForm.type}
                      onChange={handleFormChange}
                    >
                      <option value="Earning">Earning</option>
                      <option value="Deduction">Deduction</option>
                    </select>
                  </div>
                  <div className="em-form-group">
                    <label>Calculation Type</label>
                    <select
                      name="calcType"
                      className="em-select"
                      value={componentForm.calcType}
                      onChange={handleFormChange}
                    >
                      <option value="Fixed">Fixed</option>
                      <option value="Percentage">Percentage of Basic</option>
                    </select>
                  </div>
                </div>
                <div className="em-form-group">
                  <label>Amount</label>
                  <div className="em-input-wrapper">
                    <input
                      type="number"
                      name="amount"
                      className="em-input em-input-with-icon"
                      placeholder="Enter amount"
                      value={componentForm.amount}
                      onChange={handleFormChange}
                      required
                    />
                    <FaMoneyBill className="em-input-icon" />
                  </div>
                </div>

                <div className="em-checkbox-wrapper">
                  <input
                    type="checkbox"
                    name="taxable"
                    id="taxableCheck"
                    className="em-checkbox"
                    checked={componentForm.taxable}
                    onChange={handleFormChange}
                  />
                  <label htmlFor="taxableCheck" className="em-checkbox-label">Taxable</label>
                </div>

                <div className="em-form-group">
                  <label>Notes (optional)</label>
                  <textarea
                    name="notes"
                    className="em-textarea"
                    value={componentForm.notes}
                    onChange={handleFormChange}
                  ></textarea>
                </div>
              </div>
              <div className="em-modal-footer">
                <button type="button" className="em-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="em-btn-submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryStructure;
