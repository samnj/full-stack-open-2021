import React from 'react'

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  }

  return (
    <div className={(successMessage) ? 'successMessage' : 'errorMessage'}>
      {successMessage || errorMessage}
    </div>
  )
}

export default Notification
