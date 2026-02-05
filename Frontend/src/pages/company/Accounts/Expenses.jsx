import React, { useState } from 'react';
import { FaPlus, FaFilePdf, FaFileExcel, FaEye, FaPen, FaTrash, FaXmark } from 'react-icons/fa6';
import { BsCalendar2Date } from 'react-icons/bs';
import './Accounts.css';

const ExpensesAccount = () => {
  // --- State Management ---
  const [vouchers, setVouchers] = useState([
    { id: 1, date: '3 Sep 2035', paymentNo: 'PAY1', manualReceipt: 'MRC-2023-001', paidFrom: 'Bank Transfer', paidTo: 'Salaries', accounts: 'Salaries: 222.01', totalAmount: '222.01', status: 'Paid', narration: 'Monthly salary payment' },
    { id: 2, date: '2 Dec 2031', paymentNo: 'PAY2', manualReceipt: 'MRC-2023-002', paidFrom: 'Credit Card', paidTo: 'Electricity bill', accounts: 'Electricity bill: 3182.56', totalAmount: '3182.56', status: 'Pending', narration: 'Quarterly electricity payment' },
    { id: 3, date: '10 Nov 2031', paymentNo: 'PAY3', manualReceipt: 'MRC-2023-003', paidFrom: 'PayPal', paidTo: 'Rent', accounts: 'Rent: 4814.85', totalAmount: '4814.85', status: 'Paid', narration: 'Office rent payment' },
    { id: 4, date: '27 Nov 2031', paymentNo: 'PAY4', manualReceipt: '-', paidFrom: 'Bank Transfer', paidTo: 'Office Supplies', accounts: 'Office Supplies: 4557.35', totalAmount: '4557.35', status: 'Rejected', narration: 'Stationery and supplies purchase' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentVoucher, setCurrentVoucher] = useState(null);
  const [searchPaymentNo, setSearchPaymentNo] = useState('');
  const [searchAccount, setSearchAccount] = useState('');
  const [searchManualReceipt, setSearchManualReceipt] = useState('');


  // --- Form State ---
  const [formData, setFormData] = useState({
    paymentNo: 'PAY5',
    manualReceiptNo: '',
    voucherDate: '30-01-2026',
    paidFrom: 'Cash',
    paidTo: '',
    rows: [
      { id: 1, account: 'Electricity bill', amount: '0.00', narration: 'Narration for this item' }
    ],
    voucherNarration: ''
  });

  // --- Actions ---

  const handleOpenCreate = () => {
    setFormData({
      paymentNo: 'PAY5',
      manualReceiptNo: '',
      voucherDate: new Date().toISOString().split('T')[0],
      paidFrom: 'Cash',
      paidTo: '',
      rows: [{ id: 1, account: '', amount: '0.00', narration: '' }],
      voucherNarration: ''
    });
    setIsEditMode(false);
    setModalOpen(true);
  };

  const handleEdit = (voucher) => {
    setFormData({
      paymentNo: voucher.paymentNo,
      manualReceiptNo: voucher.manualReceipt,
      voucherDate: '2026-01-30', // Dummy date parsing for demo
      paidFrom: voucher.paidFrom,
      paidTo: voucher.paidTo,
      rows: [{ id: 1, account: voucher.accounts.split(':')[0], amount: voucher.totalAmount, narration: voucher.narration }],
      voucherNarration: voucher.narration
    });
    setIsEditMode(true);
    setCurrentVoucher(voucher);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this voucher?')) {
      setVouchers(vouchers.filter(v => v.id !== id));
    }
  };

  const handleSave = () => {
    // Logic to save/update voucher would go here
    setModalOpen(false);
    // For demo, just close modal
  };

  // --- Render Helpers ---

  return (
    <div className="ac-container">
      {/* Header */}
      <div className="ac-header" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2 style={{ margin: 0, fontSize: '24px' }}>Expense Voucher</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="ac-btn-icon-red" style={{ background: '#ffe4e6', color: '#e11d48', width: '36px', height: '36px' }}><FaFilePdf /></button>
          <button className="ac-btn-icon-blue" style={{ background: '#dcfce7', color: '#16a34a', width: '36px', height: '36px' }}><FaFileExcel /></button>
          <button className="ac-btn-add" onClick={handleOpenCreate}>
            <FaPlus /> Create Voucher
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="ac-action-bar" style={{ alignItems: 'flex-end', gap: '15px' }}>
        <div className="ac-form-group" style={{ flex: 1 }}>
          <label className="ac-form-label">Payment No</label>
          <input type="text" className="ac-form-input" placeholder="Search by Payment No..." value={searchPaymentNo} onChange={e => setSearchPaymentNo(e.target.value)} />
        </div>
        <div className="ac-form-group" style={{ flex: 1 }}>
          <label className="ac-form-label">Account</label>
          <input type="text" className="ac-form-input" placeholder="Search by Account..." value={searchAccount} onChange={e => setSearchAccount(e.target.value)} />
        </div>
        <div className="ac-form-group" style={{ flex: 1 }}>
          <label className="ac-form-label">Paid From</label>
          <select className="ac-form-input"><option>All</option><option>Cash</option><option>Bank</option></select>
        </div>
        <div className="ac-form-group" style={{ flex: 1 }}>
          <label className="ac-form-label">Manual Receipt No</label>
          <input type="text" className="ac-form-input" placeholder="Search by Manual Receipt No..." value={searchManualReceipt} onChange={e => setSearchManualReceipt(e.target.value)} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '20px' }}>
        <button style={{
          padding: '10px 20px',
          background: '#e2e8f0',
          border: 'none',
          borderRadius: '6px 6px 0 0',
          fontWeight: '600',
          color: '#0f172a',
          borderBottom: '2px solid transparent'
        }}>All Vouchers</button>
      </div>

      {/* Table */}
      <div className="ac-table-card">
        <div className="ac-table-container">
          <table className="ac-table">
            <thead>
              <tr>
                <th>DATE</th>
                <th>PAYMENT NO</th>
                <th>MANUAL RECEIPT NO</th>
                <th>PAID FROM</th>
                <th>PAID TO</th>
                <th>ACCOUNTS</th>
                <th>TOTAL AMOUNT</th>
                <th>STATUS</th>
                <th>NARRATION</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map(voucher => (
                <tr key={voucher.id}>
                  <td>{voucher.date}</td>
                  <td>{voucher.paymentNo}</td>
                  <td>{voucher.manualReceipt}</td>
                  <td>{voucher.paidFrom}</td>
                  <td>{voucher.paidTo}</td>
                  <td>{voucher.accounts}</td>
                  <td>{voucher.totalAmount}</td>
                  <td>
                    <span className={`ac-status-badge status-${voucher.status.toLowerCase()}`}>
                      {voucher.status}
                    </span>
                  </td>
                  <td>{voucher.narration}</td>
                  <td className="ac-actions-cell">
                    <button className="ac-btn-icon-blue" style={{ background: 'transparent', width: 'auto' }} onClick={() => handleEdit(voucher)}><FaEye /></button>
                    <button className="ac-btn-icon-yellow" style={{ background: 'transparent', width: 'auto', color: '#eab308' }} onClick={() => handleEdit(voucher)}><FaPen /></button>
                    <button className="ac-btn-icon-red" style={{ background: 'transparent', width: 'auto' }} onClick={() => handleDelete(voucher.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ac-pagination">
          <div className="ac-pagination-info">Showing 1 to 4 of 4 results</div>
          <div className="ac-pagination-controls">
            <button className="ac-page-btn" disabled>«</button>
            <button className="ac-page-btn active">1</button>
            <button className="ac-page-btn">2</button>
            <button className="ac-page-btn">»</button>
          </div>
        </div>
      </div>

      {/* Page Info Footer */}
      <div className="ac-page-info">
        <div className="ac-page-info-title">Page Info</div>
        <ul>
          <li>Create and manage payment vouchers for various expenses.</li>
          <li>Each voucher is linked to an account and payment method.</li>
          <li>Helps maintain accurate financial records and expense tracking.</li>
        </ul>
      </div>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="ac-modal-overlay">
          <div className="ac-modal-content" style={{ maxWidth: '800px' }}>
            <div className="ac-modal-header">
              <h3 className="ac-modal-title">{isEditMode ? 'Edit Voucher' : 'Create Voucher'}</h3>
              <button className="ac-close-btn" onClick={() => setModalOpen(false)}><FaXmark /></button>
            </div>
            <div className="ac-modal-body">
              <div className="ac-modal-form-row">
                <div className="ac-modal-form-col">
                  <label className="ac-modal-label">Auto Receipt No</label>
                  <input className="ac-modal-input" value={formData.paymentNo} readOnly />
                </div>
                <div className="ac-modal-form-col">
                  <label className="ac-modal-label">Manual Receipt No</label>
                  <input className="ac-modal-input" placeholder="Enter manual receipt number" value={formData.manualReceiptNo} onChange={e => setFormData({ ...formData, manualReceiptNo: e.target.value })} />
                </div>
              </div>

              <div className="ac-modal-form-row">
                <div className="ac-modal-form-col">
                  <label className="ac-modal-label">Voucher Date</label>
                  <div style={{ position: 'relative' }}>
                    <input type="date" className="ac-modal-input" style={{ width: '100%' }} value={formData.voucherDate} onChange={e => setFormData({ ...formData, voucherDate: e.target.value })} />
                  </div>
                </div>
                <div className="ac-modal-form-col">
                  <label className="ac-modal-label">Paid From</label>
                  <select className="ac-modal-input" value={formData.paidFrom} onChange={e => setFormData({ ...formData, paidFrom: e.target.value })}>
                    <option>Cash</option>
                    <option>Bank Transfer</option>
                    <option>Credit Card</option>
                    <option>PayPal</option>
                  </select>
                </div>
              </div>

              <div className="ac-modal-form-row">
                <div className="ac-modal-form-col">
                  <label className="ac-modal-label">Paid To</label>
                  <select className="ac-modal-input" value={formData.paidTo} onChange={e => setFormData({ ...formData, paidTo: e.target.value })}>
                    <option value="">Select Account or Vendor</option>
                    <option>Salaries</option>
                    <option>Electricity bill</option>
                    <option>Rent</option>
                    <option>Office Supplies</option>
                  </select>
                </div>
              </div>

              <div className="ac-modal-form-row">
                <table className="ac-inner-table">
                  <thead>
                    <tr>
                      <th style={{ width: '30%' }}>ACCOUNT</th>
                      <th style={{ width: '20%' }}>AMOUNT</th>
                      <th style={{ width: '40%' }}>NARRATION</th>
                      <th style={{ width: '10%' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.rows.map((row, idx) => (
                      <tr key={idx}>
                        <td>
                          <input className="ac-inner-input" value={row.account} onChange={(e) => {
                            const newRows = [...formData.rows];
                            newRows[idx].account = e.target.value;
                            setFormData({ ...formData, rows: newRows });
                          }} />
                        </td>
                        <td>
                          <input className="ac-inner-input" value={row.amount} onChange={(e) => {
                            const newRows = [...formData.rows];
                            newRows[idx].amount = e.target.value;
                            setFormData({ ...formData, rows: newRows });
                          }} />
                        </td>
                        <td>
                          <input className="ac-inner-input" value={row.narration} onChange={(e) => {
                            const newRows = [...formData.rows];
                            newRows[idx].narration = e.target.value;
                            setFormData({ ...formData, rows: newRows });
                          }} />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button className="ac-btn-icon-red" style={{ width: '24px', height: '24px', margin: '0 auto' }}><FaTrash size={12} /></button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'right', padding: '10px', fontWeight: 'bold' }}>
                        Total: {formData.rows.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '15px' }}>
                <button className="ac-page-btn" style={{ width: 'auto', padding: '0 10px' }}>+ Add Narration to Rows</button>
                <label style={{ display: 'flex', gap: '5px', alignItems: 'center', fontSize: '14px' }}>
                  <input type="checkbox" defaultChecked /> Add Voucher Narration
                </label>
              </div>

              <div className="ac-modal-form-col">
                <label className="ac-modal-label">Narration</label>
                <textarea
                  className="ac-modal-input"
                  rows="3"
                  placeholder="Enter narration for this voucher..."
                  value={formData.voucherNarration}
                  onChange={e => setFormData({ ...formData, voucherNarration: e.target.value })}
                ></textarea>
              </div>

              <div className="ac-modal-footer">
                <button className="ac-btn-save" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesAccount;
