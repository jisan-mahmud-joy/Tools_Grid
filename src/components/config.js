// client/src/config.js
export const config = {
  // .env ফাইলে থাকা ভেরিয়েবলটি রিড করবে, নাহলে ডিফল্ট হিসেবে localhost ধরবে
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
};