import React, {useState} from 'react';
import './Form.css';

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

	const calculateDeliveryFee = () => {
		let fee = cartValue >= 200 ? 0 : 2;

		if (cartValue < 10) fee += 10 - cartValue; // small order surcharge
		if (deliveryDistance > 1000) fee += Math.ceil((deliveryDistance - 1000) / 500); // extra distance surcharge
		if (numberOfItems > 4) fee += (numberOfItems - 4) * 0.5; // large order surcharge
		if (numberOfItems > 12) fee += 1.2; // bulk surcharge


		if (orderDate && orderTime) {
			const orderDateTime = new Date(`${orderDate}T${orderTime}`);
			const isRushHour = orderDateTime.getHours() >= 15 && orderDateTime.getHours() < 19;
			if (orderDateTime.getDay() == 5 && isRushHour) fee *= 1.2;
		}

		return Math.min(fee, 15);
	};

	// handle form submit
	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			const fee = calculateDeliveryFee();
			setDeliveryFee(fee);
	};

	return (
		<form onSubmit={handleFormSubmit}>

			<header>
				<h1>Delivery fee calculator</h1>
			</header>

			<div className='form-container'>

				<div className='form-row'>
				<label htmlFor='cart-value'>Cart value (€): </label>
				<input type="number" id='cart-value' placeholder="0" onChange={handleCartValueChange}></input>
				</div>

				<div className='form-row'>
					<label htmlFor='distance'>Delivery distance (m): </label>
					<input type="number" id='distance' placeholder="0" min="1" onChange={handleDeliveryDistanceChange}></input>
				</div>

				<div className='form-row'>
					<label htmlFor='number-of-items'>Number of items: </label>
					<input type="number" id='number-of-items' placeholder="0" min="1" onChange={handleNumberOfItemsChange}></input>
				</div>

				<div className='form-row'>
					<label htmlFor='date'>Order date: </label>
					<input type="date" id='order-date' onChange={handleOrderDateChange}></input>
				</div>

				<div className='form-row'>
					<label htmlFor='time'>Order time: </label>
					<input type="time" id='order-time' onChange={handleOrderTimeChange}></input>
				</div>

				<div className='form-row'>
					<button id='calculate' type="submit">Calculate!</button>
				</div>

				<div id='result'>
					<label>Delivery fee (€): </label>
					<span>{deliveryFee}</span>
				</div>
			</div>			

		</form>
	);
}

export default Form;