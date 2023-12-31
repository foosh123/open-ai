import Head from 'next/head'
import { useState } from 'react'
import styles from './index.module.css'

export default function Home() {
  const [animalInput, setAnimalInput] = useState('')
  const [results, setResults] = useState()  

  async function onSubmit(e) {
    e.preventDefault()

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({animal: animalInput}) 
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed: ${response.status}`)
      }

      setResults(data.result)
      setAnimalInput('')
    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  }
  return (
    <div className={styles.body}>
      <Head>
        <title>My page title</title>
      </Head>
      <main className={styles.main}>
        <img src='/favicon.ico' className={styles.icon}/>
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input 
            type="text"
            name="animal"
            value= {animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
            placeholder='Enter an animal'
          /> 
          <input
            type="submit"
            value="Generate names"
            onClick={(e) => {}}
          />
        </form>
        <div className={styles.result}>
         <div className={styles.result}>
            {results.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
