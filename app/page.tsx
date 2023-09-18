import Link from "next/link"
import { appList, sideList } from './app-list'

const modes = ['default', 'apps']

export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      <h1>FVRTRP</h1>
      {
        appList.map((item, key) => {
          return (
            <div key={key}>
              {item.title}
              {item.description}
            </div>
          )
        })
      }
       {
        sideList.map((item, key) => {
          return (
            <div key={key}>
              {item.title}
              {item.description}
            </div>
          )
        })
      }
    </div>
  )
}
