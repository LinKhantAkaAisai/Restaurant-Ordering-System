import './Input.css'

export default function Input({ label, ...props }) {
  return (
    <label className="field">
      {label && <span className="field__label">{label}</span>}
      <input className="field__input" {...props} />
    </label>
  )
}
