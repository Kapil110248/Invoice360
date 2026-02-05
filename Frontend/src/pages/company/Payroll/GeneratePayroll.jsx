import React, { useState } from 'react';
import {
  FaPlus, FaCheckCircle, FaFilter, FaCalendarAlt, FaBuilding,
  FaEye, FaEnvelope, FaWhatsapp, FaTrash, FaCheck, FaTimes,
  FaFileInvoiceDollar, FaDownload, FaPrint
} from 'react-icons/fa';
import './Payroll.css';
import toast from 'react-hot-toast';

const GeneratePayroll = () => {
  // Dummy Data
  const [payrolls, setPayrolls] = useState([
    { id: 1, name: 'Rahul Sharma', department: 'Engineering', month: 'January 2024', basic: 'R50,000', earnings: 'R15,000', deductions: 'R8,000', net: 'R57,000', status: 'Paid' },
    { id: 2, name: 'Priya Singh', department: 'HR', month: 'January 2024', basic: 'R45,000', earnings: 'R12,000', deductions: 'R7,500', net: 'R49,500', status: 'Pending' },
    { id: 3, name: 'Amit Patel', department: 'Finance', month: 'February 2024', basic: 'R55,000', earnings: 'R18,000', deductions: 'R9,000', net: 'R64,000', status: 'Paid' },
  ]);

  // Modal States
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  // Filters State
  const [filters, setFilters] = useState({
    month: 'All Months',
    department: 'All'
  });

  // Form State for Generate Payroll
  const [genForm, setGenForm] = useState({
    month: 'January',
    year: '2023',
    selectAll: false,
    selectedEmployees: [], // ids
    remarks: ''
  });

  // Dummy Employees for Selection
  const employeesList = [
    { id: 101, name: 'Rahul Sharma (Engineering)' },
    { id: 102, name: 'Priya Singh (HR)' },
    { id: 103, name: 'Amit Patel (Finance)' },
    { id: 104, name: 'Sneha Reddy (Engineering)' },
    { id: 105, name: 'Vikas Kumar (Marketing)' },
  ];

  const handleGenerateClick = () => {
    setGenForm({
      month: 'January',
      year: '2023',
      selectAll: false,
      selectedEmployees: [],
      remarks: ''
    });
    setShowGenerateModal(true);
  };

  const handleClearFilters = () => {
    setFilters({ month: 'All Months', department: 'All' });
  };

  // Selection Logic
  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setGenForm(prev => ({
        ...prev,
        selectAll: true,
        selectedEmployees: employeesList.map(emp => emp.id)
      }));
    } else {
      setGenForm(prev => ({
        ...prev,
        selectAll: false,
        selectedEmployees: []
      }));
    }
  };

  const handleEmployeeSelect = (id) => {
    setGenForm(prev => {
      const isSelected = prev.selectedEmployees.includes(id);
      const newSelection = isSelected
        ? prev.selectedEmployees.filter(empId => empId !== id)
        : [...prev.selectedEmployees, id];

      return {
        ...prev,
        selectedEmployees: newSelection,
        selectAll: newSelection.length === employeesList.length
      };
    });
  };

  // Action Handlers
  const handleGenerateSubmit = () => {
    if (genForm.selectedEmployees.length === 0) {
      toast.error('Please select at least one employee');
      return;
    }
    toast.success(`Payroll generated for ${genForm.selectedEmployees.length} employees!`);
    setShowGenerateModal(false);
    // In a real app, this would refresh the list
  };

  const handleView = (payroll) => {
    setSelectedPayroll(payroll);
    setShowViewModal(true);
  };

  const handleApprove = (id) => {
    setPayrolls(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'Paid' } : p
    ));
    toast.success('Payroll approved successfully!');
  };

  const handleEmail = (name) => {
    toast.success(`Payslip emailed to ${name}`);
  };

  const handleWhatsApp = (name) => {
    toast.success(`Payslip sent via WhatsApp to ${name}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payroll entry?')) {
      setPayrolls(payrolls.filter(p => p.id !== id));
      toast.success('Payroll entry deleted');
    }
  };

  const handleBulkApprove = () => {
    const pendingCount = payrolls.filter(p => p.status === 'Pending').length;
    if (pendingCount === 0) {
      toast('No pending payrolls to approve', { icon: 'ℹ️' });
      return;
    }

    if (window.confirm(`Approve all ${pendingCount} pending payrolls?`)) {
      setPayrolls(prev => prev.map(p => ({ ...p, status: 'Paid' })));
      toast.success('All pending payrolls approved!');
    }
  };

  const handlePreview = () => {
    toast('Calculating and generating preview...', { icon: '🧮' });
  };

  const handleDownloadAll = () => {
    toast.success('Downloading all payslips...');
  };

  const handlePrint = () => {
    if (!selectedPayroll) return;

    const printContent = `
            <html>
                <head>
                    <title>Payslip - ${selectedPayroll.name}</title>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #333; }
                        .payslip-container { max-width: 800px; margin: 0 auto; border: 1px solid #ccc; padding: 30px; border-radius: 8px; }
                        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2c3e50; padding-bottom: 20px; }
                        .header h1 { margin: 0; color: #2c3e50; font-size: 28px; }
                        .header p { margin: 5px 0; color: #666; }
                        .emp-info { display: flex; justify-content: space-between; margin-bottom: 30px; background: #f8f9fa; padding: 15px; border-radius: 6px; }
                        .section-title { font-size: 16px; font-weight: bold; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px; color: #2c3e50; }
                        .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
                        .row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
                        .amount { font-weight: 500; }
                        .total-row { display: flex; justify-content: space-between; margin-top: 20px; padding-top: 15px; border-top: 2px solid #2c3e50; font-weight: bold; font-size: 18px; }
                        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #999; }
                        .status-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; color: white; background: ${selectedPayroll.status === 'Paid' ? '#166534' : '#f59e0b'}; }
                    </style>
                </head>
                <body>
                    <div class="payslip-container">
                        <div class="header">
                            <h1>COMPANY NAME</h1>
                            <p>123 Business Street, Tech Park</p>
                            <p>Payslip for the month of ${selectedPayroll.month}</p>
                        </div>

                        <div class="emp-info">
                            <div>
                                <p><strong>Employee Name:</strong> ${selectedPayroll.name}</p>
                                <p><strong>Department:</strong> ${selectedPayroll.department}</p>
                            </div>
                            <div style="text-align: right;">
                                <p><strong>Payment Status:</strong> <span class="status-badge">${selectedPayroll.status}</span></p>
                                <p><strong>Date Generated:</strong> ${new Date().toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div class="details-grid">
                            <div>
                                <div class="section-title">Earnings</div>
                                <div class="row"><span>Basic Salary</span> <span class="amount">${selectedPayroll.basic}</span></div>
                                <div class="row"><span>Allowances</span> <span class="amount">${selectedPayroll.earnings.replace('R', '') - 0 > 0 ? 'Included' : '-'}</span></div>
                                <div class="row" style="font-weight: bold; margin-top: 10px; border-top: 1px solid #eee; padding-top: 5px;">
                                    <span>Total Earnings</span> <span>${selectedPayroll.earnings !== '-' ? 'R' + (parseInt(selectedPayroll.basic.replace(/[^0-9]/g, '')) + parseInt(selectedPayroll.earnings.replace(/[^0-9]/g, ''))).toLocaleString() : selectedPayroll.basic}</span>
                                </div>
                            </div>
                            <div>
                                <div class="section-title">Deductions</div>
                                <div class="row"><span>Tax & PF</span> <span class="amount">${selectedPayroll.deductions}</span></div>
                                <div class="row"><span>Other Deductions</span> <span class="amount">-</span></div>
                                <div class="row" style="font-weight: bold; margin-top: 10px; border-top: 1px solid #eee; padding-top: 5px;">
                                    <span>Total Deductions</span> <span>${selectedPayroll.deductions}</span>
                                </div>
                            </div>
                        </div>

                        <div class="total-row">
                            <span>Net Payable Amount</span>
                            <span>${selectedPayroll.net}</span>
                        </div>

                        <div class="footer">
                            <p>This is a computer-generated document and does not require a signature.</p>
                        </div>
                    </div>
                </body>
            </html>
        `;

    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="em-container">
      {/* Header */}
      <div className="em-header">
        <h2>Payroll Management</h2>
        <button className="em-btn em-btn-add" onClick={handleGenerateClick}>
          <FaPlus /> Generate Payroll
        </button>
      </div>

      {/* Filter Section */}
      <div className="gp-filter-bar">
        <div className="gp-filter-header">
          <FaFilter /> Filters
        </div>
        <div className="gp-filter-row">
          <div className="gp-filter-controls">
            <div className="gp-filter-group">
              <label className="gp-filter-label"><FaCalendarAlt /> Month</label>
              <select
                className="ss-select"
                value={filters.month}
                onChange={(e) => setFilters({ ...filters, month: e.target.value })}
              >
                <option>All Months</option>
                <option>January</option>
                <option>February</option>
              </select>
            </div>
            <div className="gp-filter-group">
              <label className="gp-filter-label"><FaBuilding /> Department</label>
              <select
                className="ss-select"
                value={filters.department}
                onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              >
                <option>All</option>
                <option>Engineering</option>
                <option>HR</option>
                <option>Finance</option>
              </select>
            </div>
            <button className="gp-btn-clear" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
          <button className="gp-btn-bulk" onClick={handleBulkApprove}>
            <FaCheckCircle /> Bulk Approve ({payrolls.filter(p => p.status === 'Pending').length})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="em-table-container">
        <table className="em-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}><input type="checkbox" /></th>
              <th>EMPLOYEE NAME</th>
              <th>DEPARTMENT</th>
              <th>MONTH</th>
              <th>BASIC PAY</th>
              <th>EARNINGS</th>
              <th>DEDUCTIONS</th>
              <th>NET PAY</th>
              <th>PAYMENT STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map(pay => (
              <tr key={pay.id} className="em-row">
                <td><input type="checkbox" /></td>
                <td><strong>{pay.name}</strong></td>
                <td>{pay.department}</td>
                <td>{pay.month}</td>
                <td>{pay.basic}</td>
                <td>{pay.earnings}</td>
                <td>{pay.deductions}</td>
                <td><strong>{pay.net}</strong></td>
                <td>
                  <span className={pay.status === 'Paid' ? 'gp-status-paid' : 'gp-status-pending'}>
                    {pay.status}
                  </span>
                </td>
                <td>
                  <div className="gp-action-row">
                    <button
                      className="gp-icon-btn gp-btn-eye"
                      title="View Details"
                      onClick={() => handleView(pay)}
                    >
                      <FaEye />
                    </button>
                    {pay.status === 'Pending' && (
                      <button
                        className="gp-icon-btn gp-btn-check"
                        title="Approve Payment"
                        onClick={() => handleApprove(pay.id)}
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button
                      className="gp-icon-btn gp-btn-mail"
                      title="Email Payslip"
                      onClick={() => handleEmail(pay.name)}
                    >
                      <FaEnvelope />
                    </button>
                    <button
                      className="gp-icon-btn gp-btn-whatsapp"
                      title="Send via WhatsApp"
                      onClick={() => handleWhatsApp(pay.name)}
                    >
                      <FaWhatsapp />
                    </button>
                    <button
                      className="gp-icon-btn gp-btn-trash"
                      title="Delete Entry"
                      onClick={() => handleDelete(pay.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Generate Payroll Modal */}
      {showGenerateModal && (
        <div className="em-modal-overlay">
          <div className="em-modal-content" style={{ maxWidth: '700px' }}>
            <div className="em-modal-header">
              <h3>Generate Payroll</h3>
              <button className="em-close-btn" onClick={() => setShowGenerateModal(false)}><FaTimes /></button>
            </div>
            <div className="em-modal-body">
              <div className="em-form-grid">
                <div className="em-form-group">
                  <label><FaCalendarAlt /> Month</label>
                  <select
                    className="em-select"
                    value={genForm.month}
                    onChange={(e) => setGenForm({ ...genForm, month: e.target.value })}
                  >
                    <option>January</option>
                    <option>February</option>
                    {/* ...other months */}
                  </select>
                </div>
                <div className="em-form-group">
                  <label><FaCalendarAlt /> Year</label>
                  <select
                    className="em-select"
                    value={genForm.year}
                    onChange={(e) => setGenForm({ ...genForm, year: e.target.value })}
                  >
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                  </select>
                </div>
              </div>

              <div className="em-form-group">
                <label>Select Employees</label>
                <div className="em-checkbox-wrapper" style={{ marginBottom: '10px' }}>
                  <input
                    type="checkbox"
                    className="em-checkbox"
                    checked={genForm.selectAll}
                    onChange={handleSelectAll}
                    id="selectAll"
                  />
                  <label htmlFor="selectAll" className="em-checkbox-label">Select All</label>
                </div>
                <div className="gp-employee-list-box">
                  {employeesList.map(emp => (
                    <div key={emp.id} className="gp-list-item">
                      <input
                        type="checkbox"
                        className="em-checkbox"
                        checked={genForm.selectedEmployees.includes(emp.id)}
                        onChange={() => handleEmployeeSelect(emp.id)}
                        id={`emp-${emp.id}`}
                      />
                      <label htmlFor={`emp-${emp.id}`} style={{ marginBottom: 0, fontWeight: 400 }}>{emp.name}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="em-form-group">
                <label>Remarks (Optional)</label>
                <textarea
                  className="em-textarea"
                  placeholder="Enter remarks"
                  value={genForm.remarks}
                  onChange={(e) => setGenForm({ ...genForm, remarks: e.target.value })}
                ></textarea>
              </div>

              <div className="gp-modal-actions">
                <button className="gp-btn-action-modal gp-btn-outline" onClick={handlePreview}>
                  <FaFileInvoiceDollar /> Preview & Calculate
                </button>
                <button className="gp-btn-action-modal gp-btn-secondary-outline" onClick={handleDownloadAll}>
                  <FaDownload /> Download All Payslips
                </button>
              </div>
            </div>

            <div className="em-modal-footer">
              <button className="em-btn-cancel" onClick={() => setShowGenerateModal(false)}>Cancel</button>
              <button className="em-btn-submit" onClick={handleGenerateSubmit}>Generate Payroll</button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewModal && selectedPayroll && (
        <div className="em-modal-overlay">
          <div className="em-modal-content" style={{ maxWidth: '500px' }}>
            <div className="em-modal-header">
              <h3>Payslip Details</h3>
              <button className="em-close-btn" onClick={() => setShowViewModal(false)}><FaTimes /></button>
            </div>
            <div className="em-modal-body">
              <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                <h4>{selectedPayroll.name}</h4>
                <p style={{ color: '#666' }}>{selectedPayroll.department}</p>
                <span className={selectedPayroll.status === 'Paid' ? 'gp-status-paid' : 'gp-status-pending'} style={{ marginTop: '10px' }}>
                  {selectedPayroll.status}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Pay Period:</span>
                  <strong>{selectedPayroll.month}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Basic Pay:</span>
                  <strong>{selectedPayroll.basic}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Total Earnings:</span>
                  <span style={{ color: 'green' }}>+ {selectedPayroll.earnings}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Total Deductions:</span>
                  <span style={{ color: 'red' }}>- {selectedPayroll.deductions}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #ccc', fontSize: '18px' }}>
                  <strong>Net Pay:</strong>
                  <strong>{selectedPayroll.net}</strong>
                </div>
              </div>
            </div>
            <div className="em-modal-footer">
              <button
                className="gp-btn-action-modal gp-btn-outline"
                style={{ display: 'flex', justifyContent: 'center' }}
                onClick={handlePrint}
              >
                <FaPrint /> Print
              </button>
              <button className="em-btn-submit" onClick={() => setShowViewModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratePayroll;
