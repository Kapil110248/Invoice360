import React, { useState } from 'react';
import {
  FaPlus, FaFileCsv, FaUsers, FaUserCheck, FaUserSlash, FaMoneyBillWave,
  FaEye, FaEdit, FaTrash, FaTimes
} from 'react-icons/fa';
import './Payroll.css';

const EmployeeManagement = () => {
  // Dummy Data for Employees
  const [employees, setEmployees] = useState([
    { id: 1, empId: 'EMP001', name: 'John Doe', department: 'IT', designation: 'Software Engineer', joiningDate: '2022-01-15', salaryType: 'Monthly', baseSalary: 'R5,000', status: 'Active' },
    { id: 2, empId: 'EMP002', name: 'Jane Smith', department: 'HR', designation: 'HR Manager', joiningDate: '2021-05-20', salaryType: 'Monthly', baseSalary: 'R6,000', status: 'Active' },
    { id: 3, empId: 'EMP003', name: 'Robert Johnson', department: 'Finance', designation: 'Accountant', joiningDate: '2020-11-10', salaryType: 'Monthly', baseSalary: 'R4,500', status: 'Inactive' },
  ]);

  // View States
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    firstName: '', // Assuming Full Name splits or just one field. Image says 'Full Name'
    fullName: '',
    department: '',
    designation: '',
    joiningDate: '',
    salaryType: 'Monthly',
    basicSalary: '',
    bankAccount: '',
    ifsc: '',
    taxId: '',
    status: true // Active toggle default
  });

  // Derived Stats
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const inactiveEmployees = employees.filter(e => e.status === 'Inactive').length;
  // Crude sum parsing for demo
  const totalPayroll = employees.reduce((acc, curr) => {
    const val = parseFloat(curr.baseSalary.replace(/[^0-9.-]+/g, ""));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  // Handlers
  const handleAddNew = () => {
    setFormData({
      fullName: '',
      department: '',
      designation: '',
      joiningDate: '',
      salaryType: 'Monthly',
      basicSalary: '',
      bankAccount: '',
      ifsc: '',
      taxId: '',
      status: true
    });
    setIsEdit(false);
    setIsView(false);
    setShowModal(true);
  };

  const handleEdit = (emp) => {
    setFormData({
      id: emp.id,
      fullName: emp.name,
      department: emp.department,
      designation: emp.designation,
      joiningDate: emp.joiningDate,
      salaryType: emp.salaryType,
      basicSalary: emp.baseSalary.replace(/[^0-9.]/g, ''), // Strip currency for input
      bankAccount: '1234567890', // Dummy
      ifsc: 'BANK000123', // Dummy
      taxId: 'TAX12345', // Dummy
      status: emp.status === 'Active'
    });
    setIsEdit(true);
    setIsView(false);
    setShowModal(true);
  };

  const handleView = (emp) => {
    setFormData({
      id: emp.id,
      fullName: emp.name,
      department: emp.department,
      designation: emp.designation,
      joiningDate: emp.joiningDate,
      salaryType: emp.salaryType,
      basicSalary: emp.baseSalary,
      bankAccount: '1234567890',
      ifsc: 'BANK000123',
      taxId: 'TAX12345',
      status: emp.status === 'Active'
    });
    setIsEdit(false);
    setIsView(true);
    setShowModal(true);
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(e => e.id !== id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleStatus = () => {
    if (!isView) {
      setFormData({ ...formData, status: !formData.status });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) {
      setShowModal(false);
      return;
    }

    if (isEdit) {
      setEmployees(employees.map(e => e.id === formData.id ? {
        ...e,
        name: formData.fullName,
        department: formData.department,
        designation: formData.designation,
        joiningDate: formData.joiningDate,
        salaryType: formData.salaryType,
        baseSalary: `R${formData.basicSalary}`, // Add currency symbol back
        status: formData.status ? 'Active' : 'Inactive'
      } : e));
    } else {
      const newEmp = {
        id: employees.length + 1,
        empId: `EMP${String(employees.length + 1).padStart(3, '0')}`,
        name: formData.fullName,
        department: formData.department,
        designation: formData.designation,
        joiningDate: formData.joiningDate,
        salaryType: formData.salaryType,
        baseSalary: `R${formData.basicSalary}`,
        status: formData.status ? 'Active' : 'Inactive'
      };
      setEmployees([...employees, newEmp]);
    }
    setShowModal(false);
  };

  return (
    <div className="em-container">
      {/* Header */}
      <div className="em-header">
        <h2>Employee Management</h2>
        <div className="em-header-actions">
          <button className="em-btn em-btn-add" onClick={handleAddNew}>
            <FaPlus /> Add Employee
          </button>
          <button className="em-btn em-btn-import">
            <FaFileCsv /> Import CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="em-stats-grid">
        <div className="em-stat-card">
          <div className="em-stat-icon-wrapper em-icon-total">
            <FaUsers />
          </div>
          <div className="em-stat-info">
            <h3>{totalEmployees}</h3>
            <p>Total Employees</p>
          </div>
        </div>
        <div className="em-stat-card">
          <div className="em-stat-icon-wrapper em-icon-active">
            <FaUserCheck />
          </div>
          <div className="em-stat-info">
            <h3>{activeEmployees}</h3>
            <p>Active Employees</p>
          </div>
        </div>
        <div className="em-stat-card">
          <div className="em-stat-icon-wrapper em-icon-inactive">
            <FaUserSlash />
          </div>
          <div className="em-stat-info">
            <h3>{inactiveEmployees}</h3>
            <p>Inactive Employees</p>
          </div>
        </div>
        <div className="em-stat-card">
          <div className="em-stat-icon-wrapper em-icon-payroll">
            <FaMoneyBillWave />
          </div>
          <div className="em-stat-info">
            <h3>R{totalPayroll.toLocaleString()}</h3>
            <p>Total Payroll</p>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="em-table-container">
        <table className="em-table">
          <thead>
            <tr>
              <th>EMPLOYEE ID</th>
              <th>FULL NAME</th>
              <th>DEPARTMENT</th>
              <th>DESIGNATION</th>
              <th>JOINING DATE</th>
              <th>SALARY TYPE</th>
              <th>BASE SALARY</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="em-row">
                <td>{emp.empId}</td>
                <td><strong>{emp.name}</strong></td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>{emp.joiningDate}</td>
                <td>{emp.salaryType}</td>
                <td>{emp.baseSalary}</td>
                <td>
                  <span className={`em-status-badge ${emp.status === 'Active' ? 'em-status-active' : 'em-status-inactive'}`}>
                    {emp.status}
                  </span>
                </td>
                <td>
                  <div className="em-actions">
                    <button className="em-action-btn em-btn-view" onClick={() => handleView(emp)}><FaEye /></button>
                    <button className="em-action-btn em-btn-edit" onClick={() => handleEdit(emp)}><FaEdit /></button>
                    <button className="em-action-btn em-btn-delete" onClick={() => handleDelete(emp.id)}><FaTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="em-modal-overlay">
          <div className="em-modal-content">
            <div className="em-modal-header">
              <h3>{isEdit ? 'Edit Employee' : isView ? 'Employee Details' : 'Add New Employee'}</h3>
              <button className="em-close-btn" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="em-modal-body">
                {/* Full Name - Full Width */}
                <div className="em-form-group full-width">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="em-input"
                    value={formData.fullName}
                    onChange={handleChange}
                    readOnly={isView}
                    required
                  />
                </div>

                <div className="em-form-grid">
                  {/* Department */}
                  <div className="em-form-group">
                    <label>Department</label>
                    <select
                      name="department"
                      className="em-select"
                      value={formData.department}
                      onChange={handleChange}
                      disabled={isView}
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>

                  {/* Designation */}
                  <div className="em-form-group">
                    <label>Designation</label>
                    <select
                      name="designation"
                      className="em-select"
                      value={formData.designation}
                      onChange={handleChange}
                      disabled={isView}
                      required
                    >
                      <option value="">Select Designation</option>
                      <option value="Software Engineer">Software Engineer</option>
                      <option value="HR Manager">HR Manager</option>
                      <option value="Accountant">Accountant</option>
                      <option value="Sales Executive">Sales Executive</option>
                    </select>
                  </div>

                  {/* Joining Date */}
                  <div className="em-form-group">
                    <label>Joining Date</label>
                    <input
                      type="date"
                      name="joiningDate"
                      className="em-input"
                      value={formData.joiningDate}
                      onChange={handleChange}
                      readOnly={isView}
                      required
                    />
                  </div>

                  {/* Salary Type */}
                  <div className="em-form-group">
                    <label>Salary Type</label>
                    <select
                      name="salaryType"
                      className="em-select"
                      value={formData.salaryType}
                      onChange={handleChange}
                      disabled={isView}
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Hourly">Hourly</option>
                    </select>
                  </div>

                  {/* Basic Salary */}
                  <div className="em-form-group">
                    <label>Basic Salary</label>
                    <input
                      type="number"
                      name="basicSalary"
                      className="em-input"
                      value={formData.basicSalary}
                      onChange={handleChange}
                      readOnly={isView}
                      required
                    />
                  </div>

                  {/* Bank Account Number */}
                  <div className="em-form-group">
                    <label>Bank Account Number</label>
                    <input
                      type="text"
                      name="bankAccount"
                      className="em-input"
                      value={formData.bankAccount}
                      onChange={handleChange}
                      readOnly={isView}
                    />
                  </div>

                  {/* IFSC / Branch Name */}
                  <div className="em-form-group">
                    <label>IFSC / Branch Name</label>
                    <input
                      type="text"
                      name="ifsc"
                      className="em-input"
                      value={formData.ifsc}
                      onChange={handleChange}
                      readOnly={isView}
                    />
                  </div>

                  {/* Tax ID */}
                  <div className="em-form-group">
                    <label>Tax ID (PAN / VAT)</label>
                    <input
                      type="text"
                      name="taxId"
                      className="em-input"
                      value={formData.taxId}
                      onChange={handleChange}
                      readOnly={isView}
                    />
                  </div>
                </div>

                {/* Active Status Toggle */}
                <div className="em-toggle-wrapper" onClick={handleToggleStatus}>
                  <div className={`em-toggle ${formData.status ? 'active' : ''}`}>
                    <div className="em-toggle-circle"></div>
                  </div>
                  <span className="em-toggle-label">Active Status</span>
                </div>

              </div>

              <div className="em-modal-footer">
                <button type="button" className="em-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                {!isView && (
                  <button type="submit" className="em-btn-submit">
                    {isEdit ? 'Update Employee' : 'Add Employee'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default EmployeeManagement;
