'use client';
//client component
const SubscriberFooter = () => {
  console.log('SubscriberFooter component rendered');
  return (
    <form className="mt-3 flex">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        placeholder="you@email.com"
        className="w-full px-3 py-2 rounded-l-md focus:outline-none text-gray-900 bg-white"
      />
      <button
        type="submit"
        className="px-4 rounded-r-md bg-indigo-600 hover:bg-indigo-500 text-white"
      >
        Subscribe
      </button>
    </form>
  );
};

export default SubscriberFooter;
