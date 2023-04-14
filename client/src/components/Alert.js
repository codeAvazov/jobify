import { useAppContext } from '../context/appContext'

const Alert = ({type, text}) => {
  const { alertType, alertText } = useAppContext()
  return <div className={`alert alert-${type || alertType}`}>{text || alertText}</div>
}

export default Alert
