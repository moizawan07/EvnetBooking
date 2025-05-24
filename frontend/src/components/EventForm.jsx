import React, { useState } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaCalendarAlt, FaClock, FaClipboardList } from 'react-icons/lib/fa';
import './EventBookingFormModal.css'; // Import the CSS file

function EventBookingFormModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventDescription: '',
    date: '',
    time: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear specific error
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.eventDescription.trim()) newErrors.eventDescription = 'Event Description is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ // Reset form after submission
        name: '',
        email: '',
        eventDescription: '',
        date: '',
        time: '',
      });
      onClose(); // Close modal on successful submission
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn">
          <FaTimes size={24} />
        </button>
        <h2 className="modal-title">Book Your Event</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="name">
              <FaUser className="form-icon" />Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'input-error' : ''}
              placeholder="Your Full Name"
              required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="form-icon" />Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="your.email@example.com"
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="eventDescription">
              <FaClipboardList className="form-icon" />Event Description
            </label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              rows="3"
              value={formData.eventDescription}
              onChange={handleInputChange}
              className={errors.eventDescription ? 'input-error' : ''}
              placeholder="Tell us about your event..."
              required
            ></textarea>
            {errors.eventDescription && <p className="error-message">{errors.eventDescription}</p>}
          </div>

          <div className="form-group-flex">
            <div className="form-group">
              <label htmlFor="date">
                <FaCalendarAlt className="form-icon" />Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={errors.date ? 'input-error' : ''}
                required
              />
              {errors.date && <p className="error-message">{errors.date}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="time">
                <FaClock className="form-icon" />Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className={errors.time ? 'input-error' : ''}
                required
              />
              {errors.time && <p className="error-message">{errors.time}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="form-submit-btn"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventBookingFormModal;