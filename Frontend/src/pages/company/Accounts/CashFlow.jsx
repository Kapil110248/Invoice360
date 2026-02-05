import React, { useState } from 'react';
import { FaSackDollar, FaFilePdf, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import './Accounts.css';

const CashFlowData = [
  { id: 1, date: '03 Oct 2024', bank: 'SWIZ - 3354456565687', description: 'Cash payments for operating', credit: 'R1,100.00', debit: 'R0.00', accBal: 'R1,100.00', totalBal: 'R5,899.00', method: 'Stripe' },
  { id: 2, date: '06 Nov 2024', bank: 'NBC - 4324356677889', description: 'Loan received (short-term)', credit: 'R800.00', debit: 'R0.00', accBal: 'R800.00', totalBal: 'R6,896.00', method: 'Cash' },
  { id: 3, date: '10 Dec 2024', bank: 'SWIZ - 5475878970090', description: 'Cash payments to employees', credit: 'R0.00', debit: 'R1,500.00', accBal: 'R1,500.00', totalBal: 'R9,899.00', method: 'Paypal' },
  { id: 4, date: '10 Sep 2024', bank: 'IBO - 3434565776768', description: 'Cash receipts from sales', credit: 'R1,700.00', debit: 'R0.00', accBal: 'R1,700.00', totalBal: 'R4,568.00', method: 'Cash' },
  { id: 5, date: '14 Oct 2024', bank: 'IBO - 3453647664889', description: 'Owner\'s equity contribution', credit: 'R1,300.00', debit: 'R0.00', accBal: 'R1,300.00', totalBal: 'R4,568.00', method: 'Paypal' },
  { id: 6, date: '15 Oct 2024', bank: 'SWIZ - 3354456565687', description: 'Utility Bill Payment', credit: 'R0.00', debit: 'R200.00', accBal: 'R200.00', totalBal: 'R4,368.00', method: 'Stripe' },
  { id: 7, date: '20 Oct 2024', bank: 'NBC - 4324356677889', description: 'Interest Income', credit: 'R50.00', debit: 'R0.00', accBal: 'R50.00', totalBal: 'R4,418.00', method: 'Bank Transfer' },
  { id: 8, date: '25 Oct 2024', bank: 'IBO - 3434565776768', description: 'Office Supplies', credit: 'R0.00', debit: 'R150.00', accBal: 'R150.00', totalBal: 'R4,268.00', method: 'Cash' },
];

const CashFlowAccount = () => {
    // State
    const [searchTerm, setSearchTerm] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter Logic
    const filteredData = CashFlowData.filter(item => {
        const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.bank.toLowerCase().includes(searchTerm.toLowerCase());
        
        let matchesMethod = true;
        if (paymentMethod !== 'All') {
            matchesMethod = item.method === paymentMethod;
        }

        return matchesSearch && matchesMethod;
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleDownloadPDF = () => {
        window.print();
    };

    return (
        <div className="ac-container">
            <div className="ac-header">
                <div className="ac-title">
                    <FaSackDollar className="ac-title-icon" />
                    Cash Flow
                </div>
                <div className="ac-subtitle">View and manage your cashflow records easily</div>
            </div>

            <div className="ac-action-bar">
                <div className="d-flex" style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
                     <div className="ac-search-box">
                        {/* <FaSearch className="ac-search-icon" /> */}
                        <input 
                            type="text" 
                            className="ac-search-input" 
                            placeholder="Search records..." 
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset to first page on search
                            }}
                        />
                    </div>
                    <select 
                        className="ac-search-input" 
                        style={{width: 'auto', minWidth: '200px'}}
                        value={paymentMethod}
                        onChange={(e) => {
                            setPaymentMethod(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="All">All Payment Methods</option>
                        <option value="Stripe">Stripe</option>
                        <option value="Cash">Cash</option>
                        <option value="Paypal">Paypal</option>
                    </select>
                </div>
               
                <button className="ac-btn-pdf" onClick={handleDownloadPDF}>
                    <FaFilePdf /> Download PDF
                </button>
            </div>

            <div className="ac-table-card">
                <div className="ac-table-container">
                    <table className="ac-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Bank</th>
                                <th>Description</th>
                                <th>Credit</th>
                                <th>Debit</th>
                                <th>Acc. Bal</th>
                                <th>Total Bal</th>
                                <th>Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? currentItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.date}</td>
                                    <td>{item.bank}</td>
                                    <td>{item.description}</td>
                                    <td className="text-green">{item.credit}</td>
                                    <td className="text-red">{item.debit}</td>
                                    <td>{item.accBal}</td>
                                    <td>{item.totalBal}</td>
                                    <td>
                                        <span className={`ac-badge ac-badge-${item.method.toLowerCase()}`}>
                                            {item.method}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="8" style={{textAlign: 'center', padding: '20px', color: 'var(--text-muted)'}}>No records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {filteredData.length > 0 && (
                    <div className="ac-pagination">
                        <div className="ac-pagination-info">
                            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}
                        </div>
                        <div className="ac-pagination-controls">
                            <button 
                                className="ac-page-btn" 
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <FaChevronLeft />
                            </button>
                            {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                                <button 
                                    key={page} 
                                    className={`ac-page-btn ${currentPage === page ? 'active' : ''}`}
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            ))}
                            <button 
                                className="ac-page-btn" 
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CashFlowAccount;
