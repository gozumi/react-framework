import { concatIfDefined } from 'client/app/_utilities'
import { IRequestDataAction } from 'client/app/state/action-creators'
import i18next from 'i18next'
import * as React from 'react'
import './styles.css'

interface IProps {
  className?: string
  requestData: () => IRequestDataAction
}

export default function Home (props: IProps) {
  const { className } = props

  return (
      <section className={concatIfDefined(['home', className])}>
        <h1 className='home__header feature-section-header'>{i18next.t('home.header')}</h1>
      </section>
  )
}
