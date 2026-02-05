import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RotateCcw, Plus, Eye, Edit2, Trash2, BookOpen, Wallet, ArrowDownCircle, ArrowUpCircle, PieChart, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
import './ChartOfAccounts.css';

// Stats Card Component
const StatCard = ({ icon: Icon, title, amount, subtext, colorClass, iconBgClass, borderColor }) => (
    <div className={`Charts-of-Account-stat-card ${borderColor}`}>
        <div className="Charts-of-Account-stat-header">
            <div className={`Charts-of-Account-stat-icon-wrapper ${iconBgClass}`}>
                <Icon size={20} />
            </div>
            <div className="Charts-of-Account-stat-amount">{amount}</div>
        </div>
        <div className="Charts-of-Account-stat-title">{title}</div>
        <div className="Charts-of-Account-stat-sub">{subtext}</div>
    </div>
);

const ChartOfAccounts = () => {
    const navigate = useNavigate();
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal States
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    // Current Selection State
    const [currentAccount, setCurrentAccount] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        type: 'ASSETS',
        balance: 0,
        description: ''
    });

    useEffect(() => {
        // Initial Dummy Data
        const dummyData = [
            { id: 101, name: 'Cash-in-hand', type: 'ASSETS', currentBalance: 5000, description: 'Petty cash for daily operations' },
            { id: 102, name: 'Bank A/Cs', type: 'ASSETS', currentBalance: 25000, tag: 'Bank Account', description: 'Main business checking account' },
            { id: 103, name: 'Sundry Debtors', type: 'ASSETS', currentBalance: 15000, description: 'Accounts receivable from customers' },
            { id: 104, name: 'Fixed Assets', type: 'ASSETS', currentBalance: 100000, description: 'Long-term assets like equipment' },
            { id: 201, name: 'Sundry Creditors', type: 'LIABILITIES', currentBalance: 12000, description: 'Accounts payable to vendors' },
            { id: 202, name: 'Loans (Liability)', type: 'LIABILITIES', currentBalance: 50000, description: 'Business loans outstanding' },
            { id: 301, name: 'Sales A/C', type: 'INCOME', currentBalance: 75000, description: 'Revenue from sales' },
            { id: 302, name: 'Misc. Income', type: 'INCOME', currentBalance: 5000, description: 'Other income sources' },
            { id: 401, name: 'Direct Expenses', type: 'EXPENSES', currentBalance: 20000, description: 'Cost of goods sold' },
            { id: 402, name: 'Indirect Expenses', type: 'EXPENSES', currentBalance: 15000, description: 'Overhead expenses' },
        ];
        setChartData(dummyData);
        setLoading(false);
    }, []);

    // Helper functions
    const calculateTotal = (accounts) => accounts.reduce((acc, curr) => acc + (parseFloat(curr.currentBalance) || 0), 0).toFixed(2);
    const formatCurrency = (amount) => 'R' + parseFloat(amount || 0).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const assets = chartData.filter(a => a.type === 'ASSETS');
    const liabilities = chartData.filter(a => a.type === 'LIABILITIES');
    const income = chartData.filter(a => a.type === 'INCOME');
    const expenses = chartData.filter(a => a.type === 'EXPENSES');

    // Filter Logic
    const filterAccounts = (list) => list.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // --- Action Handlers ---

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // ADD
    const openAddModal = () => {
        setFormData({ name: '', type: 'ASSETS', balance: 0, description: '' });
        setShowAddModal(true);
    };

    const handleCreate = () => {
        if (!formData.name) return toast.error('Account Name is required');
        const newAccount = {
            id: Date.now(),
            ...formData,
            currentBalance: parseFloat(formData.balance)
        };
        setChartData([...chartData, newAccount]);
        toast.success('Account created successfully');
        setShowAddModal(false);
    };

    // EDIT
    const openEditModal = (account) => {
        setCurrentAccount(account);
        setFormData({
            name: account.name,
            type: account.type,
            balance: account.currentBalance,
            description: account.description || ''
        });
        setShowEditModal(true);
    };

    const handleUpdate = () => {
        if (!formData.name) return toast.error('Account Name is required');
        setChartData(chartData.map(acc => acc.id === currentAccount.id ? {
            ...acc,
            ...formData,
            currentBalance: parseFloat(formData.balance)
        } : acc));
        toast.success('Account updated successfully');
        setShowEditModal(false);
    };

    // DELETE
    const openDeleteModal = (account) => {
        setCurrentAccount(account);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        setChartData(chartData.filter(acc => acc.id !== currentAccount.id));
        toast.success('Account deleted successfully');
        setShowDeleteModal(false);
    };

    // VIEW
    const openViewModal = (account) => {
        setCurrentAccount(account);
        setShowViewModal(true);
    };

    // LEDGER NAV
    const goToLedger = (account) => {
        navigate('/company/reports/ledger', { state: { accountId: account.id, accountName: account.name } });
    };


    // Section Component
    const AccountSection = ({ title, accounts, colorClass, icon: SectionIcon, totalColorClass }) => {
        if (accounts.length === 0) return null;
        const total = calculateTotal(accounts);

        return (
            <>
                <div className="Charts-of-Account-group-header">
                    <div className={`Charts-of-Account-type-indicator`} style={{ backgroundColor: colorClass, height: '20px', width: '4px' }}></div>
                    <div className="Charts-of-Account-group-title">
                        {SectionIcon && <SectionIcon size={16} color={colorClass} />}
                        <span className="Charts-of-Account-group-name">{title}</span>
                    </div>
                    <span className="Charts-of-Account-group-count">({accounts.length} accounts)</span>
                </div>

                {accounts.map((acc, idx) => (
                    <div key={acc.id} className="Charts-of-Account-row">
                        <div className="Charts-of-Account-col-type">
                            <div className="Charts-of-Account-type-indicator" style={{ backgroundColor: colorClass }}></div>
                            <span className="Charts-of-Account-text-type">{title}</span>
                        </div>
                        <div className="Charts-of-Account-col-name">
                            <div className="Charts-of-Account-icon-box" style={{ backgroundColor: `${colorClass}20`, color: colorClass }}>
                                <SectionIcon size={16} />
                            </div>
                            <span className="Charts-of-Account-account-name">{acc.name}</span>
                            {acc.tag && <span className="Charts-of-Account-tag">{acc.tag}</span>}
                        </div>
                        <div className={`Charts-of-Account-col-balance`} style={{ color: totalColorClass }}>
                            {formatCurrency(acc.currentBalance)}
                        </div>
                        <div className="Charts-of-Account-col-actions">
                            <button className="Charts-of-Account-action-icon" style={{ color: '#3b82f6' }} onClick={() => openViewModal(acc)} title="View Details">
                                <Eye size={16} />
                            </button>
                            <button className="Charts-of-Account-action-icon" style={{ color: '#f59e0b' }} onClick={() => openEditModal(acc)} title="Edit Account">
                                <Edit2 size={16} />
                            </button>
                            <button className="Charts-of-Account-action-icon" style={{ color: '#ef4444' }} onClick={() => openDeleteModal(acc)} title="Delete Account">
                                <Trash2 size={16} />
                            </button>
                            <button className="Charts-of-Account-btn-ledger" onClick={() => goToLedger(acc)}>
                                <BookOpen size={14} /> Ledger
                            </button>
                        </div>
                    </div>
                ))}

                <div className="Charts-of-Account-total-row">
                    <div className="Charts-of-Account-total-label">Total {title} Balance:</div>
                    <div className="Charts-of-Account-total-amount" style={{ color: totalColorClass }}>{formatCurrency(total)}</div>
                    <div></div>
                </div>
            </>
        )
    };

    return (
        <div className="Charts-of-Account-chart-of-accounts-page">
            {/* Stats Cards */}
            <div className="Charts-of-Account-stats-container">
                <StatCard icon={Wallet} title="Assets" amount={formatCurrency(calculateTotal(assets))} subtext={`${assets.length} accounts`} borderColor="stat-card-assets" iconBgClass="icon-bg-assets" />
                <StatCard icon={ArrowDownCircle} title="Liabilities" amount={formatCurrency(calculateTotal(liabilities))} subtext={`${liabilities.length} accounts`} borderColor="stat-card-liabilities" iconBgClass="icon-bg-liabilities" />
                <StatCard icon={PieChart} title="Income" amount={formatCurrency(calculateTotal(income))} subtext={`${income.length} accounts`} borderColor="stat-card-income" iconBgClass="icon-bg-income" />
                <StatCard icon={Building2} title="Expenses" amount={formatCurrency(calculateTotal(expenses))} subtext={`${expenses.length} accounts`} borderColor="stat-card-expenses" iconBgClass="icon-bg-expenses" />
            </div>

            {/* Action/Filter Bar */}
            <div className="Charts-of-Account-page-header-actions">
                <button className="Charts-of-Account-btn-clear" style={{ backgroundColor: 'var(--coa-primary)', color: 'white', border: 'none', display: 'flex', gap: '5px', alignItems: 'center' }} onClick={openAddModal}>
                    <Plus size={16} /> Add New Account
                </button>
                <div className="Charts-of-Account-search-wrapper">
                    <Search className="Charts-of-Account-search-icon" size={18} />
                    <input
                        type="text"
                        className="Charts-of-Account-search-input"
                        placeholder="Search by account name or type..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="Charts-of-Account-btn-clear" onClick={() => setSearchTerm('')}>Clear Filters</button>
            </div>

            {/* Main Accounts Table Card */}
            <div className="Charts-of-Account-main-card">
                <div className="Charts-of-Account-table-header-row">
                    <div>ACCOUNT TYPE</div>
                    <div>ACCOUNT NAME</div>
                    <div>BALANCE</div>
                    <div>ACTIONS</div>
                </div>

                <AccountSection title="Assets" accounts={filterAccounts(assets)} colorClass="#22c55e" icon={Wallet} totalColorClass="#16a34a" />
                <AccountSection title="Liabilities" accounts={filterAccounts(liabilities)} colorClass="#f43f5e" icon={ArrowDownCircle} totalColorClass="#16a34a" />
                <AccountSection title="Income" accounts={filterAccounts(income)} colorClass="#3b82f6" icon={PieChart} totalColorClass="#16a34a" />
                <AccountSection title="Expenses" accounts={filterAccounts(expenses)} colorClass="#f97316" icon={Building2} totalColorClass="#16a34a" />

            </div>

            {/* Footer Legend */}
            <div className="Charts-of-Account-footer-legend">
                {/* ... existing legend ... */}
                <div className="Charts-of-Account-legend-title">
                    <PieChart size={20} className="text-blue-500" />
                    Accounts Overview
                </div>
                <div className="Charts-of-Account-legend-grid">
                    <div className="Charts-of-Account-legend-item">
                        <h4 style={{ color: '#22c55e' }}><span className="Charts-of-Account-dot" style={{ backgroundColor: '#22c55e' }}></span> Assets</h4>
                        <p className="Charts-of-Account-legend-text">Resources owned by the business that provide future economic benefits.</p>
                    </div>
                    {/* ... other legend items ... */}
                    <div className="Charts-of-Account-legend-item">
                        <h4 style={{ color: '#f43f5e' }}><span className="Charts-of-Account-dot" style={{ backgroundColor: '#f43f5e' }}></span> Liabilities</h4>
                        <p className="Charts-of-Account-legend-text">Obligations and debts owed to creditors and other parties.</p>
                    </div>
                    <div className="Charts-of-Account-legend-item">
                        <h4 style={{ color: '#3b82f6' }}><span className="Charts-of-Account-dot" style={{ backgroundColor: '#3b82f6' }}></span> Income & Expenses</h4>
                        <p className="Charts-of-Account-legend-text">Track revenue generation and operational costs for better financial management.</p>
                    </div>
                </div>
            </div>

            {/* --- MODALS --- */}

            {/* ADD / EDIT MODAL */}
            {(showAddModal || showEditModal) && (
                <div className="Charts-of-Account-modal-overlay">
                    <div className="Charts-of-Account-modal-content">
                        <div className="Charts-of-Account-modal-header">
                            <h3 className="Charts-of-Account-modal-title">{showEditModal ? 'Edit Account' : 'Add New Account'}</h3>
                            <button className="Charts-of-Account-close-btn" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>×</button>
                        </div>
                        <div className="Charts-of-Account-modal-body">
                            <div className="Charts-of-Account-form-group">
                                <label className="Charts-of-Account-form-label">Account Name</label>
                                <input type="text" className="Charts-of-Account-form-input" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Petty Cash" />
                            </div>
                            <div className="Charts-of-Account-form-group">
                                <label className="Charts-of-Account-form-label">Account Type</label>
                                <select className="Charts-of-Account-form-select" name="type" value={formData.type} onChange={handleInputChange}>
                                    <option value="ASSETS">Assets</option>
                                    <option value="LIABILITIES">Liabilities</option>
                                    <option value="INCOME">Income</option>
                                    <option value="EXPENSES">Expenses</option>
                                </select>
                            </div>
                            <div className="Charts-of-Account-form-group">
                                <label className="Charts-of-Account-form-label">Current Balance</label>
                                <input type="number" className="Charts-of-Account-form-input" name="balance" value={formData.balance} onChange={handleInputChange} placeholder="0.00" />
                            </div>
                            <div className="Charts-of-Account-form-group">
                                <label className="Charts-of-Account-form-label">Description</label>
                                <textarea className="Charts-of-Account-form-textarea" rows="3" name="description" value={formData.description} onChange={handleInputChange} placeholder="Optional description"></textarea>
                            </div>
                        </div>
                        <div className="Charts-of-Account-modal-footer">
                            <button className="Charts-of-Account-btn-cancel" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>Cancel</button>
                            <button className="Charts-of-Account-btn-save" onClick={showEditModal ? handleUpdate : handleCreate}>
                                {showEditModal ? 'Update Account' : 'Create Account'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE MODAL */}
            {showDeleteModal && (
                <div className="Charts-of-Account-modal-overlay">
                    <div className="Charts-of-Account-modal-content" style={{ maxWidth: '400px' }}>
                        <div className="Charts-of-Account-modal-header">
                            <h3 className="Charts-of-Account-modal-title">Delete Account</h3>
                            <button className="Charts-of-Account-close-btn" onClick={() => setShowDeleteModal(false)}>×</button>
                        </div>
                        <div className="Charts-of-Account-modal-body">
                            <p style={{ color: '#64748b' }}>Are you sure you want to delete <strong style={{ color: '#1e293b' }}>{currentAccount?.name}</strong>? This action cannot be undone.</p>
                        </div>
                        <div className="Charts-of-Account-modal-footer">
                            <button className="Charts-of-Account-btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="Charts-of-Account-btn-save" style={{ backgroundColor: '#ef4444' }} onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* VIEW MODAL */}
            {showViewModal && (
                <div className="Charts-of-Account-modal-overlay">
                    <div className="Charts-of-Account-modal-content">
                        <div className="Charts-of-Account-modal-header">
                            <h3 className="Charts-of-Account-modal-title">Account Details</h3>
                            <button className="Charts-of-Account-close-btn" onClick={() => setShowViewModal(false)}>×</button>
                        </div>
                        <div className="Charts-of-Account-modal-body">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label className="Charts-of-Account-stat-sub">Account Name</label>
                                    <div className="Charts-of-Account-stat-title">{currentAccount?.name}</div>
                                </div>
                                <div>
                                    <label className="Charts-of-Account-stat-sub">Type</label>
                                    <div className="Charts-of-Account-stat-title">{currentAccount?.type}</div>
                                </div>
                                <div>
                                    <label className="Charts-of-Account-stat-sub">Balance</label>
                                    <div className="Charts-of-Account-stat-title" style={{ color: '#16a34a' }}>{formatCurrency(currentAccount?.currentBalance)}</div>
                                </div>
                                <div>
                                    <label className="Charts-of-Account-stat-sub">Tag</label>
                                    <div className="Charts-of-Account-stat-title">{currentAccount?.tag || '-'}</div>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label className="Charts-of-Account-stat-sub">Description</label>
                                    <div style={{ color: '#334155', fontSize: '14px', marginTop: '5px' }}>{currentAccount?.description || 'No description provided.'}</div>
                                </div>
                            </div>
                        </div>
                        <div className="Charts-of-Account-modal-footer">
                            <button className="Charts-of-Account-btn-cancel" onClick={() => setShowViewModal(false)}>Close</button>
                            <button className="Charts-of-Account-btn-save" onClick={() => { setShowViewModal(false); openEditModal(currentAccount); }}>Edit</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ChartOfAccounts;