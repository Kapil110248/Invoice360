import React, { useState } from 'react';
import { FaChartLine, FaArrowTrendDown, FaArrowTrendUp, FaMoneyBillWave, FaLandmark, FaCheckDouble } from 'react-icons/fa6';
import './Accounts.css';

const ProfitLossAccount = () => {
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('August');

  // Dummy Data
  const summaryData = {
    revenue: 'R8,50,000',
    expenses: 'R6,20,000',
    grossProfit: 'R2,30,000',
    netProfit: 'R1,80,000',
  };

  const salesData = [
    { label: 'Revenue from Sales', amount: 'R7,65,000', isTotal: false },
    { label: 'Other Income', amount: 'R85,000', isTotal: false },
    { label: 'Operating Expenses', amount: 'R4,34,000', isTotal: false },
    { label: 'Administrative Expenses', amount: 'R1,86,000', isTotal: false },
    { label: 'Net Profit', amount: 'R1,80,000', isTotal: true, icon: true },
  ];

  return (
    <div className="ac-container">
      {/* Header Card */}
      <div className="ac-pl-header-card">
        <div className="ac-pl-header-left">
          <h2><FaChartLine /> Profit & Loss Statement</h2>
          <p>January 1, {year} - {month} 20, {year}</p>
        </div>
        <div className="ac-pl-filters">
          <div className="ac-pl-filter-group">
            <span className="ac-pl-filter-label">Year:</span>
            <select
              className="ac-pl-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <div className="ac-pl-filter-group">
            <span className="ac-pl-filter-label">Month:</span>
            <select
              className="ac-pl-select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="ac-pl-cards-grid">
        <div className="ac-pl-card ac-card-revenue">
          <div className="ac-pl-card-title">
            <FaMoneyBillWave /> Total Revenue
          </div>
          <div className="ac-pl-card-amount">
            {summaryData.revenue}
          </div>
        </div>

        <div className="ac-pl-card ac-card-expense">
          <div className="ac-pl-card-title">
            <FaArrowTrendDown /> Total Expenses
          </div>
          <div className="ac-pl-card-amount">
            {summaryData.expenses}
          </div>
        </div>

        <div className="ac-pl-card ac-card-gross">
          <div className="ac-pl-card-title">
            <FaArrowTrendUp /> Gross Profit
          </div>
          <div className="ac-pl-card-amount">
            {summaryData.grossProfit}
          </div>
        </div>

        <div className="ac-pl-card ac-card-net">
          <div className="ac-pl-card-title">
            <FaLandmark /> Net Profit
          </div>
          <div className="ac-pl-card-amount">
            {summaryData.netProfit}
          </div>
        </div>
      </div>

      {/* Detailed Summary List */}
      <div className="ac-pl-summary-section">
        <div className="ac-pl-section-title">Summary</div>
        <div className="ac-pl-list">
          {salesData.map((item, index) => (
            <div
              key={index}
              className={`ac-pl-list-item ${item.isTotal ? 'highlight' : ''}`}
            >
              <div className="ac-pl-icon-box">
                {item.icon && <FaCheckDouble />} {item.label}
              </div>
              <div className="ac-pl-amount">
                {item.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfitLossAccount;
