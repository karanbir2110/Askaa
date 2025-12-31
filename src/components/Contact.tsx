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

// 🔥 Confirms component is mounted
console.log('🔥 Contact component rendered');

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

    // ✅ STEP 3: Form submit confirmation
    console.log('STEP 3 → Form data:', formData);

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // ✅ STEP 4: Supabase response log
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
      console.error('❌ Error submitting contact form:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a237e] mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to grow your business? Contact us today for a free consultation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#1a237e] mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#1a237e] rounded-lg flex items-center justify-center">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-[#1a237e]">
                      Phone
                    </h4>
                    <p className="text-gray-600">+91 8803880397</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#1a237e] rounded-lg flex items-center justify-center">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-[#1a237e]">
                      Email
                    </h4>
                    <p className="text-gray-600">askaamedia@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#1a237e] mb-6">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <Facebook className="text-[#1a237e]" />
                <Twitter className="text-[#1a237e]" />
                <Linkedin className="text-[#1a237e]" />
                <Instagram className="text-[#1a237e]" />
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 rounded-xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-[#1a237e] mb-6">
                Send us a Message
              </h3>

              {submitStatus === 'success' && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                  <CheckCircle className="text-green-600" size={24} />
                  <p className="text-green-800 font-medium">
                    Thank you! We'll be in touch soon.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-medium">
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}

              <div className="space-y-5">
                <input
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <input
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <input
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <textarea
                  required
                  rows={5}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg resize-none"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1a237e] text-white px-6 py-4 rounded-lg flex items-center justify-center space-x-2"
                >
                  <span>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
