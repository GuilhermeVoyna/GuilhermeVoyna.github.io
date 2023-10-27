import { useState } from "react";
import Nav from "../components/Nav";
import "../css/pages/Dica.css";
import"../css/components/Inputs.css";
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const Dica = () => {
    const [ cookies, setCookie, removeCookie] = useCookies(null)
    const [formData,setFormData]  = useState({
        user_id:cookies.UserId,
        county:'',
        dica_day:'',
        dica_month:'',
        dica_year:'',
        dica_type:'passeio',
        dicas:[]
    })  
    let navigate = useNavigate()

  const handleSubmit = async (e) => {
    console.log("submitted");
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8000/user', {formData})
      const success = response.statusCode === 200
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
      <div className="dica">
        <h2>CREATE DICA</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="county">Country</label>
            <input
              id="county"
              type="text"
              name="county"
              placeholder="Brazil"
              required={true}
              value={formData.county}
              onChange={handleChange}
            />

            <label>When</label>
            <div className="multiple-container">
              <input
                id="dica_day"
                type="number"
                name="dica_day"
                placeholder="DD"
                required={true}
                value={formData.dica_day}
                onChange={handleChange}
              />
              <input
                id="dica_month"
                type="number"
                name="dica_month"
                placeholder="MM"
                required={true}
                value={formData.dica_month}
                onChange={handleChange}
              />
              <input
                id="dica_year"
                type="number"
                name="dica_year"
                placeholder="YYYY"
                required={true}
                value={formData.dica_year}
                onChange={handleChange}
              />
            </div>
            <label>Type</label>
            <div className="multiple-container">
              <input
                id="passeio-type"
                type="radio"
                name="dica_type"
                required={false}
                value={"passeio"}
                onChange={handleChange}
                checked={formData.dica_type==='passeio'}
              />
              <label htmlFor="passeio-type">Passeio</label>
              <input
                id="restaurante-type"
                type="radio"
                name="dica_type"
                required={false}
                value={"restaurante"}
                onChange={handleChange}
                checked={formData.dica_type==='restaurante'}
              />
              <label htmlFor="restaurante-type">Restaurante</label>
              <input
                id="hospedagem-type"
                type="radio"
                name="dica_type"
                required={false}
                value={"hospedagem"}
                onChange={handleChange}
                checked={formData.dica_type==='hospedagem'}
              />
              <label htmlFor="hospedagem-type">Hospedagem</label>
            </div>
            <input type="submit" />
          </section>
          
        </form>
      </div>
    </>
  );
};
export default Dica;
