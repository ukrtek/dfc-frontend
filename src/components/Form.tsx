import React, {useState} from 'react';

function Form() {
	// state variables with types
	const [cartValue, setCartValue] = useState<number>(0);
	const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
	const [numberOfItems, setNumberOfItems] = useState<number>(0);
	const [orderDate, setOrderDate] = useState<string>('');
	const [orderTime, setOrderTime] = useState<string>('');
	const [deliveryFee, setDeliveryFee] = useState<number>(0);

	// event handlers
	const handleCartValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCartValue(parseFloat(event.target.value));
	};

	const handleDeliveryDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(event.target.value, 10);

		// check if the value is a valid number
		setDeliveryDistance(isNaN(value) ? 0 : value);
	};

	const handleNumberOfItemsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(event.target.value, 10);

		setNumberOfItems(isNaN(value) ? 0 : value);
	};

	const handleOrderDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOrderDate(event.target.value);
	};

	const handleOrderTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOrderTime(event.target.value);
	};

	// handle form submit
	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			console.log('Form submitted');

			// calculation logic for delivery fee
	};



	return (
		<form onSubmit={handleFormSubmit}>
			<h1>Delivery fee calculator</h1>
			<div>
				<label>Cart value (€): </label>
				<input type="number" placeholder="0"></input>
			</div>

			<div>
				<label>Delivery distance (m): </label>
				<input type="number" placeholder="0" min="1"></input>
			</div>

			<div>
				<label>Number of items: </label>
				<input type="number" placeholder="0" min="1"></input>
			</div>

			<div>
				<label>Order date: </label>
				<input type="date"></input>
			</div>

			<div>
				<label>Order time: </label>
				<input type="time"></input>
			</div>

			<div>
				<button type="submit">Calculate!</button>
			</div>

			<div>
				<label>Delivery fee (€): </label>
				<span>0</span>
			</div>


		</form>
	);
}

export default Form;