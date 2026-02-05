import React, { useState } from 'react';
import { FaBriefcase, FaArrowLeft, FaChartPie, FaMoneyCheckDollar, FaBuildingColumns, FaBoxesStacked, FaFileInvoiceDollar, FaScaleBalanced } from 'react-icons/fa6';
import { BsCalendar2Date } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import './Accounts.css';

const BalanceSheet = () => {
  const [view, setView] = useState('main'); // 'main', 'assets', 'liabilities'

  // --- Main View Data ---
  const assetsData = {
    current: [
      { label: 'Cash', amount: 'R75,000' },
      { label: 'Bank', amount: 'R245,000' },
      { label: 'Stock', amount: 'R320,000' },
      { label: 'Accounts Receivable', amount: 'R185,000' },
    ],
    fixed: [
      { label: 'Land & Building', amount: 'R1,250,000' },
      { label: 'Plant & Machinery', amount: 'R875,000' },
      { label: 'Furniture & Fixtures', amount: 'R150,000' },
    ]
  };

  const liabilitiesData = {
    current: [
      { label: 'Accounts Payable', amount: 'R235,000' },
      { label: 'Short-term Loans', amount: 'R125,000' },
      { label: 'Outstanding Expenses', amount: 'R45,000' },
    ],
    longTerm: [
      { label: 'Term Loan', amount: 'R750,000' },
      { label: 'Mortgage Loan', amount: 'R425,000' },
    ],
    capital: [
      { label: 'Capital', amount: 'R1,000,000' },
      { label: 'Retained Earnings', amount: 'R520,000' },
    ]
  };

  // --- Detailed View Data ---

  // Assets Details
  const cashInflows = [
    { customer: 'ABC Traders', amount: 'R15,000', date: '2025-07-01', mode: 'Cash' },
    { customer: 'Retail Shop', amount: 'R22,000', date: '2025-07-03', mode: 'Cash' },
    { customer: 'John Doe', amount: 'R38,000', date: '2025-07-05', mode: 'Cash' },
  ];

  const bankTransactions = [
    { customer: 'TechCorp', amount: 'R85,000', date: '2025-07-02', ref: 'NEFT-8890', bank: 'HDFC' },
    { customer: 'Global Ltd', amount: 'R60,000', date: '2025-07-04', ref: 'IMPS-1234', bank: 'SBI' },
    { customer: 'Innovate Inc', amount: 'R100,000', date: '2025-07-06', ref: 'RTGS-5678', bank: 'Axis' },
  ];

  const inventoryDetails = [
    { product: 'Laptops', qty: 50, value: 'R150,000', category: 'Electronics' },
    { product: 'Chairs', qty: 200, value: 'R70,000', category: 'Furniture' },
    { product: 'Cables', qty: 1000, value: 'R100,000', category: 'Accessories' },
  ];

  const receivables = [
    { customer: 'FutureTech', amount: 'R95,000', dueDate: '2025-07-15', status: 'Overdue' },
    { customer: 'Smart Solutions', amount: 'R90,000', dueDate: '2025-07-20', status: 'Pending' },
  ];

  // Liabilities Details
  const currentLiabilities = [
    { supplier: 'Alpha Supplies', amount: 'R235,000', dueDate: '2025-07-10', status: 'Pending' },
    { supplier: 'QuickFin Loans', amount: 'R125,000', dueDate: '2025-08-01', status: 'Active' },
    { supplier: 'Electricity Bill', amount: 'R45,000', dueDate: '2025-07-05', status: 'Overdue' },
  ];

  const longTermLiabilities = [
    { loan: 'Business Term Loan', amount: 'R750,000', interest: '8.5%', maturity: '2030' },
    { loan: 'Mortgage Loan', amount: 'R425,000', interest: '7.2%', maturity: '2035' },
  ];

  const ownersCapital = [
    { owner: 'Rajesh Kumar', capital: 'R1,000,000', type: 'Initial Investment' },
    { owner: 'Retained Earnings', capital: 'R520,000', type: 'Accumulated Profits' },
  ];

  // --- Render Functions ---

  const renderMainView = () => (
    <div className="ac-bs-wrapper">
      <div className="ac-bs-header">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <FaBriefcase style={{ fontSize: '28px', color: '#475569' }} />
          <h2 style={{ margin: 0 }}>Balance Sheet</h2>
        </div>
        <p>As on 8 July 2025</p>
      </div>

      <div className="ac-bs-split-container">
        {/* Assets Side */}
        <div className="ac-bs-card">
          <div className="ac-bs-card-header">
            <div className="ac-bs-card-title">ASSETS</div>
            <button className="ac-btn-view-details" onClick={() => setView('assets')}>View Asset Details</button>
          </div>

          <div className="ac-bs-section-title">Current Assets</div>
          {assetsData.current.map((item, i) => (
            <div className="ac-bs-row" key={i}>
              <span>{item.label}</span>
              <strong>{item.amount}</strong>
            </div>
          ))}
          <div className="ac-bs-total-row">
            <span>Total Current Assets</span>
            <span>R825,000</span>
          </div>

          <div className="ac-bs-section-title">Fixed Assets</div>
          {assetsData.fixed.map((item, i) => (
            <div className="ac-bs-row" key={i}>
              <span>{item.label}</span>
              <strong>{item.amount}</strong>
            </div>
          ))}
          <div className="ac-bs-total-row">
            <span>Total Fixed Assets</span>
            <span>R2,275,000</span>
          </div>

          <div className="ac-bs-grand-total">
            <span>Total Assets</span>
            <span>R3,100,000</span>
          </div>
        </div>

        {/* Liabilities Side */}
        <div className="ac-bs-card">
          <div className="ac-bs-card-header">
            <div className="ac-bs-card-title">LIABILITIES & CAPITAL</div>
            <button className="ac-btn-view-details" onClick={() => setView('liabilities')}>View Liability Details</button>
          </div>

          <div className="ac-bs-section-title">Current Liabilities</div>
          {liabilitiesData.current.map((item, i) => (
            <div className="ac-bs-row" key={i}>
              <span>{item.label}</span>
              <strong>{item.amount}</strong>
            </div>
          ))}
          <div className="ac-bs-total-row">
            <span>Total Current Liabilities</span>
            <span>R405,000</span>
          </div>

          <div className="ac-bs-section-title">Long-term Liabilities</div>
          {liabilitiesData.longTerm.map((item, i) => (
            <div className="ac-bs-row" key={i}>
              <span>{item.label}</span>
              <strong>{item.amount}</strong>
            </div>
          ))}
          <div className="ac-bs-total-row">
            <span>Total Long-term Liabilities</span>
            <span>R1,175,000</span>
          </div>

          <div className="ac-bs-section-title">Owner's Capital</div>
          {liabilitiesData.capital.map((item, i) => (
            <div className="ac-bs-row" key={i}>
              <span>{item.label}</span>
              <strong>{item.amount}</strong>
            </div>
          ))}
          <div className="ac-bs-total-row">
            <span>Total Owner's Capital</span>
            <span>R1,520,000</span>
          </div>

          <div className="ac-bs-grand-total">
            <span>Total Liabilities & Capital</span>
            <span>R3,100,000</span>
          </div>
        </div>
      </div>

      <div className="ac-bs-footer-info">
        💡 The Balance Sheet represents your business's financial position — <strong>Assets = Liabilities + Capital.</strong>
      </div>
    </div>
  );

  const renderAssetsDetails = () => (
    <div className="ac-bs-wrapper">
      <div className="ac-detail-header">
        <div className="ac-detail-title">
          <FaChartPie style={{ color: '#475569' }} /> All Asset Details
        </div>
        <button className="ac-btn-back" onClick={() => setView('main')}>
          <FaArrowLeft /> Back to Balance Sheet
        </button>
      </div>

      {/* Cash Inflows */}
      <div className="ac-detail-section">
        <div className="ac-detail-bar bar-blue">Cash Inflows</div>
        <div className="ac-detail-controls">
          <input placeholder="Search Customer" className="ac-detail-input" />
          <div className="ac-detail-input" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>dd-mm-yyyy</span> <BsCalendar2Date />
          </div>
          <button className="ac-page-btn"><FiTrash2 /></button>
        </div>
        <div className="ac-detail-content">
          <table className="ac-detail-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {cashInflows.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.customer}</td>
                  <td>{row.amount}</td>
                  <td>{row.date}</td>
                  <td>{row.mode}</td>
                </tr>
              ))}
              <tr className="ac-table-footer">
                <td>Total</td>
                <td colSpan="3" style={{ textAlign: 'right' }}>R75,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bank Transactions */}
      <div className="ac-detail-section">
        <div className="ac-detail-bar bar-green">Bank Transactions</div>
        <div className="ac-detail-controls">
          <input placeholder="Customer" className="ac-detail-input" />
          <input placeholder="Bank" className="ac-detail-input" />
          <div className="ac-detail-input" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>dd-mm-yyyy</span> <BsCalendar2Date />
          </div>
          <button className="ac-page-btn"><FiTrash2 /></button>
        </div>
        <div className="ac-detail-content">
          <table className="ac-detail-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Ref</th>
                <th>Bank</th>
              </tr>
            </thead>
            <tbody>
              {bankTransactions.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.customer}</td>
                  <td>{row.amount}</td>
                  <td>{row.date}</td>
                  <td>{row.ref}</td>
                  <td>{row.bank}</td>
                </tr>
              ))}
              <tr className="ac-table-footer">
                <td>Total</td>
                <td colSpan="4" style={{ textAlign: 'right' }}>R245,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Details */}
      <div className="ac-detail-section">
        <div className="ac-detail-bar bar-gray">Inventory Details</div>
        <div className="ac-detail-controls">
          <input placeholder="Search Product" className="ac-detail-input" style={{ flex: 1 }} />
          <select className="ac-detail-input"><option>All Categories</option></select>
          <button className="ac-page-btn"><FiTrash2 /></button>
        </div>
        <div className="ac-detail-content">
          <table className="ac-detail-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Value</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {inventoryDetails.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.product}</td>
                  <td>{row.qty}</td>
                  <td>{row.value}</td>
                  <td>{row.category}</td>
                </tr>
              ))}
              <tr className="ac-table-footer">
                <td>Total</td>
                <td colSpan="3" style={{ textAlign: 'right' }}>R320,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Outstanding Receivables */}
      <div className="ac-detail-section">
        <div className="ac-detail-bar bar-orange">Outstanding Receivables</div>
        <div className="ac-detail-controls">
          <input placeholder="Customer" className="ac-detail-input" />
          <select className="ac-detail-input"><option>All Status</option></select>
          <div className="ac-detail-input" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>dd-mm-yyyy</span> <BsCalendar2Date />
          </div>
          <button className="ac-page-btn"><FiTrash2 /></button>
        </div>
        <div className="ac-detail-content">
          <table className="ac-detail-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {receivables.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.customer}</td>
                  <td>{row.amount}</td>
                  <td>{row.dueDate}</td>
                  <td>
                    <span className={`ac-status-badge status-${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="ac-table-footer">
                <td>Total</td>
                <td colSpan="3" style={{ textAlign: 'right' }}>R185,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="ac-grand-total-bar">
        Grand Total of All Assets: R825,000
      </div>
    </div>
  );

  const renderLiabilitiesDetails = () => (
    <div className="ac-bs-wrapper">
      <div className="ac-detail-header">
        <div className="ac-detail-title">
          <FaScaleBalanced style={{ color: '#475569' }} /> All Liability & Capital Details
        </div>
        <button className="ac-btn-back" onClick={() => setView('main')}>
          <FaArrowLeft /> Back to Balance Sheet
        </button>
      </div>

      {/* Current Liabilities */}
      <div className="ac-detail-section">
        <div className="ac-detail-bar bar-red">Current Liabilities</div>
        <div className="ac-detail-controls">
          <input placeholder="Supplier / Expense" className="ac-detail-input" style={{ width: '300px' }} />
          <select className="ac-detail-input"><option>All Status</option></select>
          <div className="ac-detail-input" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>dd-mm-yyyy</span> <BsCalendar2Date />
          </div>
          <button className="ac-page-btn"><FiTrash2 style={{ color: 'red' }} /></button>
        </div>
        <div className="ac-detail-content">
          <table className="ac-detail-table">
            <thead>
              <tr>
                <th>Supplier / Expense</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentLiabilities.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.supplier}</td>
                  <td>{row.amount}</td>
                  <td>{row.dueDate}</td>
                  <td>
                    <span className={`ac-status-badge status-${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="ac-table-footer">
                <td>Total</td>
                <td colSpan="3" style={{ textAlign: 'right' }}>R405,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Long-term Liabilities */}
      <div className="ac-detail-section">
        <div className="ac-detail-bar bar-gray" style={{ background: '#64748b', color: 'white' }}>Long-term Liabilities</div>
        <div className="ac-detail-controls">
          <input placeholder="Loan Type" className="ac-detail-input" style={{ flex: 1 }} />
          <select className="ac-detail-input"><option>All Years</option></select>
          <button className="ac-page-btn"><FiTrash2 /></button>
        </div>
        <div className="ac-detail-content">
          <table className="ac-detail-table">
            <thead>
              <tr>
                <th>Loan</th>
                <th>Amount</th>
                <th>Interest Rate</th>
                <th>Maturity</th>
              </tr>
            </thead>
            <tbody>
              {longTermLiabilities.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.loan}</td>
                  <td>{row.amount}</td>
                  <td>{row.interest}</td>
                  <td>{row.maturity}</td>
                </tr>
              ))}
              <tr className="ac-table-footer">
                <td>Total</td>
                <td colSpan="3" style={{ textAlign: 'right' }}>R1,175,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Owner's Capital */}
      <div className="ac-detail-section">
        <div className="ac-detail-bar bar-dark-green">Owner's Capital</div>
        <div className="ac-detail-controls">
          <input placeholder="Owner / Type" className="ac-detail-input" style={{ flex: 1 }} />
          <select className="ac-detail-input"><option>All Types</option></select>
          <button className="ac-page-btn"><FiTrash2 /></button>
        </div>
        <div className="ac-detail-content">
          <table className="ac-detail-table">
            <thead>
              <tr>
                <th>Owner / Source</th>
                <th>Capital</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {ownersCapital.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.owner}</td>
                  <td>{row.capital}</td>
                  <td>{row.type}</td>
                </tr>
              ))}
              <tr className="ac-table-footer">
                <td>Total</td>
                <td colSpan="2" style={{ textAlign: 'right' }}>R1,520,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="ac-grand-total-bar">
        Grand Total of Liabilities & Capital: R3,100,000
      </div>
    </div>
  );

  return (
    <div className="ac-container">
      {view === 'main' && renderMainView()}
      {view === 'assets' && renderAssetsDetails()}
      {view === 'liabilities' && renderLiabilitiesDetails()}
    </div>
  );
};

export default BalanceSheet;
