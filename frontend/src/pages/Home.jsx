import React, { useState } from 'react';

import { FaTimes, FaUser, FaEnvelope, FaCalendarAlt, FaClock, FaClipboardList } from 'react-icons/fa'; // Corrected import path
import Header from '../components/Header';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventDescription: '',
    date: '',
    time: '',
  });
  const [errors, setErrors] = useState({});

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ // Reset form data when closing
      name: '',
      email: '',
      eventDescription: '',
      date: '',
      time: '',
    });
    setErrors({}); // Clear errors when closing
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    alert('Event booked successfully!');
    handleCloseModal();
    
    try {
     let response = await fetch("http://localhost:3000/user/eventAdd", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(formData),
      });
      let resData = await response.json();

        console.log("res==>", resData.data.email);

        window.localStorage.setItem('user', resData.data.email)
        
      
    } 
    catch (error) {
      alert(error.message)
    }
  };

  return (
    <div className="homepage-wrapper">
      {/* Header */}
     <Header />

      {/* Hero Section */}
      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title">
            Discover & Book <span className="break-mobile">Your Next Unforgettable Event</span>
          </h1>
          <p className="hero-subtitle">
            From corporate gatherings to personal celebrations, we make booking seamless.
          </p>
          <button
            onClick={handleOpenModal}
            className="book-btn"
          >
            Book an Event Now!
          </button>
        </section>
      </main>

      {/* Event Booking Form Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={handleCloseModal} className="modal-close-btn">
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
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <p>&copy; {new Date().getFullYear()} EventBooker. All rights reserved.</p>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Privacy Policy</a></li>
            <li><a href="#" className="footer-link">Terms of Service</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Home;
