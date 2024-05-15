import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, StatusBar, TouchableOpacity, Platform } from 'react-native'
import ColoredLine from '../../components/LineComponet';
import { Fonts } from '../style';
import DefualtImage from '../../assets/defualt.png'
import MidFeildImage from '../../assets/midFeild.png'
import DefendImage from '../../assets/defend.png'
import GoalKeeperImage from '../../assets/goalKeeper.png'
import AttacakImage from '../../assets/attacak.png'
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
const CustomizeProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [selectedText, setSelectedText] = useState(null);

    const [selectedImage, setSelectedImage] = useState(DefualtImage);

    const handleTextClick = (imageName, text) => {
        switch (imageName) {
            case 'attackImage':
                setSelectedImage(AttacakImage);

                break;
            case 'defendImage':
                setSelectedImage(DefendImage);
                break;
            case 'midfieldImage':
                setSelectedImage(MidFeildImage);
                break;
            case 'goalkeeperImage':
                setSelectedImage(GoalKeeperImage);
                break;
            default:
                setSelectedImage(DefualtImage);
        }
        setSelectedText(text);
    };

           
    const handleNavigate = () => {
        // Check if any text is selected before navigating
        if (selectedImage !== DefualtImage) {
            dispatch({
                type: 'SET_USER_ROLE',
                payload: {selectedText},
            });
            setLoading(true);
            setTimeout(() => {
                navigation.navigate('CustomizeProfileFoot');
              setLoading(false);
            }, 200);
            
        } else {
            console.warn('Please select an item before navigating.');
        }
    };
    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor={'white'}  barStyle="dark-content" /> */}
            <ColoredLine flex={4} />
            <View style={styles.MainContainer}>
                <Text style={styles.MainHeading} >¿Qué posición juegas?</Text>
                <Image source={selectedImage} style={styles.image} />

                {/* Text 1 */}
                <View style={styles.row}>
                    <View style={styles.colm}>
                        <TouchableOpacity style={[
                            styles.buttonSelect,
                            selectedText === 'Delantero' && styles.selectedTextTouchable,
                        ]} onPress={() => handleTextClick('attackImage', 'Delantero')}>
                            <Text style={styles.textSelectProfile}>Delantero</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Text 2 */}
                    <View style={styles.colm}>
                        <TouchableOpacity style={[
                            styles.buttonSelect,
                            selectedText === 'Defensa' && styles.selectedTextTouchable,
                        ]} onPress={() => handleTextClick('defendImage', 'Defensa')}>
                            <Text style={styles.textSelectProfile}>Defensa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Text 3 */}
                <View style={styles.row}>
                    <View style={styles.colm}>
                        <TouchableOpacity style={[
                            styles.buttonSelect,
                            selectedText === 'Medio' && styles.selectedTextTouchable,
                        ]} onPress={() => handleTextClick('midfieldImage', 'Medio')}>
                            <Text style={styles.textSelectProfile}>Medio</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.colm}>
                        {/* Text 4 */}
                        <TouchableOpacity style={[
                            styles.buttonSelect,
                            selectedText === 'Portero' && styles.selectedTextTouchable,
                        ]} onPress={() => handleTextClick('goalkeeperImage', 'Portero')}>
                            <Text style={styles.textSelectProfile}>Portero</Text>
                        </TouchableOpacity>
                    </View>
                </View>

               
            </View>
            <View style={styles.nextButton}>
                    <Button loading={loading} text='Próximo' Link={handleNavigate} />

                </View>
        </View>
    )
}
const styles = StyleSheet.create({
    selectedTextTouchable: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: 20,
        flexShrink: 0,
        borderRadius: 10,
        borderWidth: 0.25,
        borderColor: '#408639',
        backgroundColor: "rgba(64, 134, 57, 0.05)"
    },

    textSelectProfile: {
        color: 'black'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems:"center",
        paddingHorizontal:20
    
    },
    buttonSelect: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: 20,
        flexShrink: 0,
    },
    colm: {
        width: '50%',
        borderRadius: 10,
        borderWidth: 0.25,
        borderColor: 'rgba(0, 0, 0, 0.40)',
    },
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
        width: 'auto',
        // paddingLeft: 10,
        // paddingRight: 10
    },
    MainHeading: {
        fontSize: 28,
        color: 'black',
        textAlign: 'center',
        fontFamily: Fonts.BOLD,
        // width: 330,
        lineHeight: 36,
    },
    ImageContainer: {
        marginTop: 30
    },
    nextButton: {
        position: 'absolute',
        bottom: 25,
        width:'100%'
    },
    MainPointCon: {
        flexDirection: 'column', // Arrange rows vertically
        alignItems: 'center',
        marginTop: 50,
    },
    row: {
        flexDirection: 'row', // Arrange points and text horizontally
        alignItems: 'center', // Center content vertically
        marginVertical: 10,
        gap: 12,
        paddingLeft: 10,
        paddingRight: 10
    },
    pointContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 25,
        justifyContent: 'start'
    },
    image: {
        width: 340,
        height: Platform.OS === 'ios' ? 280 : 350,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        color: 'blue',
        marginBottom: 10,
    },
    textPoints: {
        fontSize: 16,
        lineHeight: 24,
        color: '#61646B',
        fontFamily: 'Satoshi-Medium',
    }
});

export default CustomizeProfile