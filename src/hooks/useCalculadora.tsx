import  { useRef, useState } from 'react' 



enum Operadores
{
  sumar, restar, multiplicar, dividir
}


export const useCalculadora = () => 
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
  
    const calcular = ( )=>
    {
      const operador1 = Number( numero );
      const operador2 = Number( numeroAnterior );
  
      switch (ultimaOperacion.current) 
      {
        case Operadores.sumar:
          setNumero( `${operador1 + operador2}` ); 
          break;
  
        case Operadores.restar:
           setNumero( `${operador2 - operador1}` );   
           break;  
            
        case Operadores.multiplicar:
          setNumero( `${operador1 * operador2}` ); 
          break;     
  
        case Operadores.dividir:
          setNumero( `${operador2 / operador1}` ); 
          break;          
      }
      setNumeroAnterior('0');
    }

    return( 
        {   
            numeroAnterior,
            numero,
            limpiar,
            cambiarSigno,
            btnDelete,
            btnDividir,
            armarNumero,
            btnMultiplicar,
            btnRestar,
            btnSumar,
            calcular 
        }
    )
}
