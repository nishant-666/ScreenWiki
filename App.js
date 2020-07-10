import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,ScrollView,Image,TouchableHighlight,Modal } from 'react-native';
import axios from 'axios';
export default function App() {
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=5ed4b1a6"
  const [state,setstate ] = useState({
    s:"Enter a movie..",
    results:[],
    selected:{}
  })

  const search = ()=> {
    axios(apiurl + "&s=" +state.s)
    .then(({data}) => {
      let results = data.Search;
      setstate(prevState => {
        return{...prevState,results:results}
      })
    })
  }

  const openPopup = id =>{
    axios(apiurl + "&t=" + id).then(({data})=>
    {
      let result = data;
      console.log(result)
      setstate(prevState =>   {
        return{...prevState,selected:result}
      })
    }
    )
  }
  return (
    <View style={styles.container}>
       <Image source={require('./logo2.png')} style={{marginTop:90}} />
      <Text style={styles.title}>ScreenWiki</Text>
      <Text style={styles.subitle}>Your one stop for all your Movies and Television Series!</Text>
     
      <TextInput 
       style={styles.search}
      placeholder="Search any Movie or Television series.."
      
      onChangeText={text => setstate(prevState =>{
        return{...prevState,s:text}
      })}
      onSubmitEditing={search}
      />
    
      <ScrollView style={styles.scroll}>
      {state.results.map(result =>  (
        <TouchableHighlight key ={result.imdbID} onPress={() => openPopup(result.Title)}>
          
        <View style={styles.result}>
          <Image
          source ={{uri:result.Poster}}
          style={{width:"100%",height:300}}
          resizeMode="cover"
          />
          <Text style={styles.heading}> 
          {result.Title} 
          </Text>
        </View>
        </TouchableHighlight> 
      ))}
      </ScrollView>
      <Modal
      animationType = "fade"
      transparent={false}
      visible={(typeof state.selected.Title != "undefined")}>
              
      <View style= {styles.popup}>
      <Text style={{marginTop:20,marginBottom:20,color:"#fff",fontSize:30,fontWeight:"bold",textAlign:"center"}}>ScreenWiki</Text>
        <ScrollView>
        <Text style = {styles.popTitle}>{state.selected.Title}</Text>
        <Text style={styles.plot}>Plot: {state.selected.Plot}</Text>
        <Text style = {styles.popSubtitle}>Year: {state.selected.Released}</Text>
        <Text style = {styles.popSubtitle}>Genre: {state.selected.Genre}</Text>
        <Text style = {styles.popSubtitle}>Rated: {state.selected.Rated}</Text>
        <Text style = {styles.popSubtitle}>Languages: {state.selected.Language}</Text>
        <Text style = {styles.popSubtitle}>Countries: {state.selected.Country}</Text>
        <Text style = {styles.popSubtitle}>Number of Votes: {state.selected.imdbVotes}</Text>
        <Text style = {styles.popSubtitle}>Rating: {state.selected.imdbRating}</Text>
        <Text style = {styles.popSubtitle}>Box Office: {state.selected.BoxOffice}</Text>
        <Text style = {styles.popSubtitle}>Meta Score: {state.selected.Metascore}</Text>
        <Text style = {styles.popSubtitle}>Runtime: {state.selected.Runtime}</Text>
        <Text style = {styles.popSubtitle}>Actors: {state.selected.Actors}</Text>
        <Text style = {styles.popSubtitle}>Awards: {state.selected.Awards}</Text>
        <Text style = {styles.popSubtitle}>Writers: {state.selected.Writer}</Text>
        <Text style = {styles.popSubtitle}>Director: {state.selected.Director}</Text>
        <Text style = {styles.popSubtitle}>Production: {state.selected.Production}</Text>
        </ScrollView>
      </View>
      <TouchableHighlight onPress={() => setstate(prevState => {
        return{ ...prevState,selected:{}}
      })}>
      <Text style={styles.closeBtn}>Close</Text>
      </TouchableHighlight>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    
    
    
  },
  title:{
    
    fontSize:30,
    marginTop:10,
    padding:10,
    width:200,
    fontWeight:"bold",
    textAlign:"center",
    
   
    },
    
    subitle:{
      fontSize:15
    },
    search:{
      fontSize:20,
      marginTop:20,
      width:350,
      padding:7,
      marginBottom:10,
      textAlign:"center",
      color:"#f5f5f5",
      borderRadius:40,
      backgroundColor:"#212121"
    },
    scroll:{
      flex:1,
    },
    result:{
      padding:10,
      width:450,
     
    },
    heading:{
      color:"#fff",
      fontSize:18,
      backgroundColor:"#212121",
      textAlign:"center",
      fontWeight:"bold",
      padding:10,
   
    },
    popup:{
      padding:20,
      backgroundColor:"#212121",
      
      
    },
    popTitle:{
      fontSize:22,
      padding:10,
      fontWeight:"700",
      marginBottom:4,
      color:"#fff"
    },
    popSubtitle:{
      color:"#fff",
      padding:10
    },
    plot:{
      color:"#fff",
      padding:10,
      fontSize:17
    
    },
    closeBtn:{
      
      fontSize:20,
      fontWeight:"bold",
      backgroundColor:"#212121",
      color:"#fff",
      textAlign:"center",
      padding:20,
      
    }
 
});
