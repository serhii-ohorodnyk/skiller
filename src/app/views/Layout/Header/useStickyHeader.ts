import React from "react";

function useStickyHeader(offset: number = 0) {
  const [sticky, setSticky] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setSticky(() => window.pageYOffset > offset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return sticky;
}

export default useStickyHeader;
