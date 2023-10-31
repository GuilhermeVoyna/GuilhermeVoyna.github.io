import { useState } from "react";
import Nav from "../components/Nav";
import "../css/pages/OnBoarding.css";
import"../css/components/Inputs.css";
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const OnBoarding = () => {
    const [ cookies, setCookie, removeCookie] = useCookies(null)
    const [formData,setFormData]  = useState({
        user_id:cookies.UserId,
        first_name:'',
        dob_day:'',
        dob_month:'',
        dob_year:'',
        premium:false,
        account_type:'tiper',
        account_search:'triper',
        url:'',
        about:'',
        matches:[],
        tips:[]
    })  
    let navigate = useNavigate()

  const handleSubmit = async (e) => {
    console.log("submitted");
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8000/user', {formData})
      const success = response.status === 200
      if (success) navigate("/dashboard")
    }catch (err) {
      console.log(err)
    }
  };


  const handleChange = (e) => {
    console.log('e',e);
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const name = e.target.name
    console.log('value:'+ value,'name:'+ name)
    setFormData((prevState)=> ({
        ...prevState,
        [name]:value
    }))
  };
  console.log(formData)
  return (
    <>
      <Nav setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />

            <label>Birthday</label>
            <div className="multiple-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>
            <label>I am</label>
            <div className="multiple-container">
              <input
                id="tiper-account-type"
                type="radio"
                name="account_type"
                required={false}
                value={"tiper"}
                onChange={handleChange}
                checked={formData.account_type==='tiper'}
              />
              <label htmlFor="tiper-account-type">Tiper</label>
              <input
                id="triper-account-type"
                type="radio"
                name="account_type"
                required={false}
                value={"triper"}
                onChange={handleChange}
                checked={formData.account_type==='triper'}
              />
              <label htmlFor="triper-account-type">Triper</label>
            </div>
            <label htmlFor="premium">PREMIUM ?</label>
            <input
              id="premium"
              type="checkbox"
              name="premium"
              onChange={handleChange}
              checked={formData.premium}
            />
            <label>Looking for</label>
            <div className="multiple-container">
              <input
                id="tiper-account-search"
                type="radio"
                name="account_search"
                required={false}
                value={"tiper"}
                onChange={handleChange}
                checked={formData.account_search==='tiper'}
              />
              <label htmlFor="tiper-account-search">Tiper</label>
              <input
                id="triper-account-search"
                type="radio"
                name="account_search"
                required={false}
                value={"triper"}
                onChange={handleChange}
                checked={formData.account_search==='triper'}
              />
              <label htmlFor="triper-account-search">Triper</label>
            </div>

            <label htmlFor="about">About</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            />
          </section>
          <section>
            <label htmlFor="about">Profile Pic (https://i.imgur.com/oPj4A8u.jpg)</label>
            <input
              placeholder="https://i.imgur.com/oPj4A8u.jpg"
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
            {formData.url && <img src={formData.url} alt="profile pic preview"/>}
            </div>
            <input type="submit" />
          </section>
        </form>
      </div>
    </>
  );
};
export default OnBoarding;
