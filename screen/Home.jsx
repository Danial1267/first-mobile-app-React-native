import React from 'react';
import axios from "axios";
import {
  Alert,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity } from 'react-native';
import {Post} from "../components/Post";

export const HomeScreen = ({ navigation }) => {
  const [isloading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]); // скобки должы быть пустыми, разобраться позже

  const FetchPosts = () => {
    setIsLoading(true);
    axios
      .get('https://653692cfbb226bb85dd25a4b.mockapi.io/native-app/post')
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Ошибка при получении данных с сервера')
      }).finally(() => {
      setIsLoading(false);
    })
  }

  React.useEffect(FetchPosts, []);

  if (isloading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 15 }}>Идет загрузка...</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        refreshControl={<RefreshControl refreshing={isloading} onRefresh={FetchPosts} /> }
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}>
            <Post title={item.title} imageUrl={item.imageUrl}  createdAt={item.createdAt} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

