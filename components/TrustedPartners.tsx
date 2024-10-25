"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  { name: 'PARADIGM', logo: '/paradigm-logo.png' },
  { name: '6529', logo: '/6529-logo.png' },
  { name: 'KEYBOARD MONKEY', logo: '/keyboard-monkey-logo.png' },
  { name: 'ZENECA', logo: '/zeneca-logo.png' },
  { name: 'EGIRL CAPITAL', logo: '/egirl-capital-logo.png' },
  { name: 'DEEZE', logo: '/deeze-logo.png' },
  { name: 'COZOMO', logo: '/cozomo-logo.png' },
  { name: 'DHOF', logo: '/dhof-logo.png' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const TrustedPartners = () => {
  return (
    <div className="w-full bg-black p-8 border border-[#FF6B00]/20">
      {/* Title with neon effect */}
      <motion.h2 
        className="text-center mb-12 font-mono text-2xl tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          color: '#FF6B00',
          textShadow: '0 0 10px rgba(255, 107, 0, 0.7), 0 0 20px rgba(255, 107, 0, 0.5)'
        }}
      >
        TRUSTED AND BACKED BY
      </motion.h2>

      {/* Partners Grid */}
      <motion.div 
        className="grid grid-cols-4 md:grid-cols-8 gap-8 items-center justify-items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {partners.map((partner, index) => (
          <motion.div
            key={partner.name}
            className="flex flex-col items-center space-y-2"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.1,
              filter: 'brightness(1.2)',
              transition: { duration: 0.2 }
            }}
          >
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 rounded-full bg-[#FF6B00]/20 blur-md" />
              <Image
                src={partner.logo}
                alt={partner.name}
                width={64}
                height={64}
                className="relative z-10 rounded-full"
                style={{
                  filter: 'brightness(0.9) sepia(0.2) hue-rotate(5deg)'
                }}
              />
            </div>
            <p className="text-[#FF6B00]/80 text-xs font-mono text-center">
              {partner.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TrustedPartners;