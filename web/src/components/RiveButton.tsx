import { useCallback } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";


interface RiveButtonProps {
  title: string;
  link: string;
}

export default function RiveButton({title, link}: RiveButtonProps) {
  const { rive, RiveComponent } = useRive({
    src: "/hero_use_case.riv",
    artboard: "Button",
    stateMachines: "State Machine 1",
    autoplay: true,
    shouldDisableRiveListeners: true,
  });

  const isHoverInput = useStateMachineInput(rive, "State Machine 1", "isHover");

  const onButtonActivate = useCallback(() => {
    if (rive && isHoverInput) {
      isHoverInput.value = true;
    }
  }, [rive, isHoverInput]);

  const onButtonDeactivate = useCallback(() => {
    if (rive && isHoverInput) {
      isHoverInput.value = false;
    }
  }, [rive, isHoverInput]);

  return (
    <div className="absolute top-1/2 left-1/2 ml-4 -translate-x-1/2 -translate-y-1/2 text-center">
      <h1
        className="text-accent-foreground font-extrabold text-5xl lg:text-6xl pb-2"
        style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)" }}
      >
        {title}
      </h1>
      <div className="rive-button-container relative w-3/4 pt-[37.88%] mx-auto">
        <div className="absolute top-0 left-0 bottom-0 right-0">
          <a
            href="/login"
            aria-label="Start now; explore the Rive.app homepage"
            className="absolute top-0 left-0 right-0 bottom-0 flex font-extrabold items-center justify-center w-full h-full bg-transparent text-foreground text-sm lg:text-lg"
            style={{ textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)" }}
            onMouseEnter={onButtonActivate}
            onMouseLeave={onButtonDeactivate}
            onFocus={onButtonActivate}
            onBlur={onButtonDeactivate}
          >
           {link}
          </a>
          <RiveComponent aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}