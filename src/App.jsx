import { useState } from 'react'
import CarField from './components/CarField'
import ControlPanel from './components/ControlPanel'

const App = () => {
  const [frictionCoefficient, setFrictionCoefficient] = useState(0.5) // Valor por defecto
  const [isMoving, setIsMoving] = useState(false)
  const [cars, setCars] = useState([]) // Estado inicial vacío

  const resetPositions = () => {
    // Restablece las posiciones de los carros aquí
    setIsMoving(false)
  }

  const setCarPosition = (carId, newPosition) => {
    setCars(prevCars =>
      prevCars.map(car =>
        car.id === carId ? { ...car, position: newPosition } : car
      )
    )
  }

  return (
    <div className='flex items-center justify-center flex-col w-screen h-screen bg-sky-900 max-w-screen overflow-hidden py-12'>
      <CarField
        frictionCoefficient={frictionCoefficient}
        isMoving={isMoving}
        cars={cars}
        setCarPosition={setCarPosition}
        setIsMoving={setIsMoving}
        resetPositions={resetPositions}
      />
      <ControlPanel
        cars={cars}
        setCars={setCars}
        isMoving={isMoving}
        setIsMoving={setIsMoving}
        frictionCoefficient={frictionCoefficient}
        resetPositions={resetPositions}
        key={cars.length}
        setFrictionCoefficient={setFrictionCoefficient}
      />
    </div>
  )
}

export default App
