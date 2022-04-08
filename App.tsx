import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native';
import CalculadoraScreen from './src/screens/CalculadoraScreen';
import { styles } from './src/theme/AppTheme';
// barStyle='light-content', para que se vea igual en android e ios
const App = () => {
  return (
    <SafeAreaView style= {styles.fondo}>
      <StatusBar backgroundColor={'black'}  barStyle='light-content'/> 
          <CalculadoraScreen/>
    </SafeAreaView>
  )
}

export default App;
