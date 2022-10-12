/**
 * Created by YQB on 16/9/14.
 */
import React, { Component, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Easing, Dimensions } from 'react-native';

const bgHeight = Dimensions.get('window').height;
const bgWidth = Dimensions.get('window').width;
const viewHeight = 100;

const layouts = StyleSheet.create({
	bgViewLayout: {
		width: bgWidth * 0.3,
		height: viewHeight,
		top: 100,
		left: 100,
		backgroundColor: 'red',
	},
	lineLayout: {
		width: bgWidth,
		height: 0.5,
		top: 100,
		backgroundColor: 'black',
	},
});
function RotateTest() {
	const animateRef = useRef<Animated.Value>(new Animated.Value(0));

	useEffect(() => {
		const roate = Animated.timing(animateRef.current, {
			useNativeDriver: true,
			toValue: 1,
			duration: 3000,
		});
		Animated.loop(roate, { iterations: 9999 }).start();
	}, []);

	return (
		<View style={{}}>
			<View style={layouts.lineLayout} />
			<Animated.View
				style={[
					layouts.bgViewLayout,
					{
						transform: [
							{ translateY: -viewHeight / 2 },
							{
								rotate: animateRef.current.interpolate({
									inputRange: [0, 1],
									outputRange: ['0deg', '180deg'],
								}),
							},
							{ translateY: viewHeight / 2 },
						],
					},
				]}
			/>
		</View>
	);
}
export default RotateTest;
