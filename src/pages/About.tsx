// import React from 'react';

// const About: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-6 flex items-center justify-center">
//       <div className="max-w-4xl bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8">
//         <h2 className="text-4xl font-bold text-center text-gold mb-6">About Rohit</h2>
//         <p className="text-lg leading-relaxed text-gray-300 mb-4">
//           Hello, I'm Rohit Upadhyay, a storyteller by passion, a writer at heart, and a firm believer in the transformational potential of language. Writing has always been my means of interacting with the outside world, from my earliest days of creating plays and dramas that vividly portrayed characters to crafting tales that explored the core of existence.
//         </p>
//         <p className="text-lg leading-relaxed text-gray-300 mb-4">
//           There have been difficulties along the way. My heart has always been in the free-flowing realm of creativity, even though I have an MBA in Health Management and have navigated the halls of structure and strategy. Writing is more than just filling pages; it's about giving people inspiration, hope, and meaning in their lives.
//         </p>
//         <p className="text-lg leading-relaxed text-gray-300 mb-4">
//           As a writer, I want my words to be like a friend's voice, offering consolation, direction, and occasionally a gentle prod to recognize the beauty in your tale. My relationship with each reader is as personal as my writing. Know that I wrote this with you in mind, whether your goal is to explore, think, or discover a different viewpoint.
//         </p>
//         <p className="text-lg leading-relaxed text-gray-300">
//           Greetings from my world, where stories are more than words; they are conduits for growth, healing, and understanding.
//         </p>
//         <br />
//         <p className="text-lg leading-relaxed text-gray-300">
//          I’m so glad that you are here :)
//         </p>
//       </div>
//     </div>
//   );
// }

// export default About;

import React from "react";
import { Helmet } from "react-helmet-async";

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About - Rohit Upadhyay</title>
        <meta
          name="description"
          content="Learn about Rohit Upadhyay - storyteller, writer, and MBA graduate. Discover his journey, passion for writing, and creative vision."
        />
        <meta
          name="keywords"
          content="about rohit upadhyay, author biography, writer, storyteller, MBA Health Management"
        />
        <meta property="og:title" content="About - Rohit Upadhyay" />
        <meta
          property="og:description"
          content="Learn about Rohit Upadhyay - storyteller, writer, and MBA graduate. Discover his journey, passion for writing, and creative vision."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rohitupadhyay.me/about" />
        <link rel="canonical" href="https://www.rohitupadhyay.me/about" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-6 flex items-center justify-center">
        <div className="max-w-4xl bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8">
          <h2 className="text-4xl font-bold text-center text-gold mb-6">
            About Rohit
          </h2>
          <p className="text-lg leading-relaxed text-gray-300 mb-4">
            Hello, my name is Rohit Upadhyay, and I'm a storyteller, aspiring
            author, and writer at heart. From my earliest days of writing plays
            and dramas in school that vividly portrayed various characters to
            crafting tales that explored the essence of existence, writing has
            always been very close to my heart and a way for me to interact with
            the outside world.
          </p>
          <p className="text-lg leading-relaxed text-gray-300 mb-4">
            The journey has not been without challenges. Despite having an MBA
            in Health Management and having walked the corridors of structure
            and strategy, my heart has always been in the unrestricted world of
            creativity.
          </p>
          <p className="text-lg leading-relaxed text-gray-300 mb-4">
            As a writer, I want my words to sound like a friend's voice,
            providing guidance, comfort, and sometimes a gentle reminder to
            appreciate the beauty in your story. Just like my writing, my
            relationship with each reader is unique. Whether you want to think,
            explore, or find a different perspective, you’ll get all dimensions
            to read. And know this, I craft words by having you in mind always.
          </p>
          <p className="text-lg leading-relaxed text-gray-300 mb-4">
            Greetings from my world, where stories are more than just words;
            they serve as tools for understanding, healing, and personal
            development.
          </p>
          <p className="text-lg leading-relaxed text-gray-300">
            I'm very happy you're here. :)
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
