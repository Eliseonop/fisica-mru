import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Car from './Car'

const CarField = ({
  cars,
  setCarPosition,
  isMoving,
  setIsMoving,
  frictionCoefficient
}) => {
  const [distances, setDistances] = useState([])

  const calculateDistanceBetweenCars = (car1, car2) => {
    return Math.abs(car1.position.x - car2.position.x)
  }

  const calculateBrakingDistance = (velocity, weight) => {
    const gravity = 9.8
    const velocityInMetersPerSecond = (velocity * 1000) / 3600
    return (
      (Math.pow(velocityInMetersPerSecond, 2) * weight) /
      (2 * frictionCoefficient * gravity)
    )
  }

  const updatePosition = (prevPosition, velocity, weight) => {
    const velocityInMetersPerSecond = (velocity * 1000) / 3600
    let newPositionX =
      prevPosition.x + (velocityInMetersPerSecond / weight) * 100
    if (newPositionX > window.innerWidth) {
      newPositionX -= window.innerWidth
    }
    return { ...prevPosition, x: newPositionX }
  }

  useEffect(() => {
    let interval
    if (isMoving) {
      interval = setInterval(() => {
        let newDistances = []
        cars.forEach((car, i) => {
          const nextCar = cars[(i + 1) % cars.length]
          const distanceToNextCar = calculateDistanceBetweenCars(car, nextCar)

          newDistances.push(distanceToNextCar)

          const newPosition = updatePosition(
            car.position,
            car.velocity,
            car.weight
          )

          const brakingDistance = calculateBrakingDistance(
            car.velocity,
            car.weight
          )

          // if (
          //   distanceToNextCar < brakingDistance ||
          //   distanceToNextCar < 50 // asumiendo un ancho de carro de 50px
          // ) {
          //   setIsMoving(false)
          // } else {
          setCarPosition(car.id, newPosition)
          // }
        })
        setDistances(newDistances)
      }, 50)
    }

    return () => clearInterval(interval)
  }, [isMoving, cars, setCarPosition, setIsMoving, frictionCoefficient])

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
  setIsMoving: PropTypes.func.isRequired,
  frictionCoefficient: PropTypes.number.isRequired
}

export default CarField
