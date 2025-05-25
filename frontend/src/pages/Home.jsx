import  { useState } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaCalendarAlt, FaClock, FaClipboardList, FaArrowRight, FaCheckCircle, FaStar, FaMapMarkerAlt } from 'react-icons/fa'; // Icons import
import Header from '../components/Header'
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

    // Example of API call (replace with your actual backend endpoint)
    try {
      const response = await fetch("http://localhost:3000/user/eventAdd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const resData = await response.json();
      console.log("res==>", resData.data.email);
      window.localStorage.setItem('user', resData.data.email)

      console.log("Form data submitted:", formData); 
    }
    catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message);
    }
  };

  // Dummy data for new sections
  const featuredEvents = [
    { id: 1, title: 'Global Tech Conference 2025', date: 'Aug 15, 2025', location: 'Virtual', image: 'https://placehold.co/400x250/6A0DAD/FFFFFF?text=Tech+Conf' },
    { id: 2, title: 'Summer Music Festival', date: 'Sep 10-12, 2025', location: 'City Park', image: 'https://placehold.co/400x250/FACC15/6A0DAD?text=Music+Fest' },
    { id: 3, title: 'Art & Culture Expo', date: 'Oct 20, 2025', location: 'Exhibition Hall', image: 'https://placehold.co/400x250/6366F1/FFFFFF?text=Art+Expo' },
    { id: 4, title: 'Food & Wine Tasting', date: 'Nov 5, 2025', location: 'Downtown Venue', image: 'https://placehold.co/400x250/EF4444/FFFFFF?text=Food+Wine' },
  ];

  const howItWorksSteps = [
    { id: 1, title: 'Find Your Event', description: 'Browse through a wide range of events tailored to your interests.' },
    { id: 2, title: 'Book Seamlessly', description: 'Fill out our quick and easy booking form in just a few clicks.' },
    { id: 3, title: 'Enjoy the Experience', description: 'Receive your confirmation and get ready for an unforgettable event!' },
  ];

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

      {/* Featured Events Section */}
      <section className="featured-events-section">
        <div className="container">
          <h2 className="section-heading">Featured Events</h2>
          <p className="section-subheading">Don't miss out on these popular upcoming events!</p>
          <div className="events-grid">
            {featuredEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-card-image" style={{ backgroundImage: `url(${event.image})` }}></div>
                <div className="event-card-content">
                  <h3 className="event-card-title">{event.title}</h3>
                  <p className="event-card-meta"><FaCalendarAlt /> {event.date}</p>
                  <p className="event-card-meta"><FaMapMarkerAlt /> {event.location}</p>
                  <button className="view-event-btn">View Details <FaArrowRight /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-heading">How It Works</h2>
          <p className="section-subheading">Booking your perfect event is as easy as 1-2-3!</p>
          <div className="steps-grid">
            {howItWorksSteps.map(step => (
              <div key={step.id} className="step-card">
                <div className="step-number">{step.id}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section (Optional, but good for engagement) */}
      <section className="cta-section">
        <div className="container cta-content">
          <h2 className="cta-title">Ready to find your next adventure?</h2>
          <p className="cta-description">Explore our full list of events or book a custom one now!</p>
          <div className="cta-buttons">
            <button onClick={handleOpenModal} className="cta-btn primary-cta">Book Your Event</button>
            <a href="#" className="cta-btn secondary-cta">Explore All Events</a>
          </div>
        </div>
      </section>


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
