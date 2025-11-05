import React, { useState } from 'react';
import { Button } from '../ui/Button';

type OrderStatus = {
    id: string;
    status: string;
    estimatedDelivery: string;
    updates: { time: string; message: string }[];
}

const mockStatus: { [key: string]: OrderStatus } = {
    "ST-12345": {
        id: "ST-12345",
        status: "Delivered",
        estimatedDelivery: "October 26, 2023",
        updates: [
            { time: "Oct 26, 2:14 PM", message: "Delivered." },
            { time: "Oct 26, 9:05 AM", message: "Out for delivery." },
            { time: "Oct 25, 6:30 PM", message: "Arrived at local facility." },
            { time: "Oct 24, 11:10 AM", message: "Shipped from warehouse." },
        ]
    }
};

export const TrackOrderPage: React.FC = () => {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState<OrderStatus | null>(null);
    const [error, setError] = useState('');

    const handleTrackOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setStatus(null);
        
        const foundStatus = mockStatus[orderId.trim().toUpperCase()];
        if (foundStatus) {
            setStatus(foundStatus);
        } else {
            setError(`No order found for ID "${orderId}". Please check the ID and try again. (Hint: Try ST-12345)`);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold">Track Your Order</h1>
                <p className="text-gray-600 mt-2">Enter your order ID below to see its status.</p>
                <form onSubmit={handleTrackOrder} className="mt-6 flex gap-2">
                    <input
                        type="text"
                        value={orderId}
                        onChange={e => setOrderId(e.target.value)}
                        placeholder="e.g., ST-12345"
                        className="flex-grow block w-full bg-transparent border border-gray-300 rounded-md focus:ring-accent focus:border-accent sm:text-sm p-2"
                        required
                    />
                    <Button type="submit">Track Order</Button>
                </form>
            </div>
            {error && <p className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
            {status && (
                <div className="bg-white p-8 rounded-lg shadow-lg mt-6">
                    <h2 className="text-2xl font-bold">Order Status for #{status.id}</h2>
                    <div className="mt-4 border-t pt-4">
                        <div className="flex justify-between items-center">
                           <div>
                                <p className="font-semibold text-lg">{status.status}</p>
                                <p className="text-gray-500 text-sm">Estimated Delivery: {status.estimatedDelivery}</p>
                           </div>
                           <span className={`px-3 py-1 text-sm font-semibold rounded-full ${status.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                {status.status}
                           </span>
                        </div>
                         <div className="mt-6">
                            <h3 className="font-semibold mb-2">History</h3>
                            <ul className="space-y-4">
                                {status.updates.map((update, index) => (
                                    <li key={index} className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className={`w-3 h-3 rounded-full mt-1.5 ${index === 0 ? 'bg-accent' : 'bg-gray-300'}`}></div>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">{update.message}</p>
                                            <p className="text-sm text-gray-500">{update.time}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};