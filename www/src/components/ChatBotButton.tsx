import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AWSIcon, MagicIcon } from "../lib/icons";
import { ParticleAura } from "./ui/ParticleAura";

const items = [
    "What's your role at Blend as a Cloud Analyst Trainee?",
    "What tech stack did you use to build this website?",
    "Were you a developer before becoming a cloud engineer?",
    "Do you think AI will take over the world someday?",
    "What's one tough cloud challenge you've solved recently?",
    "What cloud certifications do you have, and why do they matter?",
];

export default function ChatBotButton() {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            setIndex((state) => {
                if (state >= items.length - 1) return 0;
                return state + 1;
            });
        }, 4000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="max-w-4xl -mt-6 -mb-12 mx-auto w-full">
            <ParticleAura>
                <div className="w-full max-w-2xl mx-auto relative py-24">
                    <p className="text-center text-lg mb-2 text-secondary font-light">
                        Want to explore more about me, my projects, or find
                        useful resources? Ask away!
                    </p>
                    <div className="relative">
                        <div className="relative rounded p-[0.5px] transform transition-all duration-500 ease-in-out hover:scale-[0.99]">
                            <button className="group w-full relative flex justify-between items-center rounded border text-lg font-light py-3 px-4 z-10 text-left text-secondary bg-white hover:bg-gray-50 transition-colors">
                                <div className="relative z-10 flex h-7 w-full items-center">
                                    <AnimatePresence>
                                        <motion.div
                                            key={index}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            transition={{ ease: "easeInOut" }}
                                            style={{ position: "absolute" }}
                                        >
                                            {items[index]}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                <MagicIcon className="w-6 h-6 text-orange relative z-10" />
                            </button>
                        </div>

                        <div className="flex justify-end mt-1 z-10 relative">
                            <p className="text-sm text-secondary bg-white">
                                Powered by{" "}
                                <a
                                    href="https://aws.amazon.com/ai/generative-ai/nova/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-orange-500 transition-colors"
                                >
                                    <AWSIcon className="w-6 h-6 inline-block" />{" "}
                                    nova-lite-v1:0
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </ParticleAura>
        </div>
    );
}
