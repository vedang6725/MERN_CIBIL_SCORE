import React from 'react';

const NotificationsContent = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Send Notification</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
          <select className="w-full p-2 border border-gray-300 rounded-md">
            <option value="all">All Users</option>
            <option value="subscribers">All Subscribers</option>
            <option value="free">Free Users</option>
            <option value="inactive">Inactive Users</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Notification subject" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea className="w-full p-2 border border-gray-300 rounded-md h-32" placeholder="Type your notification message here..."></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Send via</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              Email
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              In-app
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              SMS
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input type="radio" name="schedule" className="mr-2" defaultChecked />
              Send immediately
            </label>
            <label className="flex items-center">
              <input type="radio" name="schedule" className="mr-2" />
              Schedule for later
            </label>
          </div>
        </div>
        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
          Send Notification
        </button>
      </form>
    </div>
  );
};

export default NotificationsContent;