import {StyleSheet} from 'react-native'

const ClientShopingBagStyles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white'
    },
    TotalToPay: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#f2f2f2',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    TotalInfo:{
       alignItems: 'center'
    },

    TotalText:{
        fontWeight:  'bold',
        fontSize: 17
    },
    buttonAdd:{
        width: '50%'

    }
})

export default ClientShopingBagStyles