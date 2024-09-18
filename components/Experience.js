import Link from '@/components/Link'
import { RoughNotation } from 'react-rough-notation'

const Experience = ({ title, company, location, range, url, texts }) => {
  return (
    <div className="my-3">
      <div className="flex flex-row text-xl">
        <span className="text-gray-500 dark:text-gray-400">{title}</span>{' '}
        <span className="text-gray-500 dark:text-gray-400">&nbsp;@&nbsp;</span>{' '}
        <span className="text-primary-color dark:text-primary-color-dark">
          <Link href={url} className="no-underline">
            <RoughNotation
              type="underline"
              show={true}
              color="teal"
              animationDelay={800}
              animationDuration={1200}
            >
              {company}
            </RoughNotation>
          </Link>
        </span>
      </div>
      <div>
        <div className="text-primary-color dark:text-primary-color-dark p-1 font-mono text-sm">
          {range}
        </div>
        <div className="p-2">
          {texts.map((text, index) => (
            <div className="mb-4 flex flex-row" key={index}>
              <div className="text-primary-color dark:text-primary-color-dark mr-2 text-lg">
                &#8227;
              </div>
              <div className="text-gray-500 dark:text-gray-400">{text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="justify-center text-center text-2xl font-medium text-gray-200 dark:text-gray-600">
        &#9866;&#9866;&#9866;
      </div>
    </div>
  )
}

export default Experience
