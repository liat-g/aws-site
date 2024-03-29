/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: RandyGF (https://sketchfab.com/RandyGF)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/cloud-ring-27897026b0a24dfe992ca761a4029d01
Title: Cloud Ring
*/

import React, { useRef } from "react"; //we use useRef to reference a mutable state because useState causes too many re-renders
import { useGLTF, useAnimations } from "@react-three/drei";
import { UseRef, useEffect, group } from "react";
import { useFrame, useThree } from '@react-three/fiber'
import islandScene from '../assets/3d/cloud_ring.glb';
import { a } from '@react-spring/three';

const Island = ({isRotating, setIsRotating, setCurrentStage, ...props}) => {
    //there has to be a function for clicking, holding AND draggin
const {gl,viewport  } = useThree();
  const islandRef = useRef();
  const { nodes, materials, animations } = useGLTF(islandScene);

  const { actions } = useAnimations(animations, group);
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);

  const dampingFactor = 0.95;

  const handlePointerDown = (e) => {
//event event.stopPropagation keeps the event from bubbling any further to the DOM, halting event propagation to the refresh and then this point
    e.stopPropagation(); //mouse click won't touch other elements
    e.preventDefault(); //won't reload the page
    setIsRotating(true); //want to start this because have started rotatibg

    //is it a touch event (on a phone) or a mouse event (on a computer)
    //Returns the X coordinate of the touch point relative to the left edge of the browser viewport, not including any scroll offset. -- mdn
    const clientX = e.touches ? e.touches[0].clientX : e.clientX; // is the curr/last touch on the x axis


    lastX.current = clientX;

  }
  const handlePointerUp= (e) => {
    //event event.stopPropagation keeps the event from bubbling any further to the DOM, halting event propagation to the refresh and then this point
        e.stopPropagation(); //mouse click won't touch other elements
        e.preventDefault(); //won't reload the page
        setIsRotating(false); //want the model to stop rotating once we release the clicker

            //is it a touch event (on a phone) or a mouse event (on a computer)
    //Returns the X coordinate of the touch point relative to the left edge of the browser viewport, not including any scroll offset. -- mdn
   
      }

      const handlePointerMove = (e) => {
        //event event.stopPropagation keeps the event from bubbling any further to the DOM, halting event propagation to the refresh and then this point
            e.stopPropagation(); //mouse click won't touch other elements
            e.preventDefault(); //won't reload the page

            //what happens if we are rotating

            if (isRotating){
              const clientX = e.touches ? e.touches[0].clientX : e.clientX; // is the curr/last touch on the x axis
          // console.log(clientX, 'clientX');
          // console.log(viewport.width, 'viewport width')
           // console.log(lastX, 'lastX');
    console.log(islandRef, 'islandRef')

    const delta = (clientX - lastX.current) / viewport.width; //difference between the first touch and ending touch

    islandRef.current.rotation.y += delta * 0.01 * Math.PI; //using Math.PI because we are rotating in a circle

    lastX.current = clientX; //then resetting the lastX to the curr X

    rotationSpeed.current = delta * 0.01 * Math.PI;

    // console.log(rotationSpeed, 'rotationSpeed');

    
            }
        
          }

    const handleKeyDown = (e) => { //adding the ability to move with the keyboard
            if (e.key === 'ArrowLeft'){ 
              if (!Rotating) setIsRotating(true);
              islandRef.current.rotation.y += 0.01 * Math.PI;
            } else if (e.key === 'ArrowRight') {
                if (!isRotating) setIsRotating(true);
                islandRef.current.rotation.y -= 0.01 * Math.PI;

            }

          }

          const handleKeyUp = (e) => { //adding the ability to move with the keyboard
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight'){ 
             setIsRotating(false);
        
          }
        }

        useFrame(() => {

          if (!isRotating){
            rotationSpeed.current *= dampingFactor;

            if (Math.abs(rotationSpeed.current) < 0.001){
              rotationSpeed.current = 0 
            }

            islandRef.current.rotation.y += rotationSpeed.current; //smooths out the rotation
          } else {
            const rotation = islandRef.current.rotation.y;
 /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
  const normalizedRotation =
  ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
// Set the current stage based on the island's orientation
switch (true) {
  case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
    setCurrentStage(4);
    break;
  case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
    setCurrentStage(3);
    break;
  case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
    setCurrentStage(2);
    break;
  case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
    setCurrentStage(1);
    break;
  default:
    setCurrentStage(null);
            
          } }
        } )//this is a react three fiber hook 

          useEffect(() => { //using this to track changes 

            const canvas = gl.domElement; //we have to use canvas because we are touching 3d elements and not the screen
            canvas.addEventListener('pointerdown', handlePointerDown); //adding the events
            canvas.addEventListener('pointerup', handlePointerUp);
            canvas.addEventListener('pointermove', handlePointerMove);
            document.addEventListener('keyDown', handleKeyDown);
            document.addEventListener('keyUp', handleKeyUp);
            
            return () => {
              canvas.removeEventListener('pointerdown', handlePointerDown) //removing the events once we exit the page
              canvas.removeEventListener('pointerup', handlePointerUp);
             canvas.removeEventListener('pointermove', handlePointerMove);
              document.removeEventListener('keyDown', handleKeyDown);
              document.removeEventListener('keyUp', handleKeyUp);
            }

          }, [gl, handlePointerDown, handlePointerUp, handlePointerDown, handleKeyDown, handleKeyUp]) //these functions are controlling how our 3d model turns in the canvas we created

  return (
    <a.group ref={islandRef} {...props} >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Cloud_GN001_2">
                <mesh
                  name="Object_4"
                  geometry={nodes.Object_4.geometry}
                  material={materials.Cloud}
                />
              </group>
              <group name="Cloud_GN002_3" rotation={[0, -0.016, 0]}>
                <mesh
                  name="Object_6"
                  geometry={nodes.Object_6.geometry}
                  material={materials.Cloud}
                />
              </group>
              <group name="Cloud_GN003_4" rotation={[0, -0.031, 0]}>
                <mesh
                  name="Object_8" 
                  geometry={nodes.Object_8.geometry}
                  material={materials.Cloud}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </a.group>
  );
}


export default Island
