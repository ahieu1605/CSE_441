import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E91E63',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 15,
        borderRadius: 6,
        fontSize: 16
    },
    button: {
        backgroundColor: '#E91E63',
        padding: 15,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    card: {
        padding: 16,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 12
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333'
    },
    cardSub: {
        fontSize: 14,
        color: '#666'
    },
    warningBox: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#f00',
        borderWidth: 1,
        marginTop: 20
    },
    warningText: {
        color: '#f00',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15
    }
});