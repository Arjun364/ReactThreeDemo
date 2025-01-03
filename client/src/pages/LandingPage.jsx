import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import DarkModeSwitcher from '../components/DarkModeSwitcher'
import { motion } from "framer-motion"
import { MeshWobbleMaterial, OrbitControls, useHelper } from "@react-three/drei"
import { DirectionalLightHelper } from 'three'


const Cube = ({ position, side, color }) => {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta
    // ref.current.position.z = Math.tan(-state.clock.elapsedTime)
  })
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={side} />
      <MeshWobbleMaterial color={color} />
    </mesh>
  )
}

const Tube = ({ position, size, color }) => {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 2
    ref.current.rotation.y += delta
    ref.current.position.z = Math.tan(-state.clock.elapsedTime)
    // console.log(state);

  })

  return (
    <mesh position={position} ref={ref}>
      <cylinderGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// the shere geometery 
const Sphere = ({ position, size, color }) => {
  const ref = useRef()
  const [isHover, setISHover] = useState(false)
  const [isClick, setIsClick] = useState(false)

  useFrame((state, delta) => {
    const speed = isHover ? .15 : .1
    ref.current.rotation.y += delta * speed
    ref.current.rotation.z = .2
  })

  return (
    <mesh position={position} ref={ref}
      // logic fot interaction 
      onPointerEnter={(e) => (e.stopPropagation(), setISHover(true))}
      onPointerLeave={() => setISHover(false)}
      onClick={() => setIsClick(!isClick)}
    >
      <sphereGeometry args={isClick ? size.map((dim) => dim * 1.2) : size} rotateX={isClick ? 3 : 0} />
      {/* <meshPhysicalMaterial color={color}  /> */}
      <MeshWobbleMaterial color={color}/>
    </mesh>
  )
}

const TorusKnot = ({ position, size, color }) => {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta
  })
  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const Scene = () =>{
  const directionalLightRef = useRef()
  useHelper(directionalLightRef, DirectionalLightHelper , .5 ,"black")
  return (
    <>
     {/* <ambientLight /> */}
     <directionalLight position={[-3, 1, 2]} intensity={1.2} ref={directionalLightRef} />
        <directionalLight position={[1, 1, 1]} />
        {/* <directionalLight position={[0, 0, 0]} /> */}
        {/* <group>
        <Cube position={[-.9,-.9,.5]} side={[1,1,1]} color={'#4aff7a'}/>
        <Cube position={[-.9,.9,.5]} side={[1,1,1]} color={'#4aff7a'}/>
        <Cube position={[.9,.9,.5]} side={[1,1,1]} color={'#4aff7a'}/>
        <Cube position={[.9,-.9,.5]} side={[1,1,1]} color={'#4aff7a'}/>
        </group> */}
        {/* <Tube position={[0, 0, 0]} side={[2,2,2]} color={'green'} /> */}
        <Sphere position={[0, 0, 0]} size={[2, 100, 200]} color={"#4287f5"} />
        {/* <TorusKnot position={[2, 0, 0]} size={[.5, 1, 50, 80, 10, 9]} color={"red"} /> */}
        <Cube position={[0,0,3]} size={[1,1,1]} color={"#4287f5"}/>
        <OrbitControls enableZoom={false} />
    </>
  )
}

const LandingPage = () => {
  return (
    <div className='w-full h-[100vh] dark:bg-black dark:text-white flex flex-col items-center justify-center' >
      <Canvas>
       <Scene/>
      </Canvas>
      {/* <motion.h1
        whileHover={{ scale: 1.2 }}
        className="heading-l flex gap-4 items-center absolute ">
        LandingPage
        <DarkModeSwitcher />
      </motion.h1> */}
    </div>
  )
}

export default LandingPage