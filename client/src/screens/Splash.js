import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

function Splash({ navigation }) {
    const { idUser } = useSelector((state) => state.taskReducer);
    useEffect(() => {
        if (idUser) navigation.replace("Profile")
        else navigation.replace("Login")

    }, [])
    return (<View></View>)
}
export default Splash;