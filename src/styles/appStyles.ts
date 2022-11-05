import { StyleSheet } from 'react-native';

export const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  marginTop: {
    marginTop: 16,
  },
  marginBottom: {
    marginBottom: 16,
  },
  backgroundCover: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 16,
    opacity: 0.6,
  },
  lightText: {
    color: 'white',
  },
  errText: { color: 'red' },
  header: {
    fontSize: 24,
  },
  textInput: {
    paddingVertical: 8,
    alignSelf: 'stretch',
    padding: 8,
    borderBottomWidth: 2,
  },
  lightTextInput: {
    borderBottomColor: 'white',
  },
  inlineTextButton: {
    color: '#87f1f1',
  },
  pressedInlineTextButton: {
    color: '#87f1f1',
    opacity: 0.6,
  },
});
