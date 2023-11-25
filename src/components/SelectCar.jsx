import PropTypes from 'prop-types'
import { CARROCERIAS } from '../utils/list-car'

const SelectCar = ({ selectCar }) => {
  const handleSelect = e => {
    console.log(e)
    const selectedCar = CARROCERIAS.find(car => car.id === +e)
    console.log(selectedCar)
    if (selectedCar) {
      selectCar(selectedCar)
    }
  }

  return (
    <select onChange={e => handleSelect(e.target.value)}>
      {CARROCERIAS.map(body => (
        <option key={body.id} value={body.id}>
          {body.name}
        </option>
      ))}
    </select>
  )
}

SelectCar.propTypes = {
  selectCar: PropTypes.func.isRequired
}

export default SelectCar
