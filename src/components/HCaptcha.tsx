import HCaptchaElement from "@hcaptcha/react-hcaptcha";
import { useRef, useState } from "react";
import { CaptchaLoading, Info } from "../lib/icons";
import cn from "classnames";

const HCaptcha = ({ isVerified }: { isVerified: boolean }) => {
    const [captchaState, setCaptchaState] = useState<
        "loading" | "verified" | "unverified" | "selected"
    >("loading");
    const captchaRef = useRef<HCaptchaElement>(null);

    const verifyCaptcha = () => {
        if (captchaState == "unverified") {
            setCaptchaState("loading");
            captchaRef.current!.execute();
        }
    };

    const set = (token: string) => {
        setCaptchaState("verified");
    };

    const CaptchaIcon = () => {
        if (captchaState == "loading") {
            return (
                <div className="w-5 h-5 animate-pulse">
                    <CaptchaLoading className="w-full h-full" />
                </div>
            );
        } else if (captchaState == "selected") {
            return (
                <span className="w-5 h-5 bg-white rounded border-2 border-neutral-500 block"></span>
            );
        } else if (captchaState == "unverified") {
            return (
                <span className="w-5 h-5 bg-white rounded border border-neutral-400 block"></span>
            );
        } else if (captchaState == "verified") {
            return (
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAC00lEQVR4nO2aTU8TQRyHn39bIdXEm3jwLQhefPkAJorYLYslIF64ohwM8eQH0A/gzYSLIRooxBORKJr4Ultq4smz8YgQb3ow4YAmUHY8IEpgd7vQ3e0smee4+5/uPL+daXdmCwaDwWAwGAwGg8FgMBgM+wBr0u7JFe17QWrTUXcmbqxJuwdhTpDejsHO7Ne5hbJf/b4KYFMeJAuAcKleCPsmgB3ymwiX2m901BZfLHx0a5eKpXcR4ykPgPqdEvnk1Vai7Fgc1JMXkevlm+88p0CiA2hUHhIcQBjykNAAwpKHBAYQpjwkLICw5SFBAUQhDwkJICp5SEAAUcqD5gFELQ8aBxCHPGgaQFzyoGEAccpDwNXgxZmhLCr6sPJTvXk/eRSDYcpDgAAGxgcOZleW31hF+1GUIViTdo9S6qXfna+MlN6HfV3fAApjhdZfrauzInIFkdGoQoh72G/FM4ChmaGW1cPOM+Dav4MRhNBMefAJ4OfK8hjQv+OEyKhV7H0YRgjNmPPb8QxgndQDYMn1pHC30ZHQrDm/Hc8APoy8XVK1dDew6FrQwHTIFe0uRJ43a9hvpW7nc0/6TklmvQq0uxYoNV65VbqDoIJcMFe0uwR5DRxy+bBY5SHgg1B+On9SOZkqqNOuBQFD0E0edvEkuBFCeh7ocC2oE4KO8rCL9wLl4fK3tKOuAguuBT7fCbrKwx7WAvaEfcJJybyCTteCbSNBZ3nY42Ko+2nheKbmVOuFkJuyL+ssDw2sBnNT/cdErVWBMx4ls6D6/B5y4vidr0dDT3PWY+soBzLzwNngrfS485s09HK0crvynbVaDvgSrIVe8hDShsjfkVABznlX6ScPIe4I2dN2W82RisD5nWf1lIeQt8Tsabtt3aEMcuH/UX3lIeQ/SJSGSz9anLQF6vPGEb3lIaJN0cJE4ciaOK9IcV9n+WiJYRPVYDAYDAaDoRH+ALzfixyrasnFAAAAAElFTkSuQmCC"
                    alt="Human"
                    className="w-5 h-5"
                />
            );
        }
    };

    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <button
                    onClick={verifyCaptcha}
                    className={cn({"rounded px-2 py-1.5 border border-neutral-400 transition-colors flex space-x-10 items-center text-[13px] bg-neutral-50": true, "hover:bg-neutral-100": captchaState == "unverified", "cursor-auto": captchaState != "unverified"})}
                >
                    <div className="flex items-center space-x-2">
                        <CaptchaIcon />
                        <p>I'm not a robot</p>
                    </div>
                    <img
                        src="/images/hcaptcha.webp"
                        className="h-6 w-6"
                        alt="HCaptcha"
                    />
                </button>
                <HCaptchaElement
                    sitekey="73046cec-5952-4de7-af59-dd4e15ac070d"
                    ref={captchaRef}
                    onVerify={set}
                    onLoad={() =>
                        setCaptchaState(isVerified ? "verified" : "unverified")
                    }
                    size="invisible"
                    onOpen={() => setCaptchaState("selected")}
                    onClose={() =>
                        setCaptchaState(isVerified ? "verified" : "unverified")
                    }
                />
                <div className="flex right-0 gap-0.5 text-[11px] text-neutral-300 absolute">
                    <a
                        href="https://www.hcaptcha.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        Privacy
                    </a>
                    <span>·</span>
                    <a
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        Terms
                    </a>
                </div>
            </div>
            <button>
                <Info className="text-neutral-400 w-5 h-5 hover:text-blue-500" strokeWidth={1} />
            </button>
        </div>
    );
};

export default HCaptcha;
