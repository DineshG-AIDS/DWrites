// import React from "react";
import { FiMail, FiUsers } from "react-icons/fi";
import { FaReact } from "react-icons/fa";
import {
  BiLogoJavascript,
  BiLogoTailwindCss,
  BiLogoMongodb,
} from "react-icons/bi";

const HoverDevCards = () => {
  return (
    <div className="p-4">
      <p className="text-6xl font-semibold mb-2 p-10 text-yellow-600">Skills</p>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card
          title="JavaScript"
          subtitle="JavaScript"
          href="#"
          Icon={BiLogoJavascript}
        />
        <Card title="React JS" subtitle="React JS" href="#" Icon={FaReact} />

        <Card
          title="TailwindCss"
          subtitle="TailwindCss"
          href="#"
          Icon={BiLogoTailwindCss}
        />
        <Card
          title="MongoDB"
          subtitle="MongoDB"
          href="#"
          Icon={BiLogoMongodb}
        />
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <a
      href={href}
      className="w-full h-full p-10 rounded border-[1px] border-yellow-600 relative overflow-hidden group bg-gray-900"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-yellow-600 group-hover:text-black group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-3xl text-yellow-600 group-hover:text-black transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-xl text-yellow-600 group-hover:text-black relative z-10 duration-300">
        {title}
      </h3>
      {/* <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p> */}
    </a>
  );
};

export default HoverDevCards;
