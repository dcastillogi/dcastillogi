import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import type { Badge } from "../lib/types";

export default function CertificateCarrousel() {
    const [badges, setBadges] = useState<Badge[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            slidesToScroll: 1,
            startIndex: 0,
        },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    );

    useEffect(() => {
        const fetchbadges = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    "https://api.dcastillogi.com/v1/badges"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch badges");
                }
                const data: Badge[] = await response.json();
                setBadges(data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "An error occurred"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchbadges();
    }, []);

    if (!error && !(!isLoading && !badges.length))
        return (
            <div className="mt-12 z-10">
                <h2 className="text-xl text-center mb-6 text-secondary">
                    Fueled by Curiosity, Driven to Build Solutions
                </h2>
                {isLoading ? (
                    <div className="w-screen flex -ml-4 items-center justify-center max-w-5xl mx-auto">
                        {[...Array(5)].map((_, index) => (
                            <div
                                className="flex-[0_0_16.66%] min-w-0 pl-4"
                                key={index}
                            >
                                <span className="aspect-square block w-full animate-pulse bg-gray-100"></span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div
                        className="w-full max-w-5xl mx-auto flex flex-col items-center overflow-hidden"
                        ref={emblaRef}
                    >
                        <div className="flex -ml-4">
                            {badges.map((badge) => (
                                <div
                                    className="flex-[0_0_16.66%] min-w-0 pl-4"
                                    key={badge.id}
                                >
                                    <a
                                        href={`${badge.url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={badge.image_url}
                                            alt={`${badge.issuer} - ${badge.name}`}
                                            className="w-full aspect-square object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
}
