import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './courtnavigations/HomeGround'
const Tab = createMaterialTopTabNavigator();

function MyTabs({PerHour,SecHour,ThirdHour,item}) {
  return (
    <Tab.Navigator
   
      screenOptions={{
        tabBarActiveTintColor: "#408639",
        tabBarInactiveTintColor: "black",
        tabBarPressOpacity: 0,
        tabBarLabelStyle: { textTransform: 'capitalize' },
        tabBarIndicatorStyle: { backgroundColor: "#408639" },
        tabBarStyle: { borderTopWidth: 0 }
      }}
    >
      <Tab.Screen options={{ tabBarLabel: '', headerShown: false , headerTitleStyle: {
         
        },
      }} name="Home"
       component={HomeScreen} initialParams={
        {
         PerHour:PerHour,SecHour:SecHour,ThirdHour:ThirdHour,item
        }
         
         }/>
    </Tab.Navigator>
  );
}
export default  MyTabs