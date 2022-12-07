import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

import Home from './screens/Home';
import Favorite from './screens/Favorite';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Profile from './screens/Profile';
import Setting from './screens/Setting';
import { Store } from './redux/store';
import { Provider } from 'react-redux';
import Splash from './screens/Splash';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const toastConfig = {
  successToast: ({ text1 }) => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        height: 50,
        width: '90%',
        backgroundColor: 'white',

        borderRadius: 5,
        borderLeftColor: '#4BB543',
        borderLeftWidth: 8,
        elevation: 2,
      }}
    >
      <AntDesign name="checkcircleo" size={24} color="#4BB543" style={{ marginHorizontal: 12 }} />
      <Text style={{ fontSize: 16, fontWeight: '500', color: '#4BB543', maxWidth: '85%' }}>
        {text1}
      </Text>
    </View>
  ),

  errorToast: ({ text1 }) => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        height: 50,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 5,
        borderLeftColor: '#ff3333',
        borderLeftWidth: 8,
        elevation: 2,
      }}
    >
      <AntDesign name="closecircleo" size={24} color="#ff3333" style={{ marginHorizontal: 12 }} />
      <Text style={{ fontSize: 16, fontWeight: '500', color: '#ff3333', maxWidth: '85%' }}>
        {text1}
      </Text>
    </View>
  ),

  disableToast: ({ text1 }) => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        height: 50,
        width: '90%',
        backgroundColor: 'white',

        borderRadius: 5,
        borderLeftColor: '#cccccc',
        borderLeftWidth: 8,
        elevation: 2,
      }}
    >
      <MaterialIcons
        name="do-not-touch"
        size={24}
        color="#cccccc"
        style={{ marginHorizontal: 12 }}
      />
      <Text style={{ fontSize: 16, fontWeight: '500', color: '#cccccc' }}>{text1}</Text>
    </View>
  ),
};



const User = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: '#e91e63',
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Trang chủ',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home-outline" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="Favorite"
            component={Favorite}
            options={{
              tabBarLabel: 'Yêu thích',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="heart-multiple-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="User"
            component={User}
            options={{
              tabBarLabel: 'Cá nhân',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="emoticon-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Setting"
            component={Setting}
            options={{
              tabBarLabel: 'Cài đặt',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
        <Toast config={toastConfig} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
