import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-2xl w-full bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information.
        </p>
        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
        <p className="mb-4">
          We may collect personal information such as your name, email address, and usage data when you use our services.
        </p>
        <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
        <p className="mb-4">
          We use your information to provide and improve our services, communicate with you, and comply with legal obligations.
        </p>
        <h2 className="text-xl font-semibold mb-2">Data Security</h2>
        <p className="mb-4">
          We take reasonable measures to protect your information from unauthorized access, use, or disclosure.
        </p>
        <h2 className="text-xl font-semibold mb-2">Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;