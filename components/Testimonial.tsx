"use client"

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Twitter } from "lucide-react";

export default function ImageContent1() {
  // Controls for first section
  const controlsLeft1 = useAnimation();
  const controlsRight1 = useAnimation();
  const [leftRef1, leftInView1] = useInView({ threshold: 0.2 });
  const [rightRef1, rightInView1] = useInView({ threshold: 0.2 });

  // Controls for second section
  const controlsLeft2 = useAnimation();
  const controlsRight2 = useAnimation();
  const [leftRef2, leftInView2] = useInView({ threshold: 0.2 });
  const [rightRef2, rightInView2] = useInView({ threshold: 0.2 });

  // Controls for third section
  const controlsLeft3 = useAnimation();
  const controlsRight3 = useAnimation();
  const [leftRef3, leftInView3] = useInView({ threshold: 0.2 });
  const [rightRef3, rightInView3] = useInView({ threshold: 0.2 });

  // Effect for first section
  useEffect(() => {
    if (leftInView1) {
      controlsLeft1.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
      });
      controlsRight1.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }
      });
    } else {
      controlsLeft1.start({
        x: -100,
        opacity: 0,
        transition: { duration: 0.8, ease: "easeIn" }
      });
      controlsRight1.start({
        x: 100,
        opacity: 0,
        transition: { duration: 0.8, ease: "easeIn" }
      });
    }
  }, [controlsLeft1, controlsRight1, leftInView1]);

  // Effect for second section
  useEffect(() => {
    if (leftInView2) {
      controlsLeft2.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
      });
      controlsRight2.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }
      });
    } else {
      controlsLeft2.start({
        x: -100,
        opacity: 0,
        transition: { duration: 0.8, ease: "easeIn" }
      });
      controlsRight2.start({
        x: 100,
        opacity: 0,
        transition: { duration: 0.8, ease: "easeIn" }
      });
    }
  }, [controlsLeft2, controlsRight2, leftInView2]);

  // Effect for third section
  useEffect(() => {
    if (leftInView3) {
      controlsLeft3.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
      });
      controlsRight3.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }
      });
    } else {
      controlsLeft3.start({
        x: -100,
        opacity: 0,
        transition: { duration: 0.8, ease: "easeIn" }
      });
      controlsRight3.start({
        x: 100,
        opacity: 0,
        transition: { duration: 0.8, ease: "easeIn" }
      });
    }
  }, [controlsLeft3, controlsRight3, leftInView3]);

  return (
    <div className="text-[#F7F2DA] p-8 gap-4 space-y-12">
      {/* First Card */}
      <div className="flex flex-col md:flex-row gap-20 my-8">
         <motion.div
          ref={leftRef1}
          className="flex-1"
          initial={{ x: -100, opacity: 0 }}
          animate={controlsLeft1}
        >
          <motion.p
            className="mt-2 leading-10 tracking-tight text-left sm:leading-none hover:text-gray-500 text-md md:text-2xl hover:scale-110 hover:text-xl md:hover:text-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out text-xl font-normal relative"
            whileHover={{
              y: [-2, 2, -2],
              transition: { repeat: Infinity, duration: 0.5 }
            }}
          >
            SWEEP ACROSS MULTIPLE MARKETPLACES
            <motion.span
              className="absolute inset-0 text-transparent pointer-events-none"
              style={{
                textShadow: `
                  0 0 20px rgba(247, 242, 218, 0.7),
                  0 0 40px rgba(247, 242, 218, 0.5),
                  0 0 60px rgba(247, 242, 218, 0.3)
                `,
                WebkitTextStroke: "2px rgba(247, 242, 218, 0.2)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              SWEEP ACROSS MULTIPLE MARKETPLACES
            </motion.span>
          </motion.p>

          <div className="border border-slate-800 bg-black   py-4 shadow-lg">
            <motion.p
              className="leading-10 tracking-tight px-4 py-2 text-left hover:text-gray-500 text-md md:text-xl hover:scale-110 hover:text-xl md:hover:text-xl hover:-translate-y-1 transition-all duration-300 ease-in-out text-xl font-normal "
              whileHover={{
                y: [-2, 2, -2],
                transition: { repeat: Infinity, duration: 0.5 }
              }}
            >
              @ZENO_WEB
            
            </motion.p>
            <hr className='bg-slate-500 border-slate-800 w-full mb-4' />
            <div className="flex items-center justify-between gap-4 mb-4 px-4">
              <div className="flex items-center gap-3">
                <img src="https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif" alt="Avatar" className="rounded-full w-12 h-12" />
                <div>
                  <span className="font-bold">Zeno_Web.eth</span>
                  <span className="block text-gray-500">@Zeno_Web100</span>
                </div>
              </div>
              <Twitter className="w-8 h-8 text-slate-500" />
            </div>
            <p className="mb-4 px-4">
              Just had a demo of <span className="text-slate-500">@OmniPump.com</span> with{' '}
              <span className="text-slate-500">@Zieco</span> ...Holy moly, this platform will put the others to shame.
              This is the future of Token trading. I'm very very impressed with it.
            </p>
            <span className="text-gray-500 px-4">8:01 PM · Aug 21, 2022</span>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          ref={rightRef1}
          className="flex-1"
          initial={{ x: 100, opacity: 0 }}
          animate={controlsRight1}
        >
          <img alt='image1' src='/images/image2.PNG' className='w-full h-full shadow-lg' />
        </motion.div>
      </div>

      {/* Second Card */}
      <div className="flex flex-col md:flex-row gap-20 my-8">
      <motion.div
          ref={leftRef2}
          className="flex-1"
          initial={{ x: -100, opacity: 0 }}
          animate={controlsLeft2}
        >
          <img alt='image2' src='/images/image.PNG' className='w-full h-full  shadow-lg' />
        </motion.div>
        <motion.div
          ref={rightRef2}
          className="flex-1"
          initial={{ x: 100, opacity: 0 }}
          animate={controlsRight2}
        >
          <motion.p
            className="mt-2 leading-10 tracking-tight text-left sm:leading-none hover:text-gray-500 text-md md:text-2xl hover:scale-110 hover:text-xl md:hover:text-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out text-xl font-normal relative"
            whileHover={{
              y: [-2, 2, -2],
              transition: { repeat: Infinity, duration: 0.5 }
            }}
          >
            SWEEP ACROSS MULTIPLE MARKETPLACES
            <motion.span
              className="absolute inset-0 text-transparent pointer-events-none"
              style={{
                textShadow: `
                  0 0 20px rgba(247, 242, 218, 0.7),
                  0 0 40px rgba(247, 242, 218, 0.5),
                  0 0 60px rgba(247, 242, 218, 0.3)
                `,
                WebkitTextStroke: "2px rgba(247, 242, 218, 0.2)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              SWEEP ACROSS MULTIPLE MARKETPLACES
            </motion.span>
          </motion.p>

          <div className="border border-slate-800 bg-black py-4 shadow-lg">
            <motion.p
              className="leading-10 tracking-tight px-4 py-2 text-left hover:text-gray-500 text-md md:text-xl hover:scale-110 hover:text-xl md:hover:text-xl hover:-translate-y-1 transition-all duration-300 ease-in-out text-xl font-normal "
              whileHover={{
                y: [-2, 2, -2],
                transition: { repeat: Infinity, duration: 0.5 }
              }}
            >
              @ZENO_WEB
           
            </motion.p>
            <hr className='bg-slate-500 border-slate-800 w-full mb-4' />
            <div className="flex items-center justify-between gap-4 mb-4  px-4 ">
              <div className="flex items-center gap-3">
                <img src="https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif" alt="Avatar" className="rounded-full w-12 h-12" />
                <div>
                  <span className="font-bold">Zeno_Web.eth</span>
                  <span className="block text-gray-500">@Zeno_Web100</span>
                </div>
              </div>
              <Twitter className="w-8 h-8 text-slate-500" />
            </div>
            <p className="mb-4 px-4">
              Just had a demo of <span className="text-slate-500">@OmniPump.com</span> with{' '}
              <span className="text-slate-500">@Zieco</span> ...Holy moly, this platform will put the others to shame.
              This is the future of Token trading. I'm very very impressed with it.
            </p>
            <span className="text-gray-500 px-4">8:01 PM · Aug 21, 2022</span>
          </div>
        </motion.div>

        {/* Image */}
        
      </div>
      {/* Repeat similar structure for additional cards */}
      <div className="flex flex-col md:flex-row gap-20 my-8">
      <motion.div
          ref={leftRef3}
          className="flex-1"
          initial={{ x: -100, opacity: 0 }}
          animate={controlsLeft3}
        >
          <motion.p
            className="mt-2 leading-10 tracking-tight text-left sm:leading-none hover:text-gray-500 text-md md:text-2xl hover:scale-110 hover:text-xl md:hover:text-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out text-xl font-normal relative"
            whileHover={{
              y: [-2, 2, -2],
              transition: { repeat: Infinity, duration: 0.5 }
            }}
          >
            SWEEP ACROSS MULTIPLE MARKETPLACES
            <motion.span
              className="absolute inset-0 text-transparent pointer-events-none"
              style={{
                textShadow: `
                  0 0 20px rgba(247, 242, 218, 0.7),
                  0 0 40px rgba(247, 242, 218, 0.5),
                  0 0 60px rgba(247, 242, 218, 0.3)
                `,
                WebkitTextStroke: "2px rgba(247, 242, 218, 0.2)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              SWEEP ACROSS MULTIPLE MARKETPLACES
            </motion.span>
          </motion.p>

          <div className="border border-slate-800 bg-black   py-4 shadow-lg">
            <motion.p
              className="leading-10 tracking-tight px-4 py-2 text-left hover:text-gray-500 text-md md:text-xl hover:scale-110 hover:text-xl md:hover:text-xl hover:-translate-y-1 transition-all duration-300 ease-in-out text-xl font-normal "
              whileHover={{
                y: [-2, 2, -2],
                transition: { repeat: Infinity, duration: 0.5 }
              }}
            >
              @ZENO_WEB
            
            </motion.p>
            <hr className='bg-slate-500 border-slate-800 w-full mb-4' />
            <div className="flex items-center justify-between gap-4 mb-4 px-4">
              <div className="flex items-center gap-3">
                <img src="https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif" alt="Avatar" className="rounded-full w-12 h-12" />
                <div>
                  <span className="font-bold">Zeno_Web.eth</span>
                  <span className="block text-gray-500">@Zeno_Web100</span>
                </div>
              </div>
              <Twitter className="w-8 h-8 text-slate-500" />
            </div>
            <p className="mb-4 px-4">
              Just had a demo of <span className="text-slate-500">@OmniPump.com</span> with{' '}
              <span className="text-slate-500">@Zieco</span> ...Holy moly, this platform will put the others to shame.
              This is the future of Token trading. I'm very very impressed with it.
            </p>
            <span className="text-gray-500 px-4">8:01 PM · Aug 21, 2022</span>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          ref={rightRef3}
          className="flex-1"
          initial={{ x: 100, opacity: 0 }}
          animate={controlsRight3}
        >
          <img alt='image3' src='/images/image3.PNG' className='w-full h-full shadow-lg' />
        </motion.div>
      </div>
    </div>
  )
}