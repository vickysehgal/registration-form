import { useState } from "react";

const RegistrationForm = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    state: "Select State",
    city: "Select City",
    dob: "",
    gender: "",
    agreeToTerms: false,
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const states = [
    "Select State",
    "Gujarat",
    "Rajasthan",
    "Punjab",
    "Karnataka",
    "Maharashtra",
  ];

  const cities = {
    "Select State": ["Select City"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
    Punjab: ["Amritsar", "Ludhiana", "Chandigarh"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubli"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }
    if (formData.state === "Select State" || formData.city === "Select City") {
      newErrors.location = "Please select a state and city";
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
    setIsSubmitted(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      setIsSubmitted(true);
      setFormData(initialState);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    const name = e.target.name;

    if (e.target.type === "checkbox") {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else if (name === "state") {
      setFormData({
        ...formData,
        [name]: val,
        city: cities[val][0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: val,
      });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center">
      <div className="max-w-[700px] m-auto h-full flex flex-col gap-4 items-center justify-center p-5 border border-[#]">
        <h1 className="text-xl font-bold tracking-wider">Registration Form</h1>

        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-center gap-3"
        >
          {isSubmitted && (
            <p className="text-green-500 text-center">
              Registered successfully!
            </p>
          )}

          <div className="flex items-center gap-10">
            <div>
              <label htmlFor="firstName" className="font-bold">
                First Name:
              </label>
              <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                className="p-2 border border-[#b5b8b9]"
                onChange={handleInputChange}
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="font-bold">
                Last Name:
              </label>
              <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                className="p-2 border border-[#b5b8b9]"
                onChange={handleInputChange}
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="font-bold">
              Email:
            </label>
            <br />
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              className="p-2 border border-[#b5b8b9] w-full"
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className="flex items-center gap-10 py-2">
            <div>
              <label htmlFor="password" className="font-bold">
                Password:
              </label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                className="p-2 border border-[#b5b8b9]"
                onChange={handleInputChange}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="font-bold">
                Confirm Password:
              </label>
              <br />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                className="p-2 border border-[#b5b8b9]"
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="font-bold">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              title="Please enter a 10-digit phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="p-2 border border-[#b5b8b9] w-full"
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="flex items-center gap-10 py-2">
            <div>
              <label htmlFor="state" className="font-bold">
                State:
              </label>
              <br />
              <select
                name="state"
                id="state"
                value={formData.state}
                onChange={handleInputChange}
                className="p-2 border border-[#b5b8b9] w-full"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="text-red-500">{errors.location}</p>
              )}
            </div>
            <div>
              <label htmlFor="city" className="font-bold">
                City:
              </label>
              <br />
              <select
                name="city"
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                className="p-2 border border-[#b5b8b9] w-full"
              >
                {cities[formData.state].map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="dob" className="font-bold">
              Date of Birth:
            </label>
            <br />
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="p-2 border border-[#b5b8b9] w-full"
            />
            {errors.dob && <p className="text-red-500">{errors.dob}</p>}
          </div>

          <div>
            <label className="font-bold">Gender:</label>
            <div className="flex gap-4">
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleInputChange}
                />
                Male
              </label>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleInputChange}
                />
                Female
              </label>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="gender"
                  value="others"
                  checked={formData.gender === "others"}
                  onChange={handleInputChange}
                />
                Others
              </label>
            </div>
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>

          <div>
            <label htmlFor="agreeToTerms">
              <input
                className="mr-1"
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                value={formData.agreeToTerms}
                onChange={handleInputChange}
                checked={formData.agreeToTerms}
              />
              I agree to the terms and conditions
            </label>
            {errors.agreeToTerms && (
              <p className="text-red-500">{errors.agreeToTerms}</p>
            )}
          </div>

          <div className="flex gap-2 items-center m-auto">
            <div>
              <button
                className="px-6 py-2 text-sm text-[#999999] hover:bg-[#ff6801] hover:text-white border"
                onClick={resetForm}
                type="reset"
              >
                Reset All
              </button>
            </div>
            <div>
              <button
                className="px-6 py-2 text-sm text-[#fff] bg-[#ff6801] hover:bg-[#CD5300]"
                type="submit"
              >
                Submit Form
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
