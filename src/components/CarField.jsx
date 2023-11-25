import { useEffect } from 'react'
import PropTypes from 'prop-types'
import Car from './Car'

const CarField = ({
  cars,
  setCarPosition,
  isMoving,
  setIsMoving,
  frictionCoefficient
}) => {
  const calculateBrakingDistance = (velocity, weight) => {
    const gravity = 9.8
    // Convertir la velocidad a m/s desde km/h y aplicar la fórmula
    const velocityInMetersPerSecond = (velocity * 1000) / 3600
    return (
      (Math.pow(velocityInMetersPerSecond, 2) * weight) /
      (2 * frictionCoefficient * gravity)
    )
  }

  const updatePosition = (prevPosition, velocity, weight) => {
    // Convertir la velocidad a m/s y luego a 'píxeles' asumiendo 100px = 100m
    const velocityInMetersPerSecond = (velocity * 1000) / 3600
    let newPositionX =
      prevPosition.x + (velocityInMetersPerSecond / weight) * 100
    if (newPositionX > window.innerWidth) {
      newPositionX -= window.innerWidth // Ajuste para reaparecer en el otro lado
    }
    return { ...prevPosition, x: newPositionX }
  }
  useEffect(() => {
    let interval
    if (isMoving) {
      interval = setInterval(() => {
        cars.forEach((car, i) => {
          const newPosition = updatePosition(
            car.position,
            car.velocity,
            car.weight
          )

          const nextCarPosition = cars[(i + 1) % cars.length].position.x

          // Comprobar la necesidad de frenar
          if (
            Math.abs(newPosition.x - nextCarPosition) <
            calculateBrakingDistance(car.velocity)
          ) {
            setIsMoving(false)
          } else if (Math.abs(newPosition.x - nextCarPosition) < 50) {
            // Asumiendo que el ancho del carro es de 50px
            // Detectar colisión
            setIsMoving(false)
          } else {
            setCarPosition(car.id, newPosition)
          }
        })
      }, 50)
    }

    return () => clearInterval(interval)
  }, [
    isMoving,
    cars,
    setCarPosition,
    setIsMoving,
    frictionCoefficient,
    calculateBrakingDistance
  ])

  return (
    <>
      <div className='flex z-10 flex-col relative w-full h-1/2 items-center justify-center'>
        {cars.map((car, i) => (
          <Car key={i} car={car} />
        ))}
        {/* un div con el color de una pista */}
      </div>
      <div className='absolute w-full h-48 top-28 bg-gray-500'></div>
    </>
  )
}

CarField.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      weight: PropTypes.number.isRequired,
      velocity: PropTypes.number.isRequired,
      position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      }).isRequired
    })
  ).isRequired,
  setCarPosition: PropTypes.func.isRequired,
  isMoving: PropTypes.bool.isRequired,
  setIsMoving: PropTypes.func.isRequired,
  frictionCoefficient: PropTypes.number.isRequired
}

export default CarField
