import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import banner from "../../assets/home/world.png";
import card1 from "../../assets/home/card1.png";
import card2 from "../../assets/home/card2.png";
import card3 from "../../assets/home/card3.png";
import workflow from "../../assets/home/workflow.png";

function Home() {
  const navigate = useNavigate();

  const cardsRef = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver( // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.2 },
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container-main py-5">
      {/* ========= Hero ========= */}
      <div className="container-sm px-4 pt-4 text-center border-bottom shadow-lg rounded fade-in-on-load">
        <h1 className="display-4 fw-bold typewriter">
          Your Company Online With <span className="text-primary">ONE</span>{" "}
          Click
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 fade-in-on-load-long">
            Deploy, manage, and scale your applications effortlessly with a fast
            and reliable hosting platform built for developers and businesses.
            No complex setup, no wasted time — just a smooth path from idea to
            live product in seconds.
          </p>
          <div className="d-flex justify-content-center gap-3 mb-4">
            <button className="btn btn-primary btn-lg">Get Started</button>
            {/* Kjo e qon ne /register ose /account */}
            <button className="btn btn-outline-secondary btn-lg">
              View Plans
            </button>
          </div>
          {/* Teksti prof esht gjeneru me ChatGPT se iden se kemi qka me shkru :) */}
        </div>
        <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
          <div className="container px-5">
            <img
              className="img-fluid mb-4 pop-up-on-load"
              src={banner}
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
      {/* ========= Hero2 =========  */}
      {/* <div className="container col-xxl-8 px-4 py-5 my-5 border">
        <div className="row align-items-center justify-content-center g-5 py-5">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold">
              Host Your Company With <span className="text-primary">ONE</span>{" "}
              Click
            </h1>
            <p className="lead mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              quo amet laudantium sed ullam? Magni consequuntur labore
              asperiores debitis omnis reprehenderit eligendi provident animi
              perferendis ea ratione temporibus voluptatem, quam illo. Similique
              voluptatem, deserunt nihil incidunt ullam asperiores ipsam iure
              dolores ipsa fugiat at architecto blanditiis. Quasi voluptatibus
              cupiditate totam?
            </p>
          </div>

          <div className="col-10 col-sm-8 col-lg-6">
            <img
              className="d-block mx-lg-auto img-fluid"
              src={banner}
              alt=""
              loading="lazy"
              // style={{ maxWidth: "500px" }}
            />
          </div>
        </div>
      </div> */}

      {/* ========= Features ========= */}
      <div className="container-md px-2 pt-5">
        <div className="row align-items-start justify-content-start py-5 pop-right-on-load">
          <div className="col-6 col-md-4">
            <p className="lead">How It Works</p>
            <h1 className="display-3">Build Your Platform</h1>
            <h1 className="fw-bold text-primary border-bottom">Host With Us</h1>
          </div>
        </div>

        <div className="row align-items-center justify-content-center py-5">
          <div className="col-md-4 col-sm-8 mb-3">
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="card shadow py-3 pop-up-on-load-card scale-card"
            >
              <img src={card1} className="card-img-top" alt="..." />
              {/* <a href="https://www.flaticon.com/free-icons/image-placeholder" title="image placeholder icons">Image placeholder icons created by Saepul Nahwan - Flaticon</a> */}
              <div className="card-body">
                <h3 className="card-title">Create Your Website</h3>
                <p className="card-text">
                  Start by setting up your project in seconds. No complicated
                  configuration or technical barriers — just a simple and
                  intuitive setup process.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-8 mb-3">
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="card shadow py-3 pop-up-on-load-card scale-card"
            >
              <img src={card2} className="card-img-top" alt="..." />
              {/* <a href="https://www.flaticon.com/free-icons/image-placeholder" title="image placeholder icons">Image placeholder icons created by Saepul Nahwan - Flaticon</a> */}
              <div className="card-body">
                <h3 className="card-title">Deploy Instantly</h3>
                <p className="card-text">
                  Push your code and go live instantly. Our platform handles the
                  deployment process so you can focus on building and improving
                  your product.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-8 mb-3">
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="card shadow py-3 pop-up-on-load-card scale-card"
            >
              <img src={card3} className="card-img-top" alt="..." />
              {/* <a href="https://www.flaticon.com/free-icons/image-placeholder" title="image placeholder icons">Image placeholder icons created by Saepul Nahwan - Flaticon</a> */}
              <div className="card-body">
                <h3 className="card-title">Scale With Ease</h3>
                <p className="card-text">
                  As your platform grows, we grow with you. Enjoy reliable
                  performance, strong security, and seamless scaling without
                  extra effort.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={(el) => (cardsRef.current[3] = el)}
          className="container col-xxl-10 px-4 py-5 border border-dark rounded  pop-up-on-load-card"
          style={{ borderStyle: "dashed" }}
        >
          <div className="row align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                className="d-block mx-lg-auto img-fluid"
                loading="lazy"
                src={workflow}
                height="500"
                alt=""
              />
            </div>
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold lh-1 mb-3">
                Everything You Need in One Platform
              </h1>
              <p className="lead">
                Manage your hosting, monitor performance, and scale your
                applications all from a single dashboard. Built for simplicity
                and power, our platform gives you full control without the usual
                complexity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========= Pricing ========= */}
      <div className="container-md px-2 mt-5">
        <div className="row align-items-start justify-content-start">
          <div
            ref={(el) => (cardsRef.current[4] = el)}
            className="col-6 col-md-4 pop-left-on-load"
          >
            <h1 className="display-3">Simple, Transparent Pricing</h1>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-4 col-sm-8 mb-3">
            <div
              ref={(el) => (cardsRef.current[5] = el)}
              className="card shadow py-3 pop-up-on-load-card"
            >
              <div className="card-body">
                <h3 className="card-title">Basic</h3>
                <p className="card-text">
                  Perfect for individuals and small projects getting started
                  with hosting.
                </p>
                <p className="card-text lead">€5 / month</p>

                <p className="card-text lead">Includes</p>
                <ul>
                  <li>1 Project</li>
                  <li>Basic Performance</li>
                  <li>1 GB Storage</li>
                  <li>Community Support</li>
                </ul>

                <a href="#" className="btn btn-outline-primary">
                  Get Started
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-8 mb-3">
            <div
              ref={(el) => (cardsRef.current[6] = el)}
              className="card shadow py-3 pop-up-on-load-card"
            >
              <div className="card-body">
                <h3 className="card-title">Pro</h3>
                <p className="card-text">
                  Ideal for developers and growing platforms that need more
                  power and flexibility.
                </p>
                <p className="card-text lead">€12 / month</p>

                <p className="card-text lead">Includes</p>
                <ul>
                  <li>5 Projects</li>
                  <li>High Performance</li>
                  <li>10 GB Storage</li>
                  <li>Custom Domains</li>
                  <li>Email Support</li>
                </ul>

                <a href="#" className="btn btn-primary">
                  Get Started
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-8 mb-3">
            <div
              ref={(el) => (cardsRef.current[7] = el)}
              className="card shadow py-3 pop-up-on-load-card"
            >
              <div className="card-body">
                <h3 className="card-title">Business</h3>
                <p className="card-text">
                  Built for teams and companies that require scalability,
                  reliability, and priority support.
                </p>
                <p className="card-text lead">€25 / month</p>

                <p className="card-text lead">Includes</p>
                <ul>
                  <li>Unlimited Projects</li>
                  <li>Maximum Performance</li>
                  <li>50 GB Storage</li>
                  <li>Custom Domains</li>
                  <li>Priority Support</li>
                </ul>

                <a href="#" className="btn btn-dark">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <h1>Home Page</h1>

      <button onClick={() => navigate("/klienti")}>CRUD Klienti</button>
      <button onClick={() => navigate("/paketa")}>CRUD Paketa</button>
      <button onClick={() => navigate("/abonimi")}>CRUD Abonimi</button> */}
    </div>
  );
}

export default Home;
