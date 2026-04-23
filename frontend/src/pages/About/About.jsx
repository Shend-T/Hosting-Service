import React from "react";

function About() {
  return (
    <div className="container pt-5 pb-0 mt-5 mb-0">
      <section className="p-4 p-md-5 mb-5 text-center border rounded shadow-sm">
        <h1 className="display-4 fw-bold">
          About <span className="text-primary">UBT Hosting Services</span>
        </h1>
        <p className="lead col-lg-8 mx-auto mt-3 mb-0">
          UBT Hosting Services is a student project made at UBT College in
          Prishtina, Kosovo, where we built a simple hosting platform and
          learned by building real features together.
        </p>
      </section>

      <section className="row g-4 mb-5">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="h1 fw-bold mb-3">Who We Are</h2>
              <p className="lead mb-0">
                We are a small UBT student team from Prishtina, Kosovo, building
                this project to practice full stack development, cloud hosting,
                and teamwork in a real-world style app.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="h1 fw-bold mb-3">Our Mission</h2>
              <p className="lead mb-0">
                Our mission is to keep learning by creating a hosting service
                that is fast, easy to use, and useful for student and small
                project needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="display-6 fw-bold mb-0">Meet the Team</h2>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="card-title mb-1">Shend Tytynxhiu</h3>
                <p className="text-primary fw-semibold mb-2">
                  Project Leader &amp; Full Stack Developer
                </p>
                <p className="card-text mb-0">
                  Shend leads the project and helps across both frontend and
                  backend work.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="card-title mb-1">Andre Rasi</h3>
                <p className="text-primary fw-semibold mb-2">
                  Backend &amp; Infrastructure Developer
                </p>
                <p className="card-text mb-0">
                  Andre handles backend logic and sets up the infrastructure side
                  of the platform.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="card-title mb-1">Ekloan Kalludra</h3>
                <p className="text-primary fw-semibold mb-2">
                  Backend &amp; Support Systems Developer
                </p>
                <p className="card-text mb-0">
                  Ekloan works on backend features and support tools that keep
                  everything running smoothly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
