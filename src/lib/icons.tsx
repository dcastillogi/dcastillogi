export const CaptchaLoading = (props: React.SVGProps<SVGSVGElement>) => {
    const loadingCircle = {
        fill: "none",
        stroke: "#ff7b00",
        strokeWidth: 2,
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 44 44"
            {...props}
        >
            <g>
                {" "}
                <circle style={loadingCircle} cx="22" cy="22" r="1">
                    {" "}
                    <animate
                        accumulate="none"
                        additive="replace"
                        attributeName="r"
                        begin="0s"
                        calcMode="spline"
                        dur="1.8s"
                        fill="remove"
                        keySplines="0.165, 0.84, 0.44, 1"
                        keyTimes="0; 1"
                        repeatCount="indefinite"
                        restart="always"
                        values="1; 20"
                    >
                        {" "}
                    </animate>{" "}
                    <animate
                        accumulate="none"
                        additive="replace"
                        attributeName="stroke-opacity"
                        begin="0s"
                        calcMode="spline"
                        dur="1.8s"
                        fill="remove"
                        keySplines="0.3, 0.61, 0.355, 1"
                        keyTimes="0; 1"
                        repeatCount="indefinite"
                        restart="always"
                        values="1; 0"
                    >
                        {" "}
                    </animate>{" "}
                </circle>{" "}
                <circle style={loadingCircle} cx="22" cy="22" r="1">
                    {" "}
                    <animate
                        accumulate="none"
                        additive="replace"
                        attributeName="r"
                        begin="-0.9s"
                        calcMode="spline"
                        dur="1.8s"
                        fill="remove"
                        keySplines="0.165, 0.84, 0.44, 1"
                        keyTimes="0; 1"
                        repeatCount="indefinite"
                        restart="always"
                        values="1; 20"
                    >
                        {" "}
                    </animate>{" "}
                    <animate
                        accumulate="none"
                        additive="replace"
                        attributeName="stroke-opacity"
                        begin="-0.9s"
                        calcMode="spline"
                        dur="1.8s"
                        fill="remove"
                        keySplines="0.3, 0.61, 0.355, 1"
                        keyTimes="0; 1"
                        repeatCount="indefinite"
                        restart="always"
                        values="1; 0"
                    >
                        {" "}
                    </animate>{" "}
                </circle>
            </g>
        </svg>
    );
};

export const Info = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="24px"
        height="24px"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M12 11.5V16.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></path>
        <path
            d="M12 7.51L12.01 7.49889"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></path>
        <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        ></path>
    </svg>
);
