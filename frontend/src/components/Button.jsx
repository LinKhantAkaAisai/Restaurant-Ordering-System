export default function Button({ variant = 'primary', children, className = '', ...props }) {
  const base = variant === 'ghost' ? 'btn btn-ghost' : 'btn btn-primary'
  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  )
}
