import React from 'react'
import Hero from './sub-components/Hero'
import Timeline from './sub-components/Timeline'
import About from './sub-components/About'
import Skills from './sub-components/Skills'
import Portfolio from './sub-components/Portfolio'
import MyApps from './sub-components/MyApps'
import Contact from './sub-components/Contact'
const Home = () => {
  return (
    <>
      <Hero />

      {/* Boxed sections */}
      <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 
        sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
        
        <Timeline />
        <About />
       
      </article>

      {/* FULL WIDTH Portfolio */}
      <section className="w-full px-5 mt-14">
         <Skills />
        <Portfolio />
      </section>

      {/* Optional boxed again */}
      
      <article className="px-5 sm:mx-auto w-full max-w-[1050px]">
        <MyApps />
        <Contact />
      </article>
     
    </>
  );
};

export default Home;