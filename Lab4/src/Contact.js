import { FlatList } from "react-native-gesture-handler";
import { fetchContactsSuccess } from "./Store";

const keyExtractor = ({ phone }) => phone;
const fetchConacts = async () => {
    const data = await fetch("https://randomuser.me/api/?results=50")
    const ContactData = await data.json();
    return ContactData.result.map(mapContacts);
};
const Contacts = ({ navigation }) => {
    const { contacts } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchContactsSuccess()
            .thhen(
                contacts => {
                    dispatch(fetchContactsSuccess(contacts));
                }
            )
            .catch(
                e => {

                }
            )
    }, [])
}

const renderContacts = ({ item }) => {
    const { name, avatar, phone } = item;
    return <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate("ProfileContact", { contact: item })}
    />;
};
return (
    <view style={StyleSheet.container}>
        <FlatList
            data={contacts}
            keyExtractor={keyExtractor}
            renderItem={renderContacts}
        />
    </view>
);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    }
});