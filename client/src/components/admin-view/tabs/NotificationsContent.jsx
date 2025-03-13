import React, { useState } from 'react';
import { useNotifications } from '../../../context/NotificationsContext';

const NotificationsContent = () => {
  const { addNotification, notifications } = useNotifications();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('all');
  const [sendVia, setSendVia] = useState({
    email: true,
    inApp: true,
    sms: false
  });
  const [scheduleType, setScheduleType] = useState('immediate');

  const handleSendNotification = () => {
    // Validate form
    if (!subject.trim() || !message.trim()) {
      alert('Please enter both subject and message');
      return;
    }

    // Create notification object
    const notification = {
      subject,
      message,
      recipient,
      sendVia,
      scheduleType
    };

    // Add to context
    addNotification(notification);
    
    // Display success message
    alert('Notification sent successfully!');

    // Reset form
    setSubject('');
    setMessage('');
  };

  const handleSendViaChange = (key) => {
    setSendVia(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Send Notification</h2>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="subscribers">All Subscribers</option>
            <option value="free">Free Users</option>
            <option value="inactive">Inactive Users</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded-md" 
            placeholder="Notification subject" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea 
            className="w-full p-2 border border-gray-300 rounded-md h-32" 
            placeholder="Type your notification message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Send via</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={sendVia.email} 
                onChange={() => handleSendViaChange('email')}
              />
              Email
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={sendVia.inApp} 
                onChange={() => handleSendViaChange('inApp')}
              />
              In-app
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={sendVia.sms} 
                onChange={() => handleSendViaChange('sms')}
              />
              SMS
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="schedule" 
                className="mr-2" 
                checked={scheduleType === 'immediate'} 
                onChange={() => setScheduleType('immediate')}
              />
              Send immediately
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="schedule" 
                className="mr-2" 
                checked={scheduleType === 'scheduled'} 
                onChange={() => setScheduleType('scheduled')}
              />
              Schedule for later
            </label>
          </div>
        </div>
        <button 
          type="button" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          onClick={handleSendNotification}
        >
          Send Notification
        </button>
      </form>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications sent yet.</p>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif.id} className="p-3 bg-gray-50 rounded-md border">
                <div className="flex justify-between">
                  <h4 className="font-medium">{notif.subject}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(notif.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{notif.message}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {notif.sendVia.email && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Email</span>
                  )}
                  {notif.sendVia.inApp && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">In-app</span>
                  )}
                  {notif.sendVia.sms && (
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">SMS</span>
                  )}
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                    To: {notif.recipient}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Add this export default statement
export default NotificationsContent;