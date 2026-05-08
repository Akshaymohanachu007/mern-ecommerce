function Contact() {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Contact Us
      </h1>

      <form className="space-y-6">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-4 rounded-xl"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full border p-4 rounded-xl"
        />

        <textarea
          rows="6"
          placeholder="Your Message"
          className="w-full border p-4 rounded-xl"
        ></textarea>

        <button className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;