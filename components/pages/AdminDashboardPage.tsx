import React from 'react';
import { mockOrders } from '../../data/orders';
import { DollarSignIcon } from '../icons/DollarSignIcon';
import { ShoppingCartIcon } from '../icons/ShoppingCartIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { PackageIcon } from '../icons/PackageIcon';
import { products } from '../../data/products';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-accent/10 p-3 rounded-full text-accent">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const statusColorMap: { [key: string]: string } = {
    'Delivered': 'bg-green-100 text-green-800',
    'Shipped': 'bg-blue-100 text-blue-800',
    'Processing': 'bg-yellow-100 text-yellow-800',
};

export const AdminDashboardPage: React.FC = () => {
    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
    const totalSales = mockOrders.reduce((sum, order) => sum + order.items.length, 0);
    const totalOrders = mockOrders.length;

    // Mock data for charts
    const salesData = [300, 500, 450, 700, 600, 900, 800, 1100, 1200, 1000, 1300, 1500];
    const topProducts = [...products].sort((a,b) => b.rating - a.rating).slice(0, 5);

    return (
        <div className="space-y-8 bg-secondary p-8 rounded-lg">
            <header>
                <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome back, Admin. Here's what's happening.</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={<DollarSignIcon />} />
                <StatCard title="Total Sales" value={totalSales.toLocaleString()} icon={<ShoppingCartIcon />} />
                <StatCard title="Total Orders" value={totalOrders.toString()} icon={<PackageIcon />} />
                <StatCard title="Total Customers" value="1,204" icon={<UsersIcon />} />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="font-semibold mb-4">Sales Summary</h2>
                     <div className="flex items-end h-64 space-x-2 pt-4">
                        {salesData.map((value, index) => (
                          <div key={index} className="flex-1 bg-accent/20 rounded-t-md hover:bg-accent/40 transition-colors" style={{ height: `${(value / 1600) * 100}%` }}></div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="font-semibold mb-4">Top Products</h2>
                    <ul className="space-y-3">
                        {topProducts.map(product => (
                            <li key={product.id} className="flex items-center space-x-3 text-sm">
                                <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-md object-cover" />
                                <span className="flex-grow truncate">{product.name}</span>
                                <span className="font-semibold">${product.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="font-semibold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockOrders.slice(0, 5).map(order => (
                                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4">{order.customerName}</td>
                                    <td className="px-6 py-4">{order.date}</td>
                                    <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 font-semibold leading-tight rounded-full text-xs ${statusColorMap[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};