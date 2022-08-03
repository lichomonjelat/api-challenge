import React, { useEffect, useState } from 'react'
import styles from './statusContainer.module.scss'
import axios from 'axios'
import ApiCard from '../card/ApiCard'

function StatusContainer() {
    const [status, setStatus] = useState()

    const noCorsEndpoints = ['accounts', 'assets', 'customers', 'datapoints', 'devices', 'documents', 'forms',
    'media', 'namespaces', 'orders', 'patients', 'relationships', 'rules','templates', 'workflows']

    const corsEndpoints = ['invites', 'messages', 'users']

    const allEndpoints = ['accounts', 'assets', 'customers', 'datapoints', 'devices', 'documents', 'forms',
    'media', 'namespaces', 'orders', 'patients', 'relationships', 'rules','templates', 'workflows','invites', 'messages', 'users']

    function getData() {
      noCorsEndpoints.forEach(endpoint => {
        axios.get(`https://api.factoryfour.com/${endpoint}/health/status`)
        .then(res => {
            setStatus(prev => ({...prev, [endpoint]: res}))
        })
        .catch(error => setStatus(prev => ({...prev, [endpoint]: error})))
       });
       corsEndpoints.forEach(endpoint => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.factoryfour.com/${endpoint}/health/status`)
        .then(res => {
           setStatus(prev => ({...prev, [endpoint]: res}))
        })
        .catch(error =>  setStatus(prev => ({...prev, [endpoint]: error})))
       });
    }

    useEffect(() => {
        getData();
        setInterval(getData, 15000) /*--> By modifying this number, you're changing the time interval of the requests to the API*/ 
    }, []) 
    return (
    <div className={styles.statusContainer}>
      {status ? allEndpoints.map(endpoint => {
        return [status].map((card, index) => (card[endpoint] ? <ApiCard key={index} endpoint={endpoint} {...card[endpoint]}/> : null))
      }) : <p>Loading</p>} 
    </div>
  )
}
export default StatusContainer
