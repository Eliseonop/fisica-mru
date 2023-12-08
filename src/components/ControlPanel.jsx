import PropTypes from 'prop-types'
import SelectCar from './SelectCar'

const ControlPanel = ({
  cars,
  setCars,
  isMoving,
  setIsMoving,
  setFrictionCoefficient,
  resetPositions
}) => {
  const handleCarSelect = car => {
    // ponemos al carro en una posicion  donde no colisione con ningun otro
    console.log(cars)
    const positionUltimate =
      cars.length > 0 ? cars[cars.length - 1].position.x + 300 : 0

    const newCar = {
      id: cars.length + 1,
      name: car.name,
      image: car.image,
      weight: car.weight,
      velocity: 10,
      position: { x: positionUltimate, y: 0 }
    }

    setCars([...cars, newCar])
  }
  const handleVelocityChange = (id, newVelocity) => {
    setCars(
      cars.map(car => (car.id === id ? { ...car, velocity: newVelocity } : car))
    )
  }
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2'>
        <SelectCar selectCar={handleCarSelect} />
        <div className='flex flex-col items-start justify-center'>
          <div className='flex justify-between px-4 py-2 gap-48 text-slate-200'>
            <span>Numero</span>
            <span>Nombre</span>
            <span>Peso</span>
            <span>Velocidad m/s</span>
          </div>
          {cars.map((car, i) => (
            <div key={i} className='flex justify-between px-4 py-2 gap-48 '>
              <span>{car.id}</span>
              <span>{car.name}</span>
              <span>{car.weight}</span>

              <input
                type='number'
                placeholder='Nueva Vel.'
                value={car.velocity}
                onChange={e => handleVelocityChange(car.id, +e.target.value)}
                className='rounded p-1'
              />
            </div>
          ))}
        </div>
      </div>
      <div className='flex gap-2'></div>
      <div className='flex gap-2'>
        <button
          className={
            isMoving
              ? 'bg-red-500 text-white font-bold py-2 px-4 rounded'
              : 'bg-green-500 text-white font-bold py-2 px-4 rounded'
          }
          onClick={() => setIsMoving(!isMoving)}
        >
          {isMoving ? 'Parar' : 'Carrera'}
        </button>
        <button
          className='bg-slate-500 text-white font-bold py-2 px-4 rounded'
          onClick={resetPositions}
        >
          Reset
        </button>
      </div>
      <div className='flex gap-2'>
        <label htmlFor='friction' className=' text-white text-2xl'>
          Coeficiente de Fricción F=μxN
        </label>
        <input
          type='number'
          value={0.5}
          placeholder='Coeficiente de Fricción'
          onChange={e => setFrictionCoefficient(Number(e.target.value))}
        />
      </div>
    </div>
  )
}

ControlPanel.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      weight: PropTypes.number.isRequired,
      velocity: PropTypes.number.isRequired,
      position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      }).isRequired
    })
  ).isRequired,
  setCars: PropTypes.func.isRequired,
  isMoving: PropTypes.bool.isRequired,
  setIsMoving: PropTypes.func.isRequired,
  frictionCoefficient: PropTypes.number.isRequired,
  setFrictionCoefficient: PropTypes.func.isRequired,
  resetPositions: PropTypes.func.isRequired
}

export default ControlPanel
