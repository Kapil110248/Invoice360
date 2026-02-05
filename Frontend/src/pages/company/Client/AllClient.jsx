import React, { useState } from 'react';
import { FaPlus, FaSearch, FaEye, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import './Client.css';

const AllClient = () => {
  const [clients, setClients] = useState([
    { id: 1, name: 'Acme Corp', contact: 'John Doe', email: 'john@acme.com', phone: '+91 9876543210', status: 'Active', type: 'Corporate', region: 'North' },
    { id: 2, name: 'Beta Traders', contact: 'Jane Smith', email: 'jane@beta.com', phone: '+91 9123456780', status: 'Inactive', type: 'Individual', region: 'West' },
    { id: 3, name: 'Gamma Enterprises', contact: 'Rajesh Kumar', email: 'rajesh@gamma.com', phone: '+91 9988776655', status: 'Active', type: 'Corporate', region: 'South' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Form State
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
      company: client.name,
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
      company: client.name,
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
        contact: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        status: formData.status
      } : c));
    } else {
      const newClient = {
        id: clients.length + 1,
        name: formData.clientName,
        contact: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        type: 'Corporate', // Default
        region: 'North' // Default
      };
      setClients([...clients, newClient]);
    }
    setShowModal(false);
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="c-client-container">
      <div className="c-client-header">
        <h2>All Clients</h2>
        <button className="c-client-add-btn" onClick={handleAddClick}>
          <FaPlus /> Add Client
        </button>
      </div>

      <div className="c-client-filter-section">
        <div className="c-client-search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name/contact"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="c-client-status-filter">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="c-client-table-container">
        <table className="c-client-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>CONTACT</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>STATUS</th>
              <th>TYPE</th>
              <th>REGION</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map(client => (
                <tr key={client.id} className="c-client-row">
                  <td><strong>{client.name}</strong></td>
                  <td>{client.contact}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>
                    <span className={`c-client-status-badge ${client.status === 'Active' ? 'c-client-status-active' : 'c-client-status-inactive'}`}>
                      {client.status}
                    </span>
                  </td>
                  <td>
                    <span className={`c-client-type-badge ${client.type === 'Corporate' ? 'c-client-type-corporate' : 'c-client-type-individual'}`}>
                      {client.type}
                    </span>
                  </td>
                  <td>{client.region}</td>
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
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>No clients found</td>
              </tr>
            )}
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

export default AllClient;
