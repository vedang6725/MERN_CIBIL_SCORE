import React from 'react';
import { UsersIcon, CreditCardIcon, ChartBarIcon, PlusIcon } from 'lucide-react';
import StatCard from '../StatCard';
import ActivityItem from '../ActivityItem';

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

export default DashboardContent;