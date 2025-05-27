
import { FaUserCircle, FaEnvelope, FaPhone, FaCalendarAlt, FaClock, FaClipboardList, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa'; // Corrected import path
import Header from '../components/Header';
import { useState , useEffect} from 'react';


function ProfilePage() {
  const [bookedEvents, setBookedEvents] = useState([])
  
  


 useEffect(() => {
   fetch(`https://evnetbooking-production.up.railway.app/user/profile/${window.localStorage.getItem('user')}`)
      .then(res => res.json())
      .then(data => setBookedEvents(data.data))
      .catch(err => alert(err.message))
 }, [])
 

  return (
    <div className="profile-page-wrapper">
     <Header />

      <main className="profile-main-content">
        <div className="profile-container">
          {/* Profile Header Section */}
           {bookedEvents.length > 0 && (
          <section className="profile-header-section">
            <h1 className="profile-name">{bookedEvents[0].name}</h1>
            <p className="profile-bio">Your bio..</p>
            <div className="profile-contact-info">
              <p><FaEnvelope className="contact-icon" /> {bookedEvents[0].email}</p>
              <p><FaPhone className="contact-icon" />+92 3124578789</p>
              <p><FaGlobe className="contact-icon" />karachi</p>
            </div>
            <button className="edit-profile-btn">Edit Profile</button>
          </section>
        )}

          {/* Booked Events Section */}
          <section className="booked-events-section">
            <h2 className="section-title">My Booked Events</h2>
            {bookedEvents.length > 0 ? (
              <div className="events-grid">
                {bookedEvents.map((event) => (
                  <div key={event._id} className="event-card">
                    <h3 className="event-name">{event.eventName}</h3>
                    <p className="event-organizer">by {event.organizer}</p>
                    <p className="event-description"><FaClipboardList className="event-icon" /> {event.description}</p>
                    <div className="event-details">
                      <p><FaCalendarAlt className="event-icon" /> {new Date(event.date).toLocaleDateString()}</p>
                      <p><FaClock className="event-icon" /> {event.time.slice(0,2) > 11 ? event.time + ' PM' : event.time + ' AM'}</p>
                      {console.log(event.time.slice(0,3))}
                      <p><FaMapMarkerAlt className="event-icon" /> location</p>
                    </div>
                    <div className="event-status">Status: <span className={`status-${event.status.toLowerCase()}`}>{event.status}</span></div>
                    <button className="view-details-btn">View Details</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-events-message">You haven't booked any events yet.</p>
            )}
          </section>
        </div>
      </main>

     
    </div>
  );
}

export default ProfilePage;