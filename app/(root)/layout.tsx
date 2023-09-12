import Image from "next/image";
import React, { useEffect, useState } from "react";

const TopBar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [top, setTop] = useState("0");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        setTop("0");
      } else {
        setTop("-100px");
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`sticky_nav text-dark-2 md:flex hidden hover:text-dark-1 font-medium`} style={{ top: top }}>
      <Image src="/nLogo.svg" alt="logo" width={36} height={36} />
      <div>hello</div>
    </nav>
  );
};

export default TopBar;
