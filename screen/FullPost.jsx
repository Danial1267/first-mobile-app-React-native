import React from "react";
import styled from "styled-components/native";
import {ActivityIndicator, Alert, StatusBar, Text, View} from "react-native";
import axios from "axios";
import {Loading} from "../components/Loading";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

export const FullPostScreen = ({ route, navigation }) => {
  const [isloading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const { id, title } = route.params;

React.useEffect(() => {
  navigation.setOptions({
    title,
  })
  axios
    .get('https://653692cfbb226bb85dd25a4b.mockapi.io/native-app/post/' + id)
    .then(({ data }) => {
      setData(data);
    })
    .catch((err) => {
      console.log(err);
      Alert.alert('Ошибка', 'Ошибка при получении статьи');
    }).finally(() => {
    setIsLoading(false);
  })
}, []);

  if (isloading) {
    return (
      <View>
        <Loading />
        <StatusBar style="auto"/>
      </View>
    );
  }

  return (
  <View style={{ padding: 20 }}>
    <PostImage source={{ uri: data.imageUrl }} />
    <PostText>
      {data.text}
    </PostText>

  </View>
  )
}