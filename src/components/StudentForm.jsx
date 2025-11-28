import React, { useState } from 'react'

export default function StudentForm(){
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [submittedMessage, setSubmittedMessage] = useState('')

  function validate(){
    const e = {}
    if(!name.trim()) e.name = 'Please enter your full name.'
    if(!email.trim()) e.email = 'Please enter your email.'
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if(!re.test(email)) e.email = 'Please enter a valid email address.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleNext(e){
    e && e.preventDefault()
    if(validate()){
      setStep(2)
      setSubmittedMessage('')
    }
  }

  function handleBack(e){
    e && e.preventDefault()
    setStep(1)
    setSubmittedMessage('')
  }

  function handleSubmit(e){
    e.preventDefault()
    // final submit (simulate)
    setSubmittedMessage(`Registration submitted for ${name.trim()} (${email.trim()}).`)
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {step === 1 && (
        <section className="step">
          <label htmlFor="name">Full name</label>
          <input id="name" value={name} onChange={e=>setName(e.target.value)} />
          {errors.name && <div className="error">{errors.name}</div>}

          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          {errors.email && <div className="error">{errors.email}</div>}

          <div className="actions">
            <button type="button" className="btn primary" onClick={handleNext}>Next</button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="step">
          <h2>Summary</h2>
          <p><strong>Name:</strong> {name || '(not provided)'}</p>
          <p><strong>Email:</strong> {email || '(not provided)'}</p>

          <div className="actions">
            <button type="button" className="btn" onClick={handleBack}>Back</button>
            <button type="submit" className="btn primary">Submit</button>
          </div>
        </section>
      )}

      {submittedMessage && <div className="result" role="status">{submittedMessage}</div>}
    </form>
  )
}
