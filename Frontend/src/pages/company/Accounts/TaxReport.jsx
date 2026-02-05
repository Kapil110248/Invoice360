import React, { useState } from 'react';
import { FaFilePdf, FaFileExcel, FaCircleInfo } from 'react-icons/fa6';
import './Accounts.css';

const TaxReportAccount = () => {
  const [activeTab, setActiveTab] = useState('purchase'); // 'purchase' or 'sales'
  const [dateRange, setDateRange] = useState('30/01/2026 - 30/01/2026');
  const [vendor, setVendor] = useState('All');
  const [paymentMethod, setPaymentMethod] = useState('All');

  // Dummy Data
  const purchaseData = [
    { id: 1, ref: '#4237022', vendor: 'A-Z Store', date: '06 Nov 2024', amount: 'R700', method: 'Cash', discount: 'R0', tax: 'R35' },
    { id: 2, ref: '#4237300', vendor: 'Apex Computers', date: '24 Dec 2024', amount: 'R200', method: 'Stripe', discount: 'R0', tax: 'R10' },
    { id: 3, ref: '#7590321', vendor: 'Sigma Chairs', date: '20 Sep 2024', amount: 'R450', method: 'Stripe', discount: 'R20', tax: 'R22.5' },
    { id: 4, ref: '#7590325', vendor: 'Beats Headphones', date: '10 Dec 2024', amount: 'R50', method: 'Paypal', discount: 'R0', tax: 'R2.5' },
    { id: 5, ref: '#7590365', vendor: 'Aesthetic Bags', date: '14 Oct 2024', amount: 'R1200', method: 'Paypal', discount: 'R50', tax: 'R60' },
    { id: 6, ref: '#8744439', vendor: 'Hatimi Hardwares', date: '25 Oct 2024', amount: 'R1000', method: 'Cash', discount: 'R0', tax: 'R50' },
  ];

  const salesData = [
    { id: 1, ref: '#SL-001', vendor: 'John Doe', date: '01 Jan 2025', amount: 'R1500', method: 'Cash', discount: 'R0', tax: 'R75' },
    { id: 2, ref: '#SL-002', vendor: 'Jane Smith', date: '05 Jan 2025', amount: 'R3500', method: 'Bank', discount: 'R100', tax: 'R175' },
  ];

  const currentData = activeTab === 'purchase' ? purchaseData : salesData;

  return (
    <div className="ac-container">
      {/* Tabs */}
      <div className="ac-tax-tabs">
        <button
          className={`ac-tax-tab ${activeTab === 'purchase' ? 'active' : 'inactive'}`}
          onClick={() => setActiveTab('purchase')}
        >
          Purchase Tax
        </button>
        <button
          className={`ac-tax-tab ${activeTab === 'sales' ? 'active' : 'inactive'}`}
          onClick={() => setActiveTab('sales')}
        >
          Sales Tax
        </button>
      </div>

      {/* Main Card */}
      <div className="ac-table-card">
        {/* Header inside Card */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: 'var(--primary)' }}>
            {activeTab === 'purchase' ? 'Purchase Tax Report' : 'Sales Tax Report'}
          </h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="ac-btn-icon-red" style={{ background: '#ffe4e6', color: '#e11d48', width: '32px', height: '32px' }}><FaFilePdf /></button>
            <button className="ac-btn-icon-blue" style={{ background: '#dcfce7', color: '#16a34a', width: '32px', height: '32px' }}><FaFileExcel /></button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label className="ac-form-label">Choose Date</label>
            <div style={{ position: 'relative' }}>
              <input type="text" className="ac-form-input" value={dateRange} onChange={e => setDateRange(e.target.value)} />
              <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>x</span>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <label className="ac-form-label">{activeTab === 'purchase' ? 'Vendor' : 'Customer'}</label>
            <select className="ac-form-input" value={vendor} onChange={e => setVendor(e.target.value)}>
              <option value="All">All</option>
              <option>A-Z Store</option>
              <option>Apex Computers</option>
            </select>
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <label className="ac-form-label">Payment Method</label>
            <select className="ac-form-input" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
              <option value="All">All</option>
              <option>Cash</option>
              <option>Stripe</option>
              <option>Paypal</option>
            </select>
          </div>

          <button className="ac-btn-add" style={{ height: '42px', minWidth: '160px', justifyContent: 'center', backgroundColor: 'var(--primary)' }}>
            Generate Report
          </button>
        </div>

        {/* Table */}
        <div className="ac-table-container">
          <table className="ac-table">
            <thead>
              <tr>
                <th style={{ width: '12%' }}>REFERENCE</th>
                <th style={{ width: '20%' }}>{activeTab === 'purchase' ? 'VENDOR' : 'CUSTOMER'}</th>
                <th style={{ width: '12%' }}>DATE</th>
                <th style={{ width: '10%' }}>AMOUNT</th>
                <th style={{ width: '13%' }}>PAYMENT METHOD</th>
                <th style={{ width: '10%' }}>DISCOUNT</th>
                <th style={{ width: '10%' }}>TAX AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map(row => (
                <tr key={row.id}>
                  <td style={{ fontWeight: '600', color: '#64748b' }}>{row.ref}</td>
                  <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{row.vendor}</td>
                  <td>{row.date}</td>
                  <td style={{ fontWeight: '600' }}>{row.amount}</td>
                  <td>{row.method}</td>
                  <td>{row.discount}</td>
                  <td style={{ fontWeight: '600' }}>{row.tax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="ac-pagination">
          <div className="ac-pagination-info">Showing 1 to {currentData.length} of {currentData.length} results</div>
          <div className="ac-pagination-controls">
            <button className="ac-page-btn" disabled>«</button>
            <button className="ac-page-btn active">1</button>
            <button className="ac-page-btn">2</button>
            <button className="ac-page-btn">»</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxReportAccount;
