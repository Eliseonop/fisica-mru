import PropTypes from 'prop-types'
const SCALE = 100 // 100 píxeles = 1 metro

const Car = ({ car, distanceToNextCar }) => {
  const carStyle = {
    width: '150px',
    height: '150px',
    position: 'absolute',
    left: `${car.position.x}px`,
    top: `${car.position.y}px`
  }
  const distanceToNextCarInMeters = distanceToNextCar / SCALE
  return (
    <div style={carStyle} className='relative'>
      <div className='text-sm bg-slate-400 rounded-md absolute -top-28 p-1 left-0'>
        {/* Información del carro y triángulo inferior */}
        <div
          className='flex flex-col h-full text-sm w-auto
            before:content-[""] before:w-5 before:h-4 before:bg-slate-400 before:rounded-full before:absolute before:-bottom-2 before:left-1/2 
            before:transform before:-translate-x-1/2 before:rotate-45 
            before:-z-10'
        >
          <div className='text-white font-bold text-sm'>
            <span className='inline-block rounded-full mr-1 text-black font-semibold'>
              Distancia al siguiente carro:
            </span>
            {distanceToNextCarInMeters.toFixed(2)} m
          </div>
          <div className='text-white text-sm font-bold'>
            <span className='inline-block rounded-full mr-1 text-black font-semibold'>
              Nombre
            </span>
            {car.name}
          </div>
          <div className='text-white font-bold text-sm'>
            <span className='inline-block rounded-full mr-1 text-black font-semibold'>
              Peso
            </span>
            {car.weight} kg
          </div>
          <div className='text-white font-bold text-sm'>
            <span className='inline-block rounded-full mr-1 text-black font-semibold'>
              Velocidad
            </span>
            {car.velocity} m/s
          </div>
          {/* Mostrar la distancia al siguiente carro */}
          {/* {distanceToNextCar !== undefined && (
            <div className='text-white font-bold text-sm'>
              <span className='inline-block rounded-full mr-1 text-black font-semibold'>
                Distancia al siguiente:
              </span>
              {distanceToNextCar.toFixed(2)} px
            </div>
          )} */}
        </div>
      </div>
      <img
        src={car.image}
        alt='Car'
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

Car.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    velocity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  distanceToNextCar: PropTypes.number // Esta prop puede ser undefined al inicio, por lo tanto no es requerida
}

export default Car
