import React, { useState } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash, FaTimes, FaCalendarAlt } from 'react-icons/fa';
import './Client.css';

const NewClient = () => {
  // Dummy Data for NewClient Table
  const [clients, setClients] = useState([
    { id: 1, name: 'Alpha Corp', company: 'Alpha Corp', contact: 'John Doe', email: 'johndoe@example.com', phone: '9876543210', created: '2024-09-12', status: 'Active' },
    { id: 2, name: 'Beta LLC', company: 'Beta LLC', contact: 'Jane Smith', email: 'janesmith@example.com', phone: '9876512340', created: '2024-10-24', status: 'Inactive' },
    { id: 3, name: 'Gamma Inc', company: 'Gamma Inc', contact: 'Mike Johnson', email: 'mikej@example.com', phone: '9812345670', created: '2025-01-15', status: 'Active' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  // Filter State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Form State (Same as AllClient)
  const [formData, setFormData] = useState({
    clientName: '',
    contactName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    gstin: '',
    status: 'Active'
  });

  const handleAddClick = () => {
    setFormData({
      clientName: '',
      contactName: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      gstin: '',
      status: 'Active'
    });
    setIsEdit(false);
    setIsView(false);
    setShowModal(true);
  };

  const handleEditClick = (client) => {
    setFormData({
      id: client.id,
      clientName: client.name,
      contactName: client.contact,
      email: client.email,
      phone: client.phone,
      company: client.company,
      address: '123 Business St',
      gstin: '27AAAAA0000A1Z5',
      status: client.status
    });
    setIsEdit(true);
    setIsView(false);
    setShowModal(true);
  };

  const handleViewClick = (client) => {
    setFormData({
      id: client.id,
      clientName: client.name,
      contactName: client.contact,
      email: client.email,
      phone: client.phone,
      company: client.company,
      address: '123 Business St',
      gstin: '27AAAAA0000A1Z5',
      status: client.status
    });
    setIsEdit(false);
    setIsView(true);
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatusFilter('All Status');
    setFromDate('');
    setToDate('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) {
      setShowModal(false);
      return;
    }

    if (isEdit) {
      setClients(clients.map(c => c.id === formData.id ? {
        ...c,
        name: formData.clientName,
        company: formData.company || formData.clientName,
        contact: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        status: formData.status
      } : c));
    } else {
      const newClient = {
        id: clients.length + 1,
        name: formData.clientName,
        company: formData.company || formData.clientName,
        contact: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        created: new Date().toISOString().split('T')[0],
        status: formData.status
      };
      setClients([...clients, newClient]);
    }
    setShowModal(false);
  };

  return (
    <div className="c-client-container">
      <div className="c-client-header">
        <div>
          <h2>Client</h2>
          <p className="nc-header-subtitle">Manage your clients</p>
        </div>
        <button className="c-client-add-btn" onClick={handleAddClick}>
          <FaPlus /> Add Client
        </button>
      </div>

      <div className="nc-filter-row">
        <div className="nc-filter-group">
          <label>Search Client</label>
          <input
            type="text"
            placeholder="Enter client name or contact"
            className="nc-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="nc-filter-group">
          <label>Status</label>
          <select
            className="nc-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="nc-filter-group">
          <label>From Date</label>
          <div style={{ position: 'relative' }}>
            <input
              type="date"
              className="nc-input"
              style={{ width: '100%' }}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
        </div>
        <div className="nc-filter-group">
          <label>To Date</label>
          <div style={{ position: 'relative' }}>
            <input
              type="date"
              className="nc-input"
              style={{ width: '100%' }}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
        <button className="nc-btn-clear" onClick={handleClearFilters}>
          Clear
        </button>
      </div>

      <div className="c-client-table-container">
        <table className="c-client-table">
          <thead>
            <tr>
              <th>CLIENT</th>
              <th>CONTACT</th>
              <th>CREATED</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id} className="c-client-row">
                <td>
                  <div className="nc-client-info">
                    <h4>{client.name}</h4>
                    <span>{client.company}</span>
                  </div>
                </td>
                <td>
                  <div className="nc-contact-info">
                    <div>{client.contact}</div>
                    <span>{client.email} • {client.phone}</span>
                  </div>
                </td>
                <td>{client.created}</td>
                <td>
                  <span className={`c-client-status-badge ${client.status === 'Active' ? 'c-client-status-active' : 'c-client-status-inactive'}`}>
                    {client.status}
                  </span>
                </td>
                <td>
                  <div className="c-client-action-buttons">
                    <button className="c-client-btn-icon c-client-btn-view" onClick={() => handleViewClick(client)}>
                      <FaEye />
                    </button>
                    <button className="c-client-btn-icon c-client-btn-edit" onClick={() => handleEditClick(client)}>
                      <FaEdit />
                    </button>
                    <button className="c-client-btn-icon c-client-btn-delete" onClick={() => handleDeleteClick(client.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="c-client-modal-overlay">
          <div className="c-client-modal-content">
            <div className="c-client-modal-header">
              <h3>{isEdit ? 'Edit Client' : isView ? 'View Client' : 'Add Client'}</h3>
              <button className="c-client-close-btn" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="c-client-modal-body">
                <div className="c-client-form-group">
                  <label>Client Name</label>
                  <input
                    type="text"
                    name="clientName"
                    className="c-client-form-input"
                    placeholder="Enter client name"
                    value={formData.clientName}
                    onChange={handleChange}
                    readOnly={isView}
                    required
                  />
                </div>
                <div className="c-client-form-group">
                  <label>Contact Name</label>
                  <input
                    type="text"
                    name="contactName"
                    className="c-client-form-input"
                    placeholder="Contact person"
                    value={formData.contactName}
                    onChange={handleChange}
                    readOnly={isView}
                    required
                  />
                </div>
                <div className="c-client-form-row">
                  <div className="c-client-form-group">
                    <label>Email & Phone</label>
                    <input
                      type="email"
                      name="email"
                      className="c-client-form-input"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      readOnly={isView}
                      required
                    />
                  </div>
                  <div className="c-client-form-group">
                    <label>&nbsp;</label>
                    <input
                      type="text"
                      name="phone"
                      className="c-client-form-input"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      readOnly={isView}
                      required
                    />
                  </div>
                </div>
                <div className="c-client-form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    className="c-client-form-input"
                    placeholder="Company / Organization"
                    value={formData.company}
                    onChange={handleChange}
                    readOnly={isView}
                  />
                </div>
                <div className="c-client-form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    className="c-client-form-input"
                    rows="2"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    readOnly={isView}
                  ></textarea>
                </div>
                <div className="c-client-form-group">
                  <label>GSTIN (optional)</label>
                  <input
                    type="text"
                    name="gstin"
                    className="c-client-form-input"
                    placeholder="GSTIN"
                    value={formData.gstin}
                    onChange={handleChange}
                    readOnly={isView}
                  />
                </div>
                <div className="c-client-form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    className="c-client-form-input"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={isView}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="c-client-modal-footer">
                <button type="button" className="c-client-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                {!isView && (
                  <button type="submit" className="c-client-btn-submit">
                    {isEdit ? 'Update Client' : 'Add Client'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewClient;
