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

export const Mail = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...props}
    >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

export const Github = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 256 250"
        width="256"
        height="250"
        fill="#24292e"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
        {...props}
    >
        <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" />
    </svg>
);

export const LinkedIn = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="256"
        height="256"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 256 256"
        {...props}
    >
        <path
            d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
            fill="#0A66C2"
        />
    </svg>
);

export const Orchid = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 256 256"
        {...props}
    >
        <path
            fill="#A6CE39"
            d="M256,128c0,70.7-57.3,128-128,128C57.3,256,0,198.7,0,128C0,57.3,57.3,0,128,0C198.7,0,256,57.3,256,128z"
        />
        <g>
            <path fill="#FFFFFF" d="M86.3,186.2H70.9V79.1h15.4v48.4V186.2z" />
            <path
                fill="#FFFFFF"
                d="M108.9,79.1h41.6c39.6,0,57,28.3,57,53.6c0,27.5-21.5,53.6-56.8,53.6h-41.8V79.1z M124.3,172.4h24.5   c34.9,0,42.9-26.5,42.9-39.7c0-21.5-13.7-39.7-43.7-39.7h-23.7V172.4z"
            />
            <path
                fill="#FFFFFF"
                d="M88.7,56.8c0,5.5-4.5,10.1-10.1,10.1c-5.6,0-10.1-4.6-10.1-10.1c0-5.6,4.5-10.1,10.1-10.1   C84.2,46.7,88.7,51.3,88.7,56.8z"
            />
        </g>
    </svg>
);
