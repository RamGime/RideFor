import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from 'react-native';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import { ModalPickImage } from '../../../../components/ModalPickImage';
import { RoundedButton } from '../../../../components/RoundedButton';
import { MyColors, MyStyles } from '../../../../theme/AppTheme';
import styles from './Styles';
import useViewModel from './ViewModel';

export const AdminCategoryCreateScreen = () => {

  const { name, description, responseMessage, loading, image, onChange, takePhoto, pickImage, createCategory } = useViewModel();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage])
  

  return (
    <View style={styles.container}>

    <TouchableOpacity

        style={styles.imageContainer}
        onPress={() => setModalVisible(true)}
    >


        {
            image == ''
                ?
                <Image
                    style={styles.image}
                    source={require('../../../../../../assets/image_new.png')}
                />
                :
                <Image source={{ uri: image }} style={styles.image} />
        }




    </TouchableOpacity>
    <View style={styles.form}>
        {/* <ScrollView> */}
        <CustomTextInput
            placeholder='Nombre de la Empresa'
            image={require('../../../../../../assets/th.jpg')}
            keyboardType='default'
            property='name'
            value={name}
            onChangeText={onChange}

        />
        <CustomTextInput
            placeholder='Descripcion de la Empresa'
            image={require('../../../../../../assets/description.png')}
            keyboardType='default'
            property='description'
            value={description}
            onChangeText={onChange}

        />
        {/* <CustomTextInput
        placeholder='Número de Identificación Fiscal'
        image={require('../../../../../../../assets/description.png')}
        keyboardType='default'
        property='description'
        value={description}
        onChangeText={onChange}

        />
        <CustomTextInput
        placeholder='Dirección de la Empresa'
        image={require('../../../../../../../assets/description.png')}
        keyboardType='default'
        property='description'
        value={description}
        onChangeText={onChange}

        />
        <CustomTextInput
        placeholder='Número de Teléfono'
        image={require('../../../../../../../assets/description.png')}
        keyboardType='default'
        property='description'
        value={description}
        onChangeText={onChange}

        />
        <CustomTextInput
        placeholder='Correo Electrónico'
        image={require('../../../../../../../assets/description.png')}
        keyboardType='default'
        property='description'
        value={description}
        onChangeText={onChange}

        /> */}


        {/* </ScrollView> */}






    <ModalPickImage
        // traigo los metodos,pickImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
    /> 



    {
        loading &&

        <ActivityIndicator
            style={MyStyles.loading}
            size="large"
            color={MyColors.primary} />

    }

    </View >




    <View style={styles.buttoContainer}>
        <RoundedButton
            text='Crear Perfil de Empresa'
            onPress={() => createCategory()}
        />

    </View>




    {/* {Success && <Text style={styles.successMess}>{responseMessage}</Text>} */}




</View>
  )
}
