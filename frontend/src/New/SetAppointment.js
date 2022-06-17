import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./setappointment.css";
import axios from "axios";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
const SetAppointment = () => {
  const { user } = useSelector((state) => state.user);
  const [newAppointment, setNewAppointment] = useState({
    need: "",
    appointmentDate: "",
  });
  const [data, setData] = useState();
  const [doctorId, setDoctorId] = useState();
  const [doctorName, setDoctorName] = useState();

  // Add a meeting
  const addAppointment = () => {
    if (newAppointment.need && doctorId && newAppointment.appointmentDate) {
      let userId = user._id;
      const myObj = {
        need: newAppointment.need,
        doctorId: doctorId,
        doctorName: doctorName,
        userId: userId,
        userName: user.name,
        appointmentDate: newAppointment.appointmentDate,
      };
      //   console.log(myObj);
      axios
        .post("http://localhost:4000/appointments/addNewAppointment", myObj)
        .then((res) => {
          console.log("Appointment Added: ");
          // console.log(res);
          console.log(res.data);
        });
      setNewAppointment({
        need: "",
        appointmentDate: "",
      });
      setDoctorId();
      setDoctorName();
    } else {
      alert("Please Fill All Required Fields");
    }
  };

  // Get all doctors
  useEffect(() => {
    const fetchData = async () => {
      // get the data from the api
      // const res = await axios.get("http://localhost:4000/doctors/");
      const res = await axios.get("http://localhost:4000/users/doctors");
      //   console.log(res.data);
      setData(res.data);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <div className="set-appointment-container">
      <div
        className="modalContainer"
        style={{ marginLeft: "30%", marginTop: "50px" }}
      >
        <h1>Set Appointment</h1>
        <input
          type="text"
          placeholder="Enter Need for Appointment"
          className="inputTextFields"
          value={newAppointment.need}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, need: e.target.value })
          }
        />
        <DatePicker
          placeholderText="Start Date & Time"
          selected={newAppointment.appointmentDate}
          onChange={(appointmentDate) =>
            setNewAppointment({ ...newAppointment, appointmentDate })
          }
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm"
          showTimeInput
          className="inputTextFields"
        />
        <SearchBar
          placeholder="Search Doctors"
          data={data}
          setDoctorId={setDoctorId}
          setDoctorName={setDoctorName}
        />
        <div className="addMeetButtonContainer">
          <button className="addMeetButton" onClick={() => addAppointment()}>
            Set Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetAppointment;
