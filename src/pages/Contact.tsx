// import { useState, FormEvent } from 'react';
// import {  FaLinkedin, FaTwitter, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
// function Contact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setStatus('success'); // For demo, replace with actual API call
//   };

//   return (
//     <div className="min-h-screen bg-turquoise py-12 px-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-gold mb-8">Contact</h1>
        
//         {/* Main Contact Grid */}
//         <div className="grid md:grid-cols-2 gap-12 mb-16">
//           {/* Contact Form */}
//           <div className="bg-white rounded-lg shadow-xl p-8">
//             <h2 className="text-2xl font-semibold text-classic-blue mb-6">Send a Message</h2>
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-classic-blue mb-2">Name</label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-classic-blue outline-none"
//                   value={formData.name}
//                   onChange={e => setFormData({...formData, name: e.target.value})}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-classic-blue mb-2">Email</label>
//                 <input
//                   type="email"
//                   required
//                   className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-classic-blue outline-none"
//                   value={formData.email}
//                   onChange={e => setFormData({...formData, email: e.target.value})}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-classic-blue mb-2">Subject</label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-classic-blue outline-none"
//                   value={formData.subject}
//                   onChange={e => setFormData({...formData, subject: e.target.value})}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-classic-blue mb-2">Message</label>
//                 <textarea
//                   required
//                   rows={5}
//                   className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-classic-blue outline-none resize-none"
//                   value={formData.message}
//                   onChange={e => setFormData({...formData, message: e.target.value})}
//                 />
//               </div>
              
//               <button
//                 type="submit"
//                 className="w-full bg-classic-blue text-gold py-3 rounded-lg hover:bg-opacity-90 transition-colors"
//               >
//                 Send Message
//               </button>
//             </form>

//             {status === 'success' && (
//               <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
//                 Message sent successfully!
//               </div>
//             )}
//           </div>

//           {/* Contact Information */}
//           <div className="space-y-8">
//             {/* Literary Agent */}
//             <div className="bg-white rounded-lg shadow-xl p-8">
//               <h2 className="text-2xl font-semibold text-classic-blue mb-4">Literary Agent</h2>
//               <p className="text-gray-600 mb-2">John Smith</p>
//               <p className="text-gray-600 mb-2">Literary Agency Name</p>
//               <p className="text-gray-600 mb-2">agent@literaryagency.com</p>
//             </div>

//             {/* Social Media */}
//             <div className="bg-white rounded-lg shadow-xl p-8">
//               <h2 className="text-2xl font-semibold text-classic-blue mb-4">Connect</h2>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-classic-blue hover:text-gold transition-colors">
//                   <FaTwitter size={24} />
//                 </a>
//                 <a href="#" className="text-classic-blue hover:text-gold transition-colors">
//                   <FaLinkedin size={24} />
//                 </a>
//                 <a href="#" className="text-classic-blue hover:text-gold transition-colors">
//                   <FaInstagram size={24} />
//                 </a>
//               </div>
//             </div>

//             {/* Location */}
//             <div className="bg-white rounded-lg shadow-xl p-8">
//               <h2 className="text-2xl font-semibold text-classic-blue mb-4">
//                 <FaMapMarkerAlt className="inline-block mr-2" />
//                 Location
//               </h2>
//               <p className="text-gray-600">
//                 Based in Kolkata, India
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Contact;



import { useState, FormEvent } from 'react';
import { FaLinkedin, FaTwitter, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import { databases } from '../appwrite/appwriteConfig';
import { ID } from 'appwrite';
import conf from '../config/conf';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('All fields are required');
      }

      if (!validateEmail(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteContactCollection,
        ID.unique(),
        {
          ...formData,
          status: 'new'
        }
      );

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-turquoise py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gold mb-8">Contact</h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-classic-blue mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-classic-blue mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-classic-blue outline-none"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block text-classic-blue mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-classic-blue outline-none"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block text-classic-blue mb-2">Subject</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-classic-blue outline-none"
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block text-classic-blue mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-classic-blue outline-none resize-none"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  disabled={loading}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg transition-colors ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-classic-blue text-gold hover:bg-opacity-90'
                }`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {success && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                Message sent successfully!
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-classic-blue mb-4">Literary Agent</h2>
              <p className="text-gray-600 mb-2">John Smith</p>
              <p className="text-gray-600 mb-2">Literary Agency Name</p>
              <p className="text-gray-600 mb-2">agent@literaryagency.com</p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-classic-blue mb-4">Connect</h2>
              <div className="flex space-x-4">
                <a 
                  href="https://twitter.com/authorhandle" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-classic-blue hover:text-gold transition-colors"
                >
                  <FaTwitter size={24} />
                </a>
                <a 
                  href="https://linkedin.com/in/authorhandle" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-classic-blue hover:text-gold transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
                <a 
                  href="https://instagram.com/authorhandle" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-classic-blue hover:text-gold transition-colors"
                >
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-classic-blue mb-4">
                <FaMapMarkerAlt className="inline-block mr-2" />
                Location
              </h2>
              <p className="text-gray-600">
                Based in Kolkata, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;