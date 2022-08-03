import React from 'react'
import styles from './apiCard.module.scss'

function ApiCard(props) {
    const { hostname, time } = (props?.data || { hostname:'', time: ''})
    const { response, endpoint } = props
    const getTime = time => {
        let date = new Date(time);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        let timestamp = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
        return timestamp;
    }
  return (
    <div className={styles.card}>
        <h1>{endpoint}</h1>
        <div className={`${styles.msj} ${props.status === 200 || response.status === 200 ? styles.healthy : styles.bad}`}>
            <p>{props.status || response.status}</p>
            <p>{props.status === 200 || response.status === 200 ? 'Healthy' : 'Not working'}</p>
        </div>
        
            <div className={styles.moreInfo}>
                {(props.status === 200 || response.status === 200) && 
                    <>
                        <p>{hostname}</p>
                        <p>{getTime(time)}</p>
                    </>
                }
                {
                    (props?.status === 403 || response?.status === 403) && <p className={styles.forbidden}>Forbidden</p>
                }
            </div>
        
        
    </div>
  )
}

export default ApiCard
