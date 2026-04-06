import React from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import banner from "../assets/home/earth.png";

import placeholderImage from "../assets/placeholders/image-placeholder.png";
import placeholderImage2 from "../assets/placeholders/workflow.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container-main">
      {/* ========= Hero ========= */}
      <div
        className="container-md px-4 pt-5 text-center border-bottom shadow rounded"
        // style={{ background: "#2c687b" }}
      >
        <h1 className="display-4 fw-bold">
          Host Your Company With <span className="text-primary">ONE</span> Click
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            quo amet laudantium sed ullam? Magni consequuntur labore asperiores
            debitis omnis reprehenderit eligendi provident animi perferendis ea
            ratione temporibus voluptatem, quam illo. Similique voluptatem,
            deserunt nihil incidunt ullam asperiores ipsam iure dolores ipsa
            fugiat at architecto blanditiis. Quasi voluptatibus cupiditate
            totam?
          </p>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
          <div className="container px-5">
            <img
              className="img-fluid mb-4"
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
        <div className="row align-items-start justify-content-start py-5">
          <div className="col-6 col-md-4">
            <p className="lead">How It Works</p>
            <h1 className="display-3">Build Your Platform</h1>
            <h1 className="fw-bold text-primary border-bottom">Host With Us</h1>
          </div>
        </div>

        <div className="row align-items-center justify-content-center py-5">
          <div className="col-md-4 col-sm-8 mb-3">
            <div className="card shadow py-3">
              <img
                src={placeholderImage}
                className="card-img-top"
                alt="..."
                // width="256"
                // height="256"
              />
              {/* <a href="https://www.flaticon.com/free-icons/image-placeholder" title="image placeholder icons">Image placeholder icons created by Saepul Nahwan - Flaticon</a> */}
              <div className="card-body">
                <h3 className="card-title">Card Title</h3>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet velit laudantium quas. Pariatur earum reiciendis
                  quisquam voluptates optio assumenda repellendus!
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-8 mb-3">
            <div className="card shadow py-3">
              <img
                src={placeholderImage}
                className="card-img-top"
                alt="..."
                // height="256"
              />
              {/* <a href="https://www.flaticon.com/free-icons/image-placeholder" title="image placeholder icons">Image placeholder icons created by Saepul Nahwan - Flaticon</a> */}
              <div className="card-body">
                <h3 className="card-title">Card Title</h3>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet velit laudantium quas. Pariatur earum reiciendis
                  quisquam voluptates optio assumenda repellendus!
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-8 mb-3">
            <div className="card shadow py-3">
              <img
                src={placeholderImage}
                className="card-img-top"
                alt="..."
                // width="256"
                // height="256"
              />
              {/* <a href="https://www.flaticon.com/free-icons/image-placeholder" title="image placeholder icons">Image placeholder icons created by Saepul Nahwan - Flaticon</a> */}
              <div className="card-body">
                <h3 className="card-title">Card Title</h3>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet velit laudantium quas. Pariatur earum reiciendis
                  quisquam voluptates optio assumenda repellendus!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container col-xxl-10 px-4 py-5 border border-dark rounded "
          style={{ borderStyle: "dashed" }}
        >
          <div className="row align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                className="d-block mx-lg-auto img-fluid"
                loading="lazy"
                src={placeholderImage2}
                height="500"
                alt=""
              />
            </div>
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold lh-1 mb-3">Lorem Ipsum</h1>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officia, suscipit laboriosam! Mollitia molestias voluptate
                laudantium ipsa et, quas, animi, ducimus iure consequatur natus
                provident commodi delectus esse vitae ratione. Blanditiis omnis
                assumenda eius suscipit quisquam officiis magni quod sunt
                recusandae.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========= Pricing ========= */}

      <div className="container-md px-2 pt-5">
        <div className="row align-items-start justify-content-start py-5">
          <div className="col-6 col-md-4">
            <h1 className="display-3">Pricing: </h1>
          </div>
        </div>
        <div className="row align-items-center justify-content-center py-5">
          <div className="col-md-4 col-sm-8 mb-3">
            <div className="card shadow py-3">
              <div className="card-body">
                <h3 className="card-title">Card Title</h3>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet velit laudantium quas. Pariatur earum reiciendis
                  quisquam voluptates optio assumenda repellendus!
                </p>
                <p className="card-text lead">Inlcudes</p>
                <ul>
                  <li>1#</li>
                  <li>2#</li>
                  <li>3#</li>
                </ul>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-8 mb-3">
            <div className="card shadow py-3">
              <div className="card-body">
                <h3 className="card-title">Card Title</h3>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet velit laudantium quas. Pariatur earum reiciendis
                  quisquam voluptates optio assumenda repellendus!
                </p>
                <p className="card-text lead">Inlcudes</p>
                <ul>
                  <li>1#</li>
                  <li>2#</li>
                  <li>3#</li>
                </ul>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-8 mb-3">
            <div className="card shadow py-3">
              <div className="card-body">
                <h3 className="card-title">Card Title</h3>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet velit laudantium quas. Pariatur earum reiciendis
                  quisquam voluptates optio assumenda repellendus!
                </p>
                <p className="card-text lead">Inlcudes</p>
                <ul>
                  <li>1#</li>
                  <li>2#</li>
                  <li>3#</li>
                </ul>
                <a href="#" class="btn btn-primary">
                  Go somewhere
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
