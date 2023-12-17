import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const HeroForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm( { defaultValues: {
        name: "",
        email: "",
        country_code: "",
        phone: "",
        buildingType: "",
        location: "",
        message: ""
    } } );
    const [formStep, setFormStep] = useState(1);

    const onSubmit = data => {
        if(formStep === 3) {
            //handle submit
            setFormStep(1);
            console.log(data);
        } else {
            setFormStep(formStep + 1);
            console.log(formStep, data);
        }
    }

  return (
    <div className="hero-image w-11/12 lg:w-7/12 mt-4 lg:mt-0 transition-all">
            <form className="text-white bg-zinc-900 py-10  rounded-xl flex flex-col justify-center items-center gap-5 w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="form caption-top">
                <h1 className="text-white text-center text-lg md:text-lg lg:text-2xl  font-semibold leading-[35px]">
                  Let&#39;s Redefine Your Space!
                </h1>
              </div>
              <div className="form-content w-full px-14 flex flex-col md:gap-3 lg:gap-6 gap-4 items-center">
                <div className={`personal-info flex flex-col md:gap-3 lg:gap-6 gap-2 items-center ${formStep === 1 ? "present-form" : "previous-form"} w-full`}>
                    <div className="form-group flex flex-col w-11/12">
                        <label htmlFor="name">Full Name*</label>
                        <input
                            type="text"
                            id="name"
                            {...register("name", { required: "Enter your name" })}
                            className="form-control w-full outline-none bg-transparent border-b px-0 py-4 border-zinc-100"
                            placeholder="Enter your name"
                        />
                        <p className="text-xs text-red-500">{errors.name?.message}</p>
                    </div>
                    <div className="form-group flex flex-col w-11/12">
                        <label htmlFor="email">Email*</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: "Enter your email" })}
                            className="form-control w-full outline-none bg-transparent border-b px-0 py-4 border-zinc-100"
                            placeholder="Enter your email"
                        />
                        <p className="text-xs text-red-500">{errors.email?.message}</p>
                    </div>
                    <div className="form-group flex flex-col w-11/12">
                        <label htmlFor="phone">Phone*</label>
                        <div className='phone-with-country-code flex justify-center items-center'>
                            <select
                                id="country-code"
                                {...register("country-code", { required: "Enter your country code" })}
                                className="form-control w-1/4 outline-none bg-transparent border-b px-0 py-4 pt-[19px] border-zinc-100"
                            >
                                <option value="+971">+971</option>
                                <option value="+234">+234</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                                <option value="+91">+91</option>
                            </select>
                            <input
                            type="tel"
                            id="phone"
                            {...register("phone", { required: "Enter a number we can reach you on" })}
                            className="form-control w-full outline-none bg-transparent border-b px-0 py-4 border-zinc-100"
                            placeholder="Enter your phone number"
                        />
                        </div>
                        
                        <p className="text-xs text-red-500">{errors.phone?.message}</p>
                    </div>
                </div>
                <div className={`building-info ${formStep === 2 ? "present-form" : "previous-form"} w-full flex-col gap-2`}>
                    <div className="form-group flex flex-col w-11/12">
                        <label htmlFor="building-type">Building Type*</label>
                        <select
                            id="building-type"
                            {...register("building-type", { required: formStep === 2 ? "Building type is required" : false })}
                            className="form-control w-full outline-none bg-transparent border-b px-0 py-4 border-zinc-100"
                        >
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                            <option value="industrial">Industrial</option>
                        </select>
                        <p className="text-xs text-red-500">{errors.buildingType?.message}</p>
                    </div>
                    <div className="form-group flex flex-col w-11/12">
                        <label htmlFor="building-location">Location*</label>
                        <input
                            type="text"
                            id="location"
                            {...register("location", { required:  formStep === 2 ? "Kindly provide the location of your building" : false })}
                            aria-invalid={errors.location ? "true" : "false"}
                            className="form-control w-full outline-none bg-transparent border-b px-0 py-4 border-zinc-100"
                            placeholder="Enter your building location"
                        />
                        <p className="text-xs text-red-500">{errors.location?.message}</p>
                    </div>
                </div>
                <div className={`message ${formStep === 3 ? "present-form" : "previous-form"} w-full`}>
                    <div className="form-group flex flex-col w-11/12">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        {...register("message")}
                        className="form-control w-full outline-none bg-transparent border-b px-0 py-4 border-zinc-100"
                        placeholder="Any additional information you'd like to share with us"
                    />
                    </div>
                </div>

                <div className="form-group w-full flex justify-end">
                  <button type='submit' className="btn btn-primary px-[21px] py-[8px] bg-white rounded-[3px] text-zinc-900 text-sm">
                    {
                        formStep === 3 ? "Submit" : "Next"
                    }
                  </button>
                </div>
              </div>
            </form>
        </div>
  )
}

export default HeroForm;