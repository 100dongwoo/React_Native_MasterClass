import React, { useEffect, useState } from 'react';

import { Text, View } from 'react-native';
import { Icon } from '../components/Coin';
import { useQuery } from 'react-query';
import { info, history } from '../api';
import { BLACK_COLOR } from '../colors';
import styled from 'styled-components/native';
import { VictoryChart, VictoryLine, VictoryScatter } from 'victory-native';

const Container = styled.ScrollView`
    background-color: ${BLACK_COLOR};
`;
const Detail = ({
    navigation,
    route: {
        params: { symbol, id },
    },
}) => {
    useEffect(() => {
        navigation.setOptions({
            title: symbol,
            // headerTitle: () => (
            //     <Icon
            //         source={{
            //             uri: `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
            //         }}
            //     />
            // ),
        });
    }, []);
    const { isLoading: infoLoading, data: infoData } = useQuery(
        ['coinInfo', id],
        info
    );
    const { isLoading: historyLoading, data: historyData } = useQuery(
        ['coinHistory', id],
        history
    );
    const [victoryData, setVictoryData] = useState([]);

    useEffect(() => {
        if (historyData) {
            setVictoryData(
                historyData.map((price) => ({
                    x: new Date(price.timestamp).getTime(),
                    y: price.price,
                }))
            );
        }
    }, [historyData]);
    return (
        <Container>
            {victoryData ? (
                <VictoryChart height={360}>
                    <VictoryLine
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 },
                        }}
                        interpolation='monotoneX'
                        data={victoryData}
                        style={{ data: { stroke: '#1abc9c' } }}
                    />
                    <VictoryScatter
                        data={victoryData}
                        style={{ data: { fill: '#1abc9c' } }}
                    />
                </VictoryChart>
            ) : null}
        </Container>
    );
};

export default Detail;
