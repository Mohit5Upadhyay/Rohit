function Home() {
  return (
    <main className="flex flex-col md:flex-row bg-gradient-to-br from-gray-900 to-black mx-4 md:mx-10 my-10 rounded-lg shadow-lg overflow-hidden">
      <div className="md:w-1/2">
        <img
          src="/rohit.jpeg"
          alt="Rohit"
          className="object-cover w-full h-full"
        />
      </div>
      <section className="md:w-1/2 p-8 bg-white/10 backdrop-blur-md">
        <h2 className="text-gold text-3xl font-bold mb-6">Welcome</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Hello, I'm Rohit Upadhyay, a storyteller by passion, a writer at heart, and a firm believer in the transformational potential of language. Writing has always been my means of interacting with the outside world, from my earliest days of creating plays and dramas that vividly portrayed characters to crafting tales that explored the core of existence.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          There have been difficulties along the way. My heart has always been in the free-flowing realm of creativity, even though I have an MBA in Health Management and have navigated the halls of structure and strategy. Writing is more than just filling pages; it's about giving people inspiration, hope, and meaning in their lives.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          As a writer, I want my words to be like a friend's voice, offering consolation, direction, and occasionally a gentle prod to recognize the beauty in your tale. My relationship with each reader is as personal as my writing. Know that I wrote this with you in mind, whether your goal is to explore, think, or discover a different viewpoint.
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          Greetings from my world, where stories are more than words; they are conduits for growth, healing, and understanding. I’m so glad that you are here.
        </p>
        <p className="text-gray-300 leading-relaxed">
          I’m so glad that you are here :)
        </p>
      </section>
    </main>
  );
}

export default Home;