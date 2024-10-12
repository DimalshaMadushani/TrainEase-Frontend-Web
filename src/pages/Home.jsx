
import React from "react";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeImg from "../assets/home_img2.jpg";


export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [stations, setStations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStations() {
      try {
        const response = await axios.get("/api/search/stations");
        // console.log("response", response);
        if (response.status === 200) {
          const resStations = response.data.map((station) => ({
            label: station.name,
          }));
          setStations(resStations);
        } else {
          throw new Error("Failed to fetch stations");
        }
      } catch (error) {
        console.error("Failed to fetch stations:", error);
        alert(
          "Failed to load stations: " +
            (error.response && error.response.data.message
              ? error.response.data.message
              : error.message)
        );
      }
    }
    fetchStations();
  }, []);

  const handleSearch = async () => {
    if (!from || !to || !date) {
      alert("Please fill all fields");
      return;
    }
    try {
      const response = await axios.get(`https://trainease-backend.onrender.com/api/search/schedules`, {
        params: { fromName: from, toName: to, date: date },
      });
      if (response.status === 200) {
        navigate("/schedules", {
          state: { schedules: response.data, searchParams: { from, to, date } },
        });
      } else {
        throw new Error("Failed to fetch schedules");
      }
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
      alert(
        "Failed to load schedules: " +
          (error.response && error.response.data.message
            ? error.response.data.message
            : error.message)
      );
    }
  };

  const styles = {
    homeContainer: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${HomeImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "calc(100vh - 160px)", // 80px is the height of the header
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    searchBarContainer: {
      backgroundColor: "rgb(244, 246, 246, 0.6)",
      
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      width: "80%",
    },
    // formControl: {
    //   width: "100%",
    //   maxWidth: "500px",
    //   margin: "10px auto",
    // },
    // button: {
    //   width: "100%",
    //   maxWidth: "150px",
    //   marginTop: "10px",
    // },
  };

  return (
    <div style={styles.homeContainer}>
      <div style={styles.searchBarContainer}>
        <SearchBar
          stations={stations}
          onSearch={handleSearch}
          setFrom={setFrom}
          setTo={setTo}
          setDate={setDate}
        />
      </div>
    </div>
  );
}
