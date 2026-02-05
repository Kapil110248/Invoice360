import React, { useState } from 'react';
import { FaBox, FaSearch, FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import './Accounts.css';

const DeliveryNote = () => {
  const [notes, setNotes] = useState([
    { id: 1, date: '2025-11-03', customer: 'John Doe', product: 'Product A', quantity: 10, amount: 500 },
    { id: 2, date: '2025-11-02', customer: 'Jane Smith', product: 'Product B', quantity: 5, amount: 250 },
    { id: 3, date: '2025-11-01', customer: 'Alice Johnson', product: 'Product C', quantity: 20, amount: 1000 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: null, date: '', customer: '', product: '', quantity: '', amount: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCurrentNote({ ...currentNote, [name]: value });
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentNote({ id: null, date: '', customer: '', product: '', quantity: '', amount: '' });
    setShowModal(true);
  };

  const handleEditClick = (note) => {
    setIsEditing(true);
    setCurrentNote(note);
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this delivery note?')) {
      setNotes(notes.filter(n => n.id !== id));
      toast.success('Delivery note deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentNote.date || !currentNote.customer || !currentNote.product) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (isEditing) {
      setNotes(notes.map(n => n.id === currentNote.id ? currentNote : n));
      toast.success('Delivery note updated successfully');
    } else {
      const newNote = { ...currentNote, id: Date.now() };
      setNotes([newNote, ...notes]);
      toast.success('Delivery note added successfully');
    }
    setShowModal(false);
  };

  const filteredNotes = notes.filter(note =>
    note.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ac-container">
      {/* Header */}
      <div className="ac-header">
        <div className="ac-title">
          <FaBox className="ac-title-icon" />
          Delivery Notes
        </div>
        <div className="ac-subtitle">Manage your delivery records easily</div>
      </div>

      {/* Action Bar */}
      <div className="ac-action-bar">
        <div className="ac-search-box">
          <FaSearch className="ac-search-icon" />
          <input
            type="text"
            className="ac-search-input"
            placeholder="Search delivery notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="ac-btn-add" onClick={handleAddClick}>
          <FaPlus /> Add Delivery Note
        </button>
      </div>

      {/* Table */}
      <div className="ac-table-card">
        <div className="ac-table-container">
          <table className="ac-table">
            <thead>
              <tr>
                <th>#</th>
                <th>DATE</th>
                <th>CUSTOMER</th>
                <th>PRODUCT</th>
                <th>QUANTITY</th>
                <th>AMOUNT</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note, index) => (
                  <tr key={note.id}>
                    <td>{index + 1}</td>
                    <td>{note.date}</td>
                    <td>{note.customer}</td>
                    <td>{note.product}</td>
                    <td>{note.quantity}</td>
                    <td>{note.amount}</td>
                    <td className="ac-actions-cell">
                      <button className="ac-action-btn ac-btn-edit" onClick={() => handleEditClick(note)}>
                        <FaEdit />
                      </button>
                      <button className="ac-action-btn ac-btn-delete" onClick={() => handleDeleteClick(note.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                    No delivery notes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="ac-modal-overlay">
          <div className="ac-modal-content">
            <div className="ac-modal-header">
              <h3 className="ac-modal-title">{isEditing ? 'Edit Delivery Note' : 'New Delivery Note'}</h3>
              <button className="ac-close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="ac-modal-body">
              <div className="ac-form-grid">
                <div className="ac-form-group">
                  <label className="ac-form-label">Date</label>
                  <input
                    type="date"
                    className="ac-form-input"
                    name="date"
                    value={currentNote.date}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="ac-form-group">
                  <label className="ac-form-label">Customer</label>
                  <input
                    type="text"
                    className="ac-form-input"
                    placeholder="Enter customer name"
                    name="customer"
                    value={currentNote.customer}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="ac-form-group ac-form-full">
                  <label className="ac-form-label">Product</label>
                  <input
                    type="text"
                    className="ac-form-input"
                    placeholder="Enter product name"
                    name="product"
                    value={currentNote.product}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="ac-form-group">
                  <label className="ac-form-label">Quantity</label>
                  <input
                    type="number"
                    className="ac-form-input"
                    placeholder="Enter quantity"
                    name="quantity"
                    value={currentNote.quantity}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="ac-form-group">
                  <label className="ac-form-label">Amount</label>
                  <input
                    type="number"
                    className="ac-form-input"
                    placeholder="Enter amount"
                    name="amount"
                    value={currentNote.amount}
                    onChange={handleInput}
                    required
                  />
                </div>

                <div className="ac-form-full">
                  <button type="submit" className="ac-btn-full">
                    {isEditing ? 'Update Delivery Note' : 'Add Delivery Note'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryNote;
