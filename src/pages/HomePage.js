// pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <div
      className="text-center bg-gray-900 h-[100vh] flex flex-col justify-center  "
      style={{
        backgroundImage: `radial-gradient(circle at 11% 37%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 50%, transparent 50%, transparent 56%, transparent 56%, transparent 100%), 
                        radial-gradient(circle at 82% 7%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 46%, transparent 46%, transparent 88%, transparent 88%, transparent 100%), 
                        radial-gradient(circle at 81% 79%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 33%, transparent 33%, transparent 89%, transparent 89%, transparent 100%), 
                        radial-gradient(circle at 68% 96%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 8%, transparent 8%, transparent 26%, transparent 26%, transparent 100%), 
                        radial-gradient(circle at 69% 20%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 84%, transparent 84%, transparent 86%, transparent 86%, transparent 100%), 
                        radial-gradient(circle at 49% 22%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 71%, transparent 71%, transparent 78%, transparent 78%, transparent 100%), 
                        radial-gradient(circle at 23% 60%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 6%, transparent 6%, transparent 40%, transparent 40%, transparent 100%), 
                        radial-gradient(circle at 86% 33%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 13%, transparent 13%, transparent 98%, transparent 98%, transparent 100%), 
                        radial-gradient(circle at 38% 60%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 15%, transparent 15%, transparent 61%, transparent 61%, transparent 100%), 
                        linear-gradient(0deg, rgb(17,24,39), rgb(17,24,39))`,
      }}>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-gray-200  "
        style={{ textShadow: "1px 1px 15px rgb(134 134 134)" }}

      >
        Welcome to Quiz Master
      </motion.h1>
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/create-test"
            className="flex items-center gap-2 rounded-lg bg-[#64748b] text-white px-4 py-2 max-sm:justify-center transition-all duration-300 
 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.4)_0%,rgba(34,197,94,0.5)_100%)] hover:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.6)_0%,rgba(34,197,94,0.7)_100%)] shadow-[0_2px_16px_0_rgba(34,197,94,1)] hover:shadow-[0_2px_20px_1px_rgba(34,197,94,1)] disabled:opacity-70 max-sm:ml-1 max-sm:gap-1 max-sm:p-1 w-fit m-auto"
          >
            <span class="text-[0.875rem] font-semibold leading-[1.5rem]">Create Test</span>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/attempt-test"
            className="flex items-center gap-2 rounded-lg bg-[#64748b] text-white px-4 py-2 max-sm:justify-center transition-all duration-300 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.4)_0%,rgba(6,182,212,0.4)_100%)] hover:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.6)_0%,rgba(6,182,212,0.6)_100%)] shadow-[0_2px_16px_0_rgba(6,182,212,0.8)] hover:shadow-[0_2px_20px_1px_rgba(6,182,212,0.8)] disabled:opacity-70 max-sm:ml-1 max-sm:gap-1 max-sm:p-1 w-fit m-auto"
          >

            <span class="text-[0.875rem] font-semibold leading-[1.5rem]">Attempt Test</span>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/generate-test"
            className="flex items-center gap-2 rounded-lg bg-[#64748b] text-white   px-4 py-2  max-sm:justify-center transition-all duration-300   bg-[linear-gradient(to_bottom,rgba(255,255,255,0.4)_0%,rgba(13,110,253,0.4)_100%)] shadow-[0_2px_16px_0_rgba(13,110,253,0.8)] hover:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.6)_0%,rgba(13,110,253,0.6)_100%)] hover:shadow-[0_2px_16px_1px_rgba(13,110,253,0.8)] disabled:opacity-70 max-sm:ml-1 max-sm:gap-1 max-sm:p-1 w-fit m-auto"
          >
            <span><svg width="16" height="16" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0001 9.49832C13.0014 9.70219 12.9394 9.90143 12.8228 10.0686C12.7062 10.2359 12.5406 10.3628 12.3488 10.4321L9.12072 11.6196L7.93322 14.8452C7.8629 15.0362 7.73567 15.2011 7.5687 15.3176C7.40173 15.434 7.20305 15.4965 6.99947 15.4965C6.7959 15.4965 6.59722 15.434 6.43025 15.3176C6.26328 15.2011 6.13605 15.0362 6.06572 14.8452L4.8751 11.6233L1.64885 10.4358C1.45781 10.3655 1.29293 10.2383 1.17647 10.0713C1.06 9.90433 0.997559 9.70565 0.997559 9.50207C0.997559 9.2985 1.06 9.09982 1.17647 8.93285C1.29293 8.76588 1.45781 8.63864 1.64885 8.56832L4.87697 7.38082L6.06447 4.1552C6.1348 3.96415 6.26203 3.79928 6.429 3.68281C6.59597 3.56635 6.79465 3.50391 6.99822 3.50391C7.2018 3.50391 7.40048 3.56635 7.56745 3.68281C7.73442 3.79928 7.86165 3.96415 7.93197 4.1552L9.11947 7.38332L12.3451 8.57082C12.5365 8.63909 12.7022 8.76483 12.8195 8.93086C12.9367 9.09688 12.9998 9.29507 13.0001 9.49832Z" fill="currentColor"></path></svg></span><span class="text-[0.875rem] font-semibold leading-[1.5rem]">Ai Generated</span>
          </Link>

        </motion.div>





      </div>
    </div>
  );
};

export default HomePage;