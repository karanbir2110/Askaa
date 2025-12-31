import { useState, FormEvent } from 'react';
import {
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Send,
  CheckCircle,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] =
    useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 🔎 STEP 3: Confirm form data
    console.log('STEP 3 → Form data:', formData);

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 🔎 STEP 4: Log Supabase response
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.company || null,
            message: formData.message,
          },
        ])
        .select();

      console.log('STEP 4 → Supabase response:', { data, error });

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
    } catch (err) {
      console.error('❌ Submit failed:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#1a237e]">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Phone className="text-[#1a237e]" />
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p>+91 8803880397</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="text-[#1a237e]" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p>askaamedia@gmail.com</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Facebook />
              <Twitter />
              <Linkedin />
              <Instagram />
            </div>
          </div>

          {/* RIGHT FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-8 rounded-xl shadow-lg space-y-5"
          >
            {submitStatus === 'success' && (
              <div className="bg-green-50 p-4 rounded flex items-center space-x-2">
                <CheckCircle className="text-green-600" />
                <p className="text-green-800">
                  Message sent successfully!
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 p-4 rounded text-red-700">
                Something went wrong. Check console.
              </div>
            )}

            <input
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 border rounded"
            />

            <input
              required
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-3 border rounded"
            />

            <input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full p-3 border rounded"
            />

            <input
              placeholder="Company"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="w-full p-3 border rounded"
            />

            <textarea
              required
              placeholder="Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full p-3 border rounded"
              rows={5}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1a237e] text-white p-4 rounded flex justify-center items-center space-x-2"
            >
              <span>{isSubmitting ? 'Sending…' : 'Send Message'}</span>
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
