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

	const calculateDeliveryFee = () => {

		let fee = 0;
		if (cartValue >= 200) {
			return fee;
		}

		fee = 2; // starting from base fee

		// small order surcharge
		if (cartValue < 10) {
			fee += 10 - cartValue;
		};

		// distance surcharge
		if (deliveryDistance > 1000) {
			const extraDistance = deliveryDistance - 1000;
			const extraDistanceChunksCount = Math.ceil(extraDistance / 500);
			fee += extraDistanceChunksCount;
		};

		// extra items surcharge
		if (numberOfItems > 4) {
			const extraItemsCount = numberOfItems - 4;
			fee += extraItemsCount * 0.5;
		};

		// bulk surcharge
		if (numberOfItems > 12) {
			fee += 1.2;
		};

		// Friday evening surcharge
		const orderDateTime = new Date(`${orderDate}T${orderTime}`);

		const isRushHour = orderDateTime.getHours() >= 15 && orderDateTime.getHours() < 19;

		if (orderDateTime.getDay() === 5 && isRushHour) {
			fee *= 1.2;
		};

		// deliveryFee > 15 -> "Sorry, total delivery fee cannot be more than 15€. Please place a second order."
		if (fee > 15) {
			fee = 15;
		};

		return fee;
	};

	// handle form submit
	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			const fee = calculateDeliveryFee();
			setDeliveryFee(fee);
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<h1>Delivery fee calculator</h1>
			<div>
				<label>Cart value (€): </label>
				<input type="number" placeholder="0" onChange={handleCartValueChange}></input>
			</div>

			<div>
				<label>Delivery distance (m): </label>
				<input type="number" placeholder="0" min="1" onChange={handleDeliveryDistanceChange}></input>
			</div>

			<div>
				<label>Number of items: </label>
				<input type="number" placeholder="0" min="1" onChange={handleNumberOfItemsChange}></input>
			</div>

			<div>
				<label>Order date: </label>
				<input type="date" onChange={handleOrderDateChange}></input>
			</div>

			<div>
				<label>Order time: </label>
				<input type="time" onChange={handleOrderTimeChange}></input>
			</div>

			<div>
				<button type="submit">Calculate!</button>
			</div>

			<div>
				<label>Delivery fee (€): </label>
				<span>{deliveryFee}</span>
			</div>

		</form>
	);
}

export default Form;