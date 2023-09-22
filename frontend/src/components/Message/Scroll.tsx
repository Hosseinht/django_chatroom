import { ReactNode, useCallback, useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

const Scroll = ({ children }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, children]);
  return (
    <Box maxHeight="70vh" overflowY="auto" className="scroll" ref={scrollRef}>
      {children}
    </Box>
  );
};

export default Scroll;
