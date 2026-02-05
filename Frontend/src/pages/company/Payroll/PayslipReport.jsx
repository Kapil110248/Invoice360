import React, { useState } from 'react';
import {
  FaCalendarAlt, FaUser, FaMoneyBillWave, FaEye, FaDownload,
  FaEnvelope, FaWhatsapp, FaPrint, FaTimes
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import './Payroll.css';

const PayslipReport = () => {
  // Dummy Data
  const [payslips, setPayslips] = useState([
    { id: 1, slipNo: 'PS-001', name: 'John Doe', department: 'Engineering', month: 'January 2023', net: 'R4,500', mode: 'Bank', status: 'Paid', basic: 'R4,000', earnings: 'R500', deductions: 'R0' },
    { id: 2, slipNo: 'PS-002', name: 'Jane Smith', department: 'Marketing', month: 'January 2023', net: 'R4,200', mode: 'Bank', status: 'Paid', basic: 'R3,800', earnings: 'R400', deductions: 'R0' },
    { id: 3, slipNo: 'PS-003', name: 'Robert Johnson', department: 'Finance', month: 'February 2023', net: 'R5,000', mode: 'Cash', status: 'Pending', basic: 'R4,500', earnings: 'R1,000', deductions: 'R500' },
    { id: 4, slipNo: 'PS-004', name: 'Emily Davis', department: 'HR', month: 'February 2023', net: 'R3,800', mode: 'Bank', status: 'Paid', basic: 'R3,500', earnings: 'R500', deductions: 'R200' },
  ]);

  // Modal State
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  // Filters
  const [filters, setFilters] = useState({
    month: '',
    employee: '',
    status: 'All'
  });

  // Handlers
  const handleView = (slip) => {
    setSelectedPayslip(slip);
    setShowViewModal(true);
  };

  const handleEmail = (name) => {
    toast.success(`Payslip emailed to ${name}`);
  };

  const handleWhatsapp = (name) => {
    toast.success(`Payslip sent via WhatsApp to ${name}`);
  };

  const handlePrint = (slip) => {
    if (!slip) return;

    const printContent = `
            <html>
                <head>
                    <title>Payslip - ${slip.name}</title>
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
                        .status-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; color: white; background: ${slip.status === 'Paid' ? '#166534' : '#f59e0b'}; }
                    </style>
                </head>
                <body>
                    <div class="payslip-container">
                        <div class="header">
                            <h1>COMPANY NAME</h1>
                            <p>123 Business Street, Tech Park</p>
                            <p>Payslip for the month of ${slip.month}</p>
                        </div>

                        <div class="emp-info">
                            <div>
                                <p><strong>Payslip No:</strong> ${slip.slipNo}</p>
                                <p><strong>Employee Name:</strong> ${slip.name}</p>
                                <p><strong>Department:</strong> ${slip.department}</p>
                            </div>
                            <div style="text-align: right;">
                                <p><strong>Payment Status:</strong> <span class="status-badge">${slip.status}</span></p>
                                <p><strong>Payment Mode:</strong> ${slip.mode}</p>
                            </div>
                        </div>

                        <div class="details-grid">
                            <div>
                                <div class="section-title">Earnings</div>
                                <div class="row"><span>Basic Salary</span> <span class="amount">${slip.basic}</span></div>
                                <div class="row"><span>Allowances</span> <span class="amount">${slip.earnings}</span></div>
                                <div class="row" style="font-weight: bold; margin-top: 10px; border-top: 1px solid #eee; padding-top: 5px;">
                                    <span>Total Earnings</span> <span>R${parseInt(slip.basic.replace(/[^0-9]/g, '')) + parseInt(slip.earnings.replace(/[^0-9]/g, ''))}</span>
                                </div>
                            </div>
                            <div>
                                <div class="section-title">Deductions</div>
                                <div class="row"><span>Tax & PF</span> <span class="amount">${slip.deductions}</span></div>
                                <div class="row" style="font-weight: bold; margin-top: 10px; border-top: 1px solid #eee; padding-top: 5px;">
                                    <span>Total Deductions</span> <span>${slip.deductions}</span>
                                </div>
                            </div>
                        </div>

                        <div class="total-row">
                            <span>Net Payable Amount</span>
                            <span>${slip.net}</span>
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

  const handleDownload = (slip) => {
    // Trigger the print logic which allows keeping as PDF
    handlePrint(slip);
    toast.success('Downloading payslip...');
  };

  return (
    <div className="em-container">
      <div className="em-header">
        <h2>Payslip Reports</h2>
      </div>

      {/* Filter Bar */}
      <div className="pr-filter-container">
        <div className="pr-filter-item">
          <FaCalendarAlt className="pr-filter-icon" />
          <input
            type="text"
            className="em-input pr-input-pl"
            placeholder="Filter by Month"
            value={filters.month}
            onChange={(e) => setFilters({ ...filters, month: e.target.value })}
          />
        </div>
        <div className="pr-filter-item">
          <FaUser className="pr-filter-icon" />
          <input
            type="text"
            className="em-input pr-input-pl"
            placeholder="Filter by Employee"
            value={filters.employee}
            onChange={(e) => setFilters({ ...filters, employee: e.target.value })}
          />
        </div>
        <div className="pr-filter-item">
          <FaMoneyBillWave className="pr-filter-icon" />
          <select
            className="em-input pr-input-pl"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="em-table-container">
        <table className="em-table">
          <thead>
            <tr>
              <th>PAYSLIP NO</th>
              <th>EMPLOYEE NAME</th>
              <th>DEPARTMENT</th>
              <th>MONTH</th>
              <th>NET SALARY</th>
              <th>PAYMENT MODE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {payslips.map(slip => (
              <tr key={slip.id} className="em-row">
                <td>{slip.slipNo}</td>
                <td><strong>{slip.name}</strong></td>
                <td>{slip.department}</td>
                <td>{slip.month}</td>
                <td><strong>{slip.net}</strong></td>
                <td>{slip.mode}</td>
                <td>
                  <span className={slip.status === 'Paid' ? 'gp-status-paid' : 'gp-status-pending'}>
                    {slip.status}
                  </span>
                </td>
                <td>
                  <div className="gp-action-row">
                    <button
                      className="gp-icon-btn gp-btn-eye"
                      title="View"
                      onClick={() => handleView(slip)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="gp-icon-btn gp-btn-download"
                      title="Download PDF"
                      onClick={() => handleDownload(slip)}
                    >
                      <FaDownload />
                    </button>
                    <button
                      className="gp-icon-btn gp-btn-mail"
                      title="Email"
                      onClick={() => handleEmail(slip.name)}
                    >
                      <FaEnvelope />
                    </button>
                    <button
                      className="gp-icon-btn gp-btn-whatsapp"
                      title="WhatsApp"
                      onClick={() => handleWhatsapp(slip.name)}
                    >
                      <FaWhatsapp />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {showViewModal && selectedPayslip && (
        <div className="em-modal-overlay">
          <div className="em-modal-content" style={{ maxWidth: '500px' }}>
            <div className="em-modal-header">
              <h3>Payslip {selectedPayslip.slipNo}</h3>
              <button className="em-close-btn" onClick={() => setShowViewModal(false)}><FaTimes /></button>
            </div>
            <div className="em-modal-body">
              <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                <h4>{selectedPayslip.name}</h4>
                <p style={{ color: '#666' }}>{selectedPayslip.department}</p>
                <span className={selectedPayslip.status === 'Paid' ? 'gp-status-paid' : 'gp-status-pending'} style={{ marginTop: '10px' }}>
                  {selectedPayslip.status}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Month:</span>
                  <strong>{selectedPayslip.month}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Basic Pay:</span>
                  <strong>{selectedPayslip.basic}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Earnings:</span>
                  <span style={{ color: 'green' }}>+ {selectedPayslip.earnings}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Deductions:</span>
                  <span style={{ color: 'red' }}>- {selectedPayslip.deductions}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed #ccc', fontSize: '18px' }}>
                  <strong>Net Pay:</strong>
                  <strong>{selectedPayslip.net}</strong>
                </div>
              </div>
            </div>
            <div className="em-modal-footer">
              <button
                className="gp-btn-action-modal gp-btn-outline"
                style={{ display: 'flex', justifyContent: 'center' }}
                onClick={() => handlePrint(selectedPayslip)}
              >
                <FaPrint /> Print / Download
              </button>
              <button className="em-btn-submit" onClick={() => setShowViewModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayslipReport;
