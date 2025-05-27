import React, { useEffect, useState } from 'react';
import {
  FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaUserCircle, FaMapMarkerAlt, FaClipboardList,
  FaChartLine, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaUsers, FaCog, FaSignOutAlt,
  FaBars, FaTimes, FaBell, FaPlusCircle, FaArrowRight, FaEye, FaUserPlus, FaChartBar, FaCalendarCheck
} from 'react-icons/fa'; // All necessary icons

function AdminDashboard() {
  // // Dummy Data for Events (Simulating fetched data)
  // const initialEvents = [
  //   {
  //     id: 'e1',
  //     eventName: 'Annual Tech Summit 2025',
  //     description: 'A gathering of tech innovators and industry leaders. Discussing AI, Blockchain, and Future Tech.',
  //     date: '2025-08-15',
  //     time: '09:00 AM',
  //     location: 'Virtual Conference',
  //     organizer: 'Global Tech Events Inc.',
  //     bookedBy: { name: 'Alice Smith', email: 'alice.s@example.com' },
  //     status: 'Pending',
  //   },
  //   {
  //     id: 'e2',
  //     eventName: 'Local Community Fair',
  //     description: 'Family-friendly event with local vendors, food stalls, and live music.',
  //     date: '2025-09-22',
  //     time: '02:00 PM',
  //     location: 'City Park Grounds',
  //     organizer: 'Community Outreach Group',
  //     bookedBy: { name: 'Bob Johnson', email: 'bob.j@example.com' },
  //     status: 'Approved',
  //   },
  //   {
  //     id: 'e3',
  //     eventName: 'Design Workshop: Figma Basics',
  //     description: 'An interactive workshop for beginners to learn the fundamentals of Figma and UI design.',
  //     date: '2025-10-05',
  //     time: '10:00 AM',
  //     location: 'Creative Hub Studio',
  //     organizer: 'Design Gurus Academy',
  //     bookedBy: { name: 'Charlie Brown', email: 'charlie.b@example.com' },
  //     status: 'Rejected',
  //   },
  //   {
  //     id: 'e4',
  //     eventName: 'Startup Pitch Competition',
  //     description: 'Showcasing innovative startups to a panel of investors and mentors.',
  //     date: '2025-11-10',
  //     time: '04:00 PM',
  //     location: 'Innovation Center',
  //     organizer: 'Venture Capital X',
  //     bookedBy: { name: 'Diana Prince', email: 'diana.p@example.com' },
  //     status: 'Pending',
  //   },
  //   {
  //     id: 'e5',
  //     eventName: 'Charity Gala Dinner',
  //     description: 'An elegant evening to raise funds for local charities, featuring live entertainment.',
  //     date: '2025-12-01',
  //     time: '07:00 PM',
  //     location: 'Grand Ballroom',
  //     organizer: 'Hope Foundation',
  //     bookedBy: { name: 'Eve Adams', email: 'eve.a@example.com' },
  //     status: 'Approved',
  //   },
  // ];

 
  const recentActivities = [
    { id: 1, type: 'Event Booked', detail: 'Alice Smith booked Annual Tech Summit.', time: '2 mins ago' },
    { id: 2, type: 'Status Changed', detail: 'Event ID e2 status changed to Approved.', time: '1 hour ago' },
    { id: 3, type: 'New Admin Login', detail: 'Admin logged in from Karachi.', time: '3 hours ago' },
  ];

  const upcomingEvents = [
    { id: 'ue1', name: 'AI in Business Conference', date: '2025-08-20', time: '09:00 AM' },
    { id: 'ue2', name: 'Marketing Masterclass', date: '2025-09-01', time: '01:00 PM' },
  ];

  const recentUsers = [
    { id: 'u1', name: 'Farah Khan', joined: '2 days ago' },
    { id: 'u2', name: 'Ahmed Ali', joined: '5 days ago' },
  ];

  const [events, setEvents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar toggle

  // Calculate dashboard stats
  const totalEvents = events.length;
  const pendingEvents = events.filter(event => event.status === 'Pending').length;
  const approvedEvents = events.filter(event => event.status === 'Accept').length;
  const rejectedEvents = events.filter(event => event.status === 'Reject').length;

  const handleStatusChange = async (eventId, newStatus) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event._id === eventId ? { ...event, status: newStatus } : event
      )
    );
   
    try {
      let response = await fetch(`https://evnetbooking-production.up.railway.app/admin/eventStatusChnaged/${eventId}`, {
        method : 'PUT',
        headers : {'Content-type' : 'application/json'},
        body: JSON.stringify({status: newStatus})
      })

    } 
    catch (error) {
      alert(error.message) 
    }
      


  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

 useEffect(() => {
    fetch(`https://evnetbooking-production.up.railway.app/admin/allEventsGet`)
       .then(res => res.json())
       .then(data => setEvents(data.data))
       .catch(err => alert(err.message))
  }, [])

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button className="mobile-sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">Admin<span>Panel</span></div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><a href="#" className="sidebar-link active"><FaChartLine className="sidebar-icon" /> Dashboard</a></li>
            <li><a href="#" className="sidebar-link"><FaUsers className="sidebar-icon" /> Users</a></li>
            <li><a href="#" className="sidebar-link"><FaClipboardList className="sidebar-icon" /> All Events</a></li>
            <li><a href="#" className="sidebar-link"><FaCog className="sidebar-icon" /> Settings</a></li>
            <li><a href="#" className="sidebar-link"><FaSignOutAlt className="sidebar-icon" /> Logout</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Event Management Dashboard</h1>
          <div className="dashboard-user-info">
            Welcome, Admin! <FaUser className="user-icon" />
          </div>
        </div>

        {/* Overview Cards */}
        <section className="overview-cards-section">
          <div className="overview-card total-events">
            <FaClipboardList className="card-icon" />
            <div className="card-info">
              <span className="card-value">{totalEvents}</span>
              <span className="card-label">Total Events</span>
            </div>
          </div>
          <div className="overview-card pending-events">
            <FaHourglassHalf className="card-icon" />
            <div className="card-info">
              <span className="card-value">{pendingEvents}</span>
              <span className="card-label">Pending</span>
            </div>
          </div>
          <div className="overview-card approved-events">
            <FaCheckCircle className="card-icon" />
            <div className="card-info">
              <span className="card-value">{approvedEvents}</span>
              <span className="card-label">Accept</span>
            </div>
          </div>
          <div className="overview-card rejected-events">
            <FaTimesCircle className="card-icon" />
            <div className="card-info">
              <span className="card-value">{rejectedEvents}</span>
              <span className="card-label">Reject</span>
            </div>
          </div>
        </section>

        {/* Dashboard Main Content Grid */}
        <div className="dashboard-content-grid">
          {/* Recent Activities Card */}
          <div className="dashboard-card recent-activities-card">
            <h3 className="dashboard-card-title"><FaBell /> Recent Activities</h3>
            <div className="activities-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <FaArrowRight className="activity-icon" />
                  <div className="activity-details">
                    <p>{activity.detail}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="dashboard-card quick-actions-card">
            <h3 className="dashboard-card-title"><FaPlusCircle /> Quick Actions</h3>
            <div className="quick-actions-grid">
              <button className="quick-action-btn"><FaCalendarCheck className="icon" /> Add Event</button>
              <button className="quick-action-btn"><FaUsers className="icon" /> Manage Users</button>
              <button className="quick-action-btn"><FaEye className="icon" /> View Reports</button>
              <button className="quick-action-btn"><FaCog className="icon" /> Settings</button>
            </div>
          </div>

          {/* Upcoming Events Card */}
          <div className="dashboard-card upcoming-events-card">
            <h3 className="dashboard-card-title"><FaCalendarAlt /> Upcoming Events</h3>
            <div className="upcoming-events-list">
              {upcomingEvents.map(event => (
                <div key={event.id} className="upcoming-event-item">
                  <span className="upcoming-event-name">{event.name}</span>
                  <span className="upcoming-event-date-time">{event.date} at {event.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Snapshot Card */}
          <div className="dashboard-card user-snapshot-card">
            <h3 className="dashboard-card-title"><FaUserPlus /> Recent Users</h3>
            <div className="user-snapshot-list">
              {recentUsers.map(user => (
                <div key={user.id} className="user-snapshot-item">
                  <FaUserCircle className="user-snapshot-icon" />
                  <div className="user-snapshot-info">
                    <span className="user-snapshot-name">{user.name}</span>
                    <span className="user-snapshot-joined">Joined {user.joined}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Chart Placeholder Card */}
          <div className="dashboard-card analytics-chart-card md:col-span-2"> {/* Spans two columns on larger screens */}
            <h3 className="dashboard-card-title"><FaChartBar /> Event Bookings Trend</h3>
            <div className="chart-placeholder">
              {/* This is where a real chart (e.g., Recharts LineChart) would go */}
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnaOcZcVEEj6mRPq4nR1-z-GssmFxNCjYZC6M2DZAG5sRFH4O7ile8g0qdVT_fYtDfnRU&usqp=CAU" alt="Chart Placeholder" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
              <p style={{textAlign: 'center', marginTop: '1rem', color: '#6b7280'}}>Monthly Event Bookings (Data Trend)</p>
            </div>
          </div>

        </div>

        {/* All Events List/Table */}
        <section className="all-events-section">
          <h2 className="section-heading">All Booked Events</h2>
          {events.length > 0 ? (
            <div className="events-list">
              {events.map(event => (
                <div key={event._id} className="event-item-card">
                  <div className="event-details-main">
                    <h3 className="event-item-name">{event.name}</h3>
                    <p className="event-item-desc"><FaClipboardList className="item-icon" /> {event.description}</p>
                    <p className="event-item-booked-by"><FaUser className="item-icon" /> Booked by: {event.name} (<a href={`mailto:${event.email}`} className="email-link">{event.email}</a>)</p>
                  </div>
                  <div className="event-details-meta">
                    <p><FaCalendarAlt className="item-icon" /> {new Date(event.date).toLocaleDateString()}</p>
                    <p><FaClock className="item-icon" /> {event.time}</p>
                    <p><FaMapMarkerAlt className="item-icon" />location</p>
                    <p><FaUsers className="item-icon" /> Organizer: MOIZ AHMED</p>
                  </div>
                  <div className="event-status-control">
                    <label htmlFor={`status-${event._id}`} className="status-label">Status:</label>
                    <select
                      id={`status-${event._id}`}
                      value={event.status}
                      onChange={(e) => handleStatusChange(event._id, e.target.value)}
                      className={`status-select status-${event.status.toLowerCase()}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accept">Accept</option>
                      <option value="Reject">Reject</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-events-message">No events booked yet.</p>
          )}
        </section>
      </main>
    </>
  );
}

export default AdminDashboard;
