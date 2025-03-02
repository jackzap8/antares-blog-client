'use client';
import HomeNavigationBar from "@/components/HomeNavigationBar";
import SendEmailButton from "@/components/SendEmailButton";
import Spacer from "@/components/Spacer";
import { SERVER_URL } from "@/lib/config";
import { getBrandInfo } from "@/lib/data";
import Author from "@/model/author";
import Brand from "@/model/brand";
import Image from "next/image";
import { useEffect, useState } from "react";

class AboutPageState {
  brand?: Brand;
  error?: Error;
}

export default function AboutUsPage() {
  const [state, setState] = useState(new AboutPageState());

  useEffect(() => {
    const newState = new AboutPageState();
    getBrandInfo().then((data) => {
      newState.brand = data;
    }).catch((error) => {
      newState.error = error;
    }).finally(() => {
      setState(newState);
    })
  }, []);

  if (!state.brand) {
    return (<div></div>);
  }

  return (
    <>
      <div className="p-8 flex flex-col items-center">
        <span className="self-start mb-5">
          <HomeNavigationBar />
        </span>
        <Image 
          src={`${SERVER_URL}${state.brand.main_logo.url}`} 
          width={state.brand.main_logo.width} 
          height={state.brand.main_logo.height}
          alt="Antares Logo" 
          className="w-3/4 max-w-[300px]" />
        <span className="text-xl text-black font-bold">{state.brand.tagline}</span>
      </div>
      <div className="bg-black text-white px-12 py-5 text-sm font-medium text-justify">
        <p>{state.brand.introduction}</p>
        <div className="absolute right-[5%] w-12 h-12 rounded-full bg-secondary"></div>
      </div>
      <div className="flex flex-col items-center px-12">
        <Spacer />
        <span>
          <Image src="deco-1.svg" width={60} height={60} alt="" className="relative -left-8" />
          <h1 className="font-extrabold text-3xl">Best Team</h1>
        </span>
        <div className="mt-4 grid grid-cols-3 gap-6">
          {
            state.brand.authors.map((el, i) => 
              <TeamMember key={i} author={el} />
            )
          }
        </div>
      </div>
      <Spacer />
      <FooterSecondary />
    </>
  )
}

function TeamMember({
  author
}: {
  author: Author
}) {
  return (
    <div className="flex flex-col items-center">
      <Image 
        src={`${SERVER_URL}${author.profile_photo.url}`} 
        width={author.profile_photo.width} 
        height={author.profile_photo.height} 
        alt={`${author.fullname}'s photo`}
        className="rounded-full aspect-square object-cover p-2" />
      <span className="font-bold text-xs text-black">{author.fullname}</span>
      <span className="text-xs">{author.headline}</span>
    </div>
  )
}

function FooterSecondary() {
  return (
    <div className="p-2 bg-primary flex justify-between">
      <SendEmailButton />
      <span className="col-end-1 font-light text-white flex items-end text-sm">2025 Antares</span>
    </div>
  )
}