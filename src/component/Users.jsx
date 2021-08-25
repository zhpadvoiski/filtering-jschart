import { useState, useEffect } from "react";
import "./users.css";

const NAT = [
  "All",
  "AU",
  "BR",
  "CA",
  "CH",
  "DE",
  "DK",
  "ES",
  "FI",
  "FR",
  "GB",
  "IE",
  "IR",
  "NL",
  "NZ",
  "TR",
  "US"
];

const Users = () => {
  const [people, setPeople] = useState([]);
  const [value, setValue] = useState("");
  const [gender, setGender] = useState("");
  const [nation, setNation] = useState("");
  const getUsers = async () => {
    const apiCall = await fetch("https://randomuser.me/api/?results=50");
    const users = await apiCall.json();
    setPeople(users.results);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const toggledGender = (e) => {
    if (gender === e.target.id) {
      setGender("");
    } else {
      setGender(e.target.id);
    }
  };
  const filteredByGender = people.filter((person) => {
    if (!gender) return true;
    return person.gender === gender;
  });
  const filteredByNat = filteredByGender.filter((person) => {
    if (!nation || nation === "All") return true;
    return person.nat === nation;
  });
  const newPeople = filteredByNat.filter((person) => {
    if (!value) {
      return true;
    } else if (
      person.name.first.toLowerCase().substr(0, value.length) ===
      value.toLowerCase()
    ) {
      return true;
    }
    return false;
    // if (value) {
    //   return (
    //     person.name.first.toLowerCase().substr(0, value.length) ===
    //     value.toLowerCase()
    //   );
    // }
    // return true;
  });
  console.log(nation);
  return (
    <div>
      <input
        placeholder="search user.."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div>
        <h3>Select Gender</h3>
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          id="male"
          name="gender"
          checked={gender === "male"}
          onClick={toggledGender}
        />
        <label htmlFor="female">Female</label>
        <input
          type="radio"
          id="female"
          name="gender"
          checked={gender === "female"}
          onClick={toggledGender}
        />
      </div>
      <div>
        <label htmlFor="nat">Select nationality</label>
        <select name="nat" id="nat" onChange={(e) => setNation(e.target.value)}>
          {/* <option value="">All</option> */}
          {NAT.map((nation) => (
            <option value={nation}>{nation}</option>
          ))}
        </select>
      </div>
      {newPeople.map((person) => {
        const { name, picture, location, cell } = person;
        return (
          <div className="wrapper" key={cell}>
            <h3>{`${name.last} ${name.first}`}</h3>
            <img src={picture.large} alt={name.last} />
            <p>Location: {location.city}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
/*cell: "433-340-0707"
dob: {date: "1998-06-03T04:03:10.034Z", age: 23}
email: "charlotte.ginnish@example.com"
gender: "female"
id: {name: "", value: null}
location: {street: {…}, city: "Deer Lake", state: "Prince Edward Island", country: "Canada", postcode: "J9V 1D1", …}
login: {uuid: "45d3204b-504e-4076-b980-6af020f56774", username: "angrygorilla682", password: "liquid", salt: "ap4dDzlL", md5: "0d4baa50c73526bfb671d7db49db2a7e", …}
name: {title: "Ms", first: "Charlotte", last: "Ginnish"}
nat: "CA"
phone: "093-444-3415"
picture: {large: "https://randomuser.me/api/portraits/women/14.jpg", medium: "https://randomuser.me/api/portraits/med/women/14.jpg", thumbnail: "https://randomuser.me/api/portraits/thumb/women/14.jpg"}
registered: {date: "2002-03-21T23:37:03.457Z", age: 19} */
