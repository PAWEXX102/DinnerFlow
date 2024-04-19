"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FooterButtons() {
  const [FacebookHover, setFacebookHover] = useState(false);
  const [TwitterHover, setTwitterHover] = useState(false);
  const [InstagramHover, setInstagramHover] = useState(false);

  return (
    <div className=" flex gap-x-4">
      <Link
        href="https://www.facebook.com/?locale=pl_PL"
        onMouseEnter={() => setFacebookHover(true)}
        onMouseLeave={() => setFacebookHover(false)}
        className=" hover:scale-110 duration-150"
      >
        <Image
          src={FacebookHover ? "/facebookHover.png" : "/facebook.png"}
          alt="facebook"
          width={20}
          height={20}
        />
      </Link>
      <Link
        href="https://twitter.com/home?lang=pl"
        className=" hover:scale-110 duration-150"
        onMouseEnter={() => setTwitterHover(true)}
        onMouseLeave={() => setTwitterHover(false)}
      >
        <Image
          src={TwitterHover ? "/twitterHover.png" : "/twitter.png"}
          alt="twitter"
          width={20}
          height={20}
        />
      </Link>
      <Link
        href="https://www.instagram.com/"
        className=" hover:scale-110 duration-150"
        onMouseEnter={() => setInstagramHover(true)}
        onMouseLeave={() => setInstagramHover(false)}
      >
        <Image
          src={InstagramHover ? "/instagramHover.png" : "/instagram.png"}
          alt="instagram"
          width={20}
          height={20}
        />
      </Link>
    </div>
  );
}
