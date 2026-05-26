import React, { useEffect, useState } from 'react';
import { useBookingStore } from '../store/bookingStore';
import { useFacilityStore } from '../store/facilityStore';
import { format } from 'date-fns';
import { FiAward, FiCalendar, FiPlus, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './Facilities.css';

const FACILITY_TYPES = [
  { type: 'SPA', name: 'Spa & Wellness', icon: '💆' },
  { type: 'RESTAURANT', name: 'Restaurant & Dining', icon: '🍽️' },
  { type: 'GYM', name: 'Fitness Center', icon: '💪' },
  { type: 'POOL', name: 'Swimming Pool', icon: '🏊' },
  { type: 'CONFERENCE', name: 'Conference Room', icon: '📋' },
];

const Facilities = () => {
  const { bookings, fetchBookings } = useBookingStore();
  const { facilities, bookFacility } = useFacilityStore();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    facility_type: '',
    facility_name: '',
    booking_time: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const currentBooking = bookings.find((b) => b.is_checked_in);

  const handleBookFacility = async (e) => {
    e.preventDefault();
    if (!currentBooking) {
      toast.error('Please check in to a booking first');
      return;
    }

    try {
      setLoading(true);
      await bookFacility(currentBooking.id, {
        ...formData,
        booking_time: new Date(formData.booking_time).toISOString(),
      });
      toast.success('Facility booked successfully!');
      setFormData({ facility_type: '', facility_name: '', booking_time: '' });
      setShowForm(false);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to book facility');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="facilities-page">
      <div className="page-header">
        <h1>Hotel Facilities</h1>
        {currentBooking && (
          <button
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            <FiPlus size={20} /> Book Facility
          </button>
        )}
      </div>

      {!currentBooking && (
        <div className="alert alert-info">
          <p>Please check in to a booking to reserve facilities.</p>
        </div>
      )}

      {showForm && currentBooking && (
        <div className="booking-form-card">
          <div className="form-header">
            <h2>Book a Facility</h2>
            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleBookFacility}>
            <div className="form-group">
              <label>Facility Type</label>
              <select
                value={formData.facility_type}
                onChange={(e) => setFormData({ ...formData, facility_type: e.target.value })}
                required
              >
                <option value="">Select a facility type</option>
                {FACILITY_TYPES.map((f) => (
                  <option key={f.type} value={f.type}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Service/Treatment Name</label>
              <input
                type="text"
                placeholder="e.g., Massage, Fine Dining, Personal Training"
                value={formData.facility_name}
                onChange={(e) => setFormData({ ...formData, facility_name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Preferred Time</label>
              <input
                type="datetime-local"
                value={formData.booking_time}
                onChange={(e) => setFormData({ ...formData, booking_time: e.target.value })}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Booking...' : 'Book Facility'}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="facilities-grid">
        {FACILITY_TYPES.map((facility) => (
          <div key={facility.type} className="facility-card">
            <div className="facility-icon">{facility.icon}</div>
            <h3>{facility.name}</h3>
            <p>Premium {facility.type.toLowerCase()} services available 24/7</p>
            <button
              className="btn-primary"
              onClick={() => setShowForm(true)}
              disabled={!currentBooking}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {currentBooking && facilities[currentBooking.id] && (
        <div className="booked-facilities">
          <h2>Your Booked Facilities</h2>
          <div className="facilities-list">
            {facilities[currentBooking.id].map((facility) => (
              <div key={facility.id} className="facility-item">
                <div className="facility-info">
                  <h4>{facility.facility_name}</h4>
                  <p className="facility-type">{facility.facility_type}</p>
                  <p className="facility-time">
                    <FiCalendar size={16} />
                    {format(new Date(facility.booking_time), 'PPP p')}
                  </p>
                </div>
                <span className="status-confirmed">Confirmed</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Facilities;
