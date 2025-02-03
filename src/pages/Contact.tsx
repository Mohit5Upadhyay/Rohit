import { useState, FormEvent } from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaFacebook,
  FaEnvelope,
} from "react-icons/fa";
import { databases } from "../appwrite/appwriteConfig";
import { ID } from "appwrite";
import conf from "../config/conf";
import { useNewsletter } from "../hooks/useNewsletter";
import { toast } from "react-hot-toast";

import { Helmet } from "react-helmet-async";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const { isSubscribing, subscribe } = useNewsletter();
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        throw new Error("All fields are required");
      }

      if (!validateEmail(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteContactCollection,
        ID.unique(),
        {
          ...formData,
          status: "new",
        }
      );

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
      // console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // const handleNewsletterSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   setNewsletterError(null);

  //   try {
  //     if (!validateEmail(newsletterEmail)) {
  //       throw new Error('Please enter a valid email address');
  //     }

  //     // Add your newsletter subscription logic here

  //     setNewsletterSuccess(true);
  //     setNewsletterEmail('');
  //   } catch (err) {
  //     setNewsletterError(err instanceof Error ? err.message : 'Failed to subscribe');
  //     console.error(err);
  //   }
  // };

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setNewsletterError(null);

    try {
      if (!validateEmail(newsletterEmail)) {
        toast.error("Please enter a valid email address");
        return;
      }

      const success = await subscribe(newsletterEmail);
      if (success) {
        setNewsletterSuccess(true);
        setNewsletterEmail("");
        toast.success("Successfully subscribed to newsletter!");
      }
    } catch (err) {
      setNewsletterError(
        err instanceof Error ? err.message : "Failed to subscribe"
      );
      toast.error("Failed to subscribe to newsletter");
      // console.error(err);
    }
  };
  return (
    <>
      <Helmet>
        <title>Contact - Rohit Upadhyay</title>
        <meta
          name="description"
          content="Get in touch with Rohit Upadhyay. Send a message, subscribe to newsletter, or connect on social media."
        />
        <meta
          name="keywords"
          content="contact, rohit upadhyay, author contact, newsletter, social media"
        />
        <meta property="og:title" content="Contact - Rohit Upadhyay" />
        <meta
          property="og:description"
          content="Get in touch with Rohit Upadhyay. Send a message, subscribe to newsletter, or connect on social media."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.rohitupadhyay.me/contact"
        />
        <link rel="canonical" href="https://www.rohitupadhyay.me/contact" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-gold mb-12">
            Contact
          </h1>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white/5 backdrop-blur-md rounded-lg shadow-xl p-8">
              <h2 className="text-3xl font-semibold text-gold mb-6">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gold mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:border-gold outline-none"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-gold mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:border-gold outline-none"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-gold mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:border-gold outline-none"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-gold mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:border-gold outline-none resize-none"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg transition-colors ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gold text-gray-900 hover:bg-opacity-90"
                  }`}
                >
                  {loading ? "Sending..." : "Send Message"}
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
              <div className="bg-white/5 backdrop-blur-md rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-semibold text-gold mb-4">
                  Connect
                </h2>
                <div className="flex space-x-4">
                  <a
                    href="https://twitter.com/rohit5upadhyay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-white transition-colors"
                  >
                    <FaTwitter size={24} />
                  </a>
                  <a
                    href="https://linkedin.com/in/rohit5upadhyay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-white transition-colors"
                  >
                    <FaLinkedin size={24} />
                  </a>
                  <a
                    href="https://instagram.com/authorhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-white transition-colors"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="https://www.facebook.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-white transition-colors"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href="mailto:upadhyayr8171@gmail.com.com"
                    className="text-gold hover:text-white transition-colors"
                  >
                    <FaEnvelope size={24} />
                  </a>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-semibold text-gold mb-4">
                  <FaMapMarkerAlt className="inline-block mr-2" />
                  Location
                </h2>
                <p className="text-gray-400">
                  Dwarka Sector 14, Bharat Vihar <br />
                  Som Bazar Road
                  <br />
                  New Delhi, Delhi - 110078, India
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-semibold text-gold mb-4">
                  Subscribe to my Newsletter
                </h2>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:border-gold outline-none"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    disabled={isSubscribing}
                  />
                  <button
                    type="submit"
                    className={`w-full py-3 bg-gold text-gray-900 rounded-lg hover:bg-opacity-90 transition-colors ${
                      isSubscribing ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>

                {newsletterSuccess && (
                  <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                    Subscribed successfully!
                  </div>
                )}

                {newsletterError && (
                  <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {newsletterError}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
