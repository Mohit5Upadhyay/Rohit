function Home() {
  

  return (
   

      <main className="flex flex-row bg-white mx-10 my-10 rounded-lg shadow-lg">
        <div className="w-1/2 p-4">
          <img
            src="/rohit.jpeg"
            alt="Rohit"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <section className="w-1/2 p-8">
          <h2 className="text-classic-blue text-2xl font-bold mb-4">Welcome</h2>
          <p className="text-classic-blue leading-relaxed">
            Your content here. Add your welcome message or introduction.
          </p>
        </section>
      </main> 
        
  );
}

export default Home;