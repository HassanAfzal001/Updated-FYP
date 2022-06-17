import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import DoctorCard from "./DoctorCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getDoctor } from "../../actions/doctorAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState();
  // const { loading, error, doctors } = useSelector((state) => state.doctors);
  const { loading, error } = useSelector((state) => state.doctors);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getDoctor());
  }, [dispatch, error, alert]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:4000/api/v1/doctors");
      // console.log(res.data.doctors);
      setDoctors(res.data.doctors);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="HGCS" />

          <div className="banner">
            <p>Welcome to Health Guide Consulting System</p>
            <h1>FIND AMAZING SERVICES Here</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">On Site Doctors</h2>

          <div className="container" id="container">
            {/* <DoctorCard doctor={doctor} /> */}
            {doctors &&
              doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
