import React from "react";

const faqItems = [
  {
    question: "Do you offer free migration from another hosting provider?",
    answer:
      "Yes. Our team handles standard website and database migrations at no extra cost for eligible plans.",
  },
  {
    question: "How quickly can my hosting plan be activated?",
    answer:
      "Most plans are activated instantly after payment, so you can deploy your project within minutes.",
  },
  {
    question: "What kind of uptime can I expect?",
    answer:
      "Our infrastructure is designed for high availability, with continuous monitoring to maintain stable uptime.",
  },
  {
    question: "Can I upgrade my hosting plan later?",
    answer:
      "Absolutely. You can upgrade at any time without downtime, and only pay the difference for the new plan.",
  },
  {
    question: "Do you provide backups for hosted projects?",
    answer:
      "Yes. Automatic backups are included in our managed plans, with restore support from our team.",
  },
  {
    question: "Is technical support available outside office hours?",
    answer:
      "Support is available through ticketing and email, and critical incidents are prioritized for fast response.",
  },
];

function FAQ() {
  return (
    <div className="container py-5 mt-5" style={{ height: "90vh" }}>
      <section
        className="p-4 p-md-5 mb-5 text-center border rounded shadow-sm"
        style={{ marginTop: "10vh" }}
      >
        <h1 className="display-4 fw-bold">
          Frequently Asked <span className="text-primary">Questions</span>
        </h1>
        <p className="lead col-lg-8 mx-auto mt-3 mb-0">
          Quick answers about our hosting plans, migrations, support, and
          platform reliability.
        </p>
      </section>

      <section className="row g-4" style={{ marginTop: "10vh" }}>
        {faqItems.map((item, index) => (
          <div className="col-md-6" key={index}>
            <div className="card shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="card-title h4 mb-3">
                  Question: {item.question}
                </h3>
                <p className="card-text lead mb-0">Answer: {item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default FAQ;
