"use client";

import { Phone } from "lucide-react";
import BreadCumb from "@/components/shared/BreadCumb";


import { toast } from "react-toastify";
import { useState } from "react";
import { useCreateContactMessageMutation } from "@/store/api/contactMessageApi/messageApi";
import { EmailIcon } from "@/features/auth/components/Icons";

const ContactChild = () => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [createMessages] = useCreateContactMessageMutation();

  const handleCreateMesages = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createMessages({
        name,
        contactNumber,
        email,
        message,
      }).unwrap();
      if (res?.success) {
        toast.success("Messages Send Successfull", {
          position: "top-center",
          autoClose: 3000,
        });

        setName("");
        setEmail("");
        setMessage("");
        setContactNumber("");
      }
    } catch {
      toast.error("Message Sending failed!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <section className="mb-10">
        <BreadCumb />
      </section>

      <section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 shadow-lg rounded-md p-8 bg-white border border-gray-100">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-white bg-red-500 rounded-full p-3">
                  <Phone size={24} />
                </span>
                <h2 className="text-lg font-bold">Call To Us</h2>
              </div>
              <div className="text-sm space-y-2 text-gray-700">
                <p>We are available 24/7, 7 days a week.</p>
                <p className="font-semibold text-black">
                  Phone: +8801988446825
                </p>
              </div>
            </div>

            <hr className="my-8 border-gray-300" />

            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-white bg-red-500 rounded-full p-3">
                  <EmailIcon />
                </span>
                <h2 className="text-lg font-bold">Write To Us</h2>
              </div>
              <div className="text-sm space-y-2 text-gray-700">
                <p>
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="font-semibold text-black">
                  Emails: rasel.byte64@gmail.com
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 shadow-lg rounded-md p-8 bg-white border border-gray-100">
            <form onSubmit={handleCreateMesages} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="w-full bg-gray-100 p-3 rounded-sm outline-none focus:ring-1 focus:ring-red-500 transition"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email *"
                  className="w-full bg-gray-100 p-3 rounded-sm outline-none focus:ring-1 focus:ring-red-500 transition"
                />
                <input
                  type="text"
                  placeholder="Your Phone *"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full bg-gray-100 p-3 rounded-sm outline-none focus:ring-1 focus:ring-red-500 transition"
                />
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                className="w-full h-52 bg-gray-100 p-4 rounded-sm outline-none focus:ring-1 focus:ring-red-500 transition resize-none"
              ></textarea>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-4 px-10 rounded shadow transition-all active:scale-95"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactChild;
