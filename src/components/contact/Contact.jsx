import { useRef, useState, useEffect } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import "./contact.scss";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

const variants = {
  initial: {
    y: 500,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const Contact = () => {
  const ref = useRef();
  const formRef = useRef();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const isInView = useInView(ref, { margin: "-100px" });

  const sendEmail = (e) => {
    e.preventDefault();

    // Initialize EmailJS with your public key
    emailjs.init('ZE5I912mRnq15xnpT'); // Replace 'your_public_key' with the actual public key

    // Send email using the service ID, template ID, form data, and public key
    emailjs
      .sendForm(
        "service_4ozwh9p",   // Your service ID
        "template_990iqrr",   // Your template ID
        formRef.current,      // Reference to the form
        "ZE5I912mRnq15xnpT"   // Your user public key (optional if using emailjs.init)
      )
      .then(
        (result) => {
          setSuccess(true); // Set success state on email sent
        },
        (error) => {
          setError(true); // Set error state if there's an issue
        }
      );
  };

  // Function to handle focus on form inputs
  const handleFocus = (e) => {
    // Scroll only the form to the focused input field
    const element = e.target;
    const container = formRef.current; // Form container element

    // Calculate the position of the focused input
    const offsetTop = element.offsetTop;

    // Scroll smoothly to the focused input
    container.scrollTo({
      top: offsetTop - 50, // Adjust for padding or keyboard space
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const inputs = formRef.current.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
    });
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
      });
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className="contact"
      variants={variants}
      initial="initial"
      whileInView="animate"
    >
      <motion.div className="textContainer" variants={variants}>
        <motion.h1 variants={variants}>Let’s work together</motion.h1>
        <motion.div className="item" variants={variants}>
          <h2>Mail</h2>
          <span>anasginolt@gmail.com</span>
        </motion.div>
        <motion.div className="item" variants={variants}>
          <h2>Address</h2>
          <span>Kulathil valappil H, Edappal, Kerala, India</span>
        </motion.div>
        <motion.div className="item" variants={variants}>
          <h2>Phone</h2>
          <span>+91 9072376547</span>
        </motion.div>
      </motion.div>
      <div className="formContainer" ref={formRef}>
        <motion.form
          onSubmit={sendEmail}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <input
            type="text"
            required
            placeholder="Name"
            name="name"
            onFocus={handleFocus}
          />
          <input
            type="email"
            required
            placeholder="Email"
            name="email"
            onFocus={handleFocus}
          />
          <textarea
            rows={8}
            placeholder="Message"
            name="message"
            onFocus={handleFocus}
          />
          <button type="submit">Submit</button>
          {error && "Error"}
          {success && "Success"}
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Contact;
