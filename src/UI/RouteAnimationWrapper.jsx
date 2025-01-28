import { AnimatePresence } from "framer-motion";

const RouteAnimationWrapper = ({ children }) => {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
};

export default RouteAnimationWrapper;
