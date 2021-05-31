import React, { useState } from "react";
import Input from "./Input";
import Axios from "axios";
// import Cards from "react-credit-cards";
import "../App.css";
import "react-credit-cards/es/styles-compiled.css";
import "bootstrap/dist/css/bootstrap.min.css";

const MyForm = () => {
	const initialValue = {
		accountNo: "",
		holderName: "",
		expiryDate: "",
		cvvNo: "",
		focus: "",
	};
	const [state, setState] = useState(initialValue);
	const [errors, setErrors] = useState({});
	const [allEnt, setAllEnt] = useState({});

	//   console.log("Mystate", state);

	const [focus, setFocus] = useState("");

	const handleChange = (e) => {
		// console.log(`e`, typeof e);
		const { value, name } = e.target;
		setState({ ...state, [name]: value });
		// console.log(state);
	};

	const validate = () => {
		const temp = {};
		//accountNo validation
		temp.accountNo =
			state.accountNo.length === 0 ||
			state.accountNo.length > 16 ||
			state.accountNo.length < 16
				? "Please Enter Proper 16 Digit*"
				: "";

		//holderName validation
		temp.holderName =
			state.holderName.trim() === "" ? "Account Holder Name is required* " : "";

		temp.expiryDate =
			state.expiryDate.trim() === "" ||
			state.expiryDate.length > 4 ||
			state.expiryDate.length < 4
				? "Please Enter Valid Date Format it should be in MM/YY *"
				: "";

		//CVV Validation
		temp.cvvNo = state.cvvNo.length >= 3 ? "" : "Please Enter valid CVV *";
		console.log(temp);
		//set the error
		setErrors({ ...temp });
		return Object.values(temp).every((x) => x === "");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			// setAllEnt([...allEnt, state]);
			setAllEnt({ ...state });
			alert("You Want to Submit your Information!!");
			setState(initialValue);
		}
	};

	const sendData = () => {
		const url = "https://run.mocky.io/v3/0b14a8da-5fc7-4443-8511-53d687399bc9";
		Axios.post("https://run.mocky.io/v3/0b14a8da-5fc7-4443-8511-53d687399bc9", {
			accountNo: state.accountNo,
			holderName: state.holderName,
			expiryDate: state.expiryDate,
			cvvNo: state.cvvNo,
			focus: state.focus,
		})

			.then((res) => {
				console.log(res.data);
			})
			.catch((error) => {
				console.log(error.response + " error");
			});
	};
	return (
		<>
			{/* <Cards
				accountNo={accountNo}
				holderName={holderName}
				expiryexpiryDate={expiryDate}
				cvvNo={cvvNo}
				focus={focus}
			/> */}

			<div className="app">
				<div className="form-container">
					<form onSubmit={handleSubmit}>
						<h6 className="app_heading mt-4">INSTA CRED APP </h6>
						{/* 5 props passed in below React-Card */}
						{/* accountNo */}
						<Input
							type="number"
							name="accountNo"
							placeholder="Account Number"
							value={state.accountNo}
							onChange={handleChange}
							onFocus={(e) => setFocus(e.target.name)}
						/>
						<br />
						{<span>{errors.accountNo}</span>}
						<br />
						{/*  holderName*/}
						<Input
							type="text"
							name="holderName"
							placeholder="Account Holder Name"
							value={state.holderName}
							onChange={handleChange}
							onFocus={(e) => setFocus(e.target.name)}
						/>
						<br />
						{<span>{errors.holderName}</span>}
						<br />
						{/* expiryDate */}
						<Input
							type="text"
							name="expiryDate"
							placeholder="MM / YY"
							value={state.expiryDate}
							onChange={handleChange}
							onFocus={(e) => setFocus(e.target.name)}
						/>
						<br />
						{<span>{errors.expiryDate}</span>}
						<br />
						{/* cvvNo */}
						<Input
							type="number"
							name="cvvNo"
							placeholder="CVV Number"
							value={state.cvvNo}
							onChange={handleChange}
							onFocus={(e) => setFocus(e.target.name)}
						/>
						<br />
						{<span>{errors.cvvNo}</span>}
						<br />
						<br />
						<button type="submit" className="submit_button">
							Send
						</button>
					</form>
				</div>
				{/* Show the Inserted data */}
				<div>
					{Object.keys(allEnt).length !== 0 && (
						<div className="showDetails mt-4">
							<p>{`💳 Your Credit Card Number:${allEnt.accountNo}`}</p>
							<p>{`🧑 ‍Your Name :${allEnt.holderName}`}</p>
							<p>{`⚠️💳 Your Expiry Date is :${allEnt.expiryDate}`}</p>
							<p>{`💳 Your CVV number is :${allEnt.cvvNo}`}</p>
						</div>
					)}
				</div>
				{/* {result && <p>InValid Form</p>} */}
			</div>
		</>
	);
};

export default MyForm;
