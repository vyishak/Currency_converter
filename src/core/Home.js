import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () =>  {
  const [state, setState] = useState({
      inp: 0,
      oup: 0,
      inpCurrency: "",
      oupCurrency: "",
      error: "",
    });

  const { inp, oup, inpCurrency, oupCurrency, error } = state;

  const currencyType = [      
    "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP","PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"
   ];
  

   const handleChange = (title) => (e) => {
    setState({
      ...state,
      [title]: e.target.value,
      error: ""
    });
  };

  const handleInpCurrency = (e) => {
    setState({ ...state, inpCurrency: e.target.value, error: "" });
  };

  const handleOupCurrency = (e) => {
    setState({ ...state, oupCurrency: e.target.value, error: "" });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inp || !inpCurrency || !oupCurrency) {
      setState({
        ...state,
        error: "Please enter the valid inputs",
      });
      return false;
    }
    try {
      const response = await axios.get(`https://api.frankfurter.app/latest?amount=${inp}&from=${inpCurrency}&to=${oupCurrency}`);
      
      setState({
        ...state,
        oup: response.data.rates[oupCurrency]
      });
    } catch (error) {
      setState({
        ...state,
        error: error.response.data.error,
      });
    }

  };

    return (
      <div className="container mt-5 pt-5">
          <div className="row justify-content-md-center">
            <div className="border border-primary col col-lg-3 p-5">
                <h4>Input Amount</h4> 
                <input
                  onChange={handleChange("inp")}
                  type="number"
                  required
                  className="form-control"
                  value={inp}
                />
                <select className="form-control mt-2" onChange={handleInpCurrency}>
                  <option value="">- Select -</option>
                    {currencyType.map((c, i) => (
                        <option key={i} value={c}>
                          {c}
                  </option>
                  ))}
                </select>        
            </div>
            <div className="col-md-auto mt-5 p-5">
              <button onClick={handleSubmit}> Convert </button>
            </div>
            <div className="border border-primary col col-lg-3 p-5">
              <h4>Output Amount</h4>
              { <p> {oup} </p>}
              <select className="form-control mt-2" onChange={handleOupCurrency}>
                <option value="">- Select -</option>
                  {currencyType.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
              </select>
            </div>
        </div>
        {error && error.length > 0 && (
              <div className="alert alert-danger mt-3">
                <ul className="my-0">
                  <li>{error}</li>
                </ul>
              </div>
            )}
      </div>
    );
}

export default Home;
