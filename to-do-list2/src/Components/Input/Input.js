
const Input = (props) => {
  return (
    <input 
        onClick={props.onClick}
        type={props.type}
        className={props.className}
        ref={props.myRef}
        placeholder={props.placeholder}
        checked={props.checked}
        onChange={props.onChange}
        defaultChecked={props.defaultChecked}
    />
  )
}

export default Input