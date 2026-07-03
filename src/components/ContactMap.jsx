import React from 'react';

const ContactMap = () => {
  return (
    <section className="w-full bg-[#F8F9FA] px-6 lg:px-16 pb-24">
      <div className="max-w-[88rem] mx-auto h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-sm">
        <iframe
          src="https://maps.google.com/maps?q=Gaur%20Yamuna%20City,%20Greater%20Noida,%20Uttar%20Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(100%) contrast(1.1) opacity(0.8)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Vector.Ai Location"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactMap;
