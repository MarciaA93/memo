import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import Card from './Card';

const cards = [
  "🍓",
  "🍑",
  "🍍",
  "🍒",
  "🍊",
  "🥝"
];

export default function App() {
  const [board, setBoard] = React.useState(() => shuffle([...cards, ...cards]));
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [matchedCards, setMatchedCards]= React.useState([]);
  const [score, setScore] = React.useState(0);

  React.useEffect(()=> {
    if (selectedCards.length < 2) return;
    if (board[selectedCards[0]] === board[selectedCards[1]]){
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
    } else{
      const timeoutId = setTimeout(() => setSelectedCards([]) , 1000);
      return ( )=> clearTimeout(timeoutId);
    }

  }, [selectedCards]);

  const handleTapCard=( index) =>{
if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
setSelectedCards([...selectedCards, index]);
setScore(score +1);
  };

  const didPlayerWin= () => matchedCards.length === board.length;

  const resetGame = () =>{
  setMatchedCards ([]);
  setScore(0);
  setSelectedCards([]);
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{didPlayerWin() ?  "Congratulations": "MEMORY FRUIT"} </Text>
      <Text style={styles.title}>Score: {score}</Text>
      <View style={styles.board}>
      {board.map((card, index) => {
        const isTurnedOver= selectedCards.includes(index) || matchedCards.includes(index);
        return <Card
        key={index}
        isTurnedOver={isTurnedOver}
        onPress={()=> handleTapCard(index)}
        >{card}
        </Card>;
      })}
      </View>
      {didPlayerWin() && <Pressable onPress={resetGame} style={styles.buton}>
      <Text style={styles.buton} >Reset</Text>
      </Pressable>}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#540d6e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize:32,
    fontFamily: "sans-serif-condensed",
    color: "white",
    fontWeight: "bold",
  },
  board:{
    flexDirection: "row",
    flexWrap:"wrap",
    justifyContent:"center",
  },
  buton:{
    fontSize: 20,
    fontFamily: "sans-serif-condensed",
    color: "white",
    fontWeight: "bold",
    
  },
});

//Returns the array shuffled into a random order
function shuffle(array){
  for (let i = array.length -1; i > 0; i--){
    const randomIndex = Math.floor(Math.random() * (i + 1));

    //Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];

  }
  return array;
}