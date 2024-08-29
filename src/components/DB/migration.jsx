// Para que funcione la migración de datos simplemente ejecutá este componente hermoso en algún lado de la aplicación y lissto
import {addDoc, collection } from 'firebase/firestore'
import { firestore } from './Firebase';
import data from './data.json'

const dataBaseCollection = collection(firestore, 'dataBase')

data.forEach((i) =>{
  addDoc(dataBaseCollection, i)
  .then((res) =>{ 
    console.log('resultado', res)
    return console.log('info agregada')
  })
  .catch((error) => {
    console.log('error :(', error)
    return console.log('info no agregada') 
  })
})