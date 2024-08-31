import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';

interface Item {
  id: number;
  title: string;
}

const Index: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const fetchData = async () => {
    if (loading || isEnd) return;

    setLoading(true);
    try {
      // Simulate fetching data from an API
      const newData: Item[] = Array.from({ length: 20 }, (_, i) => ({
        id: (page - 1) * 20 + i,
        title: `Item ${(page - 1) * 20 + i + 1}`,
      }));

      setData([...data, ...newData]);

      // Simulate end of data condition
      if (newData.length < 20) {
        setIsEnd(true);
      }

      setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={styles.loader} />;
  };

  const handleLoadMore = () => {
    fetchData();
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <>
      <View>
        <Text style={styles.pageTitle}>Infinite Scroll Page</Text>
      </View>
      <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
    </>
    
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    

  },
  pageTitle: {
    fontSize: 30,
    textAlign:'center',
    fontWeight:'bold',
    marginVertical: 20
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default Index;
