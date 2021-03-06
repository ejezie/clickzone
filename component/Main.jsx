import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { fetchUser } from "../redux/actions/index";
import FeedPage from "./main/Feed";
import ProfilePage from "./main/Profile";


const EmptyScreen = () => {
  return(null)
}

const Tab = createMaterialBottomTabNavigator();

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    const { currentUser } = this.props;
    console.log(currentUser);
    return (
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen
          name="Feed"
          component={FeedPage}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <MaterialCommunityIcons name="home" color={color} size={26} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <MaterialCommunityIcons name="account-circle" color={color} size={26} />;
            },
          }}
        />
        <Tab.Screen
          name="AddClicker"
          component={EmptyScreen}
          listeners={({navigation}) => ({
            tabPress: (event)=>{
              event.preventDefault();
              navigation.navigate("Add")
            }
          })}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <MaterialCommunityIcons name="plus-box" color={color} size={26}/>;
            },
          }}
        />
      </Tab.Navigator>
    );
  }
}
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Main);
