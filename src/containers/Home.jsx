import React, {useState, useEffect} from 'react';
import CSVReader from 'react-csv-reader';

const Home = () => {

    const [data, setData] = useState([]);
    const [uploadedData, setUploadedData] = useState(false);
    const [personaUno, setPersonaUno] = useState([]);
    const [personaDos, setPersonaDos] = useState([]);
    const [coseno, setCoseno] = useState(0);

    //Función donde modifico y guardo el archivo csv
    const uploadDate = ( data ) => {
        data.shift();                   //Elimino la primer linea del csv
        setData(data);                  //Guardo el archivo en una variable local
        setUploadedData(true);          //Actualizo el estado de cargado
    }

    const getCoseno = () => {
        //Producto punto AB
        var AB = (personaUno[2] * personaDos[2]) + (personaUno[3] * parseInt(personaDos[3])) + (parseInt(personaUno[4]) * parseInt(personaDos[4]));     //Producto punto entre la persona 1 y la persona 2

        
        //Magnitud A;
        var MA =  Math.pow( personaUno[2],2 ) + Math.pow( personaDos[3],2 ) + Math.pow( personaDos[4],2 );                  //Elevo a potencias cuadradas cada uno de los items y las sumo
        MA = Math.sqrt(MA);                                                                                                 //Saco la raíz cuadrada de las sumas de las potencias
    
        //Magnitud B;
        var MB = Math.sqrt( Math.pow( personaDos[2],2 ) + Math.pow( personaDos[3],2 ) + Math.pow( personaDos[4],2 ) );      //Saco la raíz cuadrada de las sumas de las potencias
    
        var cos = AB / (MA * MB);                                                                                           //Saco el coseno de la magnitud MA y MB
        console.log(cos);
        setCoseno(cos);                                                                                                     //Guardo la resultado en una variable global
    }

    const getPersona = ( nombre, tipo ) => {
        data.map( ( item ) => {                                     //Recorro el arreglo data
            if(item[0] === nombre){                                 //Condición para validar si el objeto que recorro es igual al objeto que necesito
                if(tipo === 1) setPersonaUno(item)                  //Condición para guardar la información de la persona 1 en la variable global, si y solo si, son los mismos
                if(tipo === 2) setPersonaDos(item)                  //Condición para guardar la información de la persona 2 en la variable global, si y solo si, son los mismos
            }
        });
    }
    
    useEffect( () =>{                                               // Hooks que me actualiza la información del método getCoseno()
        getCoseno();                                                // cuando una de las personas cambia su información
    });

    return(
        <section className="Home">
            <CSVReader                                                                      //Objeto de la libreria CSV Reader que lee archivos de tipo CSV
                cssClass="react-csv-input"                                                  //Propiedad que le agrega una clase para maniputar los estilos del objeto CSV Reader
                label="Por favor, adjunte el archivo CSV que quiere visualizar"             //Texto que acompaña al input
                onFileLoaded={uploadDate}                                                   //Método que se ejecuta y me almacena la información
            />

            {
                uploadedData === true ?                                                                                                
                <>                                                                                                                      
                <p>Seleccionar el nombre de la persona 1</p>
                    <select defaultValue="" name="PersonaUno" required onChange={ (name) => { getPersona(name.target.value, 1)}}>
                        <option defaultValue="." value="." selected> Seleccionar</option>
                        {
                            data.map ( ( item ) => {
                                return(
                                    <option value={item[0]} key={item[1]}>{item[0]}</option>                                            //Itero el archivo data y agrego un option por cada 
                                )                                                                                                       //uno de los objetos que tengo
                            })

                        }
                        
                    </select>
                </>
                : 
                ""
            }
            {
                uploadedData === true ? 
                <>
                
                <p>Seleccionar el nombre de la persona 2</p>
                    <select defaultValue="" name="personaDos" required onChange={ (name) => { getPersona(name.target.value, 2)}}>
                        <option defaultValue="" value="" disabled selected> Seleccionar</option>
                        {
                            data.map ( ( item ) => {
                                return(
                                    <option value={item[0]} key={item[1]}>{item[0]}</option>
                                )
                            })
                        }
                    </select>
                </>
                : 
                ""
            }

            { coseno !== NaN ? <p>El valor es: {coseno}</p> : ""}
        </section>
    )

}



export default Home;