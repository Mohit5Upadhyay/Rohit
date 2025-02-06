
import { Helmet } from "react-helmet-async";

function Home() {
  return (

    <>

<Helmet>
        <title>Rohit Upadhyay</title>
        <meta
          name="description"
          content="Welcome to Rohit Upadhyay's official website. Explore books, blogs, and insights from an emerging author and storyteller."
        />
        <meta
          name="keywords"
          content="rohit upadhyay, author, writer, storyteller, books, blog"
        />
        <meta property="og:title" content="Home - Rohit Upadhyay" />
        <meta
          property="og:description"
          content="Welcome to Rohit Upadhyay's official website. Explore books, blogs, and insights from an emerging author and storyteller."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rohitupadhyay.me" />
        <link rel="canonical" href="https://www.rohitupadhyay.me" />
        
      </Helmet>
    

    <main className="flex flex-col md:flex-row bg-gradient-to-br from-gray-900 to-black mx-4 md:mx-10 my-10 rounded-lg shadow-lg overflow-hidden">
      <div className="md:w-1/2">
        <img
          src="/rohit.webp"
          alt="Rohit"
          loading="eager"
          fetchPriority="high"
          className="object-cover w-full h-full"
        />
      </div>
      <section className="md:w-1/2 p-8 bg-white/10 backdrop-blur-md">
        <h2 className="text-gold text-4xl font-bold mb-6">Welcome</h2>
        {/* <p className="text-gray-300 leading-relaxed mb-4">
       
          Welcome to the world of Rohit Upadhyay, an author and storyteller by passion, a writer at heart, and a firm believer in the transformative power of language. Writing has always been my means of interacting with the outside world, from my earliest days of creating plays and dramas that vividly portrayed characters to crafting tales that explored the core of existence.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          There have been difficulties along the way. My heart has always been in the free-flowing realm of creativity, even though I have an MBA in Health Management and have navigated the halls of structure and strategy. Writing is more than just filling pages; it's about giving people inspiration, hope, and meaning in their lives.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          As a writer, I want my words to be like a friend's voice, offering consolation, direction, and occasionally a gentle prod to recognize the beauty in your tale. My relationship with each reader is as personal as my writing. Know that I wrote this with you in mind, whether your goal is to explore, think, or discover a different viewpoint.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Greetings from my world, where stories are more than words; they are conduits for growth, healing, and understanding.
        </p>
        <p className="text-gray-300 leading-relaxed">
          I’m so glad that you are here :)
        </p> */}

<p className="text-gray-300 leading-relaxed mb-4">Rohit Upadhyay is an aspiring author, a storyteller, and a writer by heart whose journey began in the corporate corridors of Health Management. Armed with an MBA, he navigated the structured world of business. However, his true calling lay beyond the corporate world in the art of storytelling and creative expression.


</p>

<p className="text-gray-300 leading-relaxed mb-4">Today, Rohit combines his life insights with his passion for writing, crafting motivational blogs and stories that inspire personal growth and transformation.
</p>

<p className="text-gray-300 leading-relaxed mb-4">Rohit is currently working on his book, <i>Wisdom to Wonders</i>, a collection of transformative stories and lessons, while actively sharing his thoughts through his blog. His writing seeks to inspire readers to find meaning, embrace growth, and discover the beauty in their unique journeys.</p>

<p className="text-gray-300 leading-relaxed mb-4" >As a firm believer in the power of language, Rohit uses his words as conduits for healing, understanding, and connection. Whether you’re here to explore his blog or embark on your journey of self-discovery, Rohit’s work is crafted with you in mind.
</p>
<p className="text-gray-300 leading-relaxed mb-4">I’m extremely happy to have your presence in my world.</p>

      </section>
    </main>

    </>
  );
}

export default Home;