import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Car from './Car'

const GRAVEDAD_PIXELS = 0.98

const CarField = ({ cars, setCarPosition, isMoving, frictionCoefficient }) => {
  const [distances, setDistances] = useState([])

  // const calculateDistanceBetweenCars = (car1, car2) => {
  //   return Math.abs(car1.position.x - car2.position.x)
  // }

  const calcularDistanciaFrenado = (velocidad, coeficienteFriccion) => {
    return velocidad ** 2 / (2 * coeficienteFriccion * GRAVEDAD_PIXELS)
  }

  const updatePosition = car => {
    let newPositionX = car.position.x + car.velocity

    if (newPositionX > window.innerWidth) {
      newPositionX -= window.innerWidth
    }

    return { ...car.position, x: newPositionX }
  }

  useEffect(() => {
    let interval
    if (isMoving) {
      interval = setInterval(() => {
        let newDistances = []
        cars.forEach((car, i) => {
          const nextCar = cars[(i + 1) % cars.length]
          const distanceToNextCar = Math.abs(
            car.position.x - nextCar.position.x
          )
          const distanciaFrenado = calcularDistanciaFrenado(
            car.velocity,
            frictionCoefficient
          )

          if (distanceToNextCar <= distanciaFrenado) {
            car.velocity = Math.max(car.velocity - 5, 0) // Reduciendo la velocidad gradualmente
          }

          newDistances.push(distanceToNextCar)

          const newPosition = updatePosition(car)
          setCarPosition(car.id, newPosition)
        })

        setDistances(newDistances)
      }, 50)
    }

    return () => clearInterval(interval)
  }, [isMoving, cars, setCarPosition, frictionCoefficient])
  return (
    <>
      <div className='flex z-10 flex-col relative w-full h-1/2 items-center justify-center'>
        {cars.map((car, i) => (
          <Car key={i} car={car} distanceToNextCar={distances[i]} />
        ))}
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
  frictionCoefficient: PropTypes.number.isRequired
}

export default CarField
