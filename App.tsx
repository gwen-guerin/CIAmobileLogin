import { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [fontsLoaded] = useFonts({
    Goldman: require('./assets/fonts/Goldman-Regular.ttf'),
  });
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // Wait for 1s before starting the authentication process
    setTimeout(async () => {
      const { success }: { success: boolean } = await LocalAuthentication.authenticateAsync();
      setIsLogged(success);
    }, 1000);
  }, []);

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.container}>
      <View style={styles.overlay}>
        <Image source={require('./assets/logo.png')} style={styles.image} />
        {
          isLogged
            ? <Text style={styles.text}>Welcome back, agent Cody Banks.</Text>
            : <Text style={styles.text}>CIA Login</Text>
        }
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(2, 28, 52, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontFamily: 'Goldman',
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
});
