import { motion } from "framer-motion";

const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6 },
    }),
};

export default function HeroTitle({ highlightColor }: { highlightColor: string }) {
    return (
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {/* M Brands анимируем по буквам */}
            <motion.span
                className="inline-block"
                variants={headingVariants}
                initial="hidden"
                animate="visible"
                custom={0}
            >
                M
            </motion.span>
            <motion.span
                className="inline-block ml-2"
                variants={headingVariants}
                initial="hidden"
                animate="visible"
                custom={1}
            >
                Brands
            </motion.span>
            <br />
            <motion.span
                style={{ color: highlightColor }}
                className="inline-block"
                variants={headingVariants}
                initial="hidden"
                animate="visible"
                custom={2}
            >
                For Every
            </motion.span>{" "}
            <motion.span
                className="inline-block"
                variants={headingVariants}
                initial="hidden"
                animate="visible"
                custom={3}
            >
                Moment
            </motion.span>
        </h1>
    );
}
