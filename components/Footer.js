import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { currentDayName } from '@/lib/utils/dateUtils'

export default function Footer() {
  return (
    <footer>
      <div className="mt-10 mb-4 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="github" href={siteMetadata.github} size="5" />
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="5" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="5" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="5" />
        </div>
        <div className="mb-3 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          {siteMetadata.author} | Have a good {currentDayName()}!
        </div>
      </div>
    </footer>
  )
}
