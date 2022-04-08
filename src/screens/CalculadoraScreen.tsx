import React, { useRef, useState } from 'react' 
import { Text, View } from 'react-native' 
import BotonCalc from '../components/BotonCalc';
import { styles } from '../theme/AppTheme';


enum Operadores
{
  sumar, restar, multiplicar, dividir
}
                                           
export default function CalculadoraScreen( )
{
  const [numero, setNumero] = useState('0');

  const [numeroAnterior, setNumeroAnterior] = useState('0');

  const ultimaOperacion = useRef<Operadores>();


  // para poner en 0 la calc
  const limpiar = ( )=>
  {
    setNumero('0');
    setNumeroAnterior('0');
  }

  //armar el numero
  const armarNumero = ( numeroTexto: string )=>
  {
    // no aceptar doble punto
    if( numero.includes( '.')  && numeroTexto==='.') return

    if( numero.startsWith('0') || numero.startsWith('-0') )
    {
      //si la entrada es el punto decimal
      if( numeroTexto.startsWith('.'))
      {
        setNumero( numero + numeroTexto);
      }
      // evaluar si es otro cero y ya existe el punto
      else if( numeroTexto === '0' && numero.includes('.'))
      {
        setNumero( numero + numeroTexto);
      }
      //si es diferente de 0 y no tiene un punto
      else if( numeroTexto!== '0' && !numero.includes('.'))
      {
        setNumero( numeroTexto );
      }
      //evitar 00000.00
      else if( numeroTexto === '0'  && !numero.includes('.'))
      {
        setNumero( numero  );
      }
      else
      {
        setNumero( numero + numeroTexto );
      }

    }
    else
    {
      setNumero( numero + numeroTexto);
    }

    
  } // fin armar numero



  // para cambiar el signo
  const cambiarSigno = ( )=>
  {
    if( numero.includes('-') )
    {
      setNumero( numero.replace( '-','' ) );
    }
    else
    {
      setNumero( '-' + numero );
    }
  }

  //para borrar de a 1 los numeritos
  const btnDelete = ( )=>
  {
    let negativo = '';
    let numeroTemp = numero;

    if( numero.includes('-'))
    {
      negativo= '-';
      numeroTemp = numero.substring(1);
    }

    if( numeroTemp.length > 1 )
    {
      setNumero( negativo + numeroTemp.slice(0,-1) );
    }
    else
    {
      setNumero('0');
    }
  }


  const cambiarNumPorAnterior = ( )=>
  {
    if( numero.endsWith('.'))
    {
      setNumeroAnterior( numero.slice( 0,-1 ) );
    }
    else
    {
      setNumeroAnterior( numero );
    }
    setNumero('0');
  }


  const btnDividir = ( )=>
  {
    cambiarNumPorAnterior( );
    ultimaOperacion.current = Operadores.dividir;

  }
  const btnMultiplicar = ( )=>
  {
    cambiarNumPorAnterior( );
    ultimaOperacion.current = Operadores.multiplicar;
    
  }
  const btnRestar = ( )=>
  {
    cambiarNumPorAnterior( );
    ultimaOperacion.current = Operadores.restar;
    
  }
  const btnSumar = ( )=>
  {
    cambiarNumPorAnterior( );
    ultimaOperacion.current = Operadores.sumar;
    
  }


  return(
    <View style={styles.calculadoraContainer}>

        <Text style={styles.resultadoPequeno}>
          { numeroAnterior }
        </Text>
        <Text 
            style={styles.resultado}
            numberOfLines={ 1 }
            adjustsFontSizeToFit={ true }
        >
          { numero }
        </Text>

        {/* fila de botones */}
        <View style={styles.fila}>
           <BotonCalc texto='C'     color="#9B9B9B" accion={ limpiar }/>
           <BotonCalc texto='+/-'   color="#9B9B9B" accion={ cambiarSigno }/>
           <BotonCalc texto='del'   color="#9B9B9B" accion={ btnDelete }/>
           <BotonCalc texto='/'     color="#FF9427" accion={ cambiarNumPorAnterior }/>
        </View>  
         
        {/* fila de botones */}
        <View style={styles.fila}>
           <BotonCalc texto='7' accion={ armarNumero }/>
           <BotonCalc texto='8' accion={ armarNumero }/>
           <BotonCalc texto='9' accion={ armarNumero }/>
           <BotonCalc texto='x' color="#FF9427" accion={ cambiarNumPorAnterior }/>
        </View>  
                 
        {/* fila de botones */}
        <View style={styles.fila}>
           <BotonCalc texto='4' accion={ armarNumero }/>
           <BotonCalc texto='5' accion={ armarNumero }/>
           <BotonCalc texto='6' accion={ armarNumero }/>
           <BotonCalc texto='-' color="#FF9427" accion={ cambiarNumPorAnterior }/>
        </View> 

         {/* fila de botones */}
         <View style={styles.fila}>
           <BotonCalc texto='1' accion={ armarNumero } />
           <BotonCalc texto='2' accion={ armarNumero } />
           <BotonCalc texto='3'accion={ armarNumero } />
           <BotonCalc texto='+' color="#FF9427" accion={ cambiarNumPorAnterior }/>
        </View> 

          {/* fila de botones */}
          <View style={styles.fila}>
           <BotonCalc texto='0' ancho = {true} accion={ armarNumero }/>
           <BotonCalc texto='.' accion={ armarNumero } />
           <BotonCalc texto='=' color="#FF9427" accion={ limpiar }/>
        </View> 

    </View>
  )
};