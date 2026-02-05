import React, { useState } from 'react';
import {
  FaFilePdf, FaFileExcel, FaFileCsv, FaPrint, FaSearch, FaEye, FaTimes
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import './Payroll.css';

const PayrollReport = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // Dummy Data
  const monthlyData = [
    { id: 1, month: 'Oct 2025', employees: 25, gross: 'R8,50,000', deductions: 'R85,000', net: 'R7,65,000' },
    { id: 2, month: 'Sep 2025', employees: 24, gross: 'R8,20,000', deductions: 'R82,000', net: 'R7,38,000' },
    { id: 3, month: 'Aug 2025', employees: 24, gross: 'R8,30,000', deductions: 'R83,000', net: 'R7,47,000' },
  ];

  const departmentData = [
    { id: 1, dept: 'Sales', employees: 5, total: 'R2,00,000', avg: 'R40,000' },
    { id: 2, dept: 'Marketing', employees: 4, total: 'R1,80,000', avg: 'R45,000' },
    { id: 3, dept: 'IT', employees: 8, total: 'R3,20,000', avg: 'R40,000' },
    { id: 4, dept: 'HR', employees: 3, total: 'R1,20,000', avg: 'R40,000' },
    { id: 5, dept: 'Finance', employees: 5, total: 'R2,30,000', avg: 'R46,000' },
  ];

  const historyData = [
    { id: 1, name: 'John Doe', month: 'Oct 2025', gross: 'R45,000', deductions: 'R4,500', net: 'R40,500', status: 'Paid' },
    { id: 2, name: 'Jane Smith', month: 'Oct 2025', gross: 'R42,000', deductions: 'R4,200', net: 'R37,800', status: 'Paid' },
    { id: 3, name: 'Robert Johnson', month: 'Oct 2025', gross: 'R50,000', deductions: 'R5,000', net: 'R45,000', status: 'Paid' },
    { id: 4, name: 'Emily Davis', month: 'Oct 2025', gross: 'R38,000', deductions: 'R3,800', net: 'R34,200', status: 'Pending' },
    { id: 5, name: 'Michael Wilson', month: 'Oct 2025', gross: 'R48,000', deductions: 'R4,800', net: 'R43,200', status: 'Paid' },
  ];

  const taxData = [
    { id: 1, month: 'Oct 2025', tax: 'R50,000', pf: 'R25,000', insurance: 'R7,000', other: 'R3,000', total: 'R85,000' },
    { id: 2, month: 'Sep 2025', tax: 'R48,000', pf: 'R24,000', insurance: 'R7,000', other: 'R3,000', total: 'R82,000' },
    { id: 3, month: 'Aug 2025', tax: 'R49,000', pf: 'R24,500', insurance: 'R7,000', other: 'R2,500', total: 'R83,000' },
  ];

  const handleView = (data, type) => {
    setSelectedData({ ...data, type });
    setShowModal(true);
  };

  const handlePrint = () => {
    toast.success("Opening print dialog...");
    setTimeout(() => window.print(), 500);
  };

  const handleDownloadPDF = () => {
    toast.success("Downloading PDF Report...");
  };

  const handleExportExcel = () => {
    toast.success("Exporting to Excel...");
  };

  const handleExportCSV = () => {
    toast.success("Exporting to CSV...");
  };

  return (
    <div className="em-container">
      <div className="em-header">
        <h2>Payroll Reports</h2>
      </div>

      {/* Reports Overview Header with Exports */}
      <div className="pr-header-row">
        <div className="pr-title">Reports Overview</div>
        <div className="pr-export-group">
          <button className="pr-btn-export pr-btn-pdf" onClick={handleDownloadPDF}><FaFilePdf /> PDF</button>
          <button className="pr-btn-export pr-btn-excel" onClick={handleExportExcel}><FaFileExcel /> Excel</button>
          <button className="pr-btn-export pr-btn-csv" onClick={handleExportCSV}><FaFileCsv /> CSV</button>
          <button className="pr-btn-export pr-btn-print" onClick={handlePrint}><FaPrint /> Print</button>
        </div>
      </div>

      {/* Filters */}
      <div className="gp-filter-bar" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div className="gp-filter-group" style={{ flex: 1 }}>
          <label className="gp-filter-label">Filter by Month</label>
          <select className="ss-select" defaultValue="Oct 2025">
            <option>Oct 2025</option>
            <option>Sep 2025</option>
            <option>Aug 2025</option>
          </select>
        </div>
        <div className="gp-filter-group" style={{ flex: 1 }}>
          <label className="gp-filter-label">Filter by Department</label>
          <select className="ss-select" defaultValue="All">
            <option>All</option>
            <option>Sales</option>
            <option>Marketing</option>
            <option>IT</option>
          </select>
        </div>
        <div className="gp-filter-group" style={{ flex: 1.5 }}>
          <label className="gp-filter-label">Search Employee</label>
          <div className="pr-search-box" style={{ marginTop: 0 }}>
            <input type="text" className="pr-search-input" placeholder="Employee name..." />
            <button className="pr-search-btn"><FaSearch /></button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="pr-tabs-container">
        <button
          className={`pr-tab ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          Monthly Summary
        </button>
        <button
          className={`pr-tab ${activeTab === 'department' ? 'active' : ''}`}
          onClick={() => setActiveTab('department')}
        >
          Department Report
        </button>
        <button
          className={`pr-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Employee History
        </button>
        <button
          className={`pr-tab ${activeTab === 'tax' ? 'active' : ''}`}
          onClick={() => setActiveTab('tax')}
        >
          Tax & Deduction Report
        </button>
      </div>

      {/* Tab Content */}
      <div className="pr-tab-content">
        <div className="em-table-container" style={{ boxShadow: 'none', border: 'none' }}>
          <table className="em-table">
            {activeTab === 'monthly' && (
              <>
                <thead>
                  <tr>
                    <th>MONTH</th>
                    <th>TOTAL EMPLOYEES</th>
                    <th>GROSS PAY</th>
                    <th>DEDUCTIONS</th>
                    <th>NET PAY</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map(item => (
                    <tr key={item.id} className="em-row">
                      <td>{item.month}</td>
                      <td>{item.employees}</td>
                      <td>{item.gross}</td>
                      <td>{item.deductions}</td>
                      <td>{item.net}</td>
                      <td>
                        <button className="pr-btn-eye" onClick={() => handleView(item, 'Monthly Summary Details')}>
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
            {activeTab === 'department' && (
              <>
                <thead>
                  <tr>
                    <th>DEPARTMENT</th>
                    <th>EMPLOYEES</th>
                    <th>TOTAL SALARY</th>
                    <th>AVG SALARY</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentData.map(item => (
                    <tr key={item.id} className="em-row">
                      <td>{item.dept}</td>
                      <td>{item.employees}</td>
                      <td>{item.total}</td>
                      <td>{item.avg}</td>
                      <td>
                        <button className="pr-btn-eye" onClick={() => handleView(item, 'Department Report Details')}>
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
            {activeTab === 'history' && (
              <>
                <thead>
                  <tr>
                    <th>EMPLOYEE</th>
                    <th>MONTH</th>
                    <th>GROSS PAY</th>
                    <th>DEDUCTIONS</th>
                    <th>NET PAY</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map(item => (
                    <tr key={item.id} className="em-row">
                      <td>{item.name}</td>
                      <td>{item.month}</td>
                      <td>{item.gross}</td>
                      <td>{item.deductions}</td>
                      <td>{item.net}</td>
                      <td>
                        <span className={item.status === 'Paid' ? 'gp-status-paid' : 'gp-status-pending'}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
            {activeTab === 'tax' && (
              <>
                <thead>
                  <tr>
                    <th>MONTH</th>
                    <th>TAX</th>
                    <th>PF</th>
                    <th>INSURANCE</th>
                    <th>OTHER</th>
                    <th>TOTAL DEDUCTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {taxData.map(item => (
                    <tr key={item.id} className="em-row">
                      <td>{item.month}</td>
                      <td>{item.tax}</td>
                      <td>{item.pf}</td>
                      <td>{item.insurance}</td>
                      <td>{item.other}</td>
                      <td>{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>

      {/* Detail View Modal */}
      {showModal && selectedData && (
        <div className="em-modal-overlay">
          <div className="em-modal-content" style={{ maxWidth: '500px' }}>
            <div className="em-modal-header">
              <h3>{selectedData.type}</h3>
              <button className="em-close-btn" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            <div className="em-modal-body">
              {/* Render details based on available keys */}
              {Object.entries(selectedData).map(([key, value]) => {
                if (key === 'id' || key === 'type') return null;
                return (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <strong style={{ textTransform: 'capitalize' }}>{key}</strong>
                    <span>{value}</span>
                  </div>
                );
              })}
            </div>
            <div className="em-modal-footer">
              <button className="em-btn-submit" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollReport;
