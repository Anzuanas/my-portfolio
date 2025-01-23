import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import "./contact.scss";

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

    emailjs
      .sendForm(
        "service_4ozwh9p",
        "template_990iqrr",
        formRef.current,
        "ZE5I912mRnq15xnpT"
      )
      .then(
        (result) => {
          setSuccess(true); // Show success message
        },
        (error) => {
          setError(true); // Show error message
        }
      );
  };

  // Function to handle scroll behavior for form
  const handleFocus = (e) => {
    const element = e.target;
    const container = formRef.current;

    // Scroll container smoothly to the focused input
    const offsetTop = element.offsetTop;
    container.scrollTo({
      top: offsetTop - 50, // Adjust for padding/keyboard space
      behavior: "smooth",
    });
  };

  // Reset any scroll issues on typing
  const handleInput = () => {
    const container = formRef.current;

    // Ensure no scroll jump happens during typing
    container.style.scrollBehavior = "smooth";
  };

  useEffect(() => {
    const inputs = formRef.current.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("input", handleInput); // Add input event listener
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("input", handleInput);
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
