import React, { useState } from "react";
import axios from "axios";

function ContactForm() {
	const [result, setResult] = useState(null);
	const [contactForm, setContactForm] = useState({
		contact_name: "",
		email: "",
		subject: "",
		message: "",
	});

	const sendEmail = (event) => {
		event.preventDefault();
		axios
			.post("https://displacement-risk-backend.vercel.app/send", { ...contactForm })
			.then((response) => {
				setResult(response.data);
				setContactForm({
					name: "",
					email: "",
					subject: "",
					message: "",
				});
			})
			.catch(() => {
				setResult({ success: false, message: "Something went wrong" });
			});
	};

	const onInputChange = (event) => {
		const { name, value } = event.target;

		setContactForm({
			...contactForm,
			[name]: value,
		});
	};

	return (
		<div className="max-w-md mx-auto">
			{result && (
				<p className={`${result.success ? "success" : "error"}`}>
					{result.message}
				</p>
			)}
			<form
				onSubmit={sendEmail}
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
			>
				<div className="mb-4">
					<label
						htmlFor="contact_name"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Name
					</label>
					<input
						type="text"
						name="contact_name"
						value={contactForm.contact_name}
						placeholder="Enter your name."
						onChange={onInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Email
					</label>
					<input
						type="email"
						name="email"
						value={contactForm.email}
						placeholder="Enter your email."
						onChange={onInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="subject"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Subject
					</label>
					<input
						type="text"
						name="subject"
						value={contactForm.subject}
						placeholder="Enter your subject."
						onChange={onInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="message"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Message
					</label>
					<textarea
						name="message"
						value={contactForm.message}
						placeholder="Enter your message."
						onChange={onInputChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					></textarea>
				</div>
				<div className="flex items-center justify-between">
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

export default ContactForm;
