import { concatIfDefined } from 'client/app/_utilities'
import * as React from 'react'

interface IProps {
  className?: string
  id?: string
  feature: JSX.Element
  showLeanHeader?: boolean
}

export default function MainPage (props: IProps) {
  const { className, feature, showLeanHeader } = props

  return (
    <>
      <section className={concatIfDefined([className, 'layout__main'])}>
        <h1>HEADER</h1>
        {feature}
      </section>
      <footer className='layout__footer'>footer</footer>
    </>
  )
}
