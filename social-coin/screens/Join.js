import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import { BLACK_COLOR } from '../colors';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-web';

const Container = styled.View`
    background-color: ${BLACK_COLOR};
    flex: 1;
    align-items: center;
    color: white;
    padding: 60px 20px;
`;
const TextInput = styled.TextInput`
    width: 100%;
    padding: 10px 20px;
    border-radius: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    color: white;
    background-color: rgba(255, 255, 255, 0.5);
`;
const Btn = styled.TouchableOpacity`
    width: 100%;
    padding: 10px 20px;
    border-width: 1px;
    border-radius: 20px;
    border-color: rgba(255, 255, 255, 0.5);
    justify-content: center;
    align-items: center;
`;
const BtnText = styled.Text`
    color: white;
    font-size: 16px;
`;

const Join = () => {
    const passwordInput = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitEmailEditing = () => {
        passwordInput.current.focus();
    };
    const onSubmitPasswordEditing = async () => {
        if (email === '' || password === '') {
            Alert.alert('작성해주세요');
            return;
        }
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            // await auth().signInWithEmailAndPassword()
            await auth().createUserWithEmailAndPassword(email, password);
        } catch (e) {
            switch (e.code) {
                case 'auth/weak-password': {
                    Alert.alert('Write a stronger password!');
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <TextInput
                placeholder='Email'
                autoCapitalize='none' //첫 글자 자동대문자
                autoCorrect={false} //자동 수정
                keyboardType='email-address'
                value={email}
                returnKeyType='next' //ios   다음 버튼 단어
                // returnKeyLabel  android

                onChangeText={(text) => setEmail(text)}
                onSubmitEditing={onSubmitEmailEditing} //finish 하고싶을때 부르는 함수
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            />
            <TextInput
                ref={passwordInput}
                placeholder='Password'
                secureTextEntry
                value={password}
                returnKeyType='done'
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                onSubmitEditing={onSubmitPasswordEditing}
            />
            <Btn onPress={onSubmitPasswordEditing}>
                {loading ? (
                    <ActivityIndicator color={'white'} />
                ) : (
                    <BtnText>Create Account</BtnText>
                )}
            </Btn>
        </Container>
    );
};
export default Join;
