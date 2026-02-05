import React, { useState } from 'react';
import { FaFileInvoiceDollar, FaSearch, FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import './Accounts.css';

const CreditNote = () => {
  // Dummy Data adapted to Credit Note structure (Customer, Description, Date on left; Qty, Rate, Amount on right)
  const [notes, setNotes] = useState([
    { id: 1, date: '2025-11-03', customer: 'John Doe', description: 'Returned Product A', quantity: 2, rate: 100, amount: 200 },
    { id: 2, date: '2025-11-02', customer: 'Jane Smith', description: 'Returned Product B', quantity: 1, rate: 250, amount: 250 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: null, date: '', customer: '', description: '', quantity: '', rate: '', amount: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    let updatedNote = { ...currentNote, [name]: value };

    // Auto-calculate Amount if Qty or Rate changes
    if (name === 'quantity' || name === 'rate') {
      const qty = parseFloat(name === 'quantity' ? value : currentNote.quantity) || 0;
      const rate = parseFloat(name === 'rate' ? value : currentNote.rate) || 0;
      updatedNote.amount = qty * rate;
    }

    setCurrentNote(updatedNote);
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentNote({ id: null, date: '', customer: '', description: '', quantity: '', rate: '', amount: '' });
    setShowModal(true);
  };

  const handleEditClick = (note) => {
    setIsEditing(true);
    setCurrentNote(note);
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this credit note?')) {
      setNotes(notes.filter(n => n.id !== id));
      toast.success('Credit note deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentNote.date || !currentNote.customer) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (isEditing) {
      setNotes(notes.map(n => n.id === currentNote.id ? currentNote : n));
      toast.success('Credit note updated successfully');
    } else {
      const newNote = { ...currentNote, id: Date.now() };
      setNotes([newNote, ...notes]);
      toast.success('Credit note added successfully');
    }
    setShowModal(false);
  };

  const filteredNotes = notes.filter(note =>
    note.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ac-container">
      {/* Header */}
      <div className="ac-header">
        <div className="ac-title" style={{ color: 'var(--primary)' }}>
          Credit Notes
        </div>
      </div>

      {/* Action Bar */}
      <div className="ac-action-bar">
        <div className="ac-search-box">
          <FaSearch className="ac-search-icon" />
          <input
            type="text"
            className="ac-search-input"
            placeholder="Search credit notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="ac-btn-add" onClick={handleAddClick}>
          <FaPlus /> Add Credit Note
        </button>
      </div>

      {/* List Layout (Card Style as per Image) */}
      <div className="ac-list-container">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note.id} className="ac-list-item">
              {/* Left Side: Customer & Description */}
              <div className="ac-item-left">
                <div className="ac-item-title">{note.customer}</div>
                <div className="ac-item-desc">{note.description}</div>
                <div className="ac-item-date">{note.date}</div>
              </div>

              {/* Right Side: Financials & Actions */}
              <div className="ac-item-right">
                <div className="ac-stat-row">
                  <span className="ac-stat-label">Qty:</span>
                  <span className="ac-stat-value">{note.quantity}</span>
                </div>
                <div className="ac-stat-row">
                  <span className="ac-stat-label">Rate:</span>
                  <span className="ac-stat-value">R{note.rate}</span>
                </div>
                <div className="ac-stat-row">
                  <span className="ac-stat-label">Amount:</span>
                  <span className="ac-stat-value highlight">R{note.amount}</span>
                </div>
                <div className="ac-item-actions">
                  <button className="ac-action-btn ac-btn-edit" onClick={() => handleEditClick(note)}>
                    <FaEdit />
                  </button>
                  <button className="ac-action-btn ac-btn-delete" onClick={() => handleDeleteClick(note.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="ac-empty-state">No credit notes found.</div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="ac-modal-overlay">
          <div className="ac-modal-content" style={{ maxWidth: '500px' }}>
            <div className="ac-modal-header">
              <h3 className="ac-modal-title" style={{ color: '#1e293b' }}>
                {isEditing ? 'Edit Credit Note' : 'Add Credit Note'}
              </h3>
              <button className="ac-close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="ac-modal-body">
              {/* Single Column Layout as per Add Modal Image */}
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
              <div className="ac-form-group">
                <label className="ac-form-label">Description</label>
                <input
                  type="text"
                  className="ac-form-input"
                  placeholder="Enter description"
                  name="description"
                  value={currentNote.description}
                  onChange={handleInput}
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
                />
              </div>
              <div className="ac-form-group">
                <label className="ac-form-label">Rate</label>
                <input
                  type="number"
                  className="ac-form-input"
                  placeholder="Enter rate"
                  name="rate"
                  value={currentNote.rate}
                  onChange={handleInput}
                />
              </div>

              <button type="submit" className="ac-btn-full" style={{ marginTop: '20px' }}>
                {isEditing ? 'Update' : 'Add'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditNote;
