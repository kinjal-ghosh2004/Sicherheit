import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { Button } from '../ui/Button';

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1">
            <input
                id={id}
                className="block w-full bg-transparent border border-gray-300 rounded-md focus:ring-accent focus:border-accent sm:text-sm p-2"
                {...props}
            />
        </div>
    </div>
);

export const CheckoutPage: React.FC = () => {
    const { state, dispatch } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const { items } = state;

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            const orderId = `ST-${Math.floor(Math.random() * 90000) + 10000}`;
            alert(`Order placed successfully! Your order ID is ${orderId}.`);
            dispatch({ type: 'CLEAR_CART' });
            navigate('/');
            setIsProcessing(false);
        }, 1500);
    };

    if (items.length === 0 && !isProcessing) {
        return (
            <div className="text-center py-16">
                <h1 className="text-2xl font-bold">Your cart is empty.</h1>
                <p className="text-gray-600 mt-2">Add some products before you can check out.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-6">Checkout</h1>
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <FormInput label="Email" id="email" type="email" placeholder="you@example.com" required />
                                </div>
                                <div className="sm:col-span-2">
                                    <FormInput label="Full Name" id="fullName" placeholder="John Doe" required />
                                </div>
                                <div className="sm:col-span-2">
                                    <FormInput label="Address" id="address" placeholder="123 Main St" required />
                                </div>
                                <FormInput label="City" id="city" placeholder="Anytown" required />
                                <FormInput label="State" id="state" placeholder="CA" required />
                                <FormInput label="ZIP Code" id="zip" placeholder="12345" required />
                            </div>
                        </section>
                        <section>
                            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <FormInput label="Name on Card" id="cardName" placeholder="John M Doe" required />
                                </div>
                                <div className="sm:col-span-2">
                                    <FormInput label="Card Number" id="cardNumber" placeholder="**** **** **** 1234" required />
                                </div>
                                <FormInput label="Expiry Date" id="expiry" placeholder="MM/YY" required />
                                <FormInput label="CVC" id="cvc" placeholder="123" required />
                            </div>
                        </section>
                    </div>
                </div>
                <aside className="bg-white p-8 rounded-lg shadow-lg h-fit">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-3">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">{item.name} x {item.quantity}</span>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tax</span>
                            <span className="font-medium">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-6" disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : 'Place Order'}
                    </Button>
                </aside>
            </div>
        </form>
    );
};