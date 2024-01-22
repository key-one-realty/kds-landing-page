"use client";
import React, { useEffect, useState, useRef } from 'react'
import { set, useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation'
import AutocompleteInput from './AutocompleteInput';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Image from 'next/image';



const HeroForm = ({ isLoaded, loadError }) => {

  const [currentUrl, setCurrentUrl] = useState("https://register-interest.keyonedesignsolution.com/");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);
  const [phone, setPhone] = useState(null);

  const phoneInputRef = useRef(null);

  useEffect(() => {
    console.log(currentUrl);
    if(window.location.search) {
      const searchParams = new URLSearchParams(window.location.search);
      setCurrentUrl("https://register-interest.keyonedesignsolution.com/" + searchParams.toString());
    }
  }, [currentUrl]);

  useEffect(() => {
    if(apiSuccess) {
      setTimeout(() => {
        setApiSuccess(false);
      }, 5000);
    }
  }, [apiSuccess]);

    const { register, handleSubmit, watch, formState: { errors } } = useForm( { defaultValues: {
            "source_id": "15",
            "division_id": "4",
            "lead_type_id": "3",
            "employee_id": 11,
            "method_id": 5,
            "contact": {
              "name": "",
              "first_name": "",
              "last_name": "",
              "email": "",
              "country_code": "",
              "phone": "",
              "number": "",
            },
            "additional_fields": [
              {
                "building_type": "",
                "location": "",
                "Message": "",
                "url": currentUrl
              }
            ]
    } } );


    const sendContactForm = async (data) => {
      try {
        setIsLoading(true);
        console.log(data);
        let firstName = data.contact?.name?.split(' ')[0];
        let lastName = data.contact?.name?.split(' ').slice(1).join(' ');
        const apiData = {
          "source_id": "15",
          "division_id": "4",
          "lead_type_id": "3",
          "employee_id": 11,
          "method_id": 5,
          "contact": {
            "first_name": firstName,
            "last_name": lastName,
            "email": data.contact.email,
            "number": phone,
          },
          "additional_fields": [
            {
              "building_type": data.additional_fields.building_type,
              "location": data.additional_fields.location,
              "Message": data.additional_fields.message,
              "url": currentUrl
            }
          ]
        };
        console.log(`Sent data: ${apiData}`);

          const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
            },
            body: JSON.stringify(apiData)
          });
          const responseData = await response.json();
          setIsLoading(false);
          setApiSuccess(true);
          console.log(responseData);
        } catch (error) {
          setIsLoading(false);
          setApiError(error.message);
          console.log(error);
        }
      };


    const [formStep, setFormStep] = useState(1);



    const onSubmit = async (data) => {
        if(formStep === 3) {
            //handle submit
            await sendContactForm(data);
            setFormStep(1);
            console.log(data);
        } else {
            setFormStep(formStep + 1);
            console.log(formStep, data);
        }
    };

  return (
    <div className="hero-image w-11/12 lg:w-7/12 mt-4 lg:mt-0 transition-all">
            <form className="text-white bg-zinc-900 py-10  rounded-xl flex flex-col justify-center items-center gap-5 w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="form caption-top">
                <h1 className="text-white text-center text-lg md:text-lg lg:text-2xl  font-semibold leading-[35px]">
                  Let&#39;s Redefine Your Space!
                </h1>
                <p className='text-green-400 text-center text-sm px-4'>
                  {apiSuccess ? "Thank you for contacting us, we will get back to you soon!" : null}
                </p>
                <p className='text-red-400 text-center text-sm px-4'>
                  {apiError && apiError}
                </p>
              </div>
              <div className="form-content w-full px-14 flex flex-col md:gap-3 lg:gap-6 gap-4 items-center">
                <div className={`personal-info flex flex-col md:gap-3 lg:gap-6 gap-2 items-center ${formStep === 1 ? "present-form" : "previous-form"} w-full`}>
                    <div className="form-group flex flex-col w-11/12">
                        <label htmlFor="name">Full Name*</label>
                        <input
                            type="text"
                            id="name"
                            {...register("contact.name", { required: "Enter your name" })}
                            className="form-control w-full outline-none bg-transparent border-b px-0 py-4 border-zinc-100"
                            placeholder="Enter your name"
                        />
                        <p className="text-xs text-red-500">{errors.contact?.name?.message}</p>
                    </div>
                    <div className="form-group flex flex-col w-11/12">
                        <label htmlFor="email">Email*</label>
                        <input
                            type="email"
                            id="email"
                            autoComplete='email'
                            {...register("contact.email", { required: "Enter your email" })}
                            className="form-control w-full outline-none bg-transparent border-b px-0 py-4 border-zinc-100"
                            placeholder="Enter your email"
                        />
                        <p className="text-xs text-red-500">{errors.contact?.email?.message}</p>
                    </div>
                    <div className="form-group flex flex-col w-11/12">
                        <label htmlFor="phone">Phone*</label>
                        <div className='phone-with-country-code flex justify-center items-center'>
                            {/* <input 
                            id="country-code"
                            autoComplete='off'
                            placeholder='___'
                            {...register("contact.country_code", { required: "Enter your country code", maxLength: 4 })}
                            className='form-control w-1/4 outline-none bg-transparent border-b px-0 py-4 border-zinc-100' /> */}
                            <PhoneInput 
                              autoComplete='tel'
                              enableSearch={true}
                              type="tel"
                              id="phone"
                              inputStyle={{ backgroundColor: 'transparent', border: 'none', color: 'white' }}
                              dropdownStyle={{border: 'none', color: 'black' }}
                              buttonStyle={{ backgroundColor: 'transparent', border: 'none' }}
                              buttonClass='hover:bg-transparent'
                              country={'ae'}
                              inputProps={{
                                name: "contact.phone",
                                required: "Enter a number we can reach you on",
                                className: "form-control w-full outline-none bg-transparent border-b px-0 text-black py-4 border-zinc-100"
                              }}
                              onChange={(phone) => {setPhone(phone)}}
                              // {...register("contact.phone", { required: "Enter a number we can reach you on" })}
                              placeholder='+___-___-____'
                              className="form-control w-full outline-none bg-transparent border-b px-0 text-black py-4 border-zinc-100"
                            />
                            {/* <input
                            type="tel"
                            id="phone"
                            ref={phoneInputRef}
                            autoComplete='tel'
                            {...register("contact.phone", { required: "Enter a number we can reach you on" })}
                            className="form-control w-full outline-none bg-transparent border-b px-0 py-4 border-zinc-100"
                            placeholder="-___-____"
                        /> */}
                        </div>
                        <p className="text-xs text-red-500">{errors.contact?.country_code?.message}</p>
                        <p className="text-xs text-red-500">{errors.contact?.phone?.message}</p>
                    </div>
                </div>
                <div className={`building-info ${formStep === 2 ? "present-form" : "previous-form"} w-full flex-col gap-2`}>
                    <div className="form-group flex flex-col w-11/12">
                        <label htmlFor="building-type">Building Type*</label>
                        <select
                            id="building-type"
                            {...register("additional_fields.building_type", { required: formStep === 2 ? "Building type is required" : false })}
                            className="form-control w-full outline-none bg-transparent border-b px-0 py-4 border-zinc-100 text-neutral-500"
                        >
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                            <option value="industrial">Industrial</option>
                        </select>
                        <p className="text-xs text-red-500">{errors.additional_fields?.buildingType?.message}</p>
                    </div>
                    <div className="form-group flex flex-col w-11/12">
                        <label htmlFor="building-location">Location*</label>
                        <input
                            type="text"
                            id="location"
                            {...register("additional_fields.location", { required:  formStep === 2 ? "Kindly provide the location of your building" : false })}
                            aria-invalid={errors.location ? "true" : "false"}
                            className="form-control w-full outline-none bg-transparent border-b px-0 py-4 border-zinc-100"
                            placeholder="Enter your building location"
                        />
                        {/* <AutocompleteInput isLoaded={isLoaded} loadError={loadError} register={register} errors={errors} formStep={formStep} /> */}
                        <p className="text-xs text-red-500">{errors.additional_fields?.location?.message}</p>
                    </div>
                </div>
                <div className={`message ${formStep === 3 ? "present-form" : "previous-form"} w-full`}>
                    <div className="form-group flex flex-col w-11/12">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        {...register("additional_fields.message")}
                        className="form-control w-full outline-none bg-transparent border-b px-0 py-4 border-zinc-100"
                        placeholder="Any additional information you'd like to share with us"
                    />
                    </div>
                </div>

                <div className={`form-group w-full flex ${formStep > 1 ? "justify-between" : "justify-end"} items-center`}>
                { formStep > 1 &&
                    <button type='button' className="btn btn-primary rounded-[3px] text-zinc-900 text-sm ml-2" onClick={() => setFormStep(formStep - 1)}>
                    <Image src='Back-arrow.svg' alt='arrow-left' width={20} height={20} />
                  </button>}
                  <button type='submit' className="btn btn-primary px-[21px] py-[8px] bg-white rounded-[3px] text-zinc-900 text-sm">
                    {
                      isLoading ? "Loading..." :
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