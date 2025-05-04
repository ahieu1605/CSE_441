import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    display: {
        width: '100%',
        height: 60,
        borderColor: 'gray',
        marginBottom: 10,
        padding: 10,
        textAlign: 'center',
        fontSize: 24,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '22%',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    functionButton: {
        backgroundColor: '#E6E6E6',
        padding: 20,
        borderRadius: 10,
        width: '22%',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    functionButtonText: {
        color: '#FEA948',
        fontSize: 18,
        fontWeight: 'bold',
    },
    clearButton: {
        backgroundColor: '#E6E6E6',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    clearButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});