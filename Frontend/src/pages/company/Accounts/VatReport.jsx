import React, { useState } from 'react';
import { FaFilePdf, FaFileExcel, FaCircleInfo } from 'react-icons/fa6';
import { BsCalendar2Date } from 'react-icons/bs';
import './Accounts.css';

const VatReportAccount = () => {
  const [dateRange, setDateRange] = useState('30/01/2026 - 30/01/2026');
  const [transactionType, setTransactionType] = useState('All');

  const vatData = [
    { type: 'Outward Supplies', description: 'Sales to GCC customers', taxableAmount: 'R15000.00', vatRate: '5%', vatAmount: 'R750.00' },
    { type: 'Inward Supplies', description: 'Purchase from GCC vendors', taxableAmount: 'R9000.00', vatRate: '5%', vatAmount: 'R450.00' },
    { type: 'Adjustments', description: 'Credit note issued', taxableAmount: 'R-2000.00', vatRate: '5%', vatAmount: 'R-100.00' },
    { type: 'Exempt Supplies', description: 'Exported goods (zero-rated)', taxableAmount: 'R5000.00', vatRate: '0%', vatAmount: 'R0.00' },
  ];

  return (
    <div className="ac-container">
      <div className="ac-header">
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '5px', color: 'var(--primary)' }}>GCC VAT Return Report</h2>
        <div className="ac-subtitle">Auto-generated VAT summary.</div>
      </div>

      {/* Filter Section */}
      <div className="ac-table-card" style={{ marginBottom: '25px', padding: '25px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1', minWidth: '200px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>Choose Date</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="ac-form-input"
                style={{ paddingRight: '30px' }}
              />
              <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', cursor: 'pointer' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', marginRight: '5px', color: '#3b82f6' }}>x</span>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1', minWidth: '200px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>Transaction Type</label>
            <select
              className="ac-form-input"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Outward">Outward Supplies</option>
              <option value="Inward">Inward Supplies</option>
            </select>
          </div>

          <button
            className="ac-btn-add"
            style={{
              justifyContent: 'center',
              height: '45px',
              minWidth: '150px'
            }}
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* VAT Summary Section */}
      <div className="ac-table-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: 'var(--primary)' }}>VAT Summary</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="ac-btn-icon-red" style={{ background: '#ffe4e6', color: '#e11d48', width: '32px', height: '32px' }}><FaFilePdf /></button>
            <button className="ac-btn-icon-blue" style={{ background: '#dcfce7', color: '#16a34a', width: '32px', height: '32px' }}><FaFileExcel /></button>
          </div>
        </div>

        <div className="ac-table-container">
          <table className="ac-table">
            <thead>
              <tr>
                <th style={{ width: '20%' }}>TYPE</th>
                <th style={{ width: '30%' }}>DESCRIPTION</th>
                <th style={{ width: '20%' }}>TAXABLE AMOUNT</th>
                <th style={{ width: '15%' }}>VAT RATE (%)</th>
                <th style={{ width: '15%' }}>VAT AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {vatData.map((row, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: '600', color: '#334155' }}>{row.type}</td>
                  <td>{row.description}</td>
                  <td style={{ fontWeight: '600' }}>{row.taxableAmount}</td>
                  <td>{row.vatRate}</td>
                  <td style={{ fontWeight: '600' }}>{row.vatAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Page Info Footer */}
      <div className="ac-page-info">
        <div className="ac-page-info-title">Page Info</div>
        <ul>
          <li>VAT (Value Added Tax) is an indirect tax applied on the sale of goods and services.</li>
          <li>It is charged at every stage of the supply chain — from manufacturer to retailer.</li>
          <li>The final consumer ultimately bears the VAT cost while businesses collect and remit it.</li>
        </ul>
      </div>
    </div>
  );
};

export default VatReportAccount;
