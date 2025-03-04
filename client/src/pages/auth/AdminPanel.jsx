import React, { useState } from 'react';
import { BellIcon, UserIcon, CreditCardIcon, ChartBarIcon, LogOutIcon, PlusIcon, UsersIcon, TrashIcon, EditIcon, BellRingIcon } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', subscription: 'Premium', creditScore: 680 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', subscription: 'Basic', creditScore: 710 },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', status: 'Inactive', subscription: 'None', creditScore: 650 }
  ]);

  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: 'Basic', users: 124, price: '$9.99' },
    { id: 2, name: 'Premium', users: 86, price: '$19.99' },
    { id: 3, name: 'Enterprise', users: 32, price: '$49.99' }
  ]);

  const stats = {
    totalUsers: 242,
    totalSubscribers: 118,
    todayRegistered: 8,
    todaySubscribed: 3,
    avgCreditScore: 685,
    totalRevenue: '$4,328.52'
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent stats={stats} />;
      case 'users':
        return <UsersContent users={users} setUsers={setUsers} />;
      case 'subscriptions':
        return <SubscriptionsContent subscriptions={subscriptions} />;
      case 'notifications':
        return <NotificationsContent />;
      default:
        return <DashboardContent stats={stats} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 font-bold text-xl border-b border-gray-700">
          Credit Builder Admin
        </div>
        <nav className="mt-4">
          <SidebarLink 
            icon={<ChartBarIcon size={20} />} 
            title="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarLink 
            icon={<UsersIcon size={20} />} 
            title="Users Management" 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')} 
          />
          <SidebarLink 
            icon={<CreditCardIcon size={20} />} 
            title="Subscription List" 
            active={activeTab === 'subscriptions'} 
            onClick={() => setActiveTab('subscriptions')} 
          />
          <SidebarLink 
            icon={<BellIcon size={20} />} 
            title="Notification Manage" 
            active={activeTab === 'notifications'} 
            onClick={() => setActiveTab('notifications')} 
          />
          <div className="mt-8 p-4 border-t border-gray-700">
            <SidebarLink 
              icon={<LogOutIcon size={20} />} 
              title="Logout" 
              onClick={() => alert('Logged out')} 
            />
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <BellIcon size={20} />
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <UserIcon size={16} />
              </div>
              <span className="ml-2">Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, title, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center space-x-2 w-full p-3 hover:bg-gray-700 transition-colors ${active ? 'bg-gray-700' : ''}`}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
};

const DashboardContent = ({ stats }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} icon={<UsersIcon size={24} />} color="bg-blue-500" />
        <StatCard title="Total Subscribers" value={stats.totalSubscribers} icon={<CreditCardIcon size={24} />} color="bg-green-500" />
        <StatCard title="Average Credit Score" value={stats.avgCreditScore} icon={<ChartBarIcon size={24} />} color="bg-purple-500" />
        <StatCard title="Today Registered" value={stats.todayRegistered} icon={<PlusIcon size={24} />} color="bg-yellow-500" />
        <StatCard title="Today Subscribed" value={stats.todaySubscribed} icon={<CreditCardIcon size={24} />} color="bg-pink-500" />
        <StatCard title="Total Revenue" value={stats.totalRevenue} icon={<CreditCardIcon size={24} />} color="bg-indigo-500" />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <ActivityItem 
            type="signup" 
            message="New user registered: Sarah Johnson" 
            time="5 minutes ago" 
          />
          <ActivityItem 
            type="subscription" 
            message="Michael Brown upgraded to Premium plan" 
            time="1 hour ago" 
          />
          <ActivityItem 
            type="alert" 
            message="System update scheduled for tomorrow at 2AM" 
            time="3 hours ago" 
          />
          <ActivityItem 
            type="signup" 
            message="New user registered: David Wilson" 
            time="5 hours ago" 
          />
        </div>
      </div>
    </div>
  );
};

const UsersContent = ({ users, setUsers }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold">User Management</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-1">
          <PlusIcon size={16} />
          <span>Add User</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Score</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserIcon size={20} className="text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.subscription}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.creditScore}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <EditIcon size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <TrashIcon size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SubscriptionsContent = ({ subscriptions }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Subscription Plans</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-1">
            <PlusIcon size={16} />
            <span>Add Plan</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscriptions.map(sub => (
                <tr key={sub.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sub.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.users}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EditIcon size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Subscription Activity</h2>
        <div className="space-y-4">
          <ActivityItem 
            type="subscription" 
            message="Michelle Davis upgraded to Premium" 
            time="2 hours ago" 
          />
          <ActivityItem 
            type="subscription" 
            message="James Wilson downgraded to Basic" 
            time="5 hours ago" 
          />
          <ActivityItem 
            type="subscription" 
            message="Thomas Brown cancelled subscription" 
            time="1 day ago" 
          />
        </div>
      </div>
    </div>
  );
};

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

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-start space-x-4">
      <div className={`p-3 rounded-lg ${color} text-white`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

const ActivityItem = ({ type, message, time }) => {
  let icon;
  let color;
  
  switch (type) {
    case 'signup':
      icon = <UserIcon size={16} />;
      color = 'text-blue-500';
      break;
    case 'subscription':
      icon = <CreditCardIcon size={16} />;
      color = 'text-green-500';
      break;
    case 'alert':
      icon = <BellRingIcon size={16} />;
      color = 'text-yellow-500';
      break;
    default:
      icon = <UserIcon size={16} />;
      color = 'text-gray-500';
  }

  return (
    <div className="flex items-start space-x-3">
      <div className={`mt-1 ${color}`}>{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-800">{message}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
};

export default AdminPanel;