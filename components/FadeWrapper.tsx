"use client";

import { Fade } from "react-awesome-reveal";
import { ReactNode } from "react";

interface FadeWrapperProps {
  children: ReactNode;
  delay?: number;
  triggerOnce?: boolean;
  direction?: "up" | "down" | "left" | "right";
  cascade?: boolean;
  damping?: number;
  duration?: number;
}

export default function FadeWrapper({
  children,
  delay = 0,
  triggerOnce = true,
  direction = "up",
  cascade = false,
  damping = 0.1,
  duration = 1000,
}: FadeWrapperProps) {
  return (
    <Fade delay={delay} triggerOnce={triggerOnce} direction={direction} cascade={cascade} damping={damping} duration={duration}>
      {children}
    </Fade>
  );
}
