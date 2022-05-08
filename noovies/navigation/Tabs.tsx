import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import { Text, View } from 'react-native';
import { useColorScheme } from 'react-native';
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from '../colors';
const Tab = createBottomTabNavigator();
import { Ionicons } from '@expo/vector-icons';
import Stack from './Stack';
const Tabs = () => {
    const isDark = useColorScheme() === 'dark';

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: isDark ? BLACK_COLOR : 'white',
                },
                tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
                tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
                headerStyle: {
                    backgroundColor: isDark ? BLACK_COLOR : 'white',
                },
                headerTitleStyle: {
                    color: isDark ? 'white' : BLACK_COLOR,
                },
                tabBarLabelStyle: {
                    marginTop: -5,
                    fontSize: 14,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name='Movies'
                component={Movies}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Ionicons
                                name={'film-outline'}
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name='TV'
                component={Tv}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Ionicons name={'tv'} color={color} size={size} />
                        );
                    },
                }}
            />
            <Tab.Screen
                name='Search'
                component={Search}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Ionicons
                                name={focused ? 'search' : 'search-outline'}
                                color={color}
                                size={size}
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default Tabs;
