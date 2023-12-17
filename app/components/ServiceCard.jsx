"use client";
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react'
import AosWrapper from './AOSWrapper';


const ServiceCard = ({ imageTag, title, description, showIndex, handleOnMouseEnter, handleOnMouseLeave, bottomFormRef }) => {

    const serviceCardRef = useRef(null);

    useEffect(() => {
        if(showIndex === imageTag) {
            serviceCardRef.current.classList.add('show-hover');
            serviceCardRef.current.classList.add('service-cards');
        } else {
            serviceCardRef.current.classList.remove('service-cards');
            serviceCardRef.current.classList.remove('show-hover');
        }
    }, [showIndex])

    const handleClickInquire = () => {
        bottomFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }



  return (
    <>
    <AosWrapper />
    <div data-aos="fade-up-right" className={`service-card-md card-default transition-all flex flex-col md_max:odd:flex-row-reverse sm:flex-row xl:flex-col gap-2 md:gap-10 justify-center items-center`} ref={serviceCardRef} onMouseEnter={() => handleOnMouseEnter(imageTag)} onMouseLeave={() => handleOnMouseLeave(imageTag)}>     
        <div className='image w-full  h-80 relative'>
            <Image src={`/service-0${imageTag}.jpeg`} alt={title} className='object-cover' fill />
        </div>
        <div className='service-content w-full md:w-1/2 xl:w-full flex flex-col gap-2 justify-center'>
            <div className='title '>
                <h3 className='text-black text-base xl:text-xs font-semibold leading-9'>{title}</h3>
            </div>
            <div className={`description show text-black text-[10px] font-normal leading-5`}>
                <p className='show show-hover'>
                    {description}
                </p>
                <button className='flex xl:hidden show show-hover text-xs font-semibold text-zinc-100 bg-black rounded-lg px-5 py-1 mt-6' onClick={handleClickInquire}>Inquire Now!</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default ServiceCard;