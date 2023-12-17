"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ServiceCard from "./components/ServiceCard";
import HeroForm from "./components/HeroForm";

export default function Home() {
  const bottomFormRef = useRef(null);

  const [showIndex, setShowIndex] = useState(1);
  const [isMouseOnCard, setIsMouseOnCard] = useState(false);
  /*eslint-disable react-hooks/exhaustive-deps */ // This is to disable the exhaustive-deps warning for the interval variable
  let interval;

  useEffect(() => {
    if (window.innerWidth < 1024) {
      return;
    } else {
      interval = setInterval(() => {
        if (isMouseOnCard) {
          return;
        } else {
          if (showIndex === 6) {
            setShowIndex(1);
          } else {
            setShowIndex(showIndex + 1);
          }
        }
      }, 13000);
      return () => clearInterval(interval);
    }
  }, [showIndex, isMouseOnCard]);

  const handleOnMouseEnter = (serviceCardNumber) => {
    setShowIndex(serviceCardNumber);
    clearInterval(interval);
    setIsMouseOnCard(true);
  };

  const handleOnMouseLeave = (e) => {
    setIsMouseOnCard(false);
    if (showIndex === 6) {
      setShowIndex(1);
    }
  };

  const services = [
    {
      imageTag: 1,
      title: "Design Consultation",
      description:
        "Key One Design Solution provides personalized interior design consultations in Dubai, incorporating your unique style, preferences, and requirements for comprehensive guidance in concept development, luxury material selection, and spatial planning.",
    },
    {
      imageTag: 2,
      title: "Project Management",
      description:
        "Our experienced Key One Design Solution project management team in Dubai will coordinate and oversee every aspect of your home from start to finish, ensuring high-quality design results.",
    },
    {
      imageTag: 3,
      title: "Renders & Walk-Throughs",
      description:
        "At Key One Design Solution, we aim to provide you with the best technologies to create a realistic visualization of your project. Utilizing 3D rendering, we create real-time images, allowing you to explore your future home in Dubai.",
    },
    {
      imageTag: 4,
      title: "Bespoke Furniture",
      description:
        "Using premium materials, quality craftsmanship, and attention to detail, Key One Design Solution can design, customize, and manufacture loose and fixed furniture in Italy for your style and comfort.",
    },
    {
      imageTag: 5,
      title: "Store Tour",
      description:
        "Embark on a captivating store tour with Key One Design Solution, where we take you to our manufacturers' stores in Italy to experience the quality and comfort of products firsthand. We are committed to making your Dubai home a durable luxury.",
    },
    {
      imageTag: 6,
      title: "Space Selection",
      description:
        "Our team of experts will analyze your requirements and identify spaces with the perfect location, functionality, and aesthetic to provide your residential or commercial project in Dubai with optimal design solutions and tailored excellence.",
    },
  ];

  return (
    <main className="min-h-screen">
      <section className="navbar-with-icon bg-neutral-900 flex justify-center items-center w-full">
        <Image
          src="/KDS_icon_white.svg"
          alt="KDS Logo"
          width={47}
          height={47}
          className="logo py-3"
        />
      </section>
      <section className="hero-section flex flex-col gap-10 lg:gap-0 lg:flex-row justify-center items-center bg-neutral-900 w-full h-fit pt-20 lg:pt-0 lg:h-[93svh]">
        <div className="left w-full lg:w-[40vw] flex h-full justify-center items-center px-5 lg:px-10 xl:px-20">
          <div className="hero-content text-center lg:text-left w-full lg:w-[40vw]">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-9">
              Elevate Your Living Experience with Luxury Interior Design in
              Dubai
            </h1>
            <p className="text-gray-300 leading-7 text-sm md:text-base lg:text-base xl:text-lg">
              Elevate your Dubai living with Key One Design Solution's
              exceptional interior design services, crafted for the epitome of
              luxury and enhanced home experiences.
            </p>
            <button className="px-5 py-3 text-sm md:text-base lg:text-base xl:text-lg mt-4 bg-white rounded-md">
              Contact us!
            </button>
          </div>
        </div>
        <div className="right-hero-section relative w-full lg:w-[60vw] flex h-full justify-center items-center pb-20 lg:pb-0">
          <div className="form-container flex w-full justify-center items-center sm:w-[60vw]">
            <HeroForm />
          </div>
        </div>
      </section>
      <section className="services-section w-full py-16 lg:pb-72">
        <div className="services-content w-[90vw] mx-auto">
          <div className="header">
            <h1 className="text-neutral-900 w-fit text-3xl font-medium border-b border-black pb-1">
              Our Services
            </h1>
          </div>
          <div className="mt-4 flex flex-col justify-center items-center xl:items-start xl:flex-row gap-12 lg:gap-2">
            {services.map((service) => (
              <ServiceCard
                key={service.imageTag}
                showIndex={showIndex}
                handleOnMouseEnter={handleOnMouseEnter}
                handleOnMouseLeave={handleOnMouseLeave}
                bottomFormRef={bottomFormRef}
                {...service}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="bottom-form bg-zinc-900 flex justify-center items-center">
        <div className="bottom-form-container flex flex-col justify-center items-center gap-5 py-5">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center">
            Get in touch with us today!
          </h1>
          <p className="text-white text-center mt-2">
            We will get back to you within 24 hours.
          </p>
          <div
            className="w-[100vw] sm:w-[60vw] lg:w-[50vw] flex justify-center items-center"
            ref={bottomFormRef}
          >
            <HeroForm />
          </div>
        </div>
      </section>
      <footer className="footer bg-black flex justify-center items-center py-5">
        <p className="text-white text-center text-xs sm:text-base">
          © 2023 Key One Design Solution. All Rights Reserved. Privacy Policy
        </p>
      </footer>
    </main>
  );
}
