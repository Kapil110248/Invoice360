import React, { useState } from 'react';
import {
  FaCog, FaFileInvoiceDollar, FaBuilding, FaUpload,
  FaCheck, FaSyncAlt, FaEye, FaSave
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import './Payroll.css';

const PayrollSettings = () => {
  // State management for settings
  const [settings, setSettings] = useState({
    payCycle: 'Monthly',
    bankAccount: '',
    currency: 'USD',
    taxSlab: '',
    enablePF: true,
    enableInsurance: true,
    enableOtherDeductions: false,
    layout: 'Simple',
    footerNotes: '',
    digitalSignature: true,
    enableEmail: true,
    enableWhatsapp: false,
    emailTemplate: 'Your payslip for {month} is now available.'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Saving settings...',
        success: 'Settings saved successfully!',
        error: 'Could not save settings.',
      }
    );
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to defaults?')) {
      setSettings({
        payCycle: 'Monthly',
        bankAccount: '',
        currency: 'USD',
        taxSlab: '',
        enablePF: false,
        enableInsurance: false,
        enableOtherDeductions: false,
        layout: 'Simple',
        footerNotes: '',
        digitalSignature: false,
        enableEmail: true,
        enableWhatsapp: false,
        emailTemplate: 'Your payslip for {month} is now available.'
      });
      toast.success('Settings reset to defaults');
    }
  };

  const handlePreview = () => {
    toast("Previewing Payslip Template...", {
      icon: '📄',
    });
    // Logic to open a preview modal could go here
  };

  return (
    <div className="em-container">
      <div className="em-header">
        <h2>Payroll Settings</h2>
      </div>

      <div className="ps-layout-grid">
        {/* Left Column */}
        <div className="ps-column">

          {/* Company Payroll Info */}
          <div className="ps-card">
            <div className="ps-card-header">
              <FaBuilding />
              <span className="ps-card-title">Company Payroll Info</span>
            </div>
            <div className="ps-form-group">
              <label className="ps-label">Default Pay Cycle</label>
              <select
                name="payCycle"
                className="ps-select"
                value={settings.payCycle}
                onChange={handleChange}
              >
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Bi-Weekly</option>
              </select>
            </div>
            <div className="ps-form-group">
              <label className="ps-label">Default Bank Account</label>
              <input
                type="text"
                name="bankAccount"
                className="ps-input"
                placeholder="Enter bank account number"
                value={settings.bankAccount}
                onChange={handleChange}
              />
            </div>
            <div className="ps-form-group">
              <label className="ps-label">Default Currency</label>
              <select
                name="currency"
                className="ps-select"
                value={settings.currency}
                onChange={handleChange}
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>INR</option>
                <option>ZAR</option>
              </select>
            </div>
          </div>

          {/* Tax Configuration */}
          <div className="ps-card">
            <div className="ps-card-header">
              <FaFileInvoiceDollar />
              <span className="ps-card-title">Tax Configuration</span>
            </div>
            <div className="ps-form-group">
              <label className="ps-label">Add Tax Slab / Percentage</label>
              <input
                type="text"
                name="taxSlab"
                className="ps-input"
                placeholder="e.g., 10% for income up to R50,000"
                value={settings.taxSlab}
                onChange={handleChange}
              />
            </div>

            <div className="ps-switch-row">
              <div className="em-toggle-wrapper" onClick={() => setSettings({ ...settings, enablePF: !settings.enablePF })}>
                <div className={`em-toggle ${settings.enablePF ? 'active' : ''}`}>
                  <div className="em-toggle-circle"></div>
                </div>
                <span className="ps-label" style={{ margin: 0 }}>Enable PF (Provident Fund)</span>
              </div>
            </div>

            <div className="ps-switch-row">
              <div className="em-toggle-wrapper" onClick={() => setSettings({ ...settings, enableInsurance: !settings.enableInsurance })}>
                <div className={`em-toggle ${settings.enableInsurance ? 'active' : ''}`}>
                  <div className="em-toggle-circle"></div>
                </div>
                <span className="ps-label" style={{ margin: 0 }}>Enable Insurance</span>
              </div>
            </div>

            <div className="ps-switch-row">
              <div className="em-toggle-wrapper" onClick={() => setSettings({ ...settings, enableOtherDeductions: !settings.enableOtherDeductions })}>
                <div className={`em-toggle ${settings.enableOtherDeductions ? 'active' : ''}`}>
                  <div className="em-toggle-circle"></div>
                </div>
                <span className="ps-label" style={{ margin: 0 }}>Enable Other Deductions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="ps-column">

          {/* Payslip Template Settings */}
          <div className="ps-card">
            <div className="ps-card-header">
              <FaFileInvoiceDollar />
              <span className="ps-card-title">Payslip Template Settings</span>
            </div>
            <div className="ps-form-group">
              <label className="ps-label">Upload Company Logo</label>
              <button className="ps-upload-btn"><FaUpload /> Upload</button>
            </div>
            <div className="ps-form-group">
              <label className="ps-label">Select Layout</label>
              <select
                name="layout"
                className="ps-select"
                value={settings.layout}
                onChange={handleChange}
              >
                <option>Simple</option>
                <option>Modern</option>
                <option>Detailed</option>
              </select>
            </div>
            <div className="ps-form-group">
              <label className="ps-label">Add Footer Notes</label>
              <textarea
                name="footerNotes"
                className="ps-textarea"
                placeholder="Enter footer notes for payslips"
                value={settings.footerNotes}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="em-checkbox-wrapper" onClick={() => setSettings({ ...settings, digitalSignature: !settings.digitalSignature })}>
              <div className={`em-toggle ${settings.digitalSignature ? 'active' : ''}`} style={{ width: '24px', height: '14px', marginRight: '5px' }}>
                {/* Mocking the checkbox look with existing toggle or just use standard checkbox if preferred, currently reusing toggle components for visuals */}
              </div>

              {/* Let's strictly use a checkbox for "Include Digital Signature" as per image which looks like a checkbox */}
              <input
                type="checkbox"
                className="em-checkbox"
                checked={settings.digitalSignature}
                onChange={handleChange}
                name="digitalSignature"
                style={{ accentColor: 'black' }}
              />
              <span className="ps-label" style={{ margin: 0 }}>Include Digital Signature</span>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="ps-card">
            <div className="ps-card-header">
              <FaCog />
              <span className="ps-card-title">Notification Settings</span>
            </div>

            <div className="ps-switch-row">
              <div className="em-toggle-wrapper" onClick={() => setSettings({ ...settings, enableEmail: !settings.enableEmail })}>
                <div className={`em-toggle ${settings.enableEmail ? 'active' : ''}`}>
                  <div className="em-toggle-circle"></div>
                </div>
                <span className="ps-label" style={{ margin: 0 }}>Enable Email Send</span>
              </div>
            </div>

            <div className="ps-switch-row">
              <div className="em-toggle-wrapper" onClick={() => setSettings({ ...settings, enableWhatsapp: !settings.enableWhatsapp })}>
                <div className={`em-toggle ${settings.enableWhatsapp ? 'active' : ''}`}>
                  <div className="em-toggle-circle"></div>
                </div>
                <span className="ps-label" style={{ margin: 0 }}>Enable WhatsApp Send</span>
              </div>
            </div>

            <div className="ps-form-group">
              <label className="ps-label">Default Message Template</label>
              <textarea
                name="emailTemplate"
                className="ps-textarea"
                placeholder="Enter message template"
                value={settings.emailTemplate}
                onChange={handleChange}
              ></textarea>
              <p className="ps-hint">Use {'{month}'} as a placeholder for the month name.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="ps-footer">
        <button className="ps-btn ps-btn-save" onClick={handleSave}><FaSave /> Save Settings</button>
        <button className="ps-btn ps-btn-preview" onClick={handlePreview}><FaEye /> Preview Payslip Template</button>
        <button className="ps-btn ps-btn-reset" onClick={handleReset}><FaSyncAlt /> Reset Defaults</button>
      </div>
    </div>
  );
};

export default PayrollSettings;
