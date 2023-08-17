import '../css/Select.css'

function MySelect({onChange, options}) {
    return (
        <select className={"select"} onChange={onChange}>
            {options.map(option => <option value={option.value}>{option.label}</option>)}
        </select>
    )
}

export default MySelect