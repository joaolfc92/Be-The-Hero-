
import React from 'react'
import {View , FlatList  , Image, Text, TouchableOpacity, Linking} from 'react-native'
import {Feather} from '@expo/vector-icons'
import logoImg from '../../assets/logo.png'
import {useNavigation, useRoute} from '@react-navigation/native'
import * as MailCompose from 'expo-mail-composer'


import styles from './styles'


export default function Details(){

    const navigation = useNavigation();
    const route = useRoute()

    const incident = route.params.incident

    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de "R$ ${Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.value)} "`;

    function navigationBack(){
        navigation.goBack()
    }


    function sendMail(){
        MailCompose.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }


    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }


    return(
        <View style={styles.container} >

            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigationBack}>

                        <Feather name="arrow-left" size={28} color="#e02041" />

                </TouchableOpacity>
                
            </View>

            <View style={styles.incident}>

                <Text style={styles.incidentProperty}>ONG :</Text>
    <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                    <Text style={styles.incidentProperty}>CASO :</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR :</Text>
                     <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.value)}</Text>

            </View>

            <View style={styles.contactBox}>

                <Text style={styles.heroeTitle}>Salve o dia !</Text>
                <Text style={styles.heroeTitle}>Seja o heroi desse caso.</Text>

                <Text style={styles.heroeDescription}>Entre em contato</Text>


                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                         <Text style={styles.actionText}>WhatsApp</Text>
                         
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                         
                    </TouchableOpacity>
                </View>


            </View>


        </View>    
    )
}

