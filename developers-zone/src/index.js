import { StyleSheet, Text, View, FlatList, TextInput, Touch, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
const { Configuration, OpenAIApi } = require("openai");




const ConversationStarter = ({route}) => {
    //Hier wird das geklickte Icon aus dem IconWrapper übergeben, falls route != undefined ist bla bla bla
    if(route.params != undefined){
        const {selectedIcon} = route.params;
        console.log(selectedIcon);
    }
    
    
    const [data, setData] = useState([]);
    const apiKey = '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'
    const apiUrl = 'https://api.openai.com/v1/chat/completions'
    const [textInput, setTextInput] = useState('') //setTextInput wird TextInput updaten
    
    //this function handles the send button
    const handleSend = async function() {
        
        const prompt = "You're an conversation starting expert. The user gives you a situation and you give back the perfect sentence to start a conversation "
        
        const response = await axios.post(apiUrl, {
            model: "gpt-3.5-turbo",
            messages: messages=[
                {"role": "system", "content": prompt,},
                {"role": "user", "content": " I am trying to talk to a girl. She has a red dress and drinks wine. We are in a bar."},
                {"role": "assistant", "content": "Excuse me, I couldn't help but notice the stunning red dress you're wearing. What type of wine are you drinking?"},
                {"role": "user", "content": "I want to talk to my neighbor, but I don't know how to start the conversation."},
                {"role": "assistant", "content": "Hi there, I've noticed your garden looks really beautiful. What's your secret?"},
				{"role": "user", "content": "I'm at a park and I want to start a conversation with someone on the bench next to me."},
                {"role": "assistant", "content": "Hi there, do you come to this park often? It's my first time here and I'm really enjoying the scenery."},
                {"role": "user", "content": "I'm at a party and I want to start a conversation with someone."},
                {"role": "assistant", "content": "Hi there, I'm new to this party. What's your name?"},
                
              



                {"role": "user", "content": textInput}
            ],
            //prompt: prompt,
            max_tokens: 1024,
            temperature: 0.5,
        },{
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${apiKey}`
            }
        });
        const text = response.data.choices[0].message.content;
        setData([...data, {type: 'user', 'text': textInput}, {type: 'bot', 'text': text}]);
        setTextInput('');
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title} >
                StarterBot
            </Text>
            <FlatList
                data={data}
                keyExtractor={(item, index)=> index.toString()}
                style= {styles.body}
                renderItem={({item})=>(
                <View style={{flexDirection: 'row', padding: 10}}>
                    <Text style={{fontWeight: 'bold', color: item.type === 'user' ? 'green' : 'red'}}>{item.type ==='user' ? 'Ich': 'Bot'}</Text>
                    <Text style={styles.bot}> {item.text} </Text>
                </View>
            )}></FlatList>

            <KeyboardAvoidingView style={styles.keyboardAvoidingContainer} behavior="padding">
                <TextInput
                   style={styles.input}
                  value={textInput}
                  onChangeText={(text) => setTextInput(text)}
                  placeholder="Ask me anything"
                />
                <TouchableOpacity style={styles.button} onPress={handleSend}>
                   <Text style={styles.buttonText}> Let's Go</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

export default ConversationStarter

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#abcee',
      alignItems: 'center',
      //justifyContent: 'center',
    },
    title:{
        fontSize: 30,
        fontWeight: 800,
        top: 0,
    },
    body: {
        backgroundColor: '#ffffff',
        width: '100%',
    },
    bot:{
        fontSize: 16
    },
    input:{
        borderWidth: 1,
        borderColor: 'black',
        width: '90%',
        height: 60,
        marginBottom: 10,
        borderRadius: 10,
    },
    button:{
        backgroundColor: '#fff',
        padding: 20,
        
    }
  });