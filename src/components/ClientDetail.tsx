import * as React from 'react'
import Link from 'next/link'

import { Client } from '../interfaces'
import { Gallery } from './Gallery'

import style from './ClientDetail.module.scss'

type ClientDetailProps = {
  item: Client
}

const ClientDetail = ({ item }: ClientDetailProps) => {
  return (
    <>
      <h1>{item.name}</h1>
      <p>{item.time} / {item.title}</p>
      <p className={style.subhead}>{item.description}</p>
      <div className={style.subhead}>
        Technology:
        <ul className={style.technology}>
          {item.technology.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <Link href="/work">
        <a className={style.back}>Back to work</a>
      </Link>
    </>)
}

export default ClientDetail