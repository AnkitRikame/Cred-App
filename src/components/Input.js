import React from "react";

const InputField = ({
	type,
	placeholder,
	name,
	value,
	onChange,
	onFocus = "",
}) => {
	// console.log(type, placeholder, name);
	return (
		<input
			type={type}
			placeholder={placeholder}
			name={name}
			value={value}
			onChange={onChange}
			onFocus={onFocus}
		/>
	);
};

export default InputField;
