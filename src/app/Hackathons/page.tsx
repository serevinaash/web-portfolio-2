// src/app/Hackathons.tsx

"use client";
 
import React from "react";
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import RollingGallery from "@/blocks/Components/RollingGallery/RollingGallery";
import FallingText from "@/blocks/TextAnimations/FallingText/FallingText";
import Threads from "@/blocks/Backgrounds/Threads/Threads";
import HackathonEntry from "./HackathonEntry";

const handleAnimationComplete = () => {
  console.log('Hackathon page animation completed!');
};

// Define your hackathon entry data
const hackathonEntriesData = [
  {
    entryNumber: "01",
    title: "International Invention Competition for Young Muslim Scientists 2024",
    award: "3rd Place With Gold Medal",
    description: "Achieved 3 Place and was honored with the Gold Medal at the International Invention Competition for Young Muslim Scientists (IICYMS), a premier global contest with 500 participants 5 country. My award-winning project, “Speech-to-Text Al-Qur’an Memorization Verification with LSTM and BERT,” showcased cutting-edge innovation in AI-driven solutions for Qur’anic memorization, setting a new standard in the field.",
    imageSrc: '/solutions/gold.jpg', // Replace with the actual image path
    projectLink: "https://github.com/serevinaash/lstm", // <-- Add the link for Procrash
    trophyType: "third", // Specify the trophy type
    techStackIcons: [ // <-- Add paths to tech stack icons for Procrash
        '/techstack/python.svg',
    ],
  },
  {
    entryNumber: "02",
    title: "Best team at bangkit company track capstone",
    award: "Special Award",
    description: "Best team at bangkit company track capstone.",
    imageSrc: '/solutions/2.png', // Replace with the actual image path
    projectLink: "https://github.com/ardiansa22/Amatrip", // <-- Add the link for Talento
    trophyType: "special", // Specify the trophy type
    techStackIcons: [ // <-- Add paths to tech stack icons for Talento
        '/techstack/javascript.svg',
        '/techstack/laravel.png',
    ],
  },
  {
    entryNumber: "03",
    title: "IT Fair UIN Bandung hackathon",
    award: "3th Place",
    description: "Won 3rd place in a hackathon themed “Improving the Efficiency of Campus and School Services” by developing a mental health web application. The platform was designed to support students in accessing mental health information, performing self-screening, and connecting anonymously with volunteers or counselors in a supportive community environment.",
    imageSrc: '/solutions/it.png', // Replace with the actual image path
    projectLink: "https://github.com/serevinaash/ULP_UinBandung", // <-- Add the link for KachingKo
    trophyType: "participant", // Specify the trophy type (using participant as a placeholder for 4th)
    techStackIcons: [ // <-- Add paths to tech stack icons for KachingKo
        '/techstack/css.svg',
        '/techstack/laravel.png',
    ],
  },
 
];

export default function Hackathons() {
  return (
    <>
      {/* Main content area for Hackathons */}
      <main className="flex-grow flex flex-col items-center h-full relative pt-20">
      { /* Make this hidden on mobile */ }
      {/* Added responsive hidden class */}
        <div className="hidden md:block" style={{ width: '100%', height: '600px', position: 'absolute', top: '0', zIndex: -1, opacity: 0.5 }}>
          <Threads
            amplitude={2.5}
            distance={0}
            enableMouseInteraction={false}
          />
        </div>

        {/* Hackathon Entries Section */}
        <div className="flex w-full items-center justify-center p-4">
          <BlurText
            text="Hackathon Entries"
            delay={50}
            animateBy="letters"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-3xl md:text-7xl font-extrabold text-center"
          />
        </div>

        <RollingGallery autoplay={true} pauseOnHover={false} />

        {/* Adjusted padding for responsiveness */}
        <div className="flex flex-col w-full max-w-5xl mx-auto p-4 md:p-4 my-10 md:my-20"> {/* Changed p-15 to p-4 */}
          {/* Falling Text for Desktop */}
          <div className="hidden md:block">
            <FallingText
              text={` Besides being a developer and content creator, I am big on joining competitions, like hackathons. It is a great way to work on solving actual problems and meet interesting people. Here are some of the events I've participated in:`}
              highlightWords={["hackathons", "competitions", "problems", "interesting", "events"]}
              trigger="hover"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.56}
              fontSize="2rem"
              mouseConstraintStiffness={0.9}
            />
          </div>

          {/* Falling Text for Mobile */}
          {/* Adjusted margin bottom */}
          <div className="md:hidden mb-10"> {/* Changed mb-25 to mb-10 for smaller mobile margin */}
            <FallingText
              text={` Besides being a developer, I am big on joining competitions, like hackathons. It is a great way to work on solving actual problems and meet interesting people. Here are some of the events I've participated in:`}
              highlightWords={["hackathons", "competitions", "problems", "interesting", "events"]}
              trigger="hover"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.56}
              fontSize="1rem"
              mouseConstraintStiffness={0.9}
            />
          </div>


          {/* Render Hackathon Entries */}
          {/* Adjusted margin top for responsiveness */}
          <div className="mt-20 md:mt-40"> {/* Adjusted margin top */}
            {hackathonEntriesData.map((entry, index) => (
              <HackathonEntry
                key={index}
                entryNumber={entry.entryNumber}
                title={entry.title}
                award={entry.award}
                description={entry.description}
                imageSrc={entry.imageSrc}
                projectLink={entry.projectLink} // Pass the project link
                trophyType={entry.trophyType} // Pass the trophy type
                techStackIcons={entry.techStackIcons} // Pass the tech stack icons array
              />
            ))}
          </div>
        </div>


      </main>

      {/* Footer Section */}
      <footer className="flex w-full items-center justify-center p-4 border-t border-white/[.15] text-white/50 text-sm font-light mt-20">
        <p>&copy; {new Date().getFullYear()} Serevina Sherly Maulida. All rights reserved.</p>
      </footer>
    </>
  );
};
