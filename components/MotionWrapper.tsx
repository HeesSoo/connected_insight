"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  amount?: number;
  once?: boolean;
  className?: string;
}

export default function MotionWrapper({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  amount = 0.3,
  once = true,
  className = "",
}: MotionWrapperProps) {
  // 방향에 따른 초기 위치 설정
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 50 };
      case "down":
        return { opacity: 0, y: -50 };
      case "left":
        return { opacity: 0, x: 50 };
      case "right":
        return { opacity: 0, x: -50 };
      case "none":
        return { opacity: 0 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  // 최종 위치 (모든 방향에서 원위치로)
  const getFinalPosition = () => {
    return { opacity: 1, x: 0, y: 0 };
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getFinalPosition()}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay: delay / 1000, // ms를 초로 변환
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}