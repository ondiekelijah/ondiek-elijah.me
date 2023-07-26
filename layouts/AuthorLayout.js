import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'

import Experience from '@/components/Experience'
import experienceData from '@/data/experienceData'
import Link from '@/components/Link'

export default function AuthorLayout({ children, frontMatter }) {
  const {
    name,
    avatar,
    occupation,
    company,
    email,
    twitter,
    linkedin,
    github,
    text1,
    text2,
    text3,
  } = frontMatter

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <Image
              src={avatar}
              alt="avatar"
              width="192px"
              height="192px"
              className="h-48 w-48 rounded-full"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-center text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} />
            </div>
            {/* Download CV button */}
            <div className="flex justify-center pt-8">
              <a
                href="https://docs.google.com/document/d/15EyX05Sg4k-fDOvEoEWjR53yjP_r_xHh9LBwLj3ldOE/edit?usp=sharing"
                target="_blank"
                className="bg-primary shadow-outline-teal inline-flex items-center
                rounded-full px-4 py-3 text-sm font-semibold
                text-white hover:bg-teal-700 focus:border-teal-700 focus:outline-none"
                rel="noreferrer"
              >
                Download CV
              </a>
            </div>
          </div>
          <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">{children}</div>
        </div>
      </div>
      <div className="mt-10">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Experience
          </h1>
        </div>
        <div className="max-w-none pt-8 pb-8 xl:col-span-2">
          {experienceData.map((d) => (
            <Experience
              key={d.company}
              title={d.title}
              company={d.company}
              location={d.location}
              range={d.range}
              url={d.url}
              text1={d.text1}
              text2={d.text2}
              text3={d.text3}
            />
          ))}
        </div>
      </div>
    </>
  )
}
