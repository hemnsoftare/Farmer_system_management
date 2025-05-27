import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import SearchComponent from "./Search";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const t = useTranslations("hero");

  // Refs for animation targets
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const searchRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for the hero animations
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      // Initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50,
      });
      gsap.set([buttonRef.current], {
        opacity: 0,
        scale: 0.1,
      });
      gsap.set(searchRef.current, {
        opacity: 0,
        y: -30,
      });

      gsap.set(imageRef.current, {
        scale: 1.1,
        opacity: 0.8,
      });

      // Animation sequence
      tl.to(imageRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut",
      })
        .to(
          searchRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=1"
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.3"
        )
        .to(buttonRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scale: 1,
          ease: "back.out(1.7)",
        });

      // Parallax effect for background image on scroll
      gsap.to(imageRef.current, {
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Text reveal animation on scroll
      gsap.fromTo(
        [titleRef.current, subtitleRef.current],
        {
          y: 30,
          opacity: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // Button hover animation
      const button = buttonRef.current;
      if (button) {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }

      // Responsive animations
      const mm = gsap.matchMedia();

      // Mobile animations
      mm.add("(max-width: 768px)", () => {
        gsap.set(titleRef.current, {
          fontSize: "clamp(2rem, 8vw, 3rem)",
        });

        gsap.set(subtitleRef.current, {
          fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
        });
      });

      // Tablet animations
      mm.add("(min-width: 769px) and (max-width: 1024px)", () => {
        gsap.set(titleRef.current, {
          fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
        });

        gsap.set(subtitleRef.current, {
          fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
        });
      });

      // Desktop animations
      mm.add("(min-width: 1025px)", () => {
        // Add floating animation for desktop
        gsap.to(titleRef.current, {
          y: "+=10",
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(subtitleRef.current, {
          y: "+=5",
          duration: 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 0.5,
        });
      });
    }, heroRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <>
      <div
        ref={heroRef}
        className=" flex flex-col md:px-12 sm:mt-12 pb-3 h-screen w-full overflow-hidden"
      >
        {/* Background Image */}
        <Image
          src="/y/hero.png"
          alt="image hero"
          ref={imageRef}
          className="w-full h-full absolute  shadow-lg shadow-black inset-0 z-0 object-cover brightness-95"
          width={1920}
          height={1080}
          priority
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Search Component */}
          <div ref={searchRef} className="w-full">
            <SearchComponent />
          </div>

          {/* Hero Content */}
          <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              {/* Title */}
              <h1
                ref={titleRef}
                className="text-secondary dark:text-primary-200 font-bold capitalize mb-6
                          text-xl sm:text-2xl md:text-2xl lg:text-4xl xl:text-5xl
                          leading-tight"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
              >
                Empower Your Farming Future
              </h1>

              {/* Subtitle */}
              <div ref={subtitleRef} className="mb-8 lg:mb-12">
                <h3
                  className="font-medium dark:text-neutral-500 text-white text-center
                              text-lg sm:text-xl md:text-xl lg:text-xl xl:text-3xl
                              leading-relaxed max-w-3xl mx-auto"
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                >
                  Manage your land, livestock,{" "}
                  <br className="hidden sm:block" />
                  and harvests smarter, faster, and better{" "}
                  <span className="text-secondary font-extrabold"> — </span>
                  all in one place.
                </h3>
              </div>

              {/* CTA Button */}
              <div ref={buttonRef}>
                <Link
                  href={"#newProducts"}
                  className="inline-block transition-all duration-300"
                >
                  <button
                    className="capitalize bg-secondary text-white rounded-lg
                                   hover:bg-red-800 transition-all duration-300
                                   px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4
                                   text-sm sm:text-base lg:text-lg
                                   font-medium shadow-lg hover:shadow-xl
                                   transform hover:scale-105 active:scale-95"
                  >
                    {t("buttonText") || "Explore More"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for better text readability */}
      </div>
    </>
  );
};

export default Hero;
